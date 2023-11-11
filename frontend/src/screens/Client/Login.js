import { MDBContainer, MDBInput, MDBCheckbox, MDBBtn } from 'mdb-react-ui-kit';
import { Image, Alert } from 'react-ui';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import logo1 from '../../static/delirate_new.png';

import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:8080'

export default function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState({
        content: '',
        color: ''
    });
    const location = useLocation();

    useEffect(() => {
        if (location.state !== null) {
            setMsg({ content: location.state, color: 'lightgreen'});
        }

        setTimeout(() => {
            setMsg({ content: '', color: ''});
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
            let response = await axios.post(apiUrl + '/account/login', {
                email: email,
                password: password,
            });
            // console.log(response);
            let token = response.data.token || undefined;
            localStorage.setItem('email', email);
            if (response.data.success) {
                navigate('/confirm_otp', {
                    state: token,
                });
            } else {
                setMsg({ ...msg, content: response.data.msg +'!', color: '#C94E4E'});
            }
        } catch (error) {
            setMsg({ ...msg, content: error + '!', color: '#C94E4E'});
        }
    };

    return (
        <section className="form w-50 mt-5">
            <Image css={{ width: '350px', marginTop: '50px' }} src={logo1} />
            <MDBContainer className="p-3 my-4 d-flex flex-column w-50">
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

                <div className="d-flex justify-content-between mx-3 mb-3">
                    <MDBCheckbox name="flexCheck" value="" id="flexCheckDefault" label="Remember me" />
                    <a style={{ color: '#71B280'}} href="!#">Forgot password?</a>
                </div>

                <Alert css={{ marginBottom: '10px', border: '0', color: `${msg.color}` }} variant="success">
                    {msg.content}
                </Alert>

                <MDBBtn style={{
                    background: '#134E5E',  /* fallback for old browsers */
                    background:'-webkit-linear-gradient(to right, #71B280, #134E5E)',  /* Chrome 10-25, Safari 5.1-6 */
                    background: 'linear-gradient(to right, #71B280, #134E5E)', /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
                    
                }} onClick={fetchData} className="mb-3">
                    Sign in
                </MDBBtn>

                <div className="text-center">
                    <p>
                        Not a member? <Link style={{ color: '#71B280'}} to="/register">Register</Link>
                    </p>
                    <p>or sign up with:</p>

                    <div className="d-flex justify-content-between mx-auto" style={{ width: '40%' }}></div>
                </div>
            </MDBContainer>
        </section>
    );
}
