import React, { useEffect, useRef, useState } from 'react'
import './App.scss';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import store from './state/store';
import Insert from './component/Insert';
import Sort from './component/Sort';



function App() {
/*
//데이터 가져오기(GET)-------------------------------------------------------------------------
useEffect(() => {
  axios.get("http://localhost:4000/")
  .then(res => {
    console.log(res);
    console.log(res.data);
  })
}, [])

// 데이터 추가하기(POST)-------------------------------------------------------------------------
useEffect(() => {
  axios.post("http://localhost:4000/", {id:3, name:"재외국민"})
  .then(res => {
    console.log(res);
    console.log(res.data);
  })
}, [])

// 데이터 수정하기(PUT)-------------------------------------------------------------------------
// 방법1: id값 주소에 파라미터 값으로 던지기
useEffect(() => {
  axios.put("http://localhost:4000?id=1", {name:"수정한 이름"}) //주소값 뒤에 ?id=1로 보냄
  .then(res => {
    console.log(res);
    console.log(res.data);
  })
}, [])

// 방법2: id값 데이터에 보내기
// useEffect(() => {
//   axios.put("http://localhost:4000/", {id:1, name:"수정한 이름"})  //데이터 안에 id값 보냄
//   .then(res => {
//     console.log(res);
//     console.log(res.data);
//   })
// }, [])

//데이터 삭제하기(DELETE)-------------------------------------------------------------------------
useEffect(() => {
  axios.delete("http://localhost:4000?id=1") //주소값 뒤에 ?id=1로 보냄
  .then(res => {
    console.log(res.data);
  })
}, [])

*/

//zustand모듈(store.js)-----------------------------------------------------------------------------
/*const {data, dataCtrl} = store();
console.log(data);

useEffect(() => {
  dataCtrl({type:'GET'});    
      //type종류: GET   {type:'GET'} 데이터 전체를 불러오기 때문에 data전송 필요x, id가 일치하는 데이터를 불러올 때도 주소창에 id를 보내므로(쿼리) data 전송 필요x
              // POST   {type:'POST', data:{id: 10, name: '추가할 이름'}}
              // PUT    {type:'PUT', data:{id: 10, name: '수정할 이름'}}
              // DELETE {type:'DELETE'} 삭제할 id값을 주소창에 쿼리로 보내므로 data전송 필요x
}, [])
*/
// ---------------------------------------------------------------------------------------------------------------
  const {data} = store();
  let count = 0;
  data.forEach((item) => {
    if(!item.status){
      count++;
    }
  })

  

  return (
    <div className='toDoList'>
      <h2>오늘의 할 일 : <span>{count}</span>개</h2>
      <Insert />
      <Sort />
    </div>
  );
}

export default App;
