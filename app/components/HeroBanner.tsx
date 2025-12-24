'use client';

import { useEffect, useMemo, useState } from "react";
import "./HeroBanner.css";

interface HomeSettings {
  heroTitle?: string | null;
  heroSubtitle?: string | null;
  heroDescription?: string | null;
  heroVideoUrl?: string | null;
}

interface HeroBannerProps {
  settings?: HomeSettings | null;
}

const DEFAULT_VIDEO = "/6034431_Aerialiew_1920x1080.mp4";

export default function HeroBanner({ settings }: HeroBannerProps): JSX.Element {
  const [isDesktop, setIsDesktop] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const update = () => setIsDesktop(window.innerWidth >= 1025);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    if (!isDesktop) return;
    document.body.classList.toggle("video-cursor-active", isActive);
    return () => document.body.classList.remove("video-cursor-active");
  }, [isActive, isDesktop]);

  const cursorStyle = useMemo(
    () => ({
      left: `${pos.x}px`,
      top: `${pos.y}px`,
      opacity: isActive ? 1 : 0,
    }),
    [pos.x, pos.y, isActive],
  );

  return (
    <div
      className="hero-banner"
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
      onMouseMove={(e) => {
        if (!isDesktop) return;
        setPos({ x: e.clientX, y: e.clientY });
      }}
    >
      <video
        className="hero-background"
        src={settings?.heroVideoUrl || DEFAULT_VIDEO}
        autoPlay
        muted
        loop
        playsInline
      />
      <div className="hero-content">
        <div className="hero-title-first">
          <span className="bracket-accent">{"{"}</span>
          <span className="title-text"> {settings?.heroTitle || "Алея"}</span>
        </div>
        <div className="hero-title-second">
          <span className="title-text">{settings?.heroSubtitle || "Друзів"} </span>
          <span className="bracket-accent">{"}"}</span>
        </div>
        <div className="hero-subtitle">
          {settings?.heroDescription || "Тут ми пам'ятаємо не лише подвиги, а й людину за ними"}
        </div>
      </div>

      {isDesktop && (
        <div className="video-cursor" style={cursorStyle} aria-hidden="true">
          <svg
            className="video-cursor-circle"
            width="140"
            height="140"
            viewBox="0 0 140 140"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="70" cy="70" r="69.5" stroke="white" />
          </svg>

          <div className="video-cursor-content">
            <svg
              className="cursor-icon"
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_6_6883)">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M11.9 0.700007C10.1934 2.40661 7.0833 2.4073 5.37599 0.699999L4.67599 0L3.27599 1.4L3.97599 2.1C5.21779 3.3418 6.92719 3.962 8.6373 3.96271L0 12.6L1.4 14L10.0373 5.36271C10.038 7.0728 10.6582 8.7822 11.9 10.024L12.6 10.724L14 9.324L13.3 8.624C11.5927 6.91671 11.5934 3.80661 13.3 2.10001L14 1.40001L12.6 7.34328e-06L11.9 0.700007Z"
                  fill="white"
                />
              </g>
              <defs>
                <clipPath id="clip0_6_6883">
                  <rect width="14" height="14" fill="white" />
                </clipPath>
              </defs>
            </svg>

            <div className="video-cursor-text">
              Дивитися
              <br />
              відео
            </div>
          </div>

          <svg
            className="video-cursor-dot"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="8" cy="8" r="8" fill="#F2B202" />
          </svg>
        </div>
      )}
    </div>
  );
}

