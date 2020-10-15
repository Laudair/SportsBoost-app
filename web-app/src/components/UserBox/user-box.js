import React, {useState, useContext} from 'react'
import style from './user.module.css'
import UserDetails from './userData'
import {UserSearch} from '../../context/user-context'

function UserBox() {
  const [userSearch, setUserSearch] = useContext(UserSearch);
  const [searchInput, setSearchInput] = useState('');
  const handleOnChangeInput = (event) => {
    setSearchInput(event.target.value)
  }
  const handleOnClick = () =>{
   setUserSearch(searchInput)
  }
  return (
    <div className={style.container}>
      <h1 className={style.text}>USERS</h1>
      <div className={style.box}>
        <div className={style.wrapper}>
          <input className={style.searchInput} 
          placeholder="Search by category" 
          value={searchInput} 
          onChange={handleOnChangeInput}
         ></input>
          <button className={style.searchButton}  onClick={() => handleOnClick()}></button>
        </div>
        <div className={style.header}>
          <div className={style.heading}>User Name</div>
          <div className={style.headingEmail}>Email</div>
          <div className={style.heading}>Category</div>
          <div className={style.headingBlock}>Block</div>
        </div>
        <UserDetails />
      </div>
    </div>
  )
}

export default UserBox
