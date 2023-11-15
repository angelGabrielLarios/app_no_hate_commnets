import PropTypes from 'prop-types'
import { formatDateTimeForPost } from '../helpers'

export const PostWithCommentsCard = ({ currentUser, post, urlImagePost, isFavoritePost, setIsFavoritePost, datePosted, commentsFirestore, ModalPostCartWithCommentsRef }) => {

    return (

        <>
            <dialog
                id="modal_post_comments" className="modal hidden"
                ref={ModalPostCartWithCommentsRef}
            >
                <div className="modal-box space-y-3 bg-neutral">

                    <section className="bg-neutral rounded-lg space-y-3">
                        <article className="flex items-center">
                            <svg width="40px" height="40px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M5 21C5 17.134 8.13401 14 12 14C15.866 14 19 17.134 19 21M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="#5311f3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
                            <div className="ml-3 ">
                                <span className="text-sm font-semibold antialiased block leading-tight">{`${currentUser?.name} ${currentUser?.lastName}`}</span>
                                <span className="text-base-content text-xs block">{datePosted}</span>
                            </div>
                        </article>
                        <p
                            className='text-xs'
                        >
                            {post}
                        </p>

                        {
                            urlImagePost
                                ? <img
                                    src={urlImagePost}
                                    className="w-full block object-cover" />

                                : null
                        }

                        <article className="flex items-center justify-between ">
                            <div className="flex gap-2 items-center">
                                <button
                                    onClick={() => setIsFavoritePost(!isFavoritePost)}
                                >

                                    {
                                        isFavoritePost
                                            ? <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#793ef9"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M2 9.1371C2 14 6.01943 16.5914 8.96173 18.9109C10 19.7294 11 20.5 12 20.5C13 20.5 14 19.7294 15.0383 18.9109C17.9806 16.5914 22 14 22 9.1371C22 4.27416 16.4998 0.825464 12 5.50063C7.50016 0.825464 2 4.27416 2 9.1371Z" fill="#793ef9" className='transition duration-300 ease-in-out'></path> </g></svg>

                                            : <svg width="30px" height="30px" viewBox="-2.4 -2.4 28.80 28.80" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#793ef9"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M2 9.1371C2 14 6.01943 16.5914 8.96173 18.9109C10 19.7294 11 20.5 12 20.5C13 20.5 14 19.7294 15.0383 18.9109C17.9806 16.5914 22 14 22 9.1371C22 4.27416 16.4998 0.825464 12 5.50063C7.50016 0.825464 2 4.27416 2 9.1371Z" fill="#2a2e37" className='transition duration-300 ease-in-out'></path> </g></svg>
                                    }
                                </button>



                            </div>


                        </article>


                        <h2
                            className='border-b-2 border-b-primary text-white 2xl text-center py-2'
                        >
                            Comentarios
                        </h2>
                        <article
                            className='space-y-3'
                        >
                            {
                                commentsFirestore.map((comment) => {
                                    /* const currentUser = await getInfoUser(comment?.user_uid) */
                                    return (
                                        <article
                                            key={comment.idComment}
                                            className='flex items-center gap-1 '
                                        >
                                            <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M5 21C5 17.134 8.13401 14 12 14C15.866 14 19 17.134 19 21M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="#5311f3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>

                                            <section
                                                className='bg-base-100 grow text-xs p-3 rounded-md'
                                            >
                                                <h6
                                                    className='text-primary font-bold mb-2'
                                                >


                                                    <div className="">
                                                        {`${comment?.currentUser?.name} ${comment?.currentUser?.lastName}`} <span className='text-base-content ml-2'>{formatDateTimeForPost(comment?.dateCommeted?.toDate())}</span>
                                                    </div>
                                                </h6>
                                                {comment?.comment}
                                            </section>
                                        </article>
                                    )
                                })
                            }
                        </article>
                    </section>

                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-error">✕</button>
                    </form>

                </div>

                <div className="modal-action mt-0">
                    <form method="dialog">
                        <button
                            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"

                        >✕</button>
                    </form>
                </div>
            </dialog >
        </>
    )
}

PostWithCommentsCard.propTypes = {
    currentUser: PropTypes.any,
    post: PropTypes.any,
    urlImagePost: PropTypes.any,
    isFavoritePost: PropTypes.any,
    setIsFavoritePost: PropTypes.any,
    datePosted: PropTypes.any,
    commentsFirestore: PropTypes.any,
    ModalPostCartWithCommentsRef: PropTypes.any
}