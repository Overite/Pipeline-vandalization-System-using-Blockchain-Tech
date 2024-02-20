import { useSelector } from 'react-redux'

export function blockchain_selectors() {
    const { transactions, loading, eth_account_number } = useSelector((state) => state.blockchain);


    return { transactions, loading, eth_account_number }
}