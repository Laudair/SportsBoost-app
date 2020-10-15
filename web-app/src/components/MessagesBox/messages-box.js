import React, {useState, useContext} from 'react'
import style from './messages.module.css'


import MessageData from './messages'
import { useNavigate, Outlet } from 'react-router-dom'

function Messages() {


  const navigate = useNavigate()

  return (
    <div className={style.container}>
      <h1 className={style.text}>MESSAGES</h1>
      <div className={style.box}>
        <div className={style.header}>
          <div className={style.headingBig}>User</div>
          <div className={style.headingBig}>Message</div>
        </div>
        <MessageData/>
      </div>
      <Outlet />
    </div>
  )
}

export default Messages
