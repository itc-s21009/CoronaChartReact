import React from 'react'
import AreaSelectMenu, { getAreas } from './AreaSelectMenu'
import YearSelectMenu, { getYears } from './YearSelectMenu.jsx'
import MonthSelectMenu, { getMonths } from './MonthSelectMenu.jsx'
import { AreaChart, CartesianGrid, XAxis, YAxis, Tooltip, Area } from 'recharts'

// 日ごとの感染者増加数をまとめる
const createData = (data, year, month, area) => {
    // 全期間
    const whole_period = year === getYears()[0]
    // １年間
    const whole_year = month === getMonths()[0]
    // 全国
    const whole_country = area === getAreas()[0]

    // 条件チェック関数
    const yearOK = s => whole_period || s.slice(0, 4) === year
    const monthOK = s => whole_year || parseInt(s.slice(5, 7)) === parseInt(month.slice(0, -1))
    const areaOK = s => whole_country || s === area

    // 一旦、全期間の記録をまとめる
    const data_total = {}
    data.forEach(day => {
        // 県が条件にあっているか
        if (areaOK(day.name_jp)) {
            const patients_total = parseInt(day.npatients)
            const date = day.date
            data_total[date] = data_total[date] === undefined ?
                patients_total : data_total[date] + patients_total
        }
    });
    // 連想配列にする
    const data_new = Object.keys(data_total).map(d => ({ [d]: data_total[d] }))
    console.log(data_new)
    // data_new.filter(d => )
    // for (let i = 1; i < data.length; i++) {
    //     const day = data[i]
    //     const day_previous = data[i - 1]
    //     const patients = day.npatients - day_previous.npatients
    //     data_new.push({ "date": day.date, "npatients": patients })
    // }
    return data_total
}

const GenerateChart = ({ data, year, month, area }) => {
    return (
        <AreaChart width={800} height={400} data={createData(data, year, month, area)}
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