import { SERVER_URL } from '@/constants/api'
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    tankers: [],
    loading: false,
    total_tankers: null,
    current_tanker_sn: null,
    current_tanker_logs: [],
    notifications: []
}

export const tanker_slice = createSlice({
    name: 'tanker',
    initialState,
    reducers: {
        set_tankers: (state, action) => {
            state.tankers = action.payload;
        },
        set_loading: (state, action) => {
            state.loading = action.payload;
        },
        set_total_tankers: (state, action) => {
            state.total_tankers = action.payload
        },
        set_current_tanker_sn: (state, action) => {
            state.current_tanker_sn = action.payload;
        },
        set_current_tanker_logs: (state, action) => {
            state.current_tanker_logs = action.payload;
        },
        set_notifications: (state, action) => {
            state.notifications = action.payload;
        }
    },
})

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const tankers_api = createApi({
    reducerPath: 'tankers_api',
    baseQuery: fetchBaseQuery({ baseUrl: `${SERVER_URL}/dashboard/tankers`, credentials: 'include', next: { revalidate: 60 } }),
    endpoints: (builder) => ({
        get_all_tankers: builder.query({
            query: () => `/all`,
        }),
        get_tanker: builder.query({
            query: (tanker_sn) => `/${tanker_sn}`
        }),
        check_tanker_pms_level: builder.query({
            query: (tanker_sn) => `/${tanker_sn}/pms_level`
        })
    }),
})


export const { useGet_all_tankersQuery, useGet_tankerQuery, useCheck_tanker_pms_levelQuery } = tankers_api

export const { set_loading, set_tankers, set_total_tankers, set_current_tanker, set_current_tanker_logs, set_current_tanker_sn, set_notifications } = tanker_slice.actions

export default tanker_slice.reducer