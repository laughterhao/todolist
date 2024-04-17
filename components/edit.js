import React from "react";
import Link from 'next/link'
import { useState,useRef } from "react";
import { v4 } from "uuid";
import Style from "@/styles/Home.module.css";
export default function Edit({ add, submittingStates }) {
  // ---設定時間---- 
  const now = new Date()
  // 2-digit 是用來格式化時間用 讓時間變成兩位數 4=>04
  const option = {hour:'2-digit', minute:'2-digit', hour12:false}
  const formatter = new Intl.DateTimeFormat('zh-TW',option)
  const timeString = formatter.format(now)
  const id = useRef(1);
  const [num, setNum] = useState(0);
  const [treasure, setTreasure] = useState([]);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [time, setTime] = useState(timeString);
  console.log(new Date().toISOString().split('T')[1].slice(0,5))

  function numChange(e) {
    setNum(e.target.value);
  }
  function treasureChange(e) {
    const selectOptions = Array.from(
      e.target.selectedOptions,
      option => option.value
    );
    console.log(selectOptions.join(','));
    setTreasure(selectOptions);
  }

  function dateChange(e) {
    setDate(e.target.value);
  }

  function timeChange(e) {
    setTime(e.target.value);
  }
  function addItem() {
    id.current = id.current + 1;
    add(function (prevData) {
      submittingStates.current = true;
      return [
        {
          uid: v4(),
          id:id.current,
          num,
          treasure,
          date,
          time,
        },
        ...prevData,
      ];
    });
    setNum(0);
    setTreasure([]);
    setDate("");
    setTime("");
  }
  return (
    <>
      <Link className={Style['test']} href='/'>超連結測試</Link>
      <h1 className={Style['title-spacing']}>遊戲紀錄</h1>
      <p className={`${Style["input-title"]}`}>練功場次</p>
      <input type="number" value={num} onChange={numChange}></input>
      <p className={Style["input-title"]}>掉落寶物</p>
      <select multiple={true} value={treasure} onChange={treasureChange}>
        <option value="">請選擇...</option>
        <option>玻璃</option>
        <option>普通武降</option>
        <option>普通防降</option>
      </select>
      <p className={Style["input-title"]}>以選擇物品:{treasure.join('、')}</p>
      <input type="file" />
      <p className={Style["input-title"]}>日期</p>
      <input type="date" value={date} onChange={dateChange}></input>
      <p className={Style["input-title"]}>時間</p>
      <input type="time" value={time} onChange={timeChange}></input>
      <button onClick={addItem} className={Style["add"]}>
        新增
      </button>
      <h3 className={Style["input-title"]}>時段篩選</h3>
    <input type="date"></input>
    </>
  );
}
