import "./HeroBanner.css";

const VIDEO_SRC = "/6034431_Aerialiew_1920x1080.mp4";

export default function HeroBanner(): JSX.Element {
  return (
    <div className="hero-banner">
      <video
        className="hero-background"
        src={VIDEO_SRC}
        autoPlay
        muted
        loop
        playsInline
      />
      <div className="hero-content">
        <div className="hero-title-first">
          <span className="bracket-accent">{"{"}</span>
          <span className="title-text"> Алея</span>
        </div>
        <div className="hero-title-second">
          <span className="title-text">Друзів </span>
          <span className="bracket-accent">{"}"}</span>
        </div>
        <div className="hero-subtitle">
          Тут ми пам&apos;ятаємо не лише подвиги,
          <br />
          а й людину за ними
        </div>
      </div>
    </div>
  );
}

