import esh from 'express-async-handler';
import { server_err, status_msg } from '../utils/status_msg.js';
import { prisma } from '../prisma_client.config.js';
import { deduct_from_eth_account } from '../utils/eth.js';

const get_all_transactions = esh(async (req, res) => {

    try {
        const all_transactions = await prisma.blockchain.findMany({ take: 10 });

        if (all_transactions) {
            deduct_from_eth_account({ req, res, amount: 0.00000000001 })
            status_msg({ code: 200, msg: 'Got all transactions', res, all_transactions })
        }
        else status_msg({ code: 200, msg: 'Error in getting all transactions. Check internet connections', res })
    } catch (error) {
        server_err({ error, res })
    }
})

const get_blockchain_account_number = esh(async (req, res) => {
    const eth_account = req.cookies.eth_account;

    try {
        if (eth_account) {
            status_msg({ code: 200, msg: 'Got blockchain account number!', res, eth_account })
        }
        else status_msg({ code: 400, msg: 'Error in getting blockchain account number! Check internet.', res })
    } catch (error) {
        server_err({ error, res })
    }
})

export {
    get_all_transactions,
    get_blockchain_account_number
}