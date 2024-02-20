
const httpOnly = process.env.MODE == 'DEVELOPMENT' ? true : false;
const secure = process.env.MODE == 'DEVELOPMENT' ? true : false;
const sameSite = process.env.MODE == 'DEVELOPMENT' ? 'strict' : 'none';
const path = '/';

const deduct_from_eth_account = ({ req, res, amount }) => {
    const eth_account = req.cookies.eth_account;
    const balance = eval(eth_account - amount);
    console.log({ balance, eth_account })

    res.cookie("eth_account", balance, {
        httpOnly,
        maxAge: 30 * 24 * 60 * 60 * 1000,
        secure,
        sameSite,
        path
    });
}

const add_to_eth_account = ({ res }) => {
    const eth_account = 100;

    res.cookie("eth_account", Number(eth_account), {
        httpOnly,
        maxAge: 30 * 24 * 60 * 60 * 1000,
        secure,
        sameSite,
        path
    });
}

export { deduct_from_eth_account, add_to_eth_account }