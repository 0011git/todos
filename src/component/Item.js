import React, { useState, useRef, useEffect } from 'react'
import store from '../state/store';

const Item = ({li, type}) => {
    const [list, setList] = useState(false);
    const liRef = useRef(null);
    const {dataCtrl} = store();
    function todoStatus() {
        dataCtrl({type:'PUT', data:{id:li.id, status:!li.status}})
    }
    
    //전체-진행중-완료 감시하다가 바뀔때 switch문 실시
    useEffect(() => {
        switch (type) {
            case 'progress':
                liRef.current.classList.remove('hide');
                if(li.status !== false){
                    liRef.current.classList.add('hide');
                }
                break;
            case 'complete':
                liRef.current.classList.remove('hide');
                if(li.status !== true){
                    liRef.current.classList.add('hide');
                }
            break;
            default:
                liRef.current.classList.remove('hide');
                break;
        }
    }, [type])

    //li useState: true false로 클래스 추가/삭제
    //label onClick이면 li의 useState함수로 state값 true-false변경
    //useRef 사용x

  return (
    <li className='' ref={liRef} >
        <label onClick={() => {setList(!list);}} htmlFor={li.id}>
            <input type='checkbox' id={li.id} defaultChecked={li.status} onChange={todoStatus} className='checkbox' />{li.todo}
        </label>
        <div>
            {/* <button>수정</button> */}
            <button onClick={() => dataCtrl({type:'DELETE', data:li.id})}>삭제</button>
        </div>
    </li>
  )
}

export default Item