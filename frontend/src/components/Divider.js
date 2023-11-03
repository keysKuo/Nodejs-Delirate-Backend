import React from 'react';
import { Grid, Image } from 'semantic-ui-react';
import logo1 from '../images/delirate-logo1.png';
import banner from '../images/banner.png';

const DividerPart = () => (
    <>
        <Grid columns={2} relaxed="very">
            <Grid.Column>
                <Image src={banner} />
            </Grid.Column>
            <Grid.Column className='center-box'>
                <div className='banner-body'>
                <div className='center-box mt-4'>
                <Image style={{ width: '20rem'}} src={logo1} />
                </div>
                <h1>The recorded verified origin platform</h1>
                <div className="leading-7 opacity-75 font-normal mt-5 mb-9">Delirate Store powers Near ecosystems, providing creators with branded storefronts and secondary marketplaces.</div>
                </div>
            </Grid.Column>
        </Grid>
    </>
);

export default DividerPart