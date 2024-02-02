'use client'
import { useState } from 'react'
import styles from './HameMenu.module.css'
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
                    <Link className={styles.quizeLink} href="">quiz <IoMdArrowDropright/> </Link>
                        <div className={styles.quizeSublinks}>
                             <Link href=""> <PiExamFill/> start quiz</Link>
                             <Link  href=""><IoSettings/> settings</Link>
                             <Link  href=""><MdLeaderboard/> leader board</Link>
                        </div>
                    {permission ? <Link onClick={()=> setClicked(false)}  href="/profile">Profile</Link> : 
                    <Link onClick={()=> setClicked(false)} href="">SignUp</Link>
                    }
                    <Link onClick={()=>setClicked(false)} href="">About us</Link>
             </div>
        

    </div>


  )
}

export default HameMenu