import { MDBContainer, MDBInput, MDBCheckbox, MDBBtn } from 'mdb-react-ui-kit';
import { Image, Alert } from 'react-ui';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import logo1 from '../../static/delirate_new.png';

import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";

const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:8080'

export default function RegisterScreen() {
    const [ name, setName ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ confirmPassword, setConfirmPassword ] = useState('');
    const [ location, setLocation ] = useState('');
    const [ phone, setPhone ] = useState('');

    const [ msg, setMsg ] = useState('')

    const handleNameChange = (event) => {
        setName(event.target.value);
    }
    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }

    const handleLocationChange = (event) => {
        setLocation(event.target.value);
    }

    const handlePhoneChange = (event) => {
        setPhone(event.target.value);
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }

    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
    }

    const navigate = useNavigate();
	
    const fetchData = async () => {
        try {
            let response = await axios.post(apiUrl + '/account/register', {
                email: email,
                password: password,
                password_confirm: confirmPassword,
                name: name,
                location: location,
                phone: phone,
                role: 'customer'
            })

            // console.log(response);
			
            if(response.data.success) {
                navigate('/login', {
                    state: 'Please check email to activate your account.'
                });
            }
            else {
                setMsg(response.data.msg + "!");
            }
        } catch (error) {
            setMsg(error + "!");
        }
    }

    return (
        <section className="form w-50 mt-5">
            <Image css={{ width: '350px', marginTop: '20px' }} src={logo1} />
            <MDBContainer className="p-3 d-flex flex-column w-50">
                <MDBInput
                    wrapperClass="mb-4"
                    label="Full name"
                    id="form1"
                    type="text"
                    value={name}
                    onChange={handleNameChange}
                />
                <MDBInput
                    wrapperClass="mb-4"
                    label="Email address"
                    id="form1"
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                />
                <MDBInput
                    wrapperClass="mb-4"
                    label="Password"
                    id="form2"
                    type="password"
                    value={password}
                    onChange={handlePasswordChange}
                />
                <MDBInput
                    wrapperClass="mb-4"
                    label="Re-enter password"
                    id="form2"
                    type="password"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                />

                <MDBInput
                    wrapperClass="mb-4"
                    label="Phone"
                    id="form1"
                    type="text"
                    value={phone}
                    onChange={handlePhoneChange}
                />

                <MDBInput
                    wrapperClass="mb-4"
                    label="Location"
                    id="form1"
                    type="text"
                    value={location}
                    onChange={handleLocationChange}
                />

                <div className="d-flex justify-content-between mx-3 mb-3">
                    <MDBCheckbox name="flexCheck" value="" id="flexCheckDefault" label="Remember me" />
                    <a style={{ color: '#71B280'}} href="!#">Forgot password?</a>
                </div>

                <Alert css={{ color: '#C94E4E', marginBottom: '10px', border: '0' }}>{msg}</Alert>
                <MDBBtn
                    style={{
                        background: '#134E5E' /* fallback for old browsers */,
                        background:
                            '-webkit-linear-gradient(to right, #71B280, #134E5E)' /* Chrome 10-25, Safari 5.1-6 */,
                        background:
                            'linear-gradient(to right, #71B280, #134E5E)' /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */,
                    }}
                    onClick={fetchData}
                    className="mb-4"
                >
                    Register
                </MDBBtn>

                <div className="text-center">
                    <p >
                        Already a member? <Link style={{ color: '#71B280'}} to="/login">Log in</Link>
                    </p>

                    <div className="d-flex justify-content-between mx-auto" style={{ width: '40%' }}></div>
                </div>
            </MDBContainer>
        </section>
    );
}