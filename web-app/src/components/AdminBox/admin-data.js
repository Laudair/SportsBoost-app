import React, { useState, useEffect, useContext } from 'react'
import style from './admin.module.css'
import app from '../../constants/ApiKeys'
import { AdminContext } from '../../context/admin-context'

function AdminData() {
  const [userData, setUserData] = useState([])
  const [adminSearch, setAdminSearch] = useContext(AdminContext)
  const [userIdBlock, setUserIdBlock] = useState(true)

  const [userSort, setUserSort] = useState([])

  const onBlock = (selected) => {
    setUserIdBlock(!userIdBlock)
    const db = app.firestore()
    db.collection('admin').doc(selected).update({ isBlocked: true })
  }

  const onUnBlock = (selected) => {
    setUserIdBlock(!userIdBlock)
      const db = app.firestore()
      db.collection('admin').doc(selected).update({ isBlocked: false })
  }



  useEffect(() => {
    const db = app.firestore()
    if (adminSearch === '' || adminSearch === undefined || adminSearch === '  ' || adminSearch === ' ') {
      const fetchData = async () => {
        const data = await db.collection('admin').get()
        setUserData(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      }
      fetchData()
    } else {
      const fetchData = async () => {
        const data = await db
          .collection('admin')
          .where('fullName', '==', adminSearch)
          .get()
        setUserData(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      }
   
      fetchData()
    }
  }, [adminSearch, userIdBlock])

  return (
    <div className={style.header}>
      <div className={style.userDisplay}>
        <div className={style.dataDisplay}>
          {userData.map((users) => (
            <li className={style.userData}>{users.fullName}</li>
          ))}
        </div>
        <div className={style.dataDisplay}>
          {userData.map((users) => (
            <li className={style.userDataEmail}>{users.email}</li>
          ))}
        </div>
        <div className={style.dataDisplay}>
          {userData.map((users) => (
            <li className={style.userDataButton}>
              {users.isBlocked ? (
                <button
                  className={style.isBlockedButton}
                  onClick={() => onUnBlock(users.id)}
                />
              ) : (
                <button
                  className={style.notBlockedButton}
                  onClick={() => onBlock(users.id)}
                />
              )}
            </li>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AdminData
