import Link from 'next/link';
import styles from './Header.module.css'
import { FaPersonThroughWindow } from "react-icons/fa6";
import { PiExamFill } from "react-icons/pi";
import { IoSettings } from "react-icons/io5";
import { MdLeaderboard } from "react-icons/md";
import HameMenu from '../modules/HameMenu';



function Headers() {



  return (
    <div className={styles.container}>
   
        <div className={styles.leftSide}>

          <Link href="" className={styles.mainLink}>
                  about us 
          </Link>
      
           <Link  href=""  className={styles.mainLink}>
                 Sign up
           </Link>   

           <div className={styles.quizeContainer}>
           <Link  href=""  className={styles.mainLink}>
                Quize
           </Link>

           <div className={styles.subLinks}>
                <Link href=""> <PiExamFill/> start quize</Link>
                <Link  href=""><IoSettings/> settings</Link>
                <Link  href=""><MdLeaderboard/> leader board</Link>
           </div>
        </div>
          </div>

          <div className={styles.hamComponent}>
            <HameMenu />
          </div>

        <div className={styles.rightSide}>
          <FaPersonThroughWindow/> Esi Quize 
       </div>
    </div>
  )
}

export default Headers