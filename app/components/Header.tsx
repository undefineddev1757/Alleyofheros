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
    setIsMenuOpen(false);
  };

  const handleFindClick = () => {
    router.push("/fined-heroe");
    setIsMenuOpen(false);
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
        {isMenuOpen ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M18 6L6 18M6 6L18 18" stroke="#17120E" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M3 12H21M3 6H21M3 18H21" stroke="#17120E" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        )}
      </button>

      {/* Desktop Navigation */}
      <nav className={styles.desktopNav}>
        <Link className={styles.navLink} href="#stories">
          Наші Герої
        </Link>
        <Link className={styles.navLink} href="/your-stories">
          Ваші історії
        </Link>
      </nav>

      {/* Mobile Navigation */}
      <nav className={`${styles.nav} ${isMenuOpen ? styles.navOpen : ''}`}>
        <div className={styles.menuContent}>
          <div className={styles.menuSection}>
            <h3 className={styles.sectionTitle}>
              Наші Герої
              <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
                <path d="M1 1L6 6L11 1" stroke="#17120E" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </h3>
          </div>

          <div className={styles.menuSection}>
            <h3 className={styles.sectionTitle}>
              Ваші історії
              <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
                <path d="M1 1L6 6L11 1" stroke="#17120E" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </h3>
          </div>

          <button className={styles.menuAction} onClick={handleAddClick} type="button">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <circle cx="10" cy="10" r="9.5" stroke="#17120E"/>
              <path d="M10 6V14M6 10H14" stroke="#17120E" strokeWidth="1.5"/>
            </svg>
            Додати Героя
          </button>

          <button className={styles.menuAction} onClick={handleFindClick} type="button">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <g clipPath="url(#clip0)">
                <path d="M9.43931 0C5.82175 0 2.87862 2.94313 2.87862 6.56069C2.87862 8.14497 3.44312 9.59984 4.3815 10.7349L0 15.1164L0.883625 16L5.26512 11.6185C6.40016 12.5569 7.85503 13.1214 9.43931 13.1214C13.0569 13.1214 16 10.1783 16 6.56069C16 2.94313 13.0569 0 9.43931 0ZM9.43931 11.8717C6.51081 11.8717 4.12828 9.48919 4.12828 6.56069C4.12828 3.63219 6.51081 1.24966 9.43931 1.24966C12.3678 1.24966 14.7503 3.63219 14.7503 6.56069C14.7503 9.48919 12.3678 11.8717 9.43931 11.8717Z" fill="#17120E"/>
              </g>
              <defs>
                <clipPath id="clip0"><rect width="16" height="16" fill="white"/></clipPath>
              </defs>
            </svg>
            Знайти Героя
          </button>
        </div>

        <div className={styles.menuFooter}>
          <Logo />
          <p className={styles.address}>
            Дніпровська Набережна,<br/>
            м. Київ, Україна
          </p>
          <div className={styles.socialLinks}>
            <a href="#" aria-label="Twitter"><svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" stroke="#17120E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></a>
            <a href="#" aria-label="Instagram"><svg width="20" height="20" viewBox="0 0 24 24" fill="none"><rect x="2" y="2" width="20" height="20" rx="5" stroke="#17120E" strokeWidth="2"/><circle cx="12" cy="12" r="4" stroke="#17120E" strokeWidth="2"/><circle cx="18" cy="6" r="1" fill="#17120E"/></svg></a>
            <a href="#" aria-label="Facebook"><svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" stroke="#17120E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></a>
            <a href="#" aria-label="YouTube"><svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29 29 0 001 11.75a29 29 0 00.46 5.33A2.78 2.78 0 003.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 001.94-2 29 29 0 00.46-5.25 29 29 0 00-.46-5.33z" stroke="#17120E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M9.75 15.02l5.75-3.27-5.75-3.27v6.54z" stroke="#17120E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></a>
          </div>
        </div>
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
