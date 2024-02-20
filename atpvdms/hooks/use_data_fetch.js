"use client";
import { auth_selectors } from "@/selectors/auth";
import { pipe_lines_selectors } from "@/selectors/pipe_lines";
import { tankers_selectors } from "@/selectors/tankers";
import { useGet_admin_profileQuery, set_loading as set_admin_loading, set_admin } from "@/state/slices/admin";
import { useGet_all_transactionsQuery, set_loading as blockchain_set_loading, set_transactions, useGet_eth_accountQuery, set_eth_number } from "@/state/slices/blockchain";
import { set_pipe_lines, set_total_pipe_lines, useGet_all_pipe_linesQuery, useGet_pipe_lineQuery, set_loading as set_p_loading, set_current_pipe_line_logs, set_current_pipe_line_sn, useCheck_pipe_line_levelQuery } from "@/state/slices/pipe_line";
import { set_current_tanker_logs, set_current_tanker_sn, set_loading, set_notifications, set_tankers, set_total_tankers, useCheck_tanker_pms_levelQuery, useGet_all_tankersQuery, useGet_tankerQuery } from "@/state/slices/tankers";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

function UseDataFetch({ children }) {
    const { tankers, current_tanker_sn, notifications } = tankers_selectors()
    const { current_pipe_line_sn, pipe_lines } = pipe_lines_selectors()
    const { token } = auth_selectors()
    const dispatch = useDispatch();
    const router = useRouter();

    // Api fetchs
    const { isLoading: getting_profile, data: profile_data, error: profile_error } = useGet_admin_profileQuery({});
    const { isLoading: t_loading, error: t_error, data: t_data } = useGet_all_tankersQuery({});
    const { isLoading: p_loading, error: p_error, data: p_data } = useGet_all_pipe_linesQuery({});
    const { isLoading: loading_blockchain, data: b_data, error: b_error } = useGet_all_transactionsQuery({});
    const { isLoading: eth_loading, data: eth_data, error: eth_error } = useGet_eth_accountQuery({})

    // Api fetchs

    // Get Admin Profile
    useEffect(() => {
        set_admin_loading(getting_profile);

        const admin = profile_data?.admin || profile_error?.data?.admin;

        const code = profile_data?.code || profile_error?.data?.code;

        if (code == 401 || code == '401') router.replace('/login');

        if (admin) dispatch(set_admin(admin))
    }, [getting_profile, profile_data, profile_error, token])
    // Get Admin Profile

    // Tankers and pipelines
    useEffect(() => {
        dispatch(set_loading(t_loading))
        dispatch(set_loading(p_loading))

        const tankers = t_data?.all_tankers || t_error?.data?.all_tankers;
        const t_amount = t_data?.amount || t_error?.data?.amount;

        const pipe_lines = p_data?.all_pipe_lines || p_error?.data?.all_pipe_lines;
        const p_amount = p_data?.amount || p_error?.data?.amount;

        dispatch(set_tankers(tankers));
        dispatch(set_total_tankers(t_amount));
        dispatch(set_current_tanker_sn(tankers?.[0]?.sn))


        dispatch(set_pipe_lines(pipe_lines))
        dispatch(set_total_pipe_lines(p_amount))
        dispatch(set_current_pipe_line_sn(pipe_lines?.[0]?.sn));

        const current_tanker_logs = p_data?.tanker || p_error?.data?.tanker;

    }, [t_loading, t_error, t_data, p_data, p_error, p_loading])

    const { data: ct_data, error: ct_error, isLoading: ct_loading } = useGet_tankerQuery(current_tanker_sn)
    const { data: cp_data, error: cp_error, isLoading: cp_loading } = useGet_pipe_lineQuery(current_pipe_line_sn)

    // current Tanker logs
    useEffect(() => {
        dispatch(set_loading(ct_loading))
        const current_tanker_logs = ct_data?.tanker || ct_error?.data?.tanker;

        dispatch(set_current_tanker_logs(current_tanker_logs))

    }, [tankers, ct_error, ct_data, ct_loading, current_tanker_sn])
    // current Tanker logs

    // current pipeline logs
    useEffect(() => {
        dispatch(set_p_loading(cp_loading))
        const current_pipe_line_logs = cp_data?.pipe_line || cp_error?.data?.pipe_line;

        dispatch(set_current_pipe_line_logs(current_pipe_line_logs))

    }, [pipe_lines, cp_error, cp_data, cp_loading, current_pipe_line_sn])
    // current pipeline logs

    const { isLoading: pms_loading, error: pms_error, data: pms_data } = useCheck_tanker_pms_levelQuery(current_tanker_sn)
    // pipe_level -> pl
    const { isLoading: pl_loading, error: pl_error, data: pl_data } = useCheck_pipe_line_levelQuery(current_pipe_line_sn);

    // pms level and pipe_level notifications
    useEffect(() => {
        const current_tanker_notifications = pms_data?.msg || pms_error?.data?.msg;
        const code = pms_data?.code || pms_error?.data?.code;

        if (code == 200) {
            dispatch(set_notifications([...notifications, current_tanker_notifications]));
        }

        const current_pipe_notifications = pl_data?.msg || pl_error?.data?.msg;
        const pl_code = pl_data?.code || pl_error?.data?.code;

        if (pl_code == 200) {
            dispatch(set_notifications([...notifications, current_pipe_notifications]));
        }
    }, [pms_loading, pms_data, pms_error, pl_loading, pl_data, pl_error])
    // pms level and pipe_level notifications

    // Tankers and pipelines

    // Blockchain
    // Transactions
    useEffect(() => {
        blockchain_set_loading(loading_blockchain)

        if (b_data) {
            const transactions = b_data?.all_transactions;
            dispatch(set_transactions(transactions));
        }

    }, [loading_blockchain, b_data, b_error])
    // Transactions

    // Eth Account
    useEffect(() => {
        blockchain_set_loading(eth_loading);

        const eth_account_number = eth_data?.eth_account;
        const code = eth_data?.code;

        if (code == 200) dispatch(set_eth_number(eth_account_number))
    }, [eth_loading, eth_data, eth_error])
    // Eth Account
    // Blockchain

    return <div>
        {children}
    </div>
}

export default UseDataFetch;