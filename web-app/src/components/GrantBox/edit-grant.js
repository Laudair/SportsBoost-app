import React from 'react'
import { useNavigate, Outlet } from 'react-router-dom'
import style from './grants.module.css'

function EditGrant(selected) {
  const navigate = useNavigate()
  return (
    <>
      <button
        className={style.buttonUpdate}
        onClick={() => navigate('/panel/grant-edit', {edit: selected} )}
      >
        Edit
      </button>
      <Outlet  />
    </>
  )
}


export default EditGrant

