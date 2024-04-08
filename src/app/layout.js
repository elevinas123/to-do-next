"use client"
import React, { useEffect, useState } from 'react';
import localFont from 'next/font/local'
import './globals.css';
import accountContext from './context/accountContext';
import Login from './components/Login';
import CreateAccount from './components/CreateAccount';

const myFont = localFont({ src: '../Work_Sans/static/WorkSans-Medium.ttf' })
 
export default function RootLayout({ children }) {

  const [loggedIn, setLoggedIn] = useState(null)
  const [account, setAccount] = useState(false)
  const [accountCreation, setAccountCreation] = useState(false)
    useEffect( () => {
      const f = async () => {
          await fetch("api/connectToDB", {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
              },
          });
          console.log("fetched")
      };
      f();
    }, []
    )

    useEffect( () => {
        if (localStorage.getItem('acc') !== null) {
          let acc = JSON.parse(localStorage.getItem('acc'))
          setAccount({...acc, setLoggedIn})
          
          setLoggedIn(true)
      } 
    }, [])

  const authenticate = async (acc) => {
    console.log("authenticated", acc)
    localStorage.setItem('acc', JSON.stringify(acc));
    console.log(localStorage.getItem("acc"))
    setAccount({...acc, setLoggedIn})

    setLoggedIn(true)
    
  }

  const startAccountCreation = () => {
    setAccountCreation(true)
  }

  
  

  return (
    <accountContext.Provider value={{account: account}}>
        <html data-theme="todoTheme" lang="en">
        <body className={myFont.className}>{loggedIn?
        children:
        accountCreation?<CreateAccount authenticate={authenticate} />:<Login startAccountCreation={startAccountCreation} authenticate={authenticate}/>
        
        }</body>
        </html>
    </accountContext.Provider>
  )
}
