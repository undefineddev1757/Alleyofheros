"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Logo from "./Logo";
import styles from "./Header.module.css";

const Header = () => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleAddClick = () => {
    router.push("/add-heroe");
  };

  const handleFindClick = () => {
    router.push("/fined-heroe");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={styles.header}>
      <button 
        className={styles.menuButton}
        type="button"
        onClick={toggleMenu}
        aria-label="Меню"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3 12H21M3 6H21M3 18H21"
            stroke="#17120E"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </button>

      <nav className={`${styles.nav} ${isMenuOpen ? styles.navOpen : ''}`}>
        <Link 
          className={styles.navLink} 
          href="#stories"
          onClick={() => setIsMenuOpen(false)}
        >
          Наші Герої
        </Link>
        <Link 
          className={styles.navLink} 
          href="/your-stories"
          onClick={() => setIsMenuOpen(false)}
        >
          Ваші історії
        </Link>
      </nav>

      <Logo />

      <div className={styles.actions}>
        <button 
          className={styles.actionButton} 
          type="button"
          onClick={handleAddClick}
          aria-label="Додати"
        >
          <span className={styles.actionText}>Додати</span>
          <svg
            className={styles.icon}
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden
          >
            <circle cx="8" cy="8" r="7.5" stroke="#17120E" />
            <path d="M8 5V11M5 8H11" stroke="#17120E" strokeWidth="1" />
          </svg>
        </button>

        <button 
          className={styles.actionButton} 
          type="button"
          onClick={handleFindClick}
          aria-label="Знайти"
        >
          <span className={styles.actionText}>Знайти</span>
          <svg
            className={styles.icon}
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden
          >
            <g clipPath="url(#clip0_4_5393)">
              <path
                d="M9.43931 0C5.82175 0 2.87862 2.94313 2.87862 6.56069C2.87862 8.14497 3.44312 9.59984 4.3815 10.7349L0 15.1164L0.883625 16L5.26512 11.6185C6.40016 12.5569 7.85503 13.1214 9.43931 13.1214C13.0569 13.1214 16 10.1783 16 6.56069C16 2.94313 13.0569 0 9.43931 0ZM9.43931 11.8717C6.51081 11.8717 4.12828 9.48919 4.12828 6.56069C4.12828 3.63219 6.51081 1.24966 9.43931 1.24966C12.3678 1.24966 14.7503 3.63219 14.7503 6.56069C14.7503 9.48919 12.3678 11.8717 9.43931 11.8717Z"
                fill="#17120E"
              />
            </g>
            <defs>
              <clipPath id="clip0_4_5393">
                <rect width="16" height="16" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </button>

        <button className={styles.langButton} type="button">
          En
        </button>
      </div>
    </header>
  );
};

export default Header;



