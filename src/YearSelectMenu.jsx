import React from 'react'
import SelectMenu from './SelectMenu'

const years = [
    "全期間",
    "2020年",
    "2021年"
]

const YearSelectMenu = ({ selectedValue, onChange }) => {
    return <SelectMenu selectedValue={selectedValue} values={years} onChange={onChange} />
}

export const getYears = () => years
export default YearSelectMenu