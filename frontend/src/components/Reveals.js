import React from 'react'
import { Image, Reveal  } from 'semantic-ui-react'
import OverlayImage from '../components/OverlayImage';

const Reveals = ({ name, price, visible, hidden }) => (
  <Reveal animated='move up'>
    <Reveal.Content visible>
    {/* <Label attached='top right'>Code</Label> */}
    <OverlayImage name={name} price={price} style={{ width: '100%' }} src={visible} size='medium' />
        
    </Reveal.Content>
   
    <Reveal.Content hidden>
      <Image style={{ width: '100%' }} src={hidden ? hidden : 'https://img.freepik.com/premium-vector/qr-de-isolated-white-qrcode-vector-icon_656810-475.jpg'} size='medium' />
    </Reveal.Content>
  </Reveal>
)

export default Reveals