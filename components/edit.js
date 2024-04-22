import React, { use } from "react";
import Select from "react-select";
import { useState, useRef } from "react";
import { v4 } from "uuid";
import { FaMinus } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa";
import Style from "@/styles/Home.module.css";

export default function Edit({ add, submittingStates }) {
  // ---設定時間----
  const now = new Date();
  // 2-digit 是用來格式化時間用 讓時間變成兩位數 4=>04
  const option = { hour: "2-digit", minute: "2-digit", hour12: false };
  const formatter = new Intl.DateTimeFormat("zh-TW", option);
  const timeString = formatter.format(now);

  const id = useRef(1);
  const [num, setNum] = useState(0);
  const [treasure, setTreasure] = useState([
    { id: 1, value: "玻璃", label: "玻璃", count: 1 },
    { id: 2, value: "普通武降", label: "普通武降", count: 1 },
    { id: 3, value: "普通防降", label: "普通防降", count: 1 },
  ]);
  const [selectedOptions, setSelectedOption] = useState([]);
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [time, setTime] = useState(timeString);

  function numChange(e) {
    setNum(e.target.value);
  }
  function countClick(i) {
    setCount(count + 1);
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
          id: id.current,
          num,
          treasure: selectedOptions,
          date,
          time,
        },
        ...prevData,
      ];
    });
    setNum(0);
    setSelectedOption([]);
    setDate(new Date().toISOString().split("T")[0]);
    setTime(timeString);
  }
  console.log(treasure);
  return (
    <>
      <h1 className={Style["title-spacing"]}>遊戲紀錄</h1>
      <p className={`${Style["input-title"]}`}>練功場次</p>
      <input type="number" value={num} onChange={numChange}></input>
      <p className={Style["input-title"]}>掉落寶物</p>

      <Select
        instanceId="my-unique-select"
        options={treasure}
        value={selectedOptions}
        isMulti
        onChange={(selectedOptions) => {
          const merge = selectedOptions.map((selectedOption) => {
            const selectitem = treasure.find(
              (option) => option.value === selectedOption.value
            );
            return selectitem || selectedOption;
          });
          setSelectedOption(merge);
        }}
      />
      <div
        style={{
          background: "red",
          marginTop: "0.8rem",
          fontSize: "1.2rem",
          display: "flex",
          alignItems: "center",
        }}
      >
        {selectedOptions &&
          selectedOptions.map((item, index) => (
            <div
              key={item.id}
              style={{
                margin: "0 10px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <div style={{ margin: "5px" }}>{item.label}</div>

              <FaMinus
                style={{ fontSize: "0.8rem" }}
                onClick={() => {
                  const newTreasure = [...selectedOptions];
                  newTreasure[index].count = Math.max(
                    newTreasure[index].count - 1,
                    0
                  );
                  setSelectedOption(newTreasure);
                }}
              />
              <span style={{ fontSize: "1.3rem", margin: "3px" }}>
                {item.count}
              </span>
              <FaPlus
                style={{ fontSize: "0.8rem" }}
                onClick={() => {
                  const newTreasure = [...selectedOptions];
                  newTreasure[index].count =
                    (newTreasure[index].count || 1) + 1;
                  setSelectedOption(newTreasure);
                }}
              />
            </div>
          ))}
      </div>

      <p className={Style["input-title"]}>日期</p>
      <input type="date" value={date} onChange={dateChange}></input>
      <p className={Style["input-title"]}>時間</p>
      <input type="time" value={time} onChange={timeChange}></input>
      
        <button className={Style["add"]} onClick={addItem}>新增</button>
      

      <h3 className={Style["input-title"]}>時段篩選</h3>
      <input type="date"></input>
    </>
  );
}
