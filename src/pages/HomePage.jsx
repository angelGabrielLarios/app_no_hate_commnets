import { useEffect, useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { auth, db, getAllPosts, getInfoUser, storage } from "../firebase"
import { Timestamp, doc, setDoc } from "firebase/firestore"
import { signOut } from "firebase/auth"
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { useForm } from "react-hook-form"
import { logout } from "../store/auth"
import { convertDate, formatDateTimeForPost, generateUniqueId } from "../helpers"
import { ModalError, PostCard } from "../components"
import { isCommentOffensive } from "../chatgpt3"




export const HomePage = () => {


    const dispatch = useDispatch()

    const [urlImagePost, setUrlImagePost] = useState('')

    const { user } = useSelector(state => state.auth)

    const [isLoadingSendPost, setIsLoadingSendPost] = useState(false)

    const [isLoadingAllPosts, setisLoadingAllPosts] = useState(false)

    const [showToastPostCreated, setShowToastPostCreated] = useState(false)

    const [fileImage, setFileImage] = useState(null)

    const [isLoadingLogout, setIsLoadingLogout] = useState(false)

    const [postsFirestore, setPostsFirestore] = useState([])

    const ModalErrorCommentRef = useRef(null)

    const ModalErrorPostRef = useRef(null)





    const { message } = useSelector(state => state.modalError)


    /* const [isLoadingPostsFirestore, setIsLoadingPostsFirestore] = useState(false) */

    const navigate = useNavigate()

    const { handleSubmit, register, reset } = useForm({
        defaultValues: {
            post: "",
            fileImage: null
        }
    })

    const fileInputRef = useRef(null)

    const onClickButtonFile = () => {
        fileInputRef.current.click()
    }

    const onChangeFileInput = event => {
        const image = event.target.files[0]

        if (image) {
            setUrlImagePost(
                URL.createObjectURL(image)
            )

            setFileImage(image)

        }

    }

    useEffect(() => {

        setisLoadingAllPosts(true)
        getAllPosts()
            .then(arrPostsFirestore => {

                setPostsFirestore(arrPostsFirestore)
            })
            .catch(error => {
                console.error(error)
                throw new Error(error)
            })
            .finally(() => {
                setisLoadingAllPosts(false)
            })

    }, [])
    const onSubmitAddPost = async ({ post = "" }) => {

        try {
            setIsLoadingSendPost(true)
            const responseIsCommentOffensive = await isCommentOffensive(post)

            if (responseIsCommentOffensive) {
                setIsLoadingSendPost(false)
                ModalErrorPostRef.current.showModal()
                reset()
                return
            }

            setIsLoadingSendPost(true)

            const currentUser = await getInfoUser({ uid: user.uid })
            const datePostPosted = new Date().toLocaleString()

            let urlImagePost = null

            if (fileImage) {

                const storageRef = ref(storage, `${user.uid}/${user.uid}_${convertDate(datePostPosted)}`);

                await uploadBytes(storageRef, fileImage)
                urlImagePost = await getDownloadURL(storageRef)
            }


            const idPost = generateUniqueId()

            await setDoc(doc(db, "posts", idPost), {
                idPost,
                currentUser,
                post,
                datePosted: Timestamp.fromDate(new Date()),
                urlImagePost: urlImagePost,
            });

            setIsLoadingSendPost(false)

            reset()

            setUrlImagePost('')

            setFileImage(null)

            document.getElementById('form_post').close()



            setShowToastPostCreated(true)

            setTimeout(() => {
                setShowToastPostCreated(false)

            }, 3000)

            setisLoadingAllPosts(true)
            const newPosts = await getAllPosts()
            setPostsFirestore(newPosts)
            setisLoadingAllPosts(false)



        } catch (error) {
            console.error(error)
            throw new Error(error)
        }
    }

    const onClickLogout = async () => {
        let isBusy = false

        if (isBusy) return
        try {
            isBusy = true
            setIsLoadingLogout(true)
            await signOut(auth)
            isBusy = false
            dispatch(logout())
            navigate('/auth/login')
        } catch (error) {
            console.error(error)
        }
        finally {
            setIsLoadingLogout(false)
        }
    }

    return (
        <>
            <nav className="navbar bg-primary text-white px-6">
                <div className="navbar-start">

                    <Link
                        to={'/'}
                        className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-white to-pink-500 text-transparent bg-clip-text"
                    >
                        Social Media
                    </Link>
                </div>
                <div className="navbar-center hidden lg:flex">

                </div>
                <div className="navbar-end">

                    <div className="flex gap-2 lg:gap-6 items-center">

                        <div className="dropdown dropdown-end">

                            <label tabIndex={0} className="flex items-center justify-center hover:bg-primary-focus p-2 rounded-full">


                                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M5 21C5 17.134 8.13401 14 12 14C15.866 14 19 17.134 19 21M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="#ebecf0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" ></path> </g></svg>



                            </label>
                            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 cursor-default">

                                <div className="">
                                    <li className="p-2 hover:bg-base-200 rounded-md ">

                                        Nombre: {`${user?.name} ${user?.lastName}`}
                                    </li>
                                    <li className="p-2 hover:bg-base-200 rounded-md">
                                        Correo Electrónico: {`${user?.email} `}
                                    </li>

                                    <li className="p-2 hover:bg-base-200 rounded-md">
                                        Teléfono: {`${user?.phone} `}
                                    </li>

                                    <li
                                        onClick={onClickLogout}
                                        className="p-2 hover:bg-base-200 rounded-md text-error ">
                                        Cerrar Sesión {
                                            isLoadingLogout
                                                ? <span className="loading loading-bars loading-md"></span>
                                                : null
                                        }
                                    </li>
                                </div>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>

            <section
                className="w-10/12 lg:w-6/12 mx-auto mt-20"
            >
                <article
                    className="bg-neutral p-4 rounded-xl flex items-center gap-2 lg:gap-4 mb-4"
                >

                    <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M5 21C5 17.134 8.13401 14 12 14C15.866 14 19 17.134 19 21M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="#5311f3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" ></path> </g></svg>

                    <button
                        className="btn btn-active btn-neutral rounded-full grow text-start justify-start text-[10px] 
                        "
                        onClick={() => document.getElementById('form_post').showModal()}
                    >
                        ¿Que estas pensando,<span className="text-primary">{user?.name}?</span>
                    </button>
                </article>

                <section
                    className="space-y-4"
                >
                    {
                        isLoadingAllPosts
                            ? <p className="text-primary font-bold">Cargando...</p>
                            : postsFirestore.length === 0
                                ? <p className="text-primary font-bold">No hay posts...</p>
                                : postsFirestore.map((doc) => {

                                    const { currentUser = '', datePosted = '', idPost = '', post = '', urlImagePost = '' } = doc

                                    return (
                                        <PostCard
                                            key={idPost}
                                            datePosted={formatDateTimeForPost(datePosted.toDate())}
                                            post={post}
                                            idPost={idPost}
                                            urlImagePost={urlImagePost}
                                            currentUser={currentUser}
                                            ModalErrorRef={ModalErrorCommentRef}
                                        />
                                    )
                                })

                    }
                </section>



            </section >

            <dialog id="form_post" className="modal relative">
                <div className="modal-box space-y-3">
                    <header className="flex items-start gap-2">
                        <svg width="40px" height="40px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M5 21C5 17.134 8.13401 14 12 14C15.866 14 19 17.134 19 21M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="#5311f3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>

                        <h3 className="font-bold text-base">{`${user?.name} ${user?.lastName}`}</h3>
                    </header>

                    <form
                        className=""
                        onSubmit={handleSubmit(onSubmitAddPost)}
                    >
                        <textarea
                            minLength={1}
                            maxLength={300}
                            className="textarea block w-full text-sm placeholder:text-sm  focus:border-0"
                            {...register('post')}
                            placeholder={`¿Qué estas pensando ${user?.name}?`}
                        ></textarea>
                        {
                            urlImagePost
                                ? <div className="relative mt-12">

                                    <img
                                        className="block w-full object-cover"
                                        src={urlImagePost}
                                    ></img>
                                    <button
                                        onClick={() => {
                                            setUrlImagePost('')

                                        }}
                                        type="button"
                                        className="btn btn-sm btn-circle btn-error absolute -top-4 -right-3"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                                    </button>
                                </div>
                                : null
                        }
                        <input
                            type="file"
                            className="hidden"
                            onChange={onChangeFileInput}
                            ref={fileInputRef}
                            accept=".png, .jpeg, .jpg, .svg, .webp"

                        />
                        <section className="flex items-center justify-between mt-4">

                            <article className="flex items-center gap-2">
                                <button
                                    type="submit"
                                    className="btn btn-sm btn-secondary text-xs"
                                    disabled={isLoadingSendPost}
                                >
                                    crear post {
                                        isLoadingSendPost
                                            ? <span className="loading loading-bars loading-xs"></span>
                                            : null
                                    }
                                </button>

                                <div className="modal-action mt-0">
                                    <form method="dialog">
                                        <button
                                            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                                            onClick={() => {
                                                reset()
                                                setUrlImagePost('')
                                                setFileImage(null)
                                            }}
                                        >✕</button>
                                    </form>
                                </div>
                            </article>

                            <button
                                type="button"
                                onClick={onClickButtonFile}
                            >
                                <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M8.5 10C9.32843 10 10 9.32843 10 8.5C10 7.67157 9.32843 7 8.5 7C7.67157 7 7 7.67157 7 8.5C7 9.32843 7.67157 10 8.5 10Z" fill="#f000b8"></path> <path fillRule="evenodd" clipRule="evenodd" d="M11.0055 2H12.9945C14.3805 1.99999 15.4828 1.99999 16.3716 2.0738C17.2819 2.14939 18.0575 2.30755 18.7658 2.67552C19.8617 3.24477 20.7552 4.1383 21.3245 5.23415C21.6925 5.94253 21.8506 6.71811 21.9262 7.62839C22 8.5172 22 9.61946 22 11.0054V12.9945C22 13.6854 22 14.306 21.9909 14.8646C22.0049 14.9677 22.0028 15.0726 21.9846 15.175C21.9741 15.6124 21.9563 16.0097 21.9262 16.3716C21.8506 17.2819 21.6925 18.0575 21.3245 18.7658C20.7552 19.8617 19.8617 20.7552 18.7658 21.3245C18.0575 21.6925 17.2819 21.8506 16.3716 21.9262C15.4828 22 14.3805 22 12.9946 22H11.0055C9.61955 22 8.5172 22 7.62839 21.9262C6.71811 21.8506 5.94253 21.6925 5.23415 21.3245C4.43876 20.9113 3.74996 20.3273 3.21437 19.6191C3.20423 19.6062 3.19444 19.5932 3.185 19.5799C2.99455 19.3238 2.82401 19.0517 2.67552 18.7658C2.30755 18.0575 2.14939 17.2819 2.0738 16.3716C1.99999 15.4828 1.99999 14.3805 2 12.9945V11.0055C1.99999 9.61949 1.99999 8.51721 2.0738 7.62839C2.14939 6.71811 2.30755 5.94253 2.67552 5.23415C3.24477 4.1383 4.1383 3.24477 5.23415 2.67552C5.94253 2.30755 6.71811 2.14939 7.62839 2.0738C8.51721 1.99999 9.61949 1.99999 11.0055 2ZM20 11.05V12.5118L18.613 11.065C17.8228 10.2407 16.504 10.2442 15.7182 11.0727L11.0512 15.9929L9.51537 14.1359C8.69326 13.1419 7.15907 13.1746 6.38008 14.2028L4.19042 17.0928C4.13682 16.8463 4.09606 16.5568 4.06694 16.2061C4.0008 15.4097 4 14.3905 4 12.95V11.05C4 9.60949 4.0008 8.59025 4.06694 7.79391C4.13208 7.00955 4.25538 6.53142 4.45035 6.1561C4.82985 5.42553 5.42553 4.82985 6.1561 4.45035C6.53142 4.25538 7.00955 4.13208 7.79391 4.06694C8.59025 4.0008 9.60949 4 11.05 4H12.95C14.3905 4 15.4097 4.0008 16.2061 4.06694C16.9905 4.13208 17.4686 4.25538 17.8439 4.45035C18.5745 4.82985 19.1702 5.42553 19.5497 6.1561C19.7446 6.53142 19.8679 7.00955 19.9331 7.79391C19.9992 8.59025 20 9.60949 20 11.05ZM6.1561 19.5497C5.84198 19.3865 5.55279 19.1833 5.295 18.9467L7.97419 15.4106L9.51005 17.2676C10.2749 18.1924 11.6764 18.24 12.5023 17.3693L17.1693 12.449L19.9782 15.3792C19.9683 15.6812 19.9539 15.9547 19.9331 16.2061C19.8679 16.9905 19.7446 17.4686 19.5497 17.8439C19.1702 18.5745 18.5745 19.1702 17.8439 19.5497C17.4686 19.7446 16.9905 19.8679 16.2061 19.9331C15.4097 19.9992 14.3905 20 12.95 20H11.05C9.60949 20 8.59025 19.9992 7.79391 19.9331C7.00955 19.8679 6.53142 19.7446 6.1561 19.5497Z" fill="#f000b8" className="hover:fill-secondary-focus"></path> </g>
                                </svg>
                            </button>


                        </section>
                    </form>


                </div>
            </dialog >

            {
                showToastPostCreated
                    ? <div className="toast text-xs lg:text-sm">
                        <div className="alert alert-info py-2 px-4" >
                            <span>Post publicado.</span>
                        </div>
                    </div >
                    : null
            }

            <ModalError
                ModalErrorRef={ModalErrorCommentRef}
                message={message}
            />

            <ModalError
                ModalErrorRef={ModalErrorPostRef}
                message={`El post no se puede publicar porque se ha detectado que es inapropiado `}
            />



        </>
    )
}
