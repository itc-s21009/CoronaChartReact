import React from 'react'

const Options = ({ values }) =>
    values.map(v =>
        <option value={v} key={v}>
            {v}
        </option>
    )

const SelectMenu = ({ selectedValue, values, onChange }) =>
    <select value={selectedValue === undefined ? values[0] : selectedValue} onChange={onChange}>
        <Options values={values} />
    </select >

export default SelectMenu