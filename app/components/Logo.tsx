import Link from "next/link";
import Image from "next/image";
import styles from "./Logo.module.css";

const Logo = () => (
  <Link href="/" className={styles.logo}>
    <Image src="/logo.svg" alt="Logo" width={46} height={48} priority />
  </Link>
);

export default Logo;

