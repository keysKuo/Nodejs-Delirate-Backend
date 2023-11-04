import React from 'react';
import { Image, Reveal } from 'semantic-ui-react';
import OverlayImage from './OverlayImage';

const Reveals = ({ name, price, visible, hidden }) => (
    <Reveal style={{ borderRadius: '10px' }} animated="move up">
        <Reveal.Content visible>
            {/* <Label attached='top right'>Code</Label> */}
            <OverlayImage
                name={name}
                price={price}
                style={{ width: '18em', height: '18em' }}
                src={visible}
                size="medium"
            />
        </Reveal.Content>

        <Reveal.Content hidden>
            <Image
                style={{ width: '18em', boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px' }}
                src={
                    hidden
                        ? hidden
                        : 'https://img.freepik.com/premium-vector/qr-de-isolated-white-qrcode-vector-icon_656810-475.jpg'
                }
                size="medium"
            />
        </Reveal.Content>
    </Reveal>
);

export default Reveals;
