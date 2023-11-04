import React from 'react';
import { Grid } from 'semantic-ui-react';
import Reveals from './Reveals';
import iphone from '../../static/Apple-iPhone.png';
import knife from '../../static/knife.png';
import pokeball from '../../static/pokeball.png';

const GridViews = ({ ...props }) => (
    <Grid {...props}>
        <Grid.Row style={{ marginBottom: '20px' }} columns={3}>
            <Grid.Column style={{ marginBottom: '30px' }}>
                <Reveals name="TENDAL FROG PRINT" price="25.00$" visible={iphone} />
            </Grid.Column>
            <Grid.Column style={{ marginBottom: '30px' }}>
                <Reveals name="ANITE FOG PRINT" price="39.50$" visible={knife} />
            </Grid.Column>
            <Grid.Column style={{ marginBottom: '30px' }}>
                <Reveals name="TIBETAN TIGER PRINT" price="50.00$" visible={pokeball} />
            </Grid.Column>
            <Grid.Column style={{ marginBottom: '30px' }}>
                <Reveals name="TIBETAN TIGER PRINT" price="50.00$" visible={pokeball} />
            </Grid.Column>
            <Grid.Column style={{ marginBottom: '30px' }}>
                <Reveals name="TIBETAN TIGER PRINT" price="50.00$" visible={pokeball} />
            </Grid.Column>
            <Grid.Column style={{ marginBottom: '30px' }}>
                <Reveals name="TIBETAN TIGER PRINT" price="50.00$" visible={pokeball} />
            </Grid.Column>
        </Grid.Row>
    </Grid>
);

export default GridViews;
