"use client"

import React, { useEffect } from 'react'

function page() {
    useEffect(()=>{
        const response = async ()=>{
          try {
             const res =   await fetch(`/api/mysql`);
             const jsonData = await res.json();
             console.log(jsonData);
          } catch (error) {
            console.log("Error in Mysql connection:- ",error);
          }
           
        }
       response()
    },[])
  return (
    <div>page</div>
  )
}

export default page