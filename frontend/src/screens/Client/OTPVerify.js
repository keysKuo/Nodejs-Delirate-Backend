import '../../assets/otp.css';
import { useLocation } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { Alert } from 'react-ui';
import axios from 'axios';
import { Container } from 'semantic-ui-react';

  export default function OTPVerifyScreen() {
    const location = useLocation();
    const email = localStorage.getItem('email');

    const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
    const [ otp, setOTP] = useState(["", "", "", ""]);
    const [ msg, setMsg] = useState('');
    const [ resend, setResend ] = useState('Resend new code');
    const [ counter, setCounter ] = useState(90);
    const [ isCounting, setIsCounting ] = useState(false);
    const [ token, setToken ] = useState(location.state)
    
    console.log(token)

    useEffect(() => {
      let interval;
      
      if (isCounting) {
        interval = setInterval(() => {
          if(counter === 0) {
            setIsCounting(false);
            setResend('Resend new code')
          }
    
          setCounter(counter - 1)
          setResend(<span className='text-danger'>{counter}s</span>);
        }, 1000);
      }
  
      return () => {
        clearInterval(interval);
      };
    }, [isCounting, counter, resend]);


    const startCounting = () => {
      setIsCounting(true);
    };

    const apiUrl = 'http://localhost:8080/';


    const resendOTP = async () => {
      try {
        const response = await axios.post(apiUrl + `account/resend_otp`, {
          email: email
        })

        console.log(response);
        const data = response.data;

        if(data.success) {
          setToken(data.token);
        }
        else{
          setMsg(data.msg +  "!")
        }
      } catch (err) {
        setMsg(err.msg + '!');
      }
    }

    const fetchData = async () => {
        try {
            let headers = {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json', // or any other content type
            };

            let axiosInstance = axios.create({
              headers: headers,
            });

            const response = await axiosInstance.post(apiUrl + "account/confirm_otp", {
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
      <Container style={{ width: '50%', marginTop: '60px', height: '550px'}}>
        <div className="card border-0">
        <div className="card-header bg-white border-0">
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

        <div className="otp-resend">Didn’t get the code ? <span style={{ color: 'lightblue', cursor: 'pointer'}} onClick={() => {   
          startCounting();
          resendOTP()
        }}>{resend}</span></div>
      </div>
      </Container>
    );
  }