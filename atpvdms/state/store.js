import { configureStore } from '@reduxjs/toolkit'
import tankers_reducer, { tankers_api } from '@/state/slices/tankers.js';
import pipe_line_reducer, { pipe_lines_api } from '@/state/slices/pipe_line.js';
import auth_reducer, { auth_api } from './slices/auth';
import admin_reducer, { admin_api } from './slices/admin';
import blockchain_reducer, { blockchain_api } from './slices/blockchain'

export const store = configureStore({
    reducer: {
        tankers: tankers_reducer,
        pipe_lines: pipe_line_reducer,
        auth: auth_reducer,
        admin: admin_reducer,
        blockchain: blockchain_reducer,
        [tankers_api.reducerPath]: tankers_api.reducer,
        [pipe_lines_api.reducerPath]: pipe_lines_api.reducer,
        [auth_api.reducerPath]: auth_api.reducer,
        [admin_api.reducerPath]: admin_api.reducer,
        [blockchain_api.reducerPath]: blockchain_api.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(tankers_api.middleware, pipe_lines_api.middleware, auth_api.middleware, admin_api.middleware, blockchain_api.middleware)
})
