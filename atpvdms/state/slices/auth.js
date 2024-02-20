import { SERVER_URL } from '@/constants/api';
import { createSlice } from '@reduxjs/toolkit'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const auth_api = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({ baseUrl: `${SERVER_URL}/auth`, credentials: 'include' }),
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (credentials) => ({
                url: '/signin',
                method: 'POST',
                body: credentials,
            }),
        }),
        signup: builder.mutation({
            query: (credentials) => ({
                url: '/signup',
                method: 'POST',
                body: credentials,
            }),
        }),
        forgot_password: builder.mutation({
            query: (credentials) => ({
                url: '/forgot_password',
                method: 'POST',
                body: credentials,
            }),
        }),
        confirm_token: builder.mutation({
            query: (credentials) => ({
                url: '/confirm_token',
                method: 'POST',
                body: credentials,
            }),
        }),
        reset_password: builder.mutation({
            query: (credentials) => ({
                url: '/reset_password',
                method: 'POST',
                body: credentials,
            }),
        }),
        logout: builder.mutation({
            query: () => ({
                url: '/signout',
                method: 'POST',
            })
        })
    }),
});

export const { useLoginMutation, useConfirm_tokenMutation, useForgot_passwordMutation, useSignupMutation, useReset_passwordMutation, useLogoutMutation } = auth_api

const initialState = {
    token: null,
    user: null
}

export const auth_slice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        set_token: (state, action) => {
            state.token = action.payload;
        },
        set_user: (state, action) => {
            state.user = action.payload;
        }
    },
})

export const { set_token, set_user } = auth_slice.actions

export default auth_slice.reducer