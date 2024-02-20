import React from 'react'
import { useSelector } from 'react-redux'

export function tankers_selectors() {
    const { tankers, loading, total_tankers, current_tanker_logs, current_tanker_sn, notifications } = useSelector((state) => state.tankers);


    return { tankers, loading, total_tankers, current_tanker_logs, current_tanker_sn, notifications }
}