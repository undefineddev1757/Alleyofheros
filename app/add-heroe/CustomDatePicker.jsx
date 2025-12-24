'use client';

import React, { useState, useRef, useEffect } from 'react';
import './CustomDatePicker.css';

const CustomDatePicker = ({ value, onChange, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const pickerRef = useRef(null);

  const months = [
    { value: '01', name: 'Січень' },
    { value: '02', name: 'Лютий' },
    { value: '03', name: 'Березень' },
    { value: '04', name: 'Квітень' },
    { value: '05', name: 'Травень' },
    { value: '06', name: 'Червень' },
    { value: '07', name: 'Липень' },
    { value: '08', name: 'Серпень' },
    { value: '09', name: 'Вересень' },
    { value: '10', name: 'Жовтень' },
    { value: '11', name: 'Листопад' },
    { value: '12', name: 'Грудень' },
  ];

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i);

  useEffect(() => {
    if (value) {
      const [day, month, year] = value.split('.');
      setSelectedDay(day);
      setSelectedMonth(month);
      setSelectedYear(year);
    } else {
      // Автоматически подтягиваем сегодняшнюю дату
      const today = new Date();
      const day = String(today.getDate()).padStart(2, '0');
      const month = String(today.getMonth() + 1).padStart(2, '0');
      const year = String(today.getFullYear());
      setSelectedDay(day);
      setSelectedMonth(month);
      setSelectedYear(year);
    }
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Автоскролл к выбранному элементу при открытии
  useEffect(() => {
    if (isOpen && selectedDay && selectedMonth && selectedYear) {
      setTimeout(() => {
        const scrollToCenter = (scrollElement, selectedValue, items) => {
          if (!scrollElement) return;
          const index = items.findIndex(item => 
            item === selectedValue || item.value === selectedValue
          );
          if (index !== -1) {
            scrollElement.scrollTop = index * 44;
          }
        };

        const dayScroll = document.getElementById('day-scroll');
        const monthScroll = document.getElementById('month-scroll');
        const yearScroll = document.getElementById('year-scroll');

        if (dayScroll) scrollToCenter(dayScroll, selectedDay, days);
        if (monthScroll) scrollToCenter(monthScroll, selectedMonth, months);
        if (yearScroll) scrollToCenter(yearScroll, selectedYear, years.map(y => String(y)));
      }, 50);
    }
  }, [isOpen]);

  const handleConfirm = () => {
    if (selectedDay && selectedMonth && selectedYear) {
      const formattedDate = `${selectedDay}.${selectedMonth}.${selectedYear}`;
      onChange(formattedDate);
      setIsOpen(false);
    }
  };

  const getDaysInMonth = () => {
    if (!selectedMonth || !selectedYear) return 31;
    return new Date(selectedYear, selectedMonth, 0).getDate();
  };

  const days = Array.from({ length: getDaysInMonth() }, (_, i) => 
    String(i + 1).padStart(2, '0')
  );

  return (
    <div className="custom-date-picker" ref={pickerRef}>
      <input
        type="text"
        className="form-input"
        placeholder={placeholder}
        value={value}
        readOnly
        onClick={() => setIsOpen(!isOpen)}
      />
      
      {isOpen && (
        <div className="date-picker-dropdown">
          <div className="picker-columns">
            <div className="picker-column">
              <div className="picker-header">День</div>
              <div className="picker-scroll" id="day-scroll">
                <div style={{ height: '88px' }}></div>
                {days.map((day) => (
                  <div
                    key={day}
                    className={`picker-item ${selectedDay === day ? 'selected' : ''}`}
                    onClick={() => setSelectedDay(day)}
                  >
                    {day}
                  </div>
                ))}
                <div style={{ height: '88px' }}></div>
              </div>
            </div>

            <div className="picker-column">
              <div className="picker-header">Місяць</div>
              <div className="picker-scroll" id="month-scroll">
                <div style={{ height: '88px' }}></div>
                {months.map((month) => (
                  <div
                    key={month.value}
                    className={`picker-item ${selectedMonth === month.value ? 'selected' : ''}`}
                    onClick={() => setSelectedMonth(month.value)}
                  >
                    {month.name}
                  </div>
                ))}
                <div style={{ height: '88px' }}></div>
              </div>
            </div>

            <div className="picker-column">
              <div className="picker-header">Рік</div>
              <div className="picker-scroll" id="year-scroll">
                <div style={{ height: '88px' }}></div>
                {years.map((year) => (
                  <div
                    key={year}
                    className={`picker-item ${selectedYear === String(year) ? 'selected' : ''}`}
                    onClick={() => setSelectedYear(String(year))}
                  >
                    {year}
                  </div>
                ))}
                <div style={{ height: '88px' }}></div>
              </div>
            </div>
          </div>

          <button type="button" className="confirm-button" onClick={handleConfirm}>
            Підтведити
          </button>
        </div>
      )}
    </div>
  );
};

export default CustomDatePicker;

