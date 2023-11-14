import { onAuthStateChanged, sendEmailVerification } from "firebase/auth"
import { useEffect, useState } from "react"
import { auth } from "../firebase"
import { useNavigate } from "react-router-dom"
export const VerifyEmailPage = () => {

    const [user, setUser] = useState(null)

    const navigate = useNavigate()

    /*  useEffect(() => {
         onAuthStateChanged(auth, userCurrent => {
             if (userCurrent) {
 
                 setUser(userCurrent)
 
                 if (user.emailVerified) {
                     navigate('/')
                 }
                 sendEmailVerification(auth.currentUser)
 
 
 
             }
         })
     }, [auth])
  */

    /*  useEffect(() => {
         if (user.emailVerified) {
             navigate('/')
         }
     }, [user, navigate]) */


    return (
        <main
            className="flex flex-col min-h-screen items-center justify-start"
        >
            <section
                className="bg-neutral p-4 rounded-xl mt-20"
            >
                <h3>
                    Se envio un mensaje a tu correo <span className="text-primary font-bold">{user?.email}</span>, por favor verifique el correo
                </h3>
            </section>
        </main >
    )
}
