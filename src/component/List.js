import React, { useState, useRef, useEffect } from 'react'
import Item from './Item';
import store from '../state/store';

const List = ({type}) => {
    //li 남은할일 개수세기
    const {data, dataCtrl} = store();
    // let count = data.length;

    useEffect(() => {
        dataCtrl({type: "GET"})
    }, [])

  return (
    <div className='list'>
        <ul>
            {data.map((li) =>
                <Item li={li} key={li.id} type={type} />            
            )}
            {/* {count} */}
        </ul>
    </div>
  )
}

export default List