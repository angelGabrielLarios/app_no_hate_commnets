import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "./firebaseConfig";

export const getCommentsByIdPost = async ({ idPost = "" }) => {
    const commentsRef = collection(db, "comments")

    const q = query(commentsRef, where("idPost", "==", idPost));

    const querySnapshot = await getDocs(q)

    const arrCommentsFirestore = []

    querySnapshot.forEach((doc) => {

        arrCommentsFirestore.push(doc.data())
    })

    return arrCommentsFirestore
}
