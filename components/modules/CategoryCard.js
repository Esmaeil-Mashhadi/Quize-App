import styles from './CategoryCard.module.css'

function CategoryCard() {
  
  const categoryArray = [
    {
      title: "Art",
      description: "Immerse yourself in the captivating realm of art through our quiz website dedicated to this expressive category. Put your knowledge to the test, from renowned masterpieces to influential artists, and develop a newfound appreciation for the diverse world of creativity."
    },
    {
      title: "Science",
      description: "Embark on a journey into the fascinating world of science with our interactive quiz website. Explore your understanding of discoveries, theories, and the wonders of the natural world. Engage in the thrill of scientific exploration and expand your knowledge in an enjoyable way."
    },
    {
      title: "Geography",
      description: "Discover the wonders of our world through our engaging geography quiz website. Test your knowledge of continents, countries, landmarks, and natural wonders in an interactive and entertaining manner. Expand your global awareness and embrace the excitement of exploration."
    },
    {
      title: "Sports",
      description: "Ignite your passion for sports with our dynamic quiz website. Challenge your knowledge of athletes, teams, and iconic moments in an engaging and interactive format. Experience the thrill of competition as you dive into the world of sports trivia."
    },
    {
      title: "History",
      description: "Uncover the past through our captivating history quiz website. Test your knowledge of significant events, influential figures, and pivotal moments that shaped our world. Immerse yourself in an interactive journey through time and deepen your understanding of history."
    },
    {
      title: "General",
      description: "Expand your horizons with our diverse general knowledge quiz website. Engage in a wide range of topics, from science and history to pop culture and current events. Challenge yourself with thought-provoking questions and discover fascinating facts in an interactive and enjoyable format."
    }
  ];
  return (
    <div className={styles.container}>
    {categoryArray.map((item , index) =>{
        return <div key={index} className={styles.card}>
                <div className={styles.imageContainer}>
                    <p>{item.title}</p>
                    <img src={`${item.title}.jpg`} />
                </div>

                <p className={styles.description}>{item.description}</p>
         </div>
       })}
    </div>
  )
}

export default CategoryCard