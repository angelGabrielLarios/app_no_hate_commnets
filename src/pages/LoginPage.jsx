import { useState } from "react"
import { useForm } from "react-hook-form"
import { AlertErrorForm } from "../components"
import { Link, useNavigate } from "react-router-dom"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../firebase/firebaseConfig"
import { messagesErrorFirebase } from "../helpers/messagesErrorFirebase"
import { useDispatch } from "react-redux"
import { login } from "../store/auth"
import { getInfoUser } from "../firebase"


export const LoginPage = () => {

    const navigate = useNavigate()

    const dispatch = useDispatch()

    const [isLoading, setIsLoading] = useState(false)

    const [isShowPassword, setIsShowPassword] = useState(false)

    const [errorCredentials, setErrorCredentials] = useState('')



    const { register, formState: { errors }, handleSubmit } = useForm({
        defaultValues: {
            email: "",
            password: ""
        }
    })


    const onSubmitForm = async ({ email = '', password = '' }) => {


        setIsLoading(true);
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);


            const user = userCredential.user;

            const { name, lastName, phone } = await getInfoUser({
                uid: user.uid
            })

            dispatch(login({
                uid: user.uid,
                name: name,
                lastName: lastName,
                phone: phone,
                email: email,
            }));

            navigate('/');
        } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;

            if (errorCode === messagesErrorFirebase.errorCredentials) {
                setErrorCredentials('Tu correo electrónico o contraseña son incorrectas');
                document.getElementById('my_modal_3').showModal();
            }

            console.error({
                errorCode,
                errorMessage,
            });
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <main
            className="flex flex-col min-h-screen items-center justify-start lg:justify-center"
        >
            <header
                className="text-center pb-6 pt-6 lg:pt-0"
            >
                <h1

                    className="text-primary font-bold text-2xl lg:text-4xl mb-2 lg:mb-4"
                >
                    Hola <span className="text-secondary">¡Bienvenido!</span>
                </h1>

                <h2
                    className="text-primary italic"
                >
                    Inicia Sesión
                </h2>
            </header>

            <form
                className="w-10/12 lg:w-6/12 py-12 px-6 border border-secondary rounded-xl shadow-lg shadow-secondary space-y-6"
                onSubmit={handleSubmit(onSubmitForm)}

            >

                <div className="">
                    <article className="flex items-center gap-4">
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M3.75 5.25L3 6V18L3.75 18.75H20.25L21 18V6L20.25 5.25H3.75ZM4.5 7.6955V17.25H19.5V7.69525L11.9999 14.5136L4.5 7.6955ZM18.3099 6.75H5.68986L11.9999 12.4864L18.3099 6.75Z" fill="#570df8"></path> </g></svg>


                        <input
                            id="emal"
                            type="email"
                            {...register('email', {
                                required: 'Este campo es obligatorio',
                                pattern: {
                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                    message: 'Este NO es un correo electrónico válido'
                                }
                            })}
                            placeholder="Correo Electrónico"
                            className="input input-bordered input-primary block w-full placeholder:text-xs text-xs lg:text-sm lg:placeholder:text-sm"
                        />
                    </article>

                    {/* mensaje error */}
                    {
                        errors?.password?.type === "required"
                            ? <AlertErrorForm>
                                {errors.password.message}
                            </AlertErrorForm>
                            : null

                    }
                </div>

                <dialog id="my_modal_3" className="modal">
                    <div className="modal-box">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                        </form>
                        <header
                            className="flex items-center gap-5"
                        >
                            <svg fill="#ff6b6b" width="30px" height="30px" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" stroke="#ff6b6b"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M520.741 163.801a10.234 10.234 0 00-3.406-3.406c-4.827-2.946-11.129-1.421-14.075 3.406L80.258 856.874a10.236 10.236 0 00-1.499 5.335c0 5.655 4.585 10.24 10.24 10.24h846.004c1.882 0 3.728-.519 5.335-1.499 4.827-2.946 6.352-9.248 3.406-14.075L520.742 163.802zm43.703-26.674L987.446 830.2c17.678 28.964 8.528 66.774-20.436 84.452a61.445 61.445 0 01-32.008 8.996H88.998c-33.932 0-61.44-27.508-61.44-61.44a61.445 61.445 0 018.996-32.008l423.002-693.073c17.678-28.964 55.488-38.113 84.452-20.436a61.438 61.438 0 0120.436 20.436zM512 778.24c22.622 0 40.96-18.338 40.96-40.96s-18.338-40.96-40.96-40.96-40.96 18.338-40.96 40.96 18.338 40.96 40.96 40.96zm0-440.32c-22.622 0-40.96 18.338-40.96 40.96v225.28c0 22.622 18.338 40.96 40.96 40.96s40.96-18.338 40.96-40.96V378.88c0-22.622-18.338-40.96-40.96-40.96z"></path></g></svg>
                            <h3 className="font-bold text-lg text-error">Error !!!</h3>

                        </header>
                        <p className="py-4 text-error">{errorCredentials}</p>
                    </div>
                </dialog>

                <div className="">

                    <article className="flex items-center gap-4">

                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M14 6V5C14 3.89543 13.1046 3 12 3C10.8954 3 10 3.89543 10 5V6M9 11H15C15.5523 11 16 10.5523 16 10V7C16 6.44772 15.5523 6 15 6H9C8.44772 6 8 6.44772 8 7V10C8 10.5523 8.44772 11 9 11ZM5 21H19C20.1046 21 21 20.1046 21 19V16C21 14.8954 20.1046 14 19 14H5C3.89543 14 3 14.8954 3 16V19C3 20.1046 3.89543 21 5 21Z" stroke="#4506cb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> <circle cx="7.5" cy="17.5" r="1.5" fill="#4506cb"></circle> <circle cx="12" cy="17.5" r="1.5" fill="#4506cb"></circle> <circle cx="16.5" cy="17.5" r="1.5" fill="#4506cb"></circle> </g></svg>

                        <input
                            id="password"
                            type={isShowPassword ? `text` : `password`}
                            {...register('password', {
                                required: 'Este campo es obligatorio',
                            })}
                            placeholder="Contraseña"

                            className="input input-bordered input-primary block w-full placeholder:text-xs text-xs lg:text-sm lg:placeholder:text-sm"
                        />

                    </article>

                    {
                        errors?.password?.type === "required"
                            ? <AlertErrorForm>
                                {errors.password.message}
                            </AlertErrorForm>
                            : null



                    }
                </div>


                <label className="relative inline-flex items-center mb-4 cursor-pointer">
                    <input
                        type="checkbox"
                        className="sr-only peer"
                        onChange={event => setIsShowPassword(event.target.checked)}
                    />
                    <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                    <span className="ml-3 text-xs lg:text-sm font-medium ">Mostrar Contraseña</span>
                </label>




                <button
                    type="submit"
                    disabled={isLoading}
                    className="btn btn-secondary flex items-center gap-2 w-full text-xs lg:text-sm">
                    Iniciar Sesión
                    {
                        isLoading
                            ? <span className="loading loading-bars loading-md"></span>
                            : null
                    }
                </button>

                <p className="text-center text-xs lg:text-base">¿No tienes una cuenta? <Link className="text-secondary font-bold" to={'/auth/register'}>Create una cuenta</Link></p>
            </form>
        </main >
    )
}
