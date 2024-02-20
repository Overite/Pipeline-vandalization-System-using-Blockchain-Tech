"use client"

import Chevron_Down from "@/components/icons/chevron_down"
import Dot from "@/components/icons/dot"
import Container from "@/components/layout/container"
import { notify_link } from "@/constants/links"
import { devices } from "@/constants/dashboard"
import Link from "next/link"
import { tankers_selectors } from "@/selectors/tankers"
import { pipe_lines_selectors } from "@/selectors/pipe_lines"
import { useDispatch } from "react-redux"
import { set_current_tanker_sn } from "@/state/slices/tankers"
import { useEffect, useState } from "react"
import React from "react"
import Bus from "@/components/icons/bus"
import Spinner from "@/components/icons/spinner"
import Pipe from "@/components/icons/pipe"



const main_bustsops_ilorin_mina = {
    mina_niger_state: {
        name: 'mina niger state',
        // latitude: 9.6152,
        latitude: 9.6286,
        // longitude: 6.5569,
        longitude: 6.52231,
    },
    mida_niger_state: {
        name: 'mida niger state',
        latitude: 9.0800,
        longitude: 6.0094,
    },
    mapai_niger_state: {
        name: 'mapai niger state',
        latitude: 9.0401,
        longitude: 6.2775,
    },
    jebba_kwara_state: {
        name: 'jebba kwara state',
        latitude: 9.6152,
        longitude: 6.5569,
    },
}

function findMatchingCoordinate(latitude, longitude) {
    for (let bus_stop of Object.values(main_bustsops_ilorin_mina)) {
        let lat_match, lng_match, bus_stop_interval = 0.01;
        if (latitude == bus_stop.latitude || latitude - bus_stop <= bus_stop_interval) {
            lat_match = true;
        }
        if (longitude == bus_stop.longitude || longitude - bus_stop <= bus_stop_interval) {
            lng_match = true;
        }

        if (lat_match && lng_match) {
            return bus_stop.name;
        }
        else {
            return 'searching...';
        }
    }
}

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

// Jebba, Kwara State:
//         Latitude: '8.9333',
// Longitude: '5.4167',
// Moro, Kwara State:
//         Latitude: '8.5254',
// Longitude: '5.1096',
// Omu- Aran, Kwara State:
//         Latitude: '8.1500',
// Longitude: '5.1000',
// Ilorin, Kwara State:
// Latitude: '8.4855',
// Longitude: '4.6710',
// }

