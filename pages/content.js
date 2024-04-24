import React from "react";
import { useState, useEffect,useRef } from "react";
import { API_GET_DATA } from "@/global/constants";
import List from "@/components/list";
import Edit from "@/components/edit";
import Style from "@/styles/Home.module.css";

async function fetchData(setData){
  const res = await fetch(API_GET_DATA)
  const {data} = await res.json()
  console.log(data)
  setData(data)
}

async function fetchSetData(data){
  const res = await fetch(API_GET_DATA,{
    method:"PUT",
    headers:{
      'Content-type':'application/json'
    },
    body:JSON.stringify({data})
  })
}

export default function Content() {
  const [data, setData] = useState([]);
  const submittingStates = useRef(false)

  useEffect(() => {
    if(!submittingStates.current){
      return
    }
    console.log(data)
    fetchSetData(data).then(data => submittingStates.current = false)
  }, [data]);
  useEffect(() => {
    fetchData(setData)
  }, []);
  return (
    <>
      <div className={Style["warp"]}>
        <Edit add={setData}  submittingStates={submittingStates}/>
        <List listData={data} deleteData={setData} submittingStates={submittingStates}/>
      </div>
    </>
  );
}
