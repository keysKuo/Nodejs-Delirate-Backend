import { Stack, Avatar, Text } from "react-ui";

import logo from '../images/delirate-logo2.png';

export default function Profile({ avatar_src, ...props }) {
	
    return (
		<>
			<Avatar
				css={{ width: "50px", marginRight: "10px",  marginLeft: "30px" }}
				size="small"
				src={logo}
			/>
			<Stack direction="vertical" >
				<Text css={{ minWidth: '80px'}}>nKeys Kuo</Text>
				<a onClick={() => localStorage.removeItem('token') } size={1} href="/login">
					Log out
				</a>
			</Stack>
		</>
	);
}