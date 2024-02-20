"use client"
import Container from "@/components/layout/container"
import { logs } from "@/constants/dashboard"
import { blockchain_selectors } from "@/selectors/blockchain"
import { pipe_lines_selectors } from "@/selectors/pipe_lines"
import { useGet_all_transactionsQuery } from "@/state/slices/blockchain"

function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
}

export default function page() {
    const { loading, transactions } = blockchain_selectors();
    console.log({ transactions })

    return (
        <div className="w-full-h-[80%] overflow-y-scroll visible_thumb_bar">
            <Container>
                <h2 className="text-[#800E80] text-[16px] font-[400] py-5">
                    Transactions
                </h2>

                <div className="w-full h-[90vh] overflow-scroll visible_thumb_bar">
                    <table className={`w-[112vw] min-w-[90vw] h-[${10 * logs.length}]`}>
                        <thead className="border-[1px] border-[#800E80]">
                            <tr>
                                <th>Transaction id</th>
                                <th>Log</th>
                                <th>Transaction fee</th>
                                <th>Gas fee</th>
                                <th>block</th>
                                <th>Time</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions?.map((log, index) =>
                            (<tr className="text-[#800E80] text-[14px] text-center font[400]" key={index}>
                                <td>{index}</td>
                                <td className="text-left">{log?.log}</td>
                                <td>{log?.transaction_fee}</td>
                                <td>{log?.gas_fee}</td>
                                <td>{log?.block}</td>
                                <td>{`${(new Date(log?.timestamp)).toDateString()}`}</td>
                                <td>{`${formatAMPM((new Date(log?.timestamp)))}`}</td>
                            </tr>))}
                        </tbody>
                    </table>
                </div>
            </Container>
        </div>
    )
}