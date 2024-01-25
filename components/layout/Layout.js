import styles from './Layout.module.css'
import Headers from './Header';
import Footer from './Footer';

function Layout({ children }) {
  return (
    <div className={styles.whole}>
      <Headers />
        <div className={styles.allFather}>
              {children}
        </div>
        <Footer />
    </div>
  );
}

export default Layout;