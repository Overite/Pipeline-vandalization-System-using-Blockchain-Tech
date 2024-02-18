import jwt from "jsonwebtoken";

const verify_token = (req, res, fnToRun) => {
    const token = req?.cookies?.token;

    console.log({ token })

    if (!token || token === '') {
        return res.status(401).json({ msg: 'Unauthorized. Signin required!', code: 401 });
    }

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) {
            res.status(500).json({ msg: 'Error in getting token!', code: 500 })
        } else {
            const user_id = decoded.userId;
            if (user_id) {
                fnToRun(user_id);
            }
            else res.status(401).json({ msg: 'Signin required!', code: 401 })
        }
    });
}

export { verify_token }