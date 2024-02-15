import esh from 'express-async-handler';
import { server_err, status_msg } from '../utils/status_msg.js';
import { prisma } from '../prisma_client.config.js';


const get_all_tankers = esh(async (req, res) => {
    try {
        let all_tankers = await prisma.tankers.findMany({});

        if (all_tankers) status_msg({ code: 200, msg: 'Got all tankers!', res, all_tankers, amount: all_tankers.length })
        else status_msg({ code: 400, msg: 'Error in getting all tankers. Check internet connection.', res })
    } catch (error) {
        server_err({ error, res })
    }
})

const get_tanker_logs = esh(async (req, res) => {
    const { tanker_sn } = req.params;

    try {
        const tanker = await prisma[`tanker${tanker_sn}`].findMany({});

        if (tanker) status_msg({ code: 200, msg: `Got tanker: ${tanker_sn}`, res, tanker });
        else status_msg({ code: 400, msg: `Error in getting tanker: ${tanker_sn} logs. Check internet connection.`, res })
    } catch (error) {
        server_err({ error, res })
    }
})

export { get_all_tankers, get_tanker_logs }