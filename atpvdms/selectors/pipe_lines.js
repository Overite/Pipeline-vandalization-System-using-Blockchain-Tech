import React from 'react'
import { useSelector } from 'react-redux'

export function pipe_lines_selectors() {
    const { pipe_lines, loading, total_pipe_lines, current_pipe_line_logs, current_pipe_line_sn } = useSelector((state) => state.pipe_lines);


    return { pipe_lines, loading, total_pipe_lines, current_pipe_line_sn, current_pipe_line_logs }
}