import React, {useState, useContext} from 'react'
import style from './grants.module.css'
import GrantsData from './grantsData'
import AddGrants from './addGrant'

import {GrantSearch} from '../../context/grant-context'
import { useNavigate, Outlet } from 'react-router-dom'

function GrantsBox() {
  const [searchInput, setSearchInput] = useState('');
  const [grantSearch, setGrantSearch] = useContext(GrantSearch);

  const navigate = useNavigate()
  const handleOnChangeInput = (event) => {
    setSearchInput(event.target.value)
  }
  const handleOnClick = () =>{
    setGrantSearch(searchInput)
  }

  return (
    <div className={style.container}>
      <h1 className={style.text}>GRANTS</h1>
      <div className={style.box}>
        <div className={style.wrapper}>
          <input className={style.searchInput} 
          placeholder="Search" 
          value={searchInput} 
          onChange={handleOnChangeInput}></input>
          <button className={style.searchButton}  onClick={() => handleOnClick()}></button>
         <AddGrants />
         
        </div>
        <div className={style.header}>
          <div className={style.heading}>Grant Name</div>
          <div className={style.headingMedium}>CloseDate</div>
          <div className={style.headingSmall}>Value</div>
          <div className={style.headingBig}>Target</div>
          <div className={style.headingSmall}>State</div>
        </div>
        <GrantsData searchInput={grantSearch}/>
      </div>
      <Outlet />
    </div>
  )
}

export default GrantsBox
