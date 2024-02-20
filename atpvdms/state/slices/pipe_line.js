import { SERVER_URL } from '@/constants/api'
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    pipe_lines: [],
    loading: false,
    total_pipe_lines: null,
    current_pipe_line: null,
    current_pipe_line_logs: [],
    current_pipe_line_sn: null,
}

export const pipe_line_slice = createSlice({
    name: 'pipe_line',
    initialState,
    reducers: {
        set_pipe_lines: (state, action) => {
            state.pipe_lines = action.payload;
        },
        set_loading: (state, action) => {
            state.loading = action.payload;
        },
        set_total_pipe_lines: (state, action) => {
            state.total_pipe_lines = action.payload
        },
        set_current_pipe_line_logs: (state, action) => {
            state.current_pipe_line_logs = action.payload;
        },
        set_current_pipe_line_sn: (state, action) => {
            state.current_pipe_line_sn = action.payload;
        },
    },
})

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const pipe_lines_api = createApi({
    reducerPath: 'pipe_lines_api',
    baseQuery: fetchBaseQuery({ baseUrl: `${SERVER_URL}/dashboard/pipe_lines`, credentials: 'include', next: { revalidate: 60 } }),
    endpoints: (builder) => ({
        get_all_pipe_lines: builder.query({
            query: () => `/all`,
        }),
        get_pipe_line: builder.query({
            query: (pipe_line_sn) => `/${pipe_line_sn}`
        }),
        check_pipe_line_level: builder.query({
            query: (tanker_sn) => `/${tanker_sn}/level`
        })
    }),
})


export const { useGet_all_pipe_linesQuery, useGet_pipe_lineQuery, useCheck_pipe_line_levelQuery } = pipe_lines_api

export const { set_loading, set_pipe_lines, set_total_pipe_lines, set_current_pipe_line_logs, set_current_pipe_line_sn } = pipe_line_slice.actions

export default pipe_line_slice.reducer