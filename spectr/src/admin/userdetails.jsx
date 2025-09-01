import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function Userdetails() {
    const[detail,setdetail]=useState()
    const{id}=useParams();
    useEffect(()=>{
    axios.get(`http://localhost:4006/users?id=${id}`)
    .then(res=>setdetail(res.data[0]))
    },[id]);
    console.log(detail)
  return (
    <div>
      <h1>hy</h1>
    </div>
  )
}
