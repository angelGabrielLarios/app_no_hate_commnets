import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "./firebaseConfig.js";


export const getAllPosts = async () => {


    try {
        const postsRef = collection(db, 'posts');
        const q = query(postsRef, orderBy('datePosted', 'desc'))
        const querySnapshot = await getDocs(q);

        const arrayTempPostFirestore = []
        querySnapshot.forEach((doc) => {
            arrayTempPostFirestore.push({
                ...doc.data()
            })
        })

        return arrayTempPostFirestore
    } catch (error) {
        console.error(error)
        throw new Error(error)
    }

}

