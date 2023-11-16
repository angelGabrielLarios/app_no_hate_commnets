import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";

export const getInfoUser = async ({ uid = '' }) => {

    const docRef = doc(db, "users", uid);

    try {
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {

            return docSnap.data()

        } else {

            return null
        }
    } catch (error) {
        console.error(error)
        throw new Error(error)
    }

}
