'use client'

import { useState } from 'react';
import styles from './ProfilePage.module.css'
import { MdDashboardCustomize } from "react-icons/md";
import { RiMailSettingsFill } from "react-icons/ri";
import DashSetting from './DashSetting';
import GameSetting from './GameSetting';



function ProfilePage({user , quizOptions}) {
    const [leftClick , setLeftClick] = useState(false)
    const [rightClick , setRightClick] = useState(false)


    const fadeRight = {
        'width' : leftClick && "0px",
        'opacity': leftClick && "0", 
    }

    const fadeLeft = {
        'width' : rightClick && "0px",
        'opacity': rightClick && "0", 
    }

    const dashSettingStyle = {
        '--scale' : leftClick ? "1" : "0",
        '--pointer': leftClick ? "all" :'none'
    }
    const gameSettingStyle = {
        '--scale' : rightClick ? "1" : "0",
        '--pointer': rightClick ? "all" :'none'
    }


  return (
    <div className={styles.container}>
            <div style={fadeLeft} className={styles.left}>
                <div className={leftClick ? styles.newHeader : styles.header}>
                     <p>dashboard setting</p>
                    <button className={styles.sideButton} onClick={()=>setLeftClick(!leftClick)}>
                        <MdDashboardCustomize/>
                    </button>
                </div>
                <div style={dashSettingStyle} className={styles.dashSetting}>
                    <DashSetting user = {user} />
                </div>
            </div>


            <div style={fadeRight} className={ styles.right}>
                <div className={rightClick ? styles.newHeader : styles.header}>
                    <p> Game setting</p>
                    <button className={styles.sideButton}  onClick={()=> setRightClick(!rightClick)}>
                        <RiMailSettingsFill />
                    </button>
                </div>
                <div style={gameSettingStyle} className={styles.gameSetting}>
                    <GameSetting quizOptions = {quizOptions} user = {user}/>
                </div>
            </div>
    </div>
  )
}

export default ProfilePage