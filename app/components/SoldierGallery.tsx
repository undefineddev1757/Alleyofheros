import './SoldierGallery.css';

export default function SoldierGallery(): JSX.Element {
  return (
    <div className="soldier-gallery">
      <svg className="decorative-svg" width="470" height="460" viewBox="0 0 470 460" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M287.907 176.849L305.629 176.858L287.907 224.451V334.383H324.381L343.723 300.343L395.194 300.305V300.286L375.804 266.18V266.15H361.789L379.214 235.53H349.84L411.744 162.737L320.379 181.745L349.687 130.993L438.842 130.983V97.6152L470 97.6254L457.642 130.983H466.427L416.422 266.15L427.809 266.18V300.286L444.664 300.277V334.393L411.02 334.402L391.621 368.508H357.853V402.596H253.823L276.638 429.021V480H240.844V429.021L218.029 402.596H206.726L229.54 429.021V480H193.746V429.021L170.932 402.596H159.628L182.442 429.021V480H146.648V429.021L123.834 402.596H20.9947V368.508H-12.5071L-32.1924 334.402H0.83263L-19.153 280.969L-49.4285 263.232L-67.4752 188.54L-61.9125 166.65L-70 145.026H-56.4222L-56.4199 145.017L-44.1311 96.7229L17.6022 52.4793L17.5925 63.8643L-36.3559 102.195L-47.2468 145.017L2.98576 144.998L-12.345 103.605H26.292V144.988L26.2824 144.998H44.0421V334.393H134.76L69.893 160.961L133.312 160.932V160.914L117.982 119.531L156.608 119.521V160.923H174.369V193.945H178.857L178.867 1.91971L193.388 35.3157H185.583V193.945H201.144L187.537 218.125H185.583V334.393H207.537V176.829H225.554V135.437L264.182 135.446L248.851 176.82V176.839L281.18 176.849V33.4057H273.376L287.907 0V176.849ZM174.369 334.393H178.857V218.125H174.369V334.393ZM246.954 334.383H281.18V242.498L246.954 334.383ZM-58.328 188.588L-41.7109 257.367L-24.1321 267.658L-56.4604 181.226L-58.328 188.588Z" fill="white"/>
      </svg>

      <div className="gallery-content">
        <div className="gallery-header">
          <h2 className="gallery-title">Галерея алеї</h2>
          <svg className="quote-icon" width="32" height="24" viewBox="0 0 32 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_77_8113)">
              <path d="M13.2 5.92928H11.9363C8.56616 5.92928 7.16172 7.34116 6.88084 10.7293H13.2V24H0V13.2707C-7.89888e-07 4.23544 4.4936 2.40508e-05 11.234 0H13.2V5.92928ZM32 5.92928H30.7363C27.3662 5.92928 25.9617 7.34116 25.6808 10.7293H32V24H18.8V13.2707C18.8 4.23544 23.2936 2.40508e-05 30.034 0H32V5.92928Z" fill="#F2B202"/>
            </g>
            <defs>
              <clipPath id="clip0_77_8113">
                <rect width="32" height="24" fill="white"/>
              </clipPath>
            </defs>
          </svg>
          <p className="gallery-description">
            Тут можна побачити фото Алеї Друзів — місця наших спогадів і можливості поділитися ними з людьми, які проходять повз та мають змогу дізнатися про наших героїв більше — не лише як про воїнів, а як про звичайних людей.
          </p>
        </div>

        <div className="gallery-grid">
          <div className="gallery-item gallery-item-top">
            <img src="https://api.builder.io/api/v1/image/assets/TEMP/85957cfe330eb7640fd964f9d3b032ba7322773c?width=1296" alt="" className="gallery-image" />
            <div className="image-overlay"></div>
            <p className="image-caption">Підпис<br />фотографії</p>
          </div>

          <div className="gallery-item gallery-item-middle">
            <img src="https://api.builder.io/api/v1/image/assets/TEMP/3cf055097bd79aeca3d09a99546aff9f45901e2b?width=1296" alt="" className="gallery-image" />
            <div className="image-overlay"></div>
            <p className="image-caption">Підпис<br />фотографії</p>
            <svg className="expand-icon" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g opacity="0.25" clipPath="url(#clip0_77_8102)">
                <path fillRule="evenodd" clipRule="evenodd" d="M13.3 11.9C11.5934 10.1934 11.5927 7.0833 13.3 5.37599L14 4.67599L12.6 3.27599L11.9 3.97599C10.6582 5.21779 10.038 6.92719 10.0373 8.6373L1.4 6.11955e-08L7.89182e-07 1.4L8.63729 10.0373C6.9272 10.038 5.2178 10.6582 3.976 11.9L3.276 12.6L4.676 14L5.376 13.3C7.08329 11.5927 10.1934 11.5934 11.9 13.3L12.6 14L14 12.6L13.3 11.9Z" fill="white"/>
              </g>
              <defs>
                <clipPath id="clip0_77_8102">
                  <rect width="14" height="14" fill="white" transform="translate(14) rotate(90)"/>
                </clipPath>
              </defs>
            </svg>
          </div>

          <div className="gallery-item gallery-item-bottom">
            <img src="https://api.builder.io/api/v1/image/assets/TEMP/c8035ea6e9c6cb7fe8454fa842d4da3897da5810?width=1296" alt="" className="gallery-image" />
            <div className="image-overlay"></div>
            <p className="image-caption">Підпис<br />фотографії</p>
            <svg className="expand-icon" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g opacity="0.25" clipPath="url(#clip0_77_8095)">
                <path fillRule="evenodd" clipRule="evenodd" d="M13.3 11.9C11.5934 10.1934 11.5927 7.0833 13.3 5.37599L14 4.67599L12.6 3.27599L11.9 3.97599C10.6582 5.21779 10.038 6.92719 10.0373 8.6373L1.4 6.11955e-08L7.89182e-07 1.4L8.63729 10.0373C6.9272 10.038 5.2178 10.6582 3.976 11.9L3.276 12.6L4.676 14L5.376 13.3C7.08329 11.5927 10.1934 11.5934 11.9 13.3L12.6 14L14 12.6L13.3 11.9Z" fill="white"/>
              </g>
              <defs>
                <clipPath id="clip0_77_8095">
                  <rect width="14" height="14" fill="white" transform="translate(14) rotate(90)"/>
                </clipPath>
              </defs>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

