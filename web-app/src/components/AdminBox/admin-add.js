import React, {useState} from 'react'
import style from './admin.module.css'
import { useNavigate, Outlet } from 'react-router-dom'
import app from '../../constants/ApiKeys'

function AddAdmin() {
  const[fullName, setFullName] = useState('')
  const[email, setEmail] = useState('')
  const[adminPassword, setAdminPassword] = useState('')
  const[adminConfirmPassword, setAdminConfirmPassword] = useState('')
  const[isBlocked, setIsBlocked] = useState(false)

  

  const handleOnChangeName = (event) => {
    setFullName(event.target.value)
  }
  const handleOnChangeEmail = (event) => {
    setEmail(event.target.value)
  }
  const handleOnChangePassword= (event) => {
    setAdminPassword(event.target.value)
  }
  const handleOnChangeConfirmPassword= (event) => {
    setAdminConfirmPassword(event.target.value)
  }



  const register = async () => {
    if (adminPassword !== adminConfirmPassword) {
      alert("Passwords don't match.");
      return;
    }
    try {
      await app
        .auth()
        .createUserWithEmailAndPassword(email, adminPassword)
        .then((response) => {
          const uid = response.user.uid;
          const data = {
            id: uid,
            email,
            fullName,
            isBlocked,
          };
          const usersRef = app.firestore().collection('admin');
          usersRef
            .doc(uid)
            .set(data)
            .then(() => {
              navigate('/panel/admin-box', { user: data });
            })
            .catch((error) => {
              alert(error);
            });
        })
        .catch((error) => {
          alert(error);
        });
    } catch (e) {
      alert(e.message);
    }
  };



  /*const update = () => {
    const db = app.firestore()
    const data = {
     fullName,
     email,
     isBlocked
    };
    db.collection('admin')
    .doc(fullName)
    .set(data)
    .then(()=> navigate('/panel/admin-box'))
    .catch((error) => {
      alert(error);
    });
  }*/


  const navigate = useNavigate()
  return (
    <div className={style.container}>
      <div className={style.boxFilter}>
        <div className={style.wrapperAdd}>
          <input
            className={style.searchInputAdd}
            placeholder="Admin Name"
            value={fullName}
            type="text"
            onChange={handleOnChangeName}
          ></input>
            <input
            className={style.searchInputAdd}
            placeholder="Email"
            value={email}
            type="text"
            onChange={handleOnChangeEmail}
          ></input>
          <input
            className={style.searchInputAdd}
            placeholder="Password"
            value={adminPassword}
            type="text"
            onChange={handleOnChangePassword}
          ></input>
          <input 
          className={style.searchInputAdd} 
          placeholder="Confirm Password"    
          value={adminConfirmPassword}
            type="text"
            onChange={handleOnChangeConfirmPassword}></input>
        
           <button className={style.buttonBack} onClick={() => navigate('/panel/admin-box')}>Back</button>
          <button className={style.buttonSubmit}onClick={() => register()}>Submit</button>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default AddAdmin