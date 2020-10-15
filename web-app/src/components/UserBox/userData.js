import React, { useState, useEffect, useContext } from 'react'
import style from './user.module.css'
import app from '../../constants/ApiKeys'
import { UserSearch } from '../../context/user-context'

function UserDetails() {
  const [userData, setUserData] = useState([])
  const [userSearch, setUserSearch] = useContext(UserSearch)
  const [userIdBlock, setUserIdBlock] = useState(true)
  const [isBlocked, setIsBlocked] = useState(false)

  const [userSort, setUserSort] = useState([])

  const onBlock = (selected) => {
    setUserIdBlock(!userIdBlock)
    const db = app.firestore()
    db.collection('users').doc(selected).update({ isBlocked: true })
  }

  const onUnBlock = (selected) => {
    setUserIdBlock(!userIdBlock)
      const db = app.firestore()
      db.collection('users').doc(selected).update({ isBlocked: false })
  }



  useEffect(() => {
    const db = app.firestore()
    if (userSearch === '' || userSearch === undefined || userSearch === '  ' || userSearch === ' ') {
      const fetchData = async () => {
        const data = await db.collection('users').get()
        setUserData(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      }
      fetchData()
    } else {
      const fetchData = async () => {
        const data = await db
          .collection('users')
          .where('category', '==', userSearch)
          .get()
        setUserData(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      }
   
      fetchData()
    }
  }, [userSearch, userIdBlock])

  /*const findUser =  function( userData, fullName){
    const index = userData.map(function(user, index){
      return user.fullName === fullName
    })
    return userData [index]
  }
  let printMe = findUser(userData, 'Laudair Egevarth')
  
console.log( findUser(userData, 'Laudair Egevarth'))
*/
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
            <li className={style.userData}>{users.category}</li>
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

export default UserDetails
