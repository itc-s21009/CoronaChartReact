import React, { useState, useEffect } from 'react'
import AreaSelectMenu, { getAreas } from './AreaSelectMenu'
import YearSelectMenu, { getYears } from './YearSelectMenu.jsx'

function App() {
  const uri = "http://localhost:3000/data.json"
  const [area, setArea] = useState(getAreas()[0])
  const [year, setYear] = useState(getYears()[0])
  const [data, setData] = useState([])
  useEffect(() =>
    window.fetch(uri)
      .then(res => res.json())
      .then(json => setData(json.itemList))
    , []
  )
  const handleAreaChange = e => setArea(e.target.value)
  const handleYearChange = e => setYear(e.target.value)
  return (
    <>
      <p>{area}</p>
      <AreaSelectMenu onChange={handleAreaChange} />
      <p>{year}</p>
      <YearSelectMenu onChange={handleYearChange} />
    </>
  )
}

export default App;
