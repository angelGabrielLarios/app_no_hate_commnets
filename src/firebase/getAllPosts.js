import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebaseConfig";


export const getAllPosts = async () => {


    try {
        const querySnapshot = await getDocs(collection(db, "posts"));
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
