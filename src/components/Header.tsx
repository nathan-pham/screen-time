import styles from "./Header.module.css";

const Header = () => {
    return (
        <header className={styles.header}>
            <h1 className={styles.title}>
                <img src="/icons/favicon-32x32.png" /> Screen Time
            </h1>
            <p className={styles.subtitle}>Time management made simple.</p>
        </header>
    );
};

export default Header;
