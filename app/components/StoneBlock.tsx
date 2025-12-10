import './StoneBlock.css';

const StoneBlock = (): JSX.Element => {
  return (
    <div className="stone-block">
      <svg className="decorative-pattern" width="440" height="358" viewBox="0 0 440 358" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path opacity="0.5" fillRule="evenodd" clipRule="evenodd" d="M318.139 157.259L333.893 157.268L318.139 199.589V297.343H350.561L367.754 267.074L413.506 267.04V267.023L396.27 236.695V236.669H383.812L399.302 209.44H373.191L428.217 144.711L347.003 161.612L373.055 116.482L452.304 116.474V86.8025L480 86.8113L469.015 116.474H476.823L432.376 236.669L442.497 236.695V267.023L457.479 267.015V297.352L427.574 297.36L410.329 327.688H380.314V358H80.884V327.688H51.1048L33.6069 297.36H62.9622L45.2017 249.849L18.2856 234.074L2.24442 167.655L7.19054 148.185L0 128.962H12.069L22.9946 86.0089L77.8687 46.6663L77.86 56.79L29.9058 90.8746L20.2251 128.953L64.8763 128.936L51.2489 92.1288H85.5929V128.928L85.5842 128.936H101.371V297.352H182.009L124.349 143.131L180.722 143.106V143.089L167.095 106.291L201.429 106.282V143.097H217.217V172.462H221.206L221.215 1.70719L234.122 31.4039H227.185V172.462H241.017L228.922 193.963H227.185V297.352H246.699V157.241H262.715V120.435L297.05 120.443L283.423 157.234V157.25L312.16 157.259V29.7053H305.223L318.139 0V157.259ZM217.217 297.352H221.206V193.963H217.217V297.352ZM281.737 297.343H312.16V215.636L281.737 297.343ZM10.3751 167.698L25.1459 228.859L40.7721 238.009L12.0351 161.151L10.3751 167.698Z" fill="#F6F3E8"/>
      </svg>

      <img 
        className="stone-image" 
        src="https://api.builder.io/api/v1/image/assets/TEMP/9a8b7208bbde8d603926141c3ee80cbf2aba50e6?width=1360" 
        alt="" 
      />

      <div className="content-wrapper">
        <svg className="quote-icon-stone" width="32" height="24" viewBox="0 0 32 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clipPath="url(#clip0_4_4085)">
            <path d="M13.2 5.92928H11.9363C8.56616 5.92928 7.16172 7.34116 6.88084 10.7293H13.2V24H0V13.2707C-7.89888e-07 4.23544 4.4936 2.40508e-05 11.234 0H13.2V5.92928ZM32 5.92928H30.7363C27.3662 5.92928 25.9617 7.34116 25.6808 10.7293H32V24H18.8V13.2707C18.8 4.23544 23.2936 2.40508e-05 30.034 0H32V5.92928Z" fill="#F6F3E8"/>
          </g>
          <defs>
            <clipPath id="clip0_4_4085">
              <rect width="32" height="24" fill="white"/>
            </clipPath>
          </defs>
        </svg>

        <h1 className="hero-title">Кожен герой — не лише ім'я</h1>

        <p className="hero-subtitle1">Поділись історією свого героя</p>

        <button className="form-button">
          <span className="button-text">Заповнити форму</span>
          <svg className="button-icon" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_4_5549)">
              <path fillRule="evenodd" clipRule="evenodd" d="M13.3 11.9C11.5934 10.1934 11.5927 7.0833 13.3 5.37599L14 4.67599L12.6 3.27599L11.9 3.97599C10.6582 5.21779 10.038 6.92719 10.0373 8.6373L1.4 6.11959e-08L7.89182e-07 1.4L8.63729 10.0373C6.9272 10.038 5.2178 10.6582 3.976 11.9L3.276 12.6L4.676 14L5.376 13.3C7.08329 11.5927 10.1934 11.5934 11.9 13.3L12.6 14L14 12.6L13.3 11.9Z" fill="#17120E"/>
            </g>
            <defs>
              <clipPath id="clip0_4_5549">
                <rect width="14" height="14" fill="white" transform="translate(14) rotate(90)"/>
              </clipPath>
            </defs>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default StoneBlock;
