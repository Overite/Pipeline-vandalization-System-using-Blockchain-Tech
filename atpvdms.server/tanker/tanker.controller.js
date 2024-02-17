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

const check_tanker_level = esh(async (req, res) => {
    const { tanker_sn } = req.params;

    try {
        const tanker_logs = await prisma[`tanker${tanker_sn}`].findMany({});
        let tanker_latest_pms_level;

        tanker_logs.reduce((smallest_pms_level, log) => {
            if (smallest_pms_level === undefined || log.pms_level < smallest_pms_level) {
                tanker_latest_pms_level = log.pms_level;
                return log.pms_level; // Return the smallest pms_level found so far
            } else {
                return smallest_pms_level; // Continue with the current smallest_pms_level
            }
        }, undefined); // Set initial value as undefined

        if (tanker_latest_pms_level) status_msg({ code: 200, msg: `Tanker-${tanker_sn} pms level reduced to ${tanker_latest_pms_level}!`, res, pms_level: tanker_latest_pms_level })
        status_msg({ code: 400, msg: 'Error in getting tanker pms level! Check internet connection', res })
    } catch (error) {
        server_err({ error, res })
    }
})

export { get_all_tankers, get_tanker_logs, check_tanker_level }