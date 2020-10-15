import React, {useContext, useState} from 'react'
import style from './admin.module.css'
import AdminData from './admin-data'
import { AdminContext } from '../../context/admin-context'
import { useNavigate, Outlet } from 'react-router-dom'

function AdminBox() {
  const [adminSearch, setAdminSearch] = useContext(AdminContext);
  const [searchInput, setSearchInput] = useState('');

  const navigate = useNavigate()

  const handleOnChangeInput = (event) => {
    setSearchInput(event.target.value)
  }
  const handleOnClick = () =>{
   setAdminSearch(searchInput)
  }
  return (
    <div className={style.container}>
    <h1 className={style.text}>ADMINS</h1>
    <div className={style.box}>
      <div className={style.wrapper}>
        <input className={style.searchInput} 
        placeholder="Search" 
        value={searchInput} 
        onChange={handleOnChangeInput}
       ></input>
        <button className={style.searchButton}  onClick={() => handleOnClick()}></button>
        <button
        className={style.buttonAdd}
        onClick={() => navigate('/panel/admin-add')}
      >
        Add
      </button>
      </div>
      <div className={style.header}>
        <div className={style.heading}>Admin Name</div>
        <div className={style.headingEmail}>Email</div>
        <div className={style.headingBlock}>Block</div>
      </div>
      <AdminData />
    </div>
    <Outlet />
  </div>
  )
}

export default AdminBox
