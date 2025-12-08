import Image from "next/image";
import styles from "./Logo.module.css";

const Logo = () => (
  <div className={styles.logo} aria-hidden>
    <Image src="/logo.svg" alt="" width={46} height={48} priority />
  </div>
);

export default Logo;

