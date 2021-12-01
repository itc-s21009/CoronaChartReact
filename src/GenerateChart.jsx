import React from 'react'
import { AreaChart, CartesianGrid, XAxis, YAxis, Tooltip, Area } from 'recharts'

// 日ごとの感染者増加数をまとめる
const createData = (data) => {
    const data_new = []
    for (let i = 1; i < data.length; i++) {
        const day = data[i]
        const day_previous = data[i - 1]
        const patients = day.npatients - day_previous.npatients
        data_new.push({ "date": day.date, "npatients": patients })
    }
    return data_new
}

const GenerateChart = ({ width, height, data }) => {
    return (
        <AreaChart width={width} height={height} data={createData(data)}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                </linearGradient>
            </defs>
            <XAxis dataKey="date" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Area type="monotone" dataKey="npatients" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
        </AreaChart>
    );
}
export default GenerateChart