export default function Dashboard() {
    const dispatch = useDispatch();
    const { loading, tankers, total_tankers, current_tanker_logs, current_tanker_sn, notifications } = tankers_selectors();
    const { loading: p_loading, total_pipe_lines } = pipe_lines_selectors();

    return (
        <div className="w-full h-full bg-white overflow-y-scroll visible_thumb_bar">
            <Container className='grid grid-rows-[200px_380px_390px] grid-cols-[1fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr] gap-[16px] pt-[24px] pb-16'>
                <div className="col-start-[1] col-end-[7] row-start-[1] row-end-[2] bg-[#800E80] text-white px-[20px] flex items-center justify-between">
                    <div className="flex flex-col">
                        <h2 className="text-[32px] font-[700]">Active Trackers</h2>
                        <p className="text-[16px] font-[700]">Total number of trackers</p>
                    </div>

                    {!loading ?
                        (<span className="text-[32px] font-[700]">{total_tankers}</span>)
                        :
                        (
                            <span className="text-[32px] font-[700]"><Spinner w={25} h={25} /></span>
                        )
                    }

                </div>

                <div className="col-start-[7] col-end-[13] row-start-[1] row-end-[2] bg-[#800E80] text-white px-[20px] flex items-center justify-between">
                    <div className="flex flex-col">
                        <h2 className="text-[32px] font-[700]">Active Pipelines</h2>
                        <p className="text-[16px] font-[700]">Total number of pipelines</p>
                    </div>

                    {!p_loading ?
                        (<span className="text-[32px] font-[700]">{total_pipe_lines}</span>)
                        :
                        (
                            <span className="text-[32px] font-[700]"><Spinner w={25} h={25} /></span>
                        )
                    }

                </div>

                <div className="col-start-[1] col-end-[9] row-start-[2] row-end-[3] bg-[#800E80] flex flex-col gap-[16px] items-center pt-3">
                    <h2 className="w-[90%] flex gap-2 items-center text-white text-[16px] font-[400]">Log - Tanker - {current_tanker_sn}
                        <span className="w-[20px] h-[20px]">
                            <Chevron_Down />
                        </span>
                    </h2>

                    <div className="w-[90%] h-[85%] overflow-y-scroll visible_thumb_bar">
                        {!loading ?
                            (<table className={`w-full h-[${10 * current_tanker_logs?.length}em]`}>
                                <thead className="bg-white">
                                    <tr className="text-[16px]">
                                        <th>Tank level(M3)</th>
                                        <th>Gps-coordinate</th>
                                        <th>Location Name</th>
                                        <th>Date</th>
                                        <th>Time</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {current_tanker_logs?.map((log, index) => (
                                        <tr className="text-white text-[14px] text-center font[400]" key={index}>
                                            <td>{log?.pms_level}</td>
                                            <td>{`${log?.lat} - ${log?.lng}`}</td>
                                            <td>{findMatchingCoordinate(Number(log.lat), Number(log.lng))}</td>
                                            <td>{`${(new Date(log?.Timestamp)).toDateString()}`}</td>
                                            <td>{`${formatAMPM((new Date(log?.Timestamp)))}`}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>)
                            :
                            (
                                <div className="w-full h-full pt-10 flex items-start justify-center text-white">
                                    <Spinner w={50} h={50} />
                                </div>
                            )
                        }
                    </div>
                </div>

                <div className="col-start-[9] col-end-[13] row-start-[2] row-end-[3] bg-[#800E80] flex flex-col gap-[16px]">
                    <h2 className="w-[80%] ml-auto text-white text-[16px] font-[700] pt-3">Devices</h2>

                    <div className="w-[80%] h-[85%] ml-auto pr-2 overflow-y-scroll visible_thumb_bar">
                        {!loading ? (<ul className="flex flex-col gap-[16px] h-[fit-content]">
                            {tankers?.map((tanker, index) => (
                                <div onClick={() => dispatch(set_current_tanker_sn(tanker.sn))} className={`flex items-center justify-between rounded-md py-2 px-1 ${current_tanker_sn == tanker?.sn ? 'text-black bg-white' : 'text-white bg-transparent'} hover:text-black hover:bg-white cursor-pointer`} key={index}>
                                    <span className="text-[16px] font-[400]"> {`Tanker - ${tanker.sn}`}</span>
                                    <span className="text-[10px] font-[700]">tanker</span>
                                </div>
                            ))}
                        </ul>)
                            :
                            (
                                <div className="w-full h-full pt-10 flex items-start justify-center text-white">
                                    <Spinner w={50} h={50} />
                                </div>
                            )}
                    </div>
                </div>

                <div className="col-start-[1] col-end-[5] row-start-[3] row-end-[4] bg-[#800E80] flex flex-col gap-[16px]">
                    <Link href={'/admin/dashboard/notification'}>
                        <h2 className="w-[80%] ml-auto text-white text-[16px] font-[700] pt-3">Notifications</h2>
                    </Link>

                    <div className="w-[95%] h-[85%] mx-auto overflow-y-scroll visible_thumb_bar">
                        <ul className="w-full flex flex-col gap-[16px] h-[fit-content]">
                            {notifications.map((notification, index) => (
                                <div className="w-full flex items-center justify-between text-white" key={index}>
                                    <div className="flex items-center gap-2 w-full">
                                        <span className="w-[20px] h-[20px]">
                                            {
                                                !notification?.toString()?.includes('Pipe_line') ?
                                                    (<Bus />)
                                                    :
                                                    (<Pipe />)
                                            }
                                        </span>
                                        <span className="text-[14px] font-[400] block w-full pl-1"> {notification}</span>
                                    </div>

                                    {/* <span className="w-[12px] h-[12px]">
                                        <Dot />
                                    </span> */}
                                </div>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="col-start-[5] col-end-[9] row-start-[3] row-end-[4] relative">
                    <iframe className="w-full h-full" src='https://191.dinamix.tech/map/pipe_line/index.php'></iframe>

                    <div className="absolute bottom-[16px] left-[16px] z-[2] bg-[#800E80] grid grid-cols-[15px_auto] grid-rows-[15px_auto] gap-[1px]">
                        <span className="bg-white w-full h-full flex items-center justify-center">
                            <span className="bg-[#03A9F5] w-[12px] h-[12px]"></span>
                        </span>
                        <span className="bg-white w-full h-full flex items-center justify-center">Flow Rate</span>
                        <span className="bg-white w-full h-full flex items-center justify-center">
                            <span className="bg-[#000] w-[12px] h-[12px]"></span>
                        </span>
                        <span className="bg-white w-full h-full flex items-center justify-center">Vibration</span>
                    </div>
                </div>

                <div className="col-start-[9] col-end-[13] row-start-[3] row-end-[4] relative">

                    <iframe className="w-full h-full" src="https://191.dinamix.tech/map/tanker/index.php"></iframe>

                </div>

            </Container>
        </div>
    )
}