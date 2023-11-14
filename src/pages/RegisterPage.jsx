import { useState } from "react"
import { useForm } from "react-hook-form"
import { AlertErrorForm } from "../components"
import { Link, useNavigate } from "react-router-dom"

import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth, db } from "../firebase/"
import { messagesErrorFirebase } from "../helpers"
import { doc, setDoc } from "firebase/firestore"
import { login } from "../store/auth"
import { useDispatch } from "react-redux"




export const RegisterPage = () => {

    const navigate = useNavigate()

    const dispatch = useDispatch()



    const [isShowPassword, setIsShowPassword] = useState(false)

    const { register, formState: { errors }, handleSubmit } = useForm({
        defaultValues: {
            name: "",
            lastName: "",
            phone: "",
            email: "",
            password: ""
        }
    })
    const [isLoading, setIsLoading] = useState(false)

    const [errorEmailAlreadyeExists, setErrorEmailAlreadyeExists] = useState(false)

    const onSubmitForm = async (data) => {


        try {
            setIsLoading(true);

            const { user } = await createUserWithEmailAndPassword(auth, data.email, data.password)

            await setDoc(doc(db, "users", user.uid), {
                uid: user.uid,
                name: data.name,
                lastName: data.lastName,
                phone: data.phone,
                email: data.email,

            });

            dispatch(login({
                uid: user.uid,
                name: data.name,
                lastName: data.lastName,
                phone: data.phone,
                email: data.email,
            }));

            navigate('/');

        } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;

            if (errorCode === messagesErrorFirebase.emailAlreadyInUse) {
                setErrorEmailAlreadyeExists(`El correo electrónico que ingresó ya está en uso`);
                document.getElementById('my_modal_3').showModal();
            }

            console.error({
                errorCode,
                errorMessage
            });

        } finally {
            setIsLoading(false);
        }
    }

    return (
        <main
            className="flex flex-col min-h-screen items-center justify-center"
        >
            <header
                className="text-center py-6"
            >
                <h1

                    className="text-primary font-bold text-2xl "
                >
                    Create una nueva <span className="text-secondary">cuenta</span>
                </h1>

                <h2
                    className="text-primary italic"
                >
                    Crearse Cuenta
                </h2>
            </header>

            <form
                className="w-10/12 lg:w-6/12 py-12 px-6 border border-secondary rounded-xl shadow-lg shadow-secondary space-y-6"
                onSubmit={handleSubmit(onSubmitForm)}

            >
                <section
                    className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-4"
                >



                    <div className="">
                        <label className="label">
                            <span className="label-text text-secondary">Nombre (s):</span>
                        </label>

                        <input
                            id="name"
                            type="text"
                            {...register('name', {
                                required: 'Este campo es obligatorio',
                            })}
                            placeholder="Nombre(s)"
                            className="input input-bordered input-primary block w-full placeholder:text-xs text-xs lg:text-sm lg:placeholder:text-sm"
                            maxLength={50}
                        />

                        {/* mensaje error */}
                        {
                            errors?.name?.type === "required"
                                ? <AlertErrorForm>
                                    {errors?.name?.message}
                                </AlertErrorForm>
                                : null

                        }
                    </div>

                    <div className="">

                        <label className="label">
                            <span className="label-text text-secondary">Apellido (s):</span>
                        </label>


                        <input
                            id="lastName"
                            type="text"
                            {...register('lastName', {
                                required: 'Este campo es obligatorio',
                            })}
                            placeholder="Apellido(s)"
                            className="input input-bordered input-primary block w-full placeholder:text-xs text-xs lg:text-sm lg:placeholder:text-sm"
                            maxLength={50}
                        />

                        {/* mensaje error */}
                        {
                            errors?.lastName?.type === "required"
                                ? <AlertErrorForm>
                                    {errors?.name?.message}
                                </AlertErrorForm>
                                : null

                        }
                    </div>
                </section>






                <div className="">

                    <label className="label">
                        <span className="label-text text-secondary">Teléfono:</span>
                    </label>

                    <input
                        id="phone"
                        type="tel"
                        {...register('phone', {
                            required: 'Este campo es obligatorio',
                            minLength: {
                                value: 10,
                                message: 'El telefono debe contener solo 10 digitos'
                            },
                            maxLength: {
                                value: 10,
                                message: 'El telefono debe contener solo solo 10 digitos'
                            }
                        })}

                        minLength={10}
                        maxLength={10}
                        placeholder="Telefono"
                        className="input input-bordered input-primary block w-full placeholder:text-xs text-xs lg:text-sm lg:placeholder:text-sms"

                    />

                    {/* mensaje error */}
                    {
                        errors?.phone?.type === "required"
                            ? <AlertErrorForm>
                                {errors?.phone?.message}
                            </AlertErrorForm>
                            : null

                    }
                </div>

                <div className="">
                    <label className="label">
                        <span className="label-text text-secondary">Correo electronico</span>
                    </label>

                    <input
                        id="email"
                        type="email"
                        {...register('email', {
                            required: 'Este campo es obligatorio',
                            pattern: {
                                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                message: 'Este NO es un correo electrónico válido'
                            }
                        })}
                        placeholder="Correo Electrónico"
                        className="input input-bordered input-primary block w-full placeholder:text-xs text-xs lg:text-sm lg:placeholder:text-sms"
                        maxLength={100}
                    />

                    {/* mensaje error */}
                    {
                        errors?.email?.type === "required"
                            ? <AlertErrorForm>
                                {errors?.email?.message}
                            </AlertErrorForm>
                            : null

                    }
                </div>

                <div className="">

                    <label className="label">
                        <span className="label-text text-secondary">Contraseña:</span>
                    </label>

                    <input
                        id="password"
                        type={isShowPassword ? `text` : `password`}
                        {...register('password', {
                            required: 'Este campo es obligatorio',
                            minLength: {
                                value: 8,
                                message: 'La contraseña debe contener minimo 8 o más caracteres'
                            }
                        })}
                        placeholder="Contraseña"
                        minLength={8}
                        className="input input-bordered input-primary block w-full placeholder:text-xs text-xs lg:text-sm lg:placeholder:text-sms"
                        maxLength={200}
                    />


                    {
                        errors?.password?.type === "required"
                            ? <AlertErrorForm>
                                {errors?.password?.message}
                            </AlertErrorForm>
                            : null
                    }

                    {
                        errors?.password?.type === "minLength"
                            ? <AlertErrorForm>
                                {errors?.password?.message}
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
                    className="btn btn-secondary flex items-center gap-3 w-full "
                >
                    Crear Cuenta
                    {
                        isLoading
                            ? <span className="loading loading-bars loading-md"></span>
                            : null
                    }
                </button>

                <p className="text-center text-xs lg:text-sm">¿Ya tienes una cuenta? <Link className="text-secondary font-bold" to={`/auth/login`}>Inicia Sesión</Link></p>
            </form>

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
                    <p className="py-4 text-error">{errorEmailAlreadyeExists}</p>
                </div>
            </dialog>
        </main >
    )
}
