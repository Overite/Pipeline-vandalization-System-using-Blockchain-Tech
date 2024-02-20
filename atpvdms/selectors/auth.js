import { useSelector } from 'react-redux'

export function auth_selectors() {
    const { token } = useSelector((state) => state.auth);


    return { token }
}