import React from "react";
import Item from "./item";
import Style from "@/styles/Home.module.css";
export default function list({ listData, deleteData, submittingStates }) {
  console.log(listData)
  return (
    <>
      <div className={Style["list"]}>
      {listData.map((item) => {
        const { uid, id, num, treasure, date, time } = item;
        return (
          <Item
            key={uid}
            uid={uid}
            id={id}
            num={num}
            treasure={treasure}
            date={date}
            time={time}
            deleteData={deleteData}
            submittingStates={submittingStates}
          />
        );
      })}
    </div>
    </>
    
  );
}
