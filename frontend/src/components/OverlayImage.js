import React from 'react';
import { Image } from 'semantic-ui-react';

const OverlayImage = ({ name, price, src, ...props}) => {
  return (
		<div className="product-image-container">
			<div className="overlay">
				<div className='overlay-text'>
                    <h3>{name}</h3>
                    <div className='dash'></div>
                    <div>{price}</div>
                </div>
			</div>
			<Image
				src={src}
				alt="Product"
				className="product-image"
				style={props.style}
			/>
		</div>
  );
};

export default OverlayImage;