import { Image, Text, Alert } from "react-ui";

import logo from '../../static/delirate_new.png';

export default function QRLogin({ msg, qrcode, ...props }) {
	
    return (
        <>
            <Image css={{ width: '350px', marginTop: '10px' }} src={logo} />
            <div className="container my-3"
                style={{
                    width: '320px',
                    height: '320px',
                    paddingTop: 'px',
                    border: '5px solid #134E5E',
                    borderRadius: '20px',
                }}
            >
                <div className="center-box w-100 h-100">
                    <Image css={{ width: '300px' }} src={qrcode} />
                </div>
            </div>

            <Alert css={{ border: '0', color: `${msg.color}` }} variant="success">
                            {msg.content}
                        </Alert>
            <div style={{ color: '#134E5E'}} className="py-2">
                <Text>Use Scanner from Delirate app to login</Text>
            </div>
        </>
    );
}