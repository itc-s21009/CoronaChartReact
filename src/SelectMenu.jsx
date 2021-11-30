import React from 'react'

const Options = ({ values }) =>
    values.map(v =>
        <option value={v} key={v}>
            {v}
        </option>
    )

const SelectMenu = ({ values, onChange }) =>
    <select onChange={onChange}>
        <Options values={values} />
    </select >

export default SelectMenu