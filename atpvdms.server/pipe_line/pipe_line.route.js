import { Router } from "express";
import { get_all_pipe_lines, get_pipe_line_logs } from "./pipe_line.controller.js";

const pipe_line_route = Router();

// Get all tankers
pipe_line_route.get('/all', get_all_pipe_lines)

// Get tanker logs
pipe_line_route.get('/:pipe_line_sn', get_pipe_line_logs)


export { pipe_line_route }

