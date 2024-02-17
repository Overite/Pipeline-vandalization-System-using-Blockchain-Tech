import esh from 'express-async-handler';
import { verify_token } from '../utils/verify_token.js'
import { server_err, status_msg } from '../utils/status_msg.js';
import { prisma } from '../prisma_client.config.js';

const get_admin_profile = esh(async (req, res) => {
    try {
        verify_token(req, res, async admin_id => {
            const admin = await prisma.admin.findUnique({ where: { id: Number(admin_id) } })

            if (admin) status_msg({ code: 200, msg: 'Got admin details', res, admin })
            else status_msg({ code: 200, msg: 'Error in getting admin details! Check internet connection.', res })
        })
    } catch (error) {
        server_err({ error, res })
    }
})

export { get_admin_profile }