import styles from "./LeaderBoard.module.css"
function LeaderBoard({users}) {

  return (
    <div className={styles.container}>
        <div className={styles.categoryContainer}>

        </div>
        <div className={styles.scoreContainer}>
           <h4>TOP 10 Users</h4>
           <div className={styles.titlesContainer}>
              <p>RANK</p> <p>NAME</p> <p>SCORE</p>
           </div>
            <div className={styles.names}>
                    {users.map((item , index) =>  
                    <div key={index} style={index % 2 == 0 ? {background:"lightBlue"} : {background: "rgb(26, 102, 76)"}} className={styles.row}>
                    <p>
                      {index + 1}
                    </p>
                    <p>
                      {item.username}
                    </p>

                    <p>
                        234
                    </p>
                    </div> )}
            </div>

            <div className={styles.scores}>
                    
            </div>
        </div>
    </div>
  )
}

export default LeaderBoard