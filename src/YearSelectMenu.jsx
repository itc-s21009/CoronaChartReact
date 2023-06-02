import React, {useEffect} from 'react'
import SelectMenu from './SelectMenu'

const years = [
    "全期間",
]

const YearSelectMenu = ({ selectedValue, onChange }) => {
    const prepareYearItems = () => {
        let start = 2020
        const y = new Date().getFullYear()
        while (start <= y) {
            years.push(`${start++}年`)
        }
    }
    useEffect(() => prepareYearItems(), [])
    return <SelectMenu selectedValue={selectedValue} values={years} onChange={onChange} />
}

export const getYears = () => years
export default YearSelectMenu