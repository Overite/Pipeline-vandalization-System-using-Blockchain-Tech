"use client"
import Container from "@/components/layout/container"
import { logs } from "@/constants/dashboard"
import { pipe_lines_selectors } from "@/selectors/pipe_lines"
import { tankers_selectors } from "@/selectors/tankers"

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

export default function Log_pipeline() {

    const { current_pipe_line_logs, current_pipe_line_sn } = pipe_lines_selectors();

    return (
        <div className="w-full-h-full overflow-y-scroll visible_thumb_bar">
            <Container>
                <h2 className="text-[#800E80] text-[16px] font-[400] py-5">
                    {`Log-Pipeline -${current_pipe_line_sn || '...'}`}
                </h2>

                <div className="w-full h-[90vh] overflow-y-scroll visible_thumb_bar">
                    <table className={`w-full h-[${10 * logs.length}]`}>
                        <thead>
                            <tr>
                                <th>Conveyance id</th>
                                <th>Velocity</th>
                                <th>Vibration</th>
                                <th>Flowrate (M3)</th>
                                <th>Gps-Coordinates</th>
                                <th>Time</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {current_pipe_line_logs?.map((log, index) => (<tr className="text-[#800E80] text-[14px] text-center font[400]" key={index}>
                                <td>{index}</td>
                                <td>{log?.velocity}</td>
                                <td>{log?.vibration}</td>
                                <td>{log?.flowrate}</td>
                                <td>{`${log.latitude} - ${log.longitude}`}</td>
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