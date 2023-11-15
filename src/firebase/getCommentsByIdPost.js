import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { db } from "./firebaseConfig";

export const getCommentsByIdPost = async ({ idPost = "" }) => {
    const commentsRef = collection(db, "comments")

    const q = query(commentsRef, where("idPost", "==", idPost), orderBy('dateCommeted', 'desc'));

    const querySnapshot = await getDocs(q)

    const arrCommentsFirestore = []

    querySnapshot.forEach((doc) => {

        arrCommentsFirestore.push(doc.data())
    })

    return arrCommentsFirestore
}
