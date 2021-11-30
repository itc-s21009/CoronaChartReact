import React from 'react'
import SelectMenu from './SelectMenu'

const years = [
    "2020",
    "2021"
]

const YearSelectMenu = ({ onChange }) => {
    return <SelectMenu values={years} onChange={onChange} />
}

export const getYears = () => years
export default YearSelectMenu