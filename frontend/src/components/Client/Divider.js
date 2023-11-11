import React from 'react';
import { Grid, Image } from 'semantic-ui-react';
import logo1 from '../../static/delirate_new.png';
import banner from '../../static/banner.png';

const DividerPart = () => (
    <>
        <Grid columns={2} relaxed="very">
            <Grid.Column>
                <Image src={banner} />
            </Grid.Column>
            <Grid.Column className='center-box'>
                <div className='banner-body'>
                <div className='center-box mt-4'>
                <Image style={{ width: '28rem'}} src={logo1} />
                </div>
                <h1 style={{ fontSize: '3rem'}}>The recorded verified origin platform</h1>
                <div className="leading-7 opacity-75 font-normal mt-4 mb-9">Delirate Store powers Near ecosystems, providing creators with branded storefronts and secondary marketplaces.</div>
                </div>
            </Grid.Column>
        </Grid>
    </>
);

export default DividerPart