"use client";

import React from 'react';
import Link from 'next/link';
import './FormStoryBlock.css';

const FormStoryBlock = ({ title = 'у кожного — свій захисник, своя історія', subtitle = 'Поділись історією свого героя', buttonText = 'Заповнити форму' }) => {
  return (
    <div className="form-story-block">
      <svg className="background-pattern" width="480" height="426" viewBox="0 0 480 426" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path opacity="0.1" fillRule="evenodd" clipRule="evenodd" d="M161.861 156.953L146.107 156.962L161.861 199.2V296.765H129.439L112.246 266.555L66.4941 266.521V266.504L83.7298 236.235V236.209H96.1879L80.6983 209.033H106.809L51.7827 144.429L132.997 161.298L106.945 116.256L27.696 116.247V86.6335L0 86.6425L10.9847 116.247H3.17645L47.6246 236.209L37.5033 236.235V266.504L22.5205 266.495V296.774L52.4263 296.782L69.6706 327.051H99.6866V357.304H192.157L171.878 380.757V426H203.695V380.757L223.974 357.304H234.022L213.742 380.757V426H245.559V380.757L265.839 357.304H275.886L255.607 380.757V426H287.424V380.757L307.703 357.304H399.116V327.051H428.895L446.393 296.782H417.038L434.803 249.36L461.714 233.619L477.756 167.329L472.811 147.902L480 128.711H467.931L467.929 128.702L457.005 85.8416L402.131 46.5753L402.14 56.6796L450.094 90.698L459.775 128.702L415.124 128.685L428.751 91.9497H394.407V128.677L394.416 128.685H378.629V296.774H297.991L355.651 142.853L299.278 142.828V142.811L312.905 106.084L278.571 106.075V142.819H262.783V172.126H258.794L258.785 1.70374L245.878 31.3427H252.815V172.126H238.983L251.078 193.586H252.815V296.774H233.301V156.936H217.285V120.201L182.95 120.208L196.577 156.928V156.944L167.84 156.953V29.6476H174.777L161.861 0V156.953ZM262.783 296.774H258.794V193.586H262.783V296.774ZM198.263 296.765H167.84V215.217L198.263 296.765ZM469.625 167.372L454.854 228.413L439.229 237.546L467.965 160.838L469.625 167.372Z" fill="#17120E"/>
      </svg>

      <div className="medal-container">
        <img className="medal-image" src="https://api.builder.io/api/v1/image/assets/TEMP/f9b2c2987767b5bf187c44e52a13219872653ccb?width=1120" alt="" />
      </div>

      <div className="content-container">
        <svg className="quote-icon" width="32" height="24" viewBox="0 0 32 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clipPath="url(#clip0_104_4577)">
            <path d="M13.2 5.92928H11.9363C8.56616 5.92928 7.16172 7.34116 6.88084 10.7293H13.2V24H0V13.2707C-7.89888e-07 4.23544 4.4936 2.40508e-05 11.234 0H13.2V5.92928ZM32 5.92928H30.7363C27.3662 5.92928 25.9617 7.34116 25.6808 10.7293H32V24H18.8V13.2707C18.8 4.23544 23.2936 2.40508e-05 30.034 0H32V5.92928Z" fill="#F2B202"/>
          </g>
          <defs>
            <clipPath id="clip0_104_4577">
              <rect width="32" height="24" fill="white"/>
            </clipPath>
          </defs>
        </svg>

        <h1 className="main-heading">{title}</h1>

        <p className="subheading">{subtitle}</p>

        <Link href="/add-heroe" className="form-button">
          <span className="button-text">{buttonText}</span>
          <svg className="button-icon" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_168_3433)">
              <path fillRule="evenodd" clipRule="evenodd" d="M13.3 11.9C11.5934 10.1934 11.5927 7.0833 13.3 5.37599L14 4.67599L12.6 3.27599L11.9 3.97599C10.6582 5.21779 10.038 6.92719 10.0373 8.6373L1.4 6.11955e-08L5.50763e-07 1.4L8.63729 10.0373C6.9272 10.038 5.2178 10.6582 3.976 11.9L3.276 12.6L4.676 14L5.376 13.3C7.08329 11.5927 10.1934 11.5934 11.9 13.3L12.6 14L14 12.6L13.3 11.9Z" fill="#17120E"/>
            </g>
            <defs>
              <clipPath id="clip0_168_3433">
                <rect width="14" height="14" fill="white" transform="translate(14) rotate(90)"/>
              </clipPath>
            </defs>
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default FormStoryBlock;
