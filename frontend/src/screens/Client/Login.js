import { MDBContainer, MDBInput, MDBCheckbox, MDBBtn } from 'mdb-react-ui-kit';
import { Image, Alert } from 'react-ui';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import logo1 from '../../static/delirate-logo1.png';

import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const server_url = 'http://localhost:8080/';

export default function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState('');
    const location = useLocation();

    useEffect(() => {
        if (location.state !== null) {
            setMsg(<p style={{ color: 'lightgreen' }}>{location.state}</p>);
        }

        setTimeout(() => {
            setMsg('');
            location.state = null;
        }, 3000);
    }, [location]);

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const navigate = useNavigate();

    const fetchData = async () => {
        try {
            let response = await axios.post(server_url + 'account/login', {
                email: email,
                password: password,
            });
            console.log(response);
            let token = response.data.token || undefined;
            localStorage.setItem('email', email);
            if (response.data.success) {
                navigate('/confirm_otp', {
                    state: token,
                });
            } else {
                setMsg(<p style={{ color: '#C94E4E' }}>{response.data.msg}!</p>);
            }
        } catch (error) {
            setMsg(<p style={{ color: 'lightgreen' }}>{error}!</p>);
        }
    };

    return (
        <section className="form">
            <Image css={{ width: '300px', marginTop: '50px' }} src={logo1} />
            <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
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

                <div className="d-flex justify-content-between mx-3 mb-4">
                    <MDBCheckbox name="flexCheck" value="" id="flexCheckDefault" label="Remember me" />
                    <a href="!#">Forgot password?</a>
                </div>

                <Alert css={{ marginBottom: '20px' }} variant="success">
                    {msg}
                </Alert>

                <MDBBtn onClick={fetchData} className="mb-4 bg-gradient">
                    Sign in
                </MDBBtn>

                <div className="text-center">
                    <p>
                        Not a member? <Link to="/register">Register</Link>
                    </p>
                    <p>or sign up with:</p>

                    <div className="d-flex justify-content-between mx-auto" style={{ width: '40%' }}></div>
                </div>
            </MDBContainer>
        </section>
    );
}
