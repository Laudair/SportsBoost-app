import React, { useState, useEffect, useContext } from 'react'
import style from './messages.module.css'
import app from '../../constants/ApiKeys'
import { HistoryContext } from '../../context/history-context'

import { useNavigate, Outlet } from 'react-router-dom'

function MessageData() {
  const [historySearch, setHistorySearch] = useContext(HistoryContext);
  const [messageData, setMessageData] = useState([])
  const [email, setEmail] = useState([])
  const [messageDelete, setMessageDelete] = useState()
  const [messageContent, setMessageContent] = useState()
  const [openDialog, setOpenDialog] = useState(false)
  const [viewGrant, setViewGrant] = useState(false)
  const navigate = useNavigate()

  const handleOnEdit = (selected) => {
   setViewGrant(true)
  }


  const handleOnDelete = () => {
    const db = app.firestore()
    db.collection('messages').doc(messageDelete).delete()
    setOpenDialog(!openDialog)
    setHistorySearch(!historySearch)
}

  console.log(email)
  useEffect(() => {
    const db = app.firestore()
      const fetchData = async () => {
        const data = await db.collection('messages').get()
        setMessageData(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      }
      fetchData()
  }, [historySearch, openDialog])

  if(openDialog){
    return(
      <div className={style.dialog}>
      <p className={style.dialogText}>Do you want to delete this message?</p>
    <button
      className={style.buttonCancel}
      onClick={() => navigate('/panel/messages-box') & setOpenDialog(false)}
    >
     Cancel
    </button>
    <button
      className={style.buttonConfirm}
      onClick={() => handleOnDelete()}      
    >
     Confirm
    </button>
    <Outlet />
    </div>
    )
  }

  if(viewGrant){
    return(
      <div className={style.dialog2}>
            <p className={style.dialogText2}>{messageContent.substring(0, 300)}</p>
    <button
      className={style.buttonDone}
      onClick={() => navigate('/panel/messages-box') & setViewGrant(false)}
    >
     Done
    </button>
    <Outlet />
    </div>
    )
  }

  return (
    <div className={style.header}>
      <div className={style.userDisplay}>
        <div className={style.dataDisplay}>
          {messageData.map((message) => (
            <li className={style.userData}>{message.emailUser}</li>
          ))}
        </div>
        <div className={style.dataDisplay}>
          {messageData.map((message) => (
            <li className={style.userData}>{message.message.length > 30 ? `${message.message.substring(0, 30)} ...` : message.message}</li>
          ))}
        </div>
        <div className={style.dataDisplay}>
          {messageData.map((message) => (
            <li className={style.listButton}>
               <button
                 className={style.buttonUpdate}
                  onClick={() => handleOnEdit()  & setMessageContent(message.message)}
                  >
                   Open
               </button>
            </li>
          ))}
        </div>
        <div className={style.dataDisplay}>
          {messageData.map((message) => (
            <li className={style.listButton}>
              <button
                className={style.buttonDelete}
                onClick={() => setMessageDelete(message.id) &  setOpenDialog(true)}
              />
            </li>
          ))}
        </div>
      </div>
    </div>
  )
}

export default MessageData
