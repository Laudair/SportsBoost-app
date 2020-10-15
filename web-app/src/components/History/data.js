import React, { useState, useEffect, useContext } from 'react'
import style from './history.module.css'
import app from '../../constants/ApiKeys'
import { HistoryContext } from '../../context/history-context'

function HistoryData() {
  const [historySearch, setHistorySearch] = useContext(HistoryContext);
  const [historyData, setHistoryData] = useState([])
  useEffect(() => {
    const db = app.firestore()
      const fetchData = async () => {
        const data = await db.collection('payment').get()
        setHistoryData(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      }
      fetchData()
  }, [historySearch])

  return (
    <div className={style.header}>
      <div className={style.userDisplay}>
        <div className={style.dataDisplay}>
          {historyData.map((history) => (
            <li className={style.userData}>{history.selectedGrant.substring(0, 30)}</li>
          ))}
        </div>
        <div className={style.dataDisplay}>
          {historyData.map((history) => (
            <li className={style.userData}>{history.emailUser}</li>
          ))}
        </div>
      </div>
    </div>
  )
}

export default HistoryData
