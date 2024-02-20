import { Router } from "express";
import { get_all_transactions, get_blockchain_account_number } from "./blockchain.controller.js";


const blockchain_route = Router();

blockchain_route.get('/all', get_all_transactions);
blockchain_route.get('/eth_account', get_blockchain_account_number);

export { blockchain_route }