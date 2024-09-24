import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import store from '../state/store';
import sweetAlert from 'sweetalert'

const Insert = () => {
    const [input, setInput] = useState();
    
    let {dataCtrl} = store();

    const onInsert = (e) => {
        e.preventDefault();
        let data = {    //서버에 보낼 데이터 형식
            id: uuidv4(),
            todo: e.target.todo.value,  //form요소는 자식 요소들의 name(여기서는 todo)값으로 바로 접근 가능함.
            status: false
        }

        if(data.todo !== ""){   //todo가 빈 값이 아닐때만 서버에 POST요청
            dataCtrl({type: "POST", data})
        }else{
            sweetAlert('NO INPUT');
        }
        // console.log(data);
        e.target.todo.value = '';   //form제출 후 인풋박스 지우기
        e.target.todo.focus();
    }
  return (
    <div className='insert'>
        <form onSubmit={onInsert}>
            <input type='text' name='todo' placeholder='무엇을 하실 건가요?'/>
            <button>추가</button>
        </form>
    </div>
  )
}

export default Insert