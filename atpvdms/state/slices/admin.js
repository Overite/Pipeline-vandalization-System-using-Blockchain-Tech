import { SERVER_URL } from '@/constants/api'
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    admin: null,
    loading: false
}

export const admin_slice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        set_admin: (state, action) => {
            state.admin = action.payload;
        },
        set_loading: (state, action) => {
            state.loading = action.payload
        }
    },
})

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const admin_api = createApi({
    reducerPath: 'admin_api',
    baseQuery: fetchBaseQuery({ baseUrl: `${SERVER_URL}/dashboard`, credentials: 'include' }),
    endpoints: (builder) => ({
        get_admin_profile: builder.query({
            query: () => `/me/account`,
        }),
        update_admin_profile: builder.mutation({
            query: ({ bio, lang, password, region, img }) => ({
                url: '/me/account/update',
                method: 'PATCH',
                body: { bio, lang, password, region, img }
            })
        })
    }),
})


export const { useGet_admin_profileQuery, useUpdate_admin_profileMutation } = admin_api

export const { set_admin, set_loading } = admin_slice.actions

export default admin_slice.reducer