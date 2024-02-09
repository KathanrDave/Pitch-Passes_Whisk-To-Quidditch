import React, { useState, useEffect } from 'react';
import './FlipCountdownTimer.css';

const CountdownTimer = ({ targetDateTime }) => {
  const calculateTimeLeft = () => {
    const targetDate = new Date(targetDateTime).getTime();
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance < 0) {
      // Countdown has ended
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
      };
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    return {
      days,
      hours,
      minutes,
      seconds
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="countdown-timer">
      <div className="countdown-digit">
        <div className="countdown-value">{timeLeft.days.toString().padStart(2, '0')}</div>
        <div className="countdown-label">Days</div>
      </div>
      <div className="countdown-digit">
        <div className="countdown-value">{timeLeft.hours.toString().padStart(2, '0')}</div>
        <div className="countdown-label">Hours</div>
      </div>
      <div className="countdown-digit">
        <div className="countdown-value">{timeLeft.minutes.toString().padStart(2, '0')}</div>
        <div className="countdown-label">Minutes</div>
      </div>
      <div className="countdown-digit">
        <div className="countdown-value">{timeLeft.seconds.toString().padStart(2, '0')}</div>
        <div className="countdown-label">Seconds</div>
      </div>
    </div>
  );
};

export default CountdownTimer;
