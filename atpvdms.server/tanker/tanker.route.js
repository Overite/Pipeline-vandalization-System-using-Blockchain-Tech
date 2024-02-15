import { Router } from "express";
import { get_all_tankers, get_tanker_logs } from "./tanker.controller.js";

const tanker_route = Router();

// Get all tankers
tanker_route.get('/all', get_all_tankers)

// Get tanker logs
tanker_route.get('/:tanker_sn', get_tanker_logs)


export { tanker_route }

