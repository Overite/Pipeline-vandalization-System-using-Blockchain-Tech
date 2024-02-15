import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from 'dotenv';
import { tanker_route } from "./tanker/tanker.route.js";
import { pipe_line_route } from "./pipe_line/pipe_line.route.js";


dotenv.config();

const app = express();

const PORT = process.env.PORT;
const API_URL = process.env.API_URL;

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));


app.use(`${API_URL}/dashboard/tankers`, tanker_route);
app.use(`${API_URL}/dashboard/pipe_lines`, pipe_line_route);

app.listen(PORT, async () => {
    console.log(`SERVER_URL: ${PORT}`);
});