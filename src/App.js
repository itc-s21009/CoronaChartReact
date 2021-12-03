import React, { useState, useEffect } from 'react'
import AreaSelectMenu, { getAreas } from './AreaSelectMenu'
import YearSelectMenu, { getYears } from './YearSelectMenu.jsx'
import MonthSelectMenu, { getMonths } from './MonthSelectMenu.jsx'
import GenerateChart from './GenerateChart'
import './App.css'

const RenderAreaSelect = ({ area, setArea }) =>
  <div class="select-content">
    <p>エリアを選択：<br /><span class="selected-value">{area}</span></p>
    <AreaSelectMenu selectedValue={area} onChange={e => setArea(e.target.value)} />
  </div>

const RenderYearSelect = ({ year, setYear }) =>
  <div class="select-content">
    <p>年を選択：<br /><span class="selected-value">{year}</span></p>
    <YearSelectMenu selectedValue={year} onChange={e => setYear(e.target.value)} />
  </div>

const RenderMonthSelect = ({ year, month, setMonth }) =>
  year !== getYears()[0] ?
    <div class="select-content">
      <p>月を選択：<br /><span class="selected-value">{month}</span></p>
      <MonthSelectMenu selectedValue={month} onChange={e => setMonth(e.target.value)} />
    </div> : <></>

function App() {
  const [area, setArea] = useState(getAreas()[0])
  const [year, setYear] = useState(getYears()[0])
  const [month, setMonth] = useState(getMonths()[0])
  const [data, setData] = useState([])
  const uri = "./data_all.json"
  // const uri = "https://opendata.corona.go.jp/api/Covid19JapanAll"
  const getData = () => {
    window.fetch(uri)
      .then(res => res.json())
      .then(json => setData(json.itemList.reverse()))
  }
  useEffect(getData, [])
  return (
    <>
      <GenerateChart data={data} year={year} month={month} area={area} />
      <div class="select">
        <RenderAreaSelect area={area} setArea={setArea} />
        <RenderYearSelect year={year} setYear={setYear} />
        <RenderMonthSelect year={year} month={month} setMonth={setMonth} />
      </div>
    </>
  )
}

export default App;
