import React from 'react'
import { useNavigate, Outlet } from 'react-router-dom'
import style from './grants.module.css'

function AddGrants() {
  const navigate = useNavigate()
  return (
    <>
      <button
        className={style.buttonAdd}
        onClick={() => navigate('/panel/grant-filter')}
      >
        Add
      </button>
      <Outlet />
    </>
  )
}

export default AddGrants
