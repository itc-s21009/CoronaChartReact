import React, { useState, useEffect } from 'react'
import AreaSelectMenu, { getAreas } from './AreaSelectMenu'
import YearSelectMenu, { getYears } from './YearSelectMenu.jsx'
import MonthSelectMenu, { getMonths } from './MonthSelectMenu.jsx'
import GenerateChart from './GenerateChart'

const RenderAreaSelect = ({ area, setArea }) =>
  <>
    <p>エリアを選択：{area}</p>
    <AreaSelectMenu selectedValue={area} onChange={e => setArea(e.target.value)} />
  </>

const RenderYearSelect = ({ year, setYear }) =>
  <>
    <p>年を選択：{year}</p>
    <YearSelectMenu selectedValue={year} onChange={e => setYear(e.target.value)} />
  </>

const RenderMonthSelect = ({ year, month, setMonth }) =>
  year !== getYears()[0] ?
    <>
      <p>月を選択：{month}</p>
      <MonthSelectMenu selectedValue={month} onChange={e => setMonth(e.target.value)} />
    </> : <></>

function App() {
  const [area, setArea] = useState(getAreas()[0])
  const [year, setYear] = useState(getYears()[0])
  const [month, setMonth] = useState(getMonths()[0])
  const [data, setData] = useState([])
  const uri = "http://localhost:3000/data.json"
  useEffect(() =>
    window.fetch(uri)
      .then(res => res.json())
      .then(json => setData(json.itemList.reverse()))
    , []
  )
  return (
    <>
      <RenderAreaSelect area={area} setArea={setArea} />
      <RenderYearSelect year={year} setYear={setYear} />
      <RenderMonthSelect year={year} month={month} setMonth={setMonth} />
      <p>
        <button>
          グラフを生成する
        </button>
      </p>
      <GenerateChart width={800} height={400} data={data} />
    </>
  )
}

export default App;
