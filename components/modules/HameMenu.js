'use client'
import styles from './HameMenu.module.css'
import { useState } from 'react'
import Link from 'next/link'

import { PiExamFill } from "react-icons/pi";
import { IoSettings } from "react-icons/io5";
import { MdLeaderboard } from "react-icons/md";
import { IoMdArrowDropright } from "react-icons/io";


 function HameMenu({permission}) {
   
    const [clicked , setClicked] = useState(false)
    const hamHandler = ()=>{
        setClicked(!clicked)
    }

    const linkHandler =()=>{
        setClicked(false)
    }

    const hamStyle = {
        '--firstChild' : clicked ? 'rotate(45deg)' : 'rotate(0deg)',
        '--secondChild' : clicked ? 'translateX(-100%)' : null,
        '--opacity' : clicked ? "0" : "1",
        '--lastChild' : clicked ? 'rotate(-45deg)' : 'rotate(0deg)'
    }

    const transform = {
        '--transform' : clicked ? 'translateX(0px)' : "translateX(-100%)"
    }

  return (
    <div>
        <div style={hamStyle} onClick={hamHandler}  className={styles.ham}>
              <span></span>
              <span></span>
              <span></span>
         </div>
        
              <div style={transform} className={styles.mobileMenu}>
                <div className={styles.linkContainer}>
                    <Link onClick={linkHandler} href='/'>Home</Link>
                    <Link className={styles.quizLink} href="">quiz <IoMdArrowDropright/> </Link>
                        <div className={styles.quizSublinks}>
                        <Link onClick={linkHandler} href={permission ? "/quiz" : "/profile"}> <PiExamFill/> start quiz</Link>
                        <Link onClick={linkHandler}  href="/profile"><IoSettings/> quiz setting </Link>
                        <Link  onClick={linkHandler}  href="/leaderboard"><MdLeaderboard/> leader board</Link>
                        </div>
                    {permission ? <Link onClick={linkHandler}  href="/profile">Profile</Link> : 
                    <Link onClick={linkHandler}  href="/signup">SignUp</Link>
                    }
                    <Link onClick={linkHandler} href="/about-us">About us</Link>
            </div>

             </div>
        

    </div>


  )
}

export default HameMenu