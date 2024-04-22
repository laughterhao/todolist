import React from "react";
import Style from "@/styles/Home.module.css";

export default function Item({
  uid,
  id,
  num,
  treasure,
  date,
  time,
  deleteData,
  submittingStates,
}) {
  function remove() {
    submittingStates.current = true;
    deleteData(function (prev) {
      return prev.filter((item) => item.uid !== uid);
    });
  }
  return (
    <div className={Style["item"]}>
      <div>日期: <span>{date}</span></div>
      <div>場次:<span>{num}</span></div>
      <div key={uid}>
        掉落物品:
        <span>
          {treasure.map((list) => `${list.value}X${list.count}`).join(",")}
        </span>
      </div>
      <div>練功時間:<span>{time}</span></div>
      <button className={Style["remove"]} onClick={remove}>
        刪除
      </button>
    </div>
  );
}
