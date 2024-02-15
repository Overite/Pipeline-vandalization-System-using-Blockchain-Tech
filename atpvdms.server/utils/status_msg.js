const status_msg = ({ code, res, msg, ...rest }) => {
    res.status(code).json({ msg, code, ...rest });
}

const server_err = ({ error, res }) => {
    res.status(500).json({ msg: 'Internal server error', code: 500, error })
}

export { server_err, status_msg }