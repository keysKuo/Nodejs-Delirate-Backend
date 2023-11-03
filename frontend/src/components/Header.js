// Libs
import { Link } from 'react-router-dom';
import { Image, Stack } from 'react-ui';
import { useState, useEffect } from 'react';
import { Search } from 'semantic-ui-react';
import logo from '../images/delirate-logo2.png'
// Css
import '../assets/header.css'
import 'semantic-ui-css/semantic.min.css'

// Components
import Profile from './Profile';


const nav = [
    { title: 'Home', path: '/'},
    { title: 'Shops', path: '/products'},
    { title: 'Pricing', path: '/pricing'},
    { title: 'Contact', path: '/contact'},
]

export default function Header() {
    const [ isLogin, setIsLogin ] = useState(false);
	
	useEffect(() => {
		const token = localStorage.getItem('token');
		
		if(token) {
			setIsLogin(
				<>
					<Search placeholder="Search..." />
					<Profile />
				</>
			);
		}
		else {
			setIsLogin(
				<>
					<ul className="page-nav">
						<li>
							<Search
								style={{ marginRight: "15px" }}
								placeholder="Search..."
							/>
						</li>
						<li>
							<Link to="/login">Login</Link>
						</li>
						<li>
							<Link to="/register">Register</Link>
						</li>
					</ul>
				</>
			);
		}
	},[])

    return (
        <>
            <header>
                <div id="page-header">
                    <Link to='/'>
                        <Image className="logo" css={{ width: '60px' }} src={logo} />
                    </Link>
                    <ul className="page-nav">
                        {nav.map((n) => (
                            <li>
                                <Link to={n.path}>{n.title}</Link>
                            </li>
                        ))}
                    </ul>

                    <Stack className="user-profile" align="center" gap={2}>
                        {isLogin}
                    </Stack>
                </div>
            </header>
        </>
    );
}