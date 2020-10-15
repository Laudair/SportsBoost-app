import React, {useContext } from 'react'
import { useNavigate, Outlet } from 'react-router-dom'
import {UserSearch} from '../../context/user-context'
import {GrantSearch} from '../../context/grant-context'
import {HistoryContext} from '../../context/history-context'
import style from './sidebar.module.css'

function Panel() {
  const [grantSearch, setGrantSearch] = useContext(GrantSearch);
  const [userSearch, setUserSearch] = useContext(UserSearch);
  const [historySearch, setHistorySearch] = useContext(HistoryContext);

  const navigate = useNavigate()
  return (
    <>
      <div className={style.container}>
        <div className={style.sidebar}>
          <h1 className={style.text}>SportsBoost Admin</h1>
          <div className={style.separator}></div>
          <button
            className={style.button}
            onClick={() => navigate('/panel/admin-box')}
          >
            Admins
          </button>
          <button
            className={style.button}
            onClick={() => navigate('/panel/user-box') & setUserSearch('')}
          >
            Users
          </button>
          <button
            className={style.button}
            onClick={() => navigate('/panel/grants-box') & setGrantSearch('')}
          >
            Grants
          </button>
          <button
            className={style.button}
            onClick={() => navigate('/panel/history-box') & setHistorySearch('')}
          >
           Payment 
          </button>
          <button
            className={style.button}
            onClick={() => navigate('messages-box') & setHistorySearch('')}
          >
           Messages
          </button>
        </div>
        <Outlet />
        <button className={style.buttonOut} onClick={() => navigate('/')}>
          Log out
        </button>
      </div>
    </>
  )
}

export default Panel
