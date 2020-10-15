import React, {useState, useContext} from 'react'
import style from './grants.module.css'
import { useNavigate, Outlet } from 'react-router-dom'
import { EditGrant } from '../../context/edit-grant-context'
import app from '../../constants/ApiKeys'

function GrantEdit() {
  const [grantsData, setGrantsData] = useState([])
  const [editGrant, setEditGrant] = useContext(EditGrant);
  const[grantName, setGrantName] = useState('')
  const[target, setTarget] = useState([])
  const[closeDate, setCloseDate] = useState('')
  const[amount, setAmount] = useState('')
  const[link, setLink] = useState('')
  const[state, setState] = useState('')
  const handleOnChangeGrant = (event) => {
    setGrantName(event.target.value)
  }
  const handleOnChangeTarget = (event) => {
    setTarget(event.target.value)
  }
  const handleOnChangeDate= (event) => {
    setCloseDate(event.target.value)
  }
  const handleOnChangeAmount= (event) => {
    setAmount(event.target.value)
  }
  const handleOnChangeLink= (event) => {
    setLink(event.target.value)
  }
  const handleOnChangeState= (event) => {
    setState(event.target.value)
  }

  const update = () => {
    const db = app.firestore()
    db.collection('grants')
    .doc(editGrant)
    .update({
      closeDate,
      target: [target],
      grantName,
      amount,
      state
    })
    .then(()=> navigate('/panel/grants-box'))
    .catch((error) => {
      alert(error);
    });
  }


  /*useEffect(() => {
    const db = app.firestore()
    const fetchData = async () => {
        const data = await db
          .collection('grants')
          .doc(editGrant)
          .get()
        setGrantsData(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      }
    fetchData()
  },[])*/



  const navigate = useNavigate()
  return (
    <div className={style.container}>
      <div className={style.boxFilter}>
        <div className={style.wrapperAdd}>
        
          <input
            className={style.searchInputAdd}
            placeholder="Grant Name"
            value={grantName}
            type="text"
            onChange={handleOnChangeGrant}
          ></input>
          <input
            className={style.searchInputAdd}
            placeholder="Target"
            value={target}
            type="array"
            onChange={handleOnChangeTarget}
          ></input>
          <input 
          className={style.searchInputAdd} 
          placeholder="Amount"    
          value={amount}
            type="text"
            onChange={handleOnChangeAmount}
            ></input>
          <input 
          className={style.searchInputAdd} 
           placeholder="Link"    
          value={link}
          type="text"
          onChange={handleOnChangeLink}
           ></input>
          <input
            className={style.searchInputAdd}
            placeholder="Close Date"
            value={closeDate}
            type="text"
            onChange={handleOnChangeDate}
          ></input>
          <select 
          className={style.selectInput}
             type="text"
             value={state}
            onChange={handleOnChangeState}
            >
          <option value="" disabled selected>Select the state</option>
            <option value="vic">VIC</option>
            <option value="nsw">NSW</option>
            <option value="wa">WA</option>
            <option value="tas">TAS</option>
            <option value="sa">SA</option>
            <option value="qld">QLD</option>
          </select>
           <button className={style.buttonBack} onClick={() => navigate('/panel/grants-box')}>Back</button>
          <button className={style.buttonSubmit}onClick={() => update()}>Submit</button>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default GrantEdit
