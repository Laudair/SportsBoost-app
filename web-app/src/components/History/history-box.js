import React, {useState, useContext} from 'react'
import style from './history.module.css'


import HistoryData from './data'
import { useNavigate, Outlet } from 'react-router-dom'

function HistoryBox() {


  const navigate = useNavigate()

  return (
    <div className={style.container}>
      <h1 className={style.text}>PAYMENT HISTORY</h1>
      <div className={style.box}>

        <div className={style.header}>
          <div className={style.headingBig}>Grant Name</div>
          <div className={style.headingBig}>Email</div>
        </div>
        <HistoryData/>
      </div>
      <Outlet />
    </div>
  )
}

export default HistoryBox
