import { getCommentsByIdPost } from "./getCommentsByIdPost"
import { getInfoUser } from "./getInfoUser"

export const getCommentsAndUserByIdPost = async ({ idPost = "" }) => {

    const arrCommentsAndUserFirestore = []
    try {
        console.log(`cargando...`)
        const arrCommentsFirestore = await getCommentsByIdPost({ idPost })

        arrCommentsFirestore.forEach(async (comment) => {

            const user = await getInfoUser({ uid: comment.user_uid })
            console.log(user)
            console.log(comment)
            /* arrCommentsAndUserFirestore.push({
                comment,
                user
            }) */
        })
        console.log(arrCommentsAndUserFirestore)
        return arrCommentsAndUserFirestore


    } catch (error) {
        console.error(error)
        throw new Error(error)
    }


}
