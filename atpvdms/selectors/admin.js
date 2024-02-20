import { useSelector } from 'react-redux'

export function admin_selectors() {
    const { admin, loading } = useSelector((state) => state.admin);


    return { admin, loading }
}