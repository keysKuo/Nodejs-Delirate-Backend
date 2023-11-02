import '../assets/otp.css';
import { useLocation } from 'react-router-dom';
import { useState, useRef } from 'react';
import { Alert } from 'react-ui';
import axios from 'axios';


  export default function OTPVerifyScreen() {
    const location = useLocation();
    const token = location.state;
    console.log(token)
    const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
    const [otp, setOTP] = useState(["", "", "", ""]);
    const [msg, setMsg] = useState('');

    const apiUrl = 'http://localhost:8080/account/confirm_otp';

    const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json', // or any other content type
      };
    
    const axiosInstance = axios.create({
      headers: headers,
    });

    const fetchData = async () => {
        try {
            const response = await axiosInstance.post(apiUrl, {
                code: otp.join("")
            });
            
            const data = response.data;
            console.log(response)
            if(data.success) {
              localStorage.setItem('token', token);
              window.location.href = '/';
            }
            else{
              setMsg(data.msg +  "!")
            }
            
        }
        catch(err) {
            console.log('Error: ' + err)
            setMsg(err.msg +  "!")
        }
    }

    const handleOTPInputChange = (index, text) => {
      const updatedOTP = [...otp];
      updatedOTP[index] = text;
      setOTP(updatedOTP);

      if (text === "" && index > 0) {
        // Move focus back to the previous input field when text is empty
        inputRefs[index - 1].current.focus();
      } else if (text !== "" && index < 3) {
        // Move focus to the next input field
        inputRefs[index + 1].current.focus();
      }
    };

    return (
      <div className="card">
        <div className="card-header">
          {/* <img src="./smartphone-2.svg" alt="smartphone" /> */}
          <div className="header-text">Two-Factor Verification</div>
          <div className="header-subtext">
            Enter the verification code we sent to
          </div>
          <div className="verification-number">nk******@gmail.com</div>
        </div>
        <form className="otp-conatiner">
          <div className="otp-subtext">Type your 4 digit security code</div>
          <div className="otp-inputs">
            {otp.map((item, index) => {
              return (
                <input
                  className="otp-input"
                  key={index}
                  type="text"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  maxLength={1}
                  value={item}
                  onChange={(event) => {
                    handleOTPInputChange(index, event.target.value)
                  }}
                  ref={inputRefs[index]}
                />
              );
            })}
          </div>
          <Alert css={{ color: '#C94E4E'}} variant="warning">{msg}</Alert>
          <button onClick={fetchData} type="button" className="submit-btn">
            Submit
          </button>
        </form>
        <div className="otp-resend">Didn’t get the code ? Resend or Call Us</div>
      </div>
    );
  }