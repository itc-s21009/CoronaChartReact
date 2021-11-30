import React, { useState, useEffect } from 'react'
import AreaSelectMenu, { getAreas } from './AreaSelectMenu'

function App() {
  const uri = "http://localhost:3000/data.json"
  const [area, setArea] = useState(getAreas()[0])
  const [year, setYear] = useState('')
  const [data, setData] = useState([])
  useEffect(() =>
    window.fetch(uri)
      .then(res => res.json())
      .then(json => setData(json.itemList))
    , []
  )
  const handleAreaChange = e => {
    setArea(e.target.value)
  }
  return (
    <>
      <p>{area}</p>
      <AreaSelectMenu onChange={handleAreaChange} />
    </>
  )
}

export default App;
