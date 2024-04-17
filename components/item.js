 import React from 'react'
 import Style from '@/styles/Home.module.css'
 
 export default function item({uid,id,num,treasure,date,time,deleteData,submittingStates}) {
  console.log(treasure)
  function remove(){
    submittingStates.current = true
    deleteData(function(prev){
      return prev.filter(item=> item.uid !== uid)
    })
  }
   return (
     <div className={Style['item']}>
     <div>{id}</div>
     <div>場次:{num}</div>
     <div>掉落物品:{treasure.join('、')}</div>
     <div>練功時間:{`${date} ${time}`}</div>
     <button className={Style['remove']} onClick={remove} >刪除</button>
     </div>
   )
 }
 