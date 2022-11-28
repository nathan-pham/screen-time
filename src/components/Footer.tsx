import styles from "./Footer.module.css";

const Footer = () => (
    <footer className={styles.footer}>
        Made with 💖 by{" "}
        <a
            href="https://nathanpham.me"
            target="_blank"
            rel="noreferrer"
            className={styles.footer__link}
        >
            Nathan Pham
        </a>
    </footer>
);

export default Footer;
