import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from 'dotenv';
import { tanker_route } from "./tanker/tanker.route.js";
import { pipe_line_route } from "./pipe_line/pipe_line.route.js";
import auth_route from "./auth/auth.route.js";
import { admin_route } from "./admin/admin.route.js";
import { blockchain_route } from "./blockchain/blockchain.route.js";


dotenv.config();

const app = express();

const PORT = process.env.PORT;
const API_URL = process.env.MODE == 'PRODUCTION' ? process.env.DEPLOYED_SERVER_URL : process.env.API_URL;
const CLIENT_URL = process.env.MODE == 'PRODUCTION' ? process.env.DEPLOYED_CLIENT_URL : process.env.LOCAL_CLIENT_URL;

app.use(express.json());
app.use(cors({
    origin: CLIENT_URL,
    credentials: true,
}));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use(`${API_URL}/auth`, auth_route);

app.get('/', (req, res) => res.json({ msg: `Server running on { SERVER_URL }: ${API_URL} { CLIENT_URL }: ${CLIENT_URL}` }))

app.use(`${API_URL}/dashboard/tankers`, tanker_route);
app.use(`${API_URL}/dashboard/pipe_lines`, pipe_line_route);
app.use(`${API_URL}/dashboard/me`, admin_route);
app.use(`${API_URL}/dashboard/blockchain/transactions`, blockchain_route);

app.listen(PORT, async () => {
    console.log(`SERVER_URL: ${PORT}`, { MODE: process.env.MODE == 'DEVELOPMENT' });
});