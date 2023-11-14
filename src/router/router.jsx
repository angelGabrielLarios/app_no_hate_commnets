import { createBrowserRouter } from "react-router-dom";

import { VerifyEmailPage, HomePage, LoginPage, RegisterPage } from "../pages";
import { ProtectedRoute } from "../components";




export const router = createBrowserRouter([
    {
        path: '/',
        element: <ProtectedRoute
            toredirect={`/auth/login`}
        >
            <HomePage />
        </ProtectedRoute>
    },
    {
        path: '/auth/login',
        element: <LoginPage />
    },
    {
        path: '/auth/register',
        element: <RegisterPage />
    },

    {
        path: '/auth/verify-email',
        element: <VerifyEmailPage />
    }
])