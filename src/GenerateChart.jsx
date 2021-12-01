import React from 'react'
import { getAreas } from './AreaSelectMenu'
import { getYears } from './YearSelectMenu.jsx'
import { getMonths } from './MonthSelectMenu.jsx'
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
    const yearOK = day => whole_period || parseInt(day.date.slice(0, 4)) === parseInt(year)
    const monthOK = day => whole_period || whole_year || parseInt(day.date.slice(5, 7)) === parseInt(month.slice(0, -1))
    const areaOK = day => whole_country || day.name_jp === area

    // 一旦、全期間の記録をまとめる
    const data_total = {}
    // 条件でフィルターして、データを入れる
    data.filter(day => yearOK(day) && monthOK(day) && areaOK(day))
        .forEach(day => {
            const patients_total = parseInt(day.npatients)
            const date = day.date
            data_total[date] = data_total[date] === undefined ?
                patients_total : data_total[date] + patients_total

        });
    // 日毎の感染者増加数をもとめる
    const data_new = []
    for (let keys = Object.keys(data_total), i = 1; i < keys.length; i++) {
        const day = data_total[keys[i]]
        const day_previous = data_total[keys[i - 1]]
        const patients = day - day_previous
        // 0以下になるデータがあった
        data_new.push({ "date": keys[i], "npatients": patients < 0 ? 0 : patients })
    }
    return data_new
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