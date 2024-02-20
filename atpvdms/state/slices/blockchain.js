import { SERVER_URL } from '@/constants/api'
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    transactions: [],
    loading: false,
    eth_account_number: null
}

export const blockchain_slice = createSlice({
    name: 'blockchain',
    initialState,
    reducers: {
        set_transactions: (state, action) => {
            state.transactions = action.payload;
        },
        set_loading: (state, action) => {
            state.loading = action.payload
        },
        set_eth_number: (state, action) => {
            state.eth_account_number = action.payload
        }
    },
})

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const blockchain_api = createApi({
    reducerPath: 'blockchain_api',
    baseQuery: fetchBaseQuery({ baseUrl: `${SERVER_URL}/dashboard/blockchain/transactions`, credentials: 'include', next: { revalidate: 60 } }),
    endpoints: (builder) => ({
        get_all_transactions: builder.query({
            query: () => `/all`,
        }),
        get_eth_account: builder.query({
            query: () => `/eth_account`,
        }),
    }),
})


export const { useGet_all_transactionsQuery, useGet_eth_accountQuery } = blockchain_api;

export const { set_transactions, set_loading, set_eth_number } = blockchain_slice.actions

export default blockchain_slice.reducer