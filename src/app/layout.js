"use client"
import React, { useEffect, useState } from 'react';
import { Inter } from 'next/font/google';
import './globals.css';
import accountContext from './context/accountContext';
import Login from './components/Login';
import CreateAccount from './components/CreateAccount';

const inter = Inter({ subsets: ['latin'] });    

export default function RootLayout({ children }) {

  const [loggedIn, setLoggedIn] = useState(null)
  const [account, setAccount] = useState(false)
  const [accountCreation, setAccountCreation] = useState(false)
    useEffect( () => {
      fetch("api/connectToDB")
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
        <html lang="en">
        <body className={inter.className}>{loggedIn?
        children:
        accountCreation?<CreateAccount authenticate={authenticate} />:<Login startAccountCreation={startAccountCreation} authenticate={authenticate}/>
        
        }</body>
        </html>
    </accountContext.Provider>
  )
}
