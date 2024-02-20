import esh from 'express-async-handler';
import { server_err, status_msg } from '../utils/status_msg.js';
import { prisma } from '../prisma_client.config.js';
import { add_to_eth_account, deduct_from_eth_account } from '../utils/eth.js';


const get_all_pipe_lines = esh(async (req, res) => {
    try {
        let all_pipe_lines = await prisma.pipe_lines.findMany({});

        if (all_pipe_lines) {
            deduct_from_eth_account({ req, res, amount: 0.00000000001 })
            status_msg({ code: 200, msg: 'Got all pipe line!', res, all_pipe_lines, amount: all_pipe_lines.length })
        }
        else status_msg({ code: 400, msg: 'Error in getting all pipe line. Check internet connection.', res })
    } catch (error) {
        server_err({ error, res })
    }
})

const get_pipe_line_logs = esh(async (req, res) => {
    const { pipe_line_sn } = req.params;

    try {
        const pipe_line = await prisma[`pipe_line${pipe_line_sn}`].findMany({ take: 10, });

        if (pipe_line) {
            deduct_from_eth_account({ req, res, amount: 0.00000000001 })
            status_msg({ code: 200, msg: `Got pipe_line: ${pipe_line_sn}`, res, pipe_line });
        }
        else status_msg({ code: 400, msg: `Error in getting pipe_line: ${pipe_line_sn} logs. Check internet connection.`, res })
    } catch (error) {
        server_err({ error, res })
    }
})

const check_pipe_line_level = esh(async (req, res) => {
    const { pipe_line_sn } = req.params;

    try {
        const pipe_line_logs = await prisma[`pipe_line${pipe_line_sn}`].findMany({ take: 10 });
        let latestVibration = null;
        let latestFlowrate = null;

        pipe_line_logs.forEach(log => {
            if (latestVibration === null || log.vibration > latestVibration) {
                latestVibration = log.vibration;
            }

            if (latestFlowrate === null || log.flowrate < latestFlowrate) {
                latestFlowrate = log.flowrate;
            }
        });

        if (latestVibration !== null || latestFlowrate !== null) {
            deduct_from_eth_account({ req, res, amount: 0.00000000001 })

            const msg = `Pipe_line-${pipe_line_sn} latest values - Vibration: ${latestVibration}, Flowrate: ${latestFlowrate}`;
            status_msg({ code: 200, msg, res, level: { vibration: latestVibration, flowrate: latestFlowrate } });
        } else {
            status_msg({ code: 400, msg: 'Error in getting pipe_line values! Check internet connection', res });
        }
    } catch (error) {
        server_err({ error, res });
    }
});


export { get_all_pipe_lines, get_pipe_line_logs, check_pipe_line_level }