import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

export const ProtectedRoute = ({ children, toredirect }) => {
    const { user } = useSelector(state => state.auth)

    return (
        user ? children : <Navigate to={toredirect} />
    )

}

ProtectedRoute.propTypes = {
    children: PropTypes.any,
    toredirect: PropTypes.string
}

