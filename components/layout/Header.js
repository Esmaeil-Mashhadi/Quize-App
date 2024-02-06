import Link from 'next/link';
import styles from './Header.module.css'
import { FaPersonThroughWindow } from "react-icons/fa6";
import { PiExamFill } from "react-icons/pi";
import { IoSettings } from "react-icons/io5";
import { MdLeaderboard } from "react-icons/md";
import HameMenu from '../modules/HameMenu';
import checkUserPermission from '@/utils/collectionCheck/checkUserPermission';
import { cookies } from 'next/headers';



async function Headers() {
   
  const cookie = cookies().get('Authorization')
  const permission = await checkUserPermission(cookie)
  return (
    <div className={styles.container}>
   
        <div className={styles.leftSide}>

        {permission ? 
            <Link className={styles.mainLink} href="/profile">Profile</Link> 
          : 
           <Link  href="/signup"  className={styles.mainLink}>
              Sign up
          </Link> 
         }
  
          <Link href="/" className={styles.mainLink}>
                  Home
          </Link>
          <Link href="" className={styles.mainLink}>
                  about us 
          </Link>
      


           <div className={styles.quizeContainer}>
           <Link  href=""  className={styles.mainLink}>
                quiz
           </Link>

           <div className={styles.subLinks}>
                <Link href="/quiz"> <PiExamFill/> start quiz</Link>
                <Link  href=""><IoSettings/> my Score </Link>
                <Link  href="/leaderboard"><MdLeaderboard/> leader board</Link>
           </div>
        </div>
          </div>

          <div className={styles.hamComponent}>
            <HameMenu permission ={permission} />
          </div>

        <div className={styles.rightSide}>
          <FaPersonThroughWindow/> Esi quiz 
       </div>
    </div>
  )
}

export default Headers