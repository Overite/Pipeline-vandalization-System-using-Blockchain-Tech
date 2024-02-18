import { Router } from 'express';
import { get_admin_profile, edit_admin_profile } from './admin.controller.js';

const admin_route = Router();

admin_route.get('/account', get_admin_profile)
admin_route.patch('/account/update', edit_admin_profile)

export { admin_route }