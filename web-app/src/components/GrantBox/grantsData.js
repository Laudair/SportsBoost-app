import React, { useState, useEffect, useContext } from 'react'
import style from './grants.module.css'
import app from '../../constants/ApiKeys'

import { GrantSearch } from '../../context/grant-context'
import { useNavigate, Outlet } from 'react-router-dom'

import {EditGrant} from '../../context/edit-grant-context'


function GrantsData({ searchInput }) {
  const [grantsData, setGrantsData] = useState([])
  const [openDialog, setOpenDialog] = useState(false)
  const [grantSearch, setGrantSearch] = useContext(GrantSearch)
  const [editGrant, setEditGrant] = useContext(EditGrant);
  const [grantDelete, setGrantDelete] = useState()
  const navigate = useNavigate()

  const handleOnEdit = (selected) => {
    setEditGrant(selected)
   navigate('/panel/grant-edit' )
  }

  const handleOnDelete = () => {
    const db = app.firestore()
    db.collection('grants').doc(grantDelete).delete()
    setOpenDialog(false)
}

  useEffect(() => {
    const db = app.firestore()
    const fetchData = async () => {
      if (grantSearch === undefined || grantSearch === '' || grantSearch === '  ' || grantSearch === ' ') {
        const data = await db.collection('grants').get()
        setGrantsData(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      } else {
        const data = await db
          .collection('grants')
          .where('grantName', '==', grantSearch)
          .get()
        setGrantsData(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      }
    }
    fetchData()
  }, [grantSearch, openDialog])




  if(openDialog){
    return(
      <div className={style.dialog}>
      <p className={style.dialogText}>Do you want to delete this grant?</p>
    <button
      className={style.buttonCancel}
      onClick={() => navigate('/panel/grants-box') & setOpenDialog(false)}
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
  return (
     <div className={style.header}>
      <div className={style.userDisplay}>
        <div className={style.dataDisplay}>
          {grantsData.map((grants) => (
            <li className={style.userData}>{grants.grantName.substring(0, 20)}</li>
          ))}
        </div>
        <div className={style.dataDisplay}>
          {grantsData.map((grants) => (
            <li className={style.userDataMedium}>{grants.closeDate}</li>
          ))}
        </div>
        <div className={style.dataDisplay}>
          {grantsData.map((grants) => (
            <li className={style.userDataSmall}>{grants.amount}</li>
          ))}
        </div>
        <div className={style.dataDisplay}>
          {grantsData.map((grants) => (
            <li className={style.userDataBig}>
              {/* prettier-ignore */}
              {grants.target[0]} {grants.target[1]} {grants.target[2]}{' '}
              {grants.target[3]} {grants.target[4]} {grants.target[5]}
            </li>
          ))}
        </div>
        <div className={style.dataDisplay}>
          {grantsData.map((grants) => (
            <li className={style.userDataSmall}>{grants.state}</li>
          ))}
        </div>
        <div className={style.dataDisplay}>
          {grantsData.map((grants) => (
            <li className={style.listButton}>
               <button
                 className={style.buttonUpdate}
                  onClick={() => handleOnEdit(grants.id)}
                  >
                   Edit
               </button>
            </li>
          ))}
        </div>
        <div className={style.dataDisplay}>
          {grantsData.map((grants) => (
            <li className={style.listButton}>
              <button
                className={style.buttonDelete}
                onClick={() => setGrantDelete(grants.id) &  setOpenDialog(true)}
              />
            </li>
          ))}
        </div>
        <Outlet  />
      </div>
    </div>
    
  )
}

export default GrantsData
