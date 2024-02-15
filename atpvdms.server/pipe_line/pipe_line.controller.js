import esh from 'express-async-handler';
import { server_err, status_msg } from '../utils/status_msg.js';
import { prisma } from '../prisma_client.config.js';


const get_all_pipe_lines = esh(async (req, res) => {
    try {
        let all_pipe_line = await prisma.pipe_lines.findMany({});

        if (all_pipe_line) status_msg({ code: 200, msg: 'Got all pipe line!', res, all_pipe_line, amount: all_pipe_line.length })
        else status_msg({ code: 400, msg: 'Error in getting all pipe line. Check internet connection.', res })
    } catch (error) {
        server_err({ error, res })
    }
})

const get_pipe_line_logs = esh(async (req, res) => {
    const { pipe_line_sn } = req.params;

    try {
        const pipe_line = await prisma[`pipe_line${pipe_line_sn}`].findMany({});

        if (pipe_line) status_msg({ code: 200, msg: `Got pipe_line: ${pipe_line_sn}`, res, pipe_line });
        else status_msg({ code: 400, msg: `Error in getting pipe_line: ${pipe_line_sn} logs. Check internet connection.`, res })
    } catch (error) {
        server_err({ error, res })
    }
})

export { get_all_pipe_lines, get_pipe_line_logs }