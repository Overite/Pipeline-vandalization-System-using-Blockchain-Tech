import { Router } from "express"
import { confirm_token, forgot_password, reset_password, signin, signout, signup } from "./auth.controller.js";

const auth_route = Router();

auth_route.post('/signup', signup);
auth_route.post('/signin', signin);
auth_route.post('/signout', signout);
auth_route.post('/forgot_password', forgot_password);
auth_route.post('/confirm_token', confirm_token)
auth_route.patch('/reset_password', reset_password);

export default auth_route;