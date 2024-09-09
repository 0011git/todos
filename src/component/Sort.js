import React, { useState } from 'react'
import store from '../state/store'
import List from './List';
import '../assets.css/scss/todo.scss';


const Sort = () => {
  const [type, setType] = useState('all');

  //---선생님코드-----------------------------------------------
  // let {data,sortData,sortCtrl} = store();  
  // let [type,setType] = useState('All');

  // useEffect(()=>{
  //   sortCtrl({type});
  // },[data, type])
  //---선생님코드-----------------------------------------------

  return (
    <div className='sort'>
        <h4>할 일 : </h4>
        <ul>
          <li>
            <label htmlFor='all'>
              <input onClick={(e) => {setType(e.target.id);} } type='radio' name='sort' id='all' defaultChecked/>전체
            </label>
          </li>
          <li>
            <label htmlFor='progress'>
              <input onClick={(e) => {setType(e.target.id);} } type='radio' name='sort' id='progress'/>진행중
            </label>
          </li>
          <li>
            <label htmlFor='complete'>
              <input onClick={(e) => {setType(e.target.id);} } type='radio' name='sort' id='complete'/>완료
            </label>
          </li>
          
        
          {/* 선생님코드-------------------------------------------------- 
          <button onClick={()=>setType('All')}>All</button>
          <button onClick={()=>setType('Active')}>Active</button>
          <button onClick={()=>setType('Completed')}>Completed</button> 
          ---선생님코드-------------------------------------------------- */}

        </ul>
        <hr />
        <List type={type} />
    </div>
  )
}

export default Sort