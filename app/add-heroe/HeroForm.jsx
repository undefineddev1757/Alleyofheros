'use client';

import React, { useState } from 'react';
import './HeroForm.css';

const HeroForm = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    heroName: '',
    location: '',
    birthDate: '',
    deathDate: '',
    telegram: '',
    phone: '',
    heroStory: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validation
    if (!formData.heroName || !formData.phone || !formData.heroStory) {
      setError('Будь ласка, заповніть всі обов\'язкові поля');
      setLoading(false);
      return;
    }

    if (formData.heroStory.length < 350 || formData.heroStory.length > 1500) {
      setError('Історія повинна містити від 350 до 1500 символів');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/submissions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'hero-submission',
          name: formData.heroName,
          phone: formData.phone,
          email: formData.telegram,
          heroName: formData.heroName,
          heroStory: `Місце проживання: ${formData.location}
Дата народження: ${formData.birthDate}
Дата смерті: ${formData.deathDate}

${formData.heroStory}`,
        }),
      });

      if (response.ok) {
        setSuccess(true);
        setFormData({
          heroName: '',
          location: '',
          birthDate: '',
          deathDate: '',
          telegram: '',
          phone: '',
          heroStory: '',
        });
        setTimeout(() => setSuccess(false), 5000);
      } else {
        setError('Помилка при відправці. Спробуйте ще раз.');
      }
    } catch (err) {
      setError('Помилка при відправці. Спробуйте ще раз.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="hero-form-container">
      <svg className="background-pattern" width="520" height="604" viewBox="0 0 520 604" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path opacity="0.5" fillRule="evenodd" clipRule="evenodd" d="M229.303 222.535L206.985 222.547L229.303 282.434V420.765H183.372L159.015 377.932L94.2 377.884V377.86L118.617 334.943V334.906H136.266L114.323 296.375H151.312L73.3589 204.778L188.412 228.695L151.505 164.833L39.236 164.82V122.833L3.18885e-05 122.845L15.5617 164.82H4.5L67.4682 334.906L53.1297 334.943V377.86L31.904 377.848V420.778L74.2706 420.789L98.7 463.706H141.223V506.6H272.223L243.493 539.852V604H288.567V539.852L317.297 506.6H331.531L302.801 539.852V604H347.875V539.852L376.605 506.6H390.839L362.11 539.852V604H407.183V539.852L435.913 506.6H565.414V463.706H607.602L632.39 420.789H590.803L615.97 353.553L654.095 331.234L676.821 237.247L669.816 209.701L680 182.491H662.902L662.899 182.479L647.424 121.71L569.686 66.0364L569.698 80.3626L637.633 128.595L651.348 182.479L588.092 182.455L607.397 130.37H558.743V182.443L558.756 182.455H536.391V420.778H422.154L503.838 202.543L423.977 202.507V202.483L443.282 150.41L394.642 150.397V202.494H372.276V244.047H366.625L366.612 2.41563L348.327 44.439H358.154V244.047H338.56L355.695 274.475H358.154V420.778H330.509V222.51H307.821V170.425L259.179 170.436L278.484 222.499V222.522L237.774 222.535V42.0355H247.601L229.303 0V222.535ZM372.276 420.778H366.625V274.475H372.276V420.778ZM280.872 420.765H237.774V305.144L280.872 420.765ZM665.302 237.307L644.377 323.854L622.24 336.803L662.95 228.042L665.302 237.307Z" fill="white"/>
      </svg>

      <div className="header-section">
        <h1 className="page-title">Додати героя</h1>
        <p className="page-subtitle">Ми зберігаємо пам'ять не про втрату, а про життя</p>
      </div>

      <div className="photo-upload-section">
        <svg className="upload-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clipPath="url(#clip0_101_4562)">
            <path d="M1.5625 12.2129V17.6426C1.56276 18.0731 1.91313 18.4238 2.34375 18.4238H17.6562C18.0869 18.4238 18.4372 18.0731 18.4375 17.6426V12.2129H20V17.6426C19.9997 18.9347 18.9484 19.9863 17.6562 19.9863H2.34375C1.05157 19.9863 0.000264793 18.9347 0 17.6426V12.2129H1.5625Z" fill="#17120E"/>
            <path d="M14.8545 4.86914L13.75 5.97363L10.7812 3.00488V15.1816H9.21875V3.00488L6.25 5.97363L5.14551 4.86914L10 0.0136719L14.8545 4.86914Z" fill="#17120E"/>
          </g>
          <defs>
            <clipPath id="clip0_101_4562">
              <rect width="20" height="20" fill="white"/>
            </clipPath>
          </defs>
        </svg>
        <div className="upload-text">
          <div className="upload-label">Додайте фото</div>
          <div className="upload-hint">Ви можете додати до 10 фото, максимальна вага фото 3 мб</div>
        </div>
      </div>

      {success && (
        <div style={{ padding: '16px', marginBottom: '20px', backgroundColor: '#10b981', color: 'white', borderRadius: '8px', textAlign: 'center' }}>
          Заявка успішно відправлена на модерацію!
        </div>
      )}

      {error && (
        <div style={{ padding: '16px', marginBottom: '20px', backgroundColor: '#ef4444', color: 'white', borderRadius: '8px', textAlign: 'center' }}>
          {error}
        </div>
      )}

      <form className="hero-form" onSubmit={handleSubmit}>
        <input 
          type="text" 
          name="heroName"
          className="form-input" 
          placeholder="Прізвище, ім'я, по батькові*" 
          value={formData.heroName}
          onChange={handleChange}
          required
        />
        <input 
          type="text" 
          name="location"
          className="form-input" 
          placeholder="Місце проживання*" 
          value={formData.location}
          onChange={handleChange}
        />
        <input 
          type="text" 
          name="birthDate"
          className="form-input" 
          placeholder="Дата народження*" 
          value={formData.birthDate}
          onChange={handleChange}
        />
        <input 
          type="text" 
          name="deathDate"
          className="form-input" 
          placeholder="Дата смерті*" 
          value={formData.deathDate}
          onChange={handleChange}
        />
        <input 
          type="text" 
          name="telegram"
          className="form-input" 
          placeholder="Ваш Telegram username" 
          value={formData.telegram}
          onChange={handleChange}
        />
        <input 
          type="tel" 
          name="phone"
          className="form-input" 
          placeholder="Ваш мобільний телефон*" 
          value={formData.phone}
          onChange={handleChange}
          required
        />
        
        <div className="textarea-wrapper">
          <label className="textarea-label">Історія про Героя*</label>
          <textarea 
            name="heroStory"
            className="form-textarea" 
            placeholder="Історія про Героя*"
            value={formData.heroStory}
            onChange={handleChange}
            required
          ></textarea>
          <div className="textarea-hint">
            від 350 до 1500 символів ({formData.heroStory.length}/1500)
          </div>
        </div>

        <button type="submit" className="submit-button" disabled={loading}>
          <span>{loading ? 'Відправка...' : 'Відправити на модерацію'}</span>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_101_4540)">
              <path fillRule="evenodd" clipRule="evenodd" d="M13.3 11.9C11.5934 10.1934 11.5927 7.0833 13.3 5.37599L14 4.67599L12.6 3.27599L11.9 3.97599C10.6582 5.21779 10.038 6.92719 10.0373 8.6373L1.4 6.11955e-08L7.89182e-07 1.4L8.63729 10.0373C6.9272 10.038 5.2178 10.6582 3.976 11.9L3.276 12.6L4.676 14L5.376 13.3C7.08329 11.5927 10.1934 11.5934 11.9 13.3L12.6 14L14 12.6L13.3 11.9Z" fill="#17120E"/>
            </g>
            <defs>
              <clipPath id="clip0_101_4540">
                <rect width="14" height="14" fill="white" transform="translate(14) rotate(90)"/>
              </clipPath>
            </defs>
          </svg>
        </button>
      </form>
    </div>
  );
};

export default HeroForm;
