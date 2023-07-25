import React, { useState, useEffect } from 'react';
import logo from './assets2/connoisseur-logo.png';
import './LoginPage.css';
import { Helmet } from 'react-helmet';
import { Link } from "react-router-dom";

export default function LoginPage() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    setIsFormValid(firstName !== '' && lastName !== '' && mobileNumber.length === 10);
  }, [firstName, lastName, mobileNumber]);

  const handleFirstNameChange = (e) => {
    const value = e.target.value;
    // Remove spaces from the first name
    const formattedValue = value.replace(/\s/g, '');
    setFirstName(formattedValue);
  };

  const handleLastNameChange = (e) => {
    const value = e.target.value;
    // Remove spaces from the last name
    const formattedValue = value.replace(/\s/g, '');
    setLastName(formattedValue);
  };

  const handleMobileNumberChange = (e) => {
    const value = e.target.value;
    // Remove non-digit characters from the mobile number
    const formattedValue = value.replace(/\D/g, '');
    // Limit the mobile number to 10 digits
    const limitedValue = formattedValue.slice(0, 10);
    setMobileNumber(limitedValue);
  };
  
  const handleLogin = () => {
    // Perform validation checks before login
    if (firstName.length === 0 || lastName.length === 0 || mobileNumber.length !== 10) {
      alert('Please fill in all the required fields with valid data.');
      return;
    }

    // Perform login action
    // ...
  };

  return (
    <div className='container'>
      <Helmet>
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link rel='preconnect' href='https://fonts.gstatic.com' crossorigin />
        <link href='https://fonts.googleapis.com/css2?family=Cairo:wght@700&display=swap' rel='stylesheet' />
      </Helmet>
      <div className='logo-img'><img src={logo} alt='Logo' /></div>
      <div className='required-fields'>
        <div className='firstName'>
          <input
            placeholder='First Name'
            value={firstName}
            onChange={handleFirstNameChange}
            required
          />
        </div>
        <div className='mobileNumber'>
          <input
            placeholder='Last Name'
            value={lastName}
            onChange={handleLastNameChange}
            required
          />
        </div>
        <div className='lastName'>
          <input
            placeholder='Mobile Number'
            value={mobileNumber}
            onChange={handleMobileNumberChange}
            required
          />
        </div>
      </div>
      <div className='btn-div'>
      <Link to = '/menu'><button className={`login-btn ${isFormValid ? '' : 'disabled'}`} onClick={handleLogin} disabled={!isFormValid}>
            <font className='login-font'>LOGIN</font>
      </button></Link>
      </div>
    </div>
  );
}
