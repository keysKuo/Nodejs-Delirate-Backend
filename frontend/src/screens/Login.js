import {
    MDBContainer,
    MDBInput,
    MDBCheckbox,
    MDBBtn,
    MDBIcon
  }
  from 'mdb-react-ui-kit';
import { Image } from 'react-ui';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import logo1 from '../images/delirate-logo1.png';

import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";

const server_url = 'http://localhost:8080/'

export default function LoginScreen() {
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }

    const navigate = useNavigate();
	
    const fetchData = async () => {
        try {
            let response = await axios.post(server_url + 'account/login', {
                email: email,
                password: password
            })
            console.log(response);
			let token = response.data.token || undefined;
			
            if(response.data.success) {
                navigate('/confirm_otp', {
					state: token
				});
            }
        } catch (error) {
            console.log(error);
        }
    }

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
					<MDBCheckbox
						name="flexCheck"
						value=""
						id="flexCheckDefault"
						label="Remember me"
					/>
					<a href="!#">Forgot password?</a>
				</div>

				<MDBBtn  onClick={fetchData} className="mb-4 bg-gradient">Sign in</MDBBtn>

				<div className="text-center">
					<p>
						Not a member? <a href="#!">Register</a>
					</p>
					<p>or sign up with:</p>

					<div
						className="d-flex justify-content-between mx-auto"
						style={{ width: "40%" }}
					>
						<MDBBtn
							tag="a"
							color="none"
							className="m-1"
							style={{ color: "#1266f1" }}
						>
							<MDBIcon fab icon="facebook-f" size="sm" />
						</MDBBtn>

						<MDBBtn
							tag="a"
							color="none"
							className="m-1"
							style={{ color: "#1266f1" }}
						>
							<MDBIcon fab icon="twitter" size="sm" />
						</MDBBtn>

						<MDBBtn
							tag="a"
							color="none"
							className="m-1"
							style={{ color: "#1266f1" }}
						>
							<MDBIcon fab icon="google" size="sm" />
						</MDBBtn>

						<MDBBtn
							tag="a"
							color="none"
							className="m-1"
							style={{ color: "#1266f1" }}
						>
							<MDBIcon fab icon="github" size="sm" />
						</MDBBtn>
					</div>
				</div>
			</MDBContainer>
		</section>
	);
}