'use client';

import React, { useState } from 'react';
import CustomDatePicker from './CustomDatePicker';
import './HeroForm.css';

const HeroForm = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [formData, setFormData] = useState({
    heroName: '',
    location: '',
    birthDate: '',
    deathDate: '',
    telegram: '',
    phone: '+380 ',
    heroStory: '',
  });
  const [errors, setErrors] = useState({});

  const formatPhoneNumber = (value) => {
    // Удаляем все кроме цифр
    const numbers = value.replace(/\D/g, '');
    
    // Если начинается с 380, оставляем
    // Если начинается с 0, заменяем на 380
    // Иначе добавляем 380
    let formatted = numbers;
    if (numbers.startsWith('380')) {
      formatted = numbers;
    } else if (numbers.startsWith('0')) {
      formatted = '380' + numbers.slice(1);
    } else if (numbers.length > 0) {
      formatted = '380' + numbers;
    }
    
    // Обрезаем до 12 цифр (380 + 9 цифр)
    formatted = formatted.slice(0, 12);
    
    // Форматируем: +380 XX XXX XX XX
    if (formatted.length > 0) {
      let result = '+380';
      if (formatted.length > 3) {
        result += ' ' + formatted.slice(3, 5);
      }
      if (formatted.length > 5) {
        result += ' ' + formatted.slice(5, 8);
      }
      if (formatted.length > 8) {
        result += ' ' + formatted.slice(8, 10);
      }
      if (formatted.length > 10) {
        result += ' ' + formatted.slice(10, 12);
      }
      return result;
    }
    return '+380 ';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'phone') {
      const formatted = formatPhoneNumber(value);
      setFormData({
        ...formData,
        [name]: formatted,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
    
    // Clear error for this field
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleDateChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleFileUpload = async (e) => {
    const files = Array.from(e.target.files);
    
    if (uploadedFiles.length + files.length > 10) {
      setError('Максимум 10 фото');
      return;
    }

    const validFiles = files.filter(file => {
      if (file.size > 3 * 1024 * 1024) {
        setError(`Файл ${file.name} перевищує 3 МБ`);
        return false;
      }
      if (!file.type.startsWith('image/')) {
        setError(`Файл ${file.name} не є зображенням`);
        return false;
      }
      return true;
    });

    setUploadedFiles([...uploadedFiles, ...validFiles]);
  };

  const removeFile = (index) => {
    setUploadedFiles(uploadedFiles.filter((_, i) => i !== index));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.heroName.trim()) {
      newErrors.heroName = 'Обов\'язкове поле';
    }

    if (!formData.location.trim()) {
      newErrors.location = 'Обов\'язкове поле';
    }

    if (!formData.birthDate) {
      newErrors.birthDate = 'Обов\'язкове поле';
    }

    if (!formData.deathDate) {
      newErrors.deathDate = 'Обов\'язкове поле';
    }

    if (!formData.phone.trim() || formData.phone === '+380 ') {
      newErrors.phone = 'Обов\'язкове поле';
    } else if (formData.phone.replace(/\D/g, '').length !== 12) {
      newErrors.phone = 'Некоректний номер телефону';
    }

    if (!formData.heroStory.trim()) {
      newErrors.heroStory = 'Обов\'язкове поле';
    } else if (formData.heroStory.length < 350) {
      newErrors.heroStory = 'Мінімум 350 символів';
    } else if (formData.heroStory.length > 1500) {
      newErrors.heroStory = 'Максимум 1500 символів';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) {
      setError('Будь ласка, виправте помилки у формі');
      return;
    }

    setLoading(true);

    try {
      // Upload media files first
      let mediaUrls = [];
      if (uploadedFiles.length > 0) {
        const formDataFiles = new FormData();
        uploadedFiles.forEach(file => {
          formDataFiles.append('files', file);
        });

        try {
          const uploadResponse = await fetch('/api/submissions/upload', {
            method: 'POST',
            body: formDataFiles,
          });

          if (uploadResponse.ok) {
            const uploadData = await uploadResponse.json();
            mediaUrls = uploadData.uploadedFiles.map(file => file.url);
          } else {
            console.error('Upload failed:', await uploadResponse.text());
          }
        } catch (uploadError) {
          console.error('Error uploading files:', uploadError);
        }
      }

      const response = await fetch('/api/submissions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'hero-submission',
          name: formData.heroName,
          phone: formData.phone,
          telegramUsername: formData.telegram,
          heroName: formData.heroName,
          residence: formData.location,
          birthDate: formData.birthDate,
          deathDate: formData.deathDate,
          heroStory: formData.heroStory,
          mediaFiles: mediaUrls,
        }),
      });

      if (response.ok) {
        setSuccess(true);
        // Полностью очищаем форму
        setFormData({
          heroName: '',
          location: '',
          birthDate: '',
          deathDate: '',
          telegram: '',
          phone: '+380 ',
          heroStory: '',
        });
        setUploadedFiles([]);
        setErrors({});
        setError('');
        
        // Очищаем input для файлов
        const fileInput = document.querySelector('input[type="file"]');
        if (fileInput) {
          fileInput.value = '';
        }
        
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

      <label className="photo-upload-section">
        <input 
          type="file" 
          accept="image/*" 
          multiple 
          onChange={handleFileUpload}
          style={{ display: 'none' }}
        />
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
          <div className="upload-hint">Ви можете додати до 10 фото, максимальна вага фото 3 мб ({uploadedFiles.length}/10)</div>
        </div>
      </label>

      {uploadedFiles.length > 0 && (
        <div style={{ marginBottom: '30px' }}>
          <div className="files-header">
            <div className="files-title">Завантажені фото</div>
            <div className="files-count">{uploadedFiles.length}/10</div>
          </div>
          <div className="uploaded-files">
            {uploadedFiles.map((file, index) => (
              <div key={index} className="uploaded-file">
                <img src={URL.createObjectURL(file)} alt={file.name} />
                <div className="file-count">#{index + 1}</div>
                <button type="button" onClick={() => removeFile(index)} className="remove-file" title="Видалити">
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

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
        <div className="form-field">
          <input 
            type="text" 
            name="heroName"
            className={`form-input ${errors.heroName ? 'error' : ''}`}
            placeholder="Прізвище, ім'я, по батькові*" 
            value={formData.heroName}
            onChange={handleChange}
          />
          {errors.heroName && <div className="error-message">{errors.heroName}</div>}
        </div>

        <div className="form-field">
          <input 
            type="text" 
            name="location"
            className={`form-input ${errors.location ? 'error' : ''}`}
            placeholder="Місце проживання*" 
            value={formData.location}
            onChange={handleChange}
          />
          {errors.location && <div className="error-message">{errors.location}</div>}
        </div>

        <div className="form-field">
          <CustomDatePicker
            value={formData.birthDate}
            onChange={(value) => handleDateChange('birthDate', value)}
            placeholder="Дата народження*"
          />
          {errors.birthDate && <div className="error-message">{errors.birthDate}</div>}
        </div>

        <div className="form-field">
          <CustomDatePicker
            value={formData.deathDate}
            onChange={(value) => handleDateChange('deathDate', value)}
            placeholder="Дата смерті*"
          />
          {errors.deathDate && <div className="error-message">{errors.deathDate}</div>}
        </div>
        <div className="form-field">
          <input 
            type="text" 
            name="telegram"
            className="form-input" 
            placeholder="Ваш Telegram username" 
            value={formData.telegram}
            onChange={handleChange}
          />
        </div>

        <div className="form-field">
          <input 
            type="tel" 
            name="phone"
            className={`form-input ${errors.phone ? 'error' : ''}`}
            placeholder="+380 XX XXX XX XX*" 
            value={formData.phone}
            onChange={handleChange}
          />
          {errors.phone && <div className="error-message">{errors.phone}</div>}
        </div>
        
        <div className="form-field textarea-wrapper">
          <label className="textarea-label">Історія про Героя*</label>
          <textarea 
            name="heroStory"
            className={`form-textarea ${errors.heroStory ? 'error' : ''}`}
            placeholder="Історія про Героя*"
            value={formData.heroStory}
            onChange={handleChange}
          ></textarea>
          <div className={`textarea-hint ${errors.heroStory ? 'error' : ''}`}>
            {errors.heroStory ? errors.heroStory : `від 350 до 1500 символів (${formData.heroStory.length}/1500)`}
          </div>
        </div>

        <div style={{ marginTop: '40px', width: '100%' }}>
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
        </div>
      </form>
    </div>
  );
};

export default HeroForm;
