import React from 'react'
import { Grid } from 'semantic-ui-react'
import Reveals from './Reveals';


const GridViews = ({ ...props }) => (
	<Grid {...props}>
		<Grid.Row style={{ marginBottom: "20px" }} columns={3}>
			<Grid.Column>
				<Reveals
					name="TENDAL FROG PRINT"
					price="25.00$"
					visible="https://assets.bigcartel.com/product_images/af625a82-8b23-4cc2-ba9e-645f05ded59a/frog-print.jpg?auto=format&fit=max&h=1000&w=1000"
				/>
			</Grid.Column>
			<Grid.Column>
				<Reveals
					name="ANITE FOG PRINT"
					price="39.50$"
					visible="https://assets.bigcartel.com/product_images/2510c513-281e-47f2-91f4-1f3305327b33/fox-print.jpg?auto=format&fit=max&h=1000&w=1000"
				/>
			</Grid.Column>
			<Grid.Column>
				<Reveals name="TIBETAN TIGER PRINT" price="50.00$" visible="https://assets.bigcartel.com/product_images/7faa3cfc-fd75-43b3-96cb-c04f0390a2c7/tibetan-tiger-print.jpg?auto=format&fit=max&h=1000&w=1000" />
			</Grid.Column>
		</Grid.Row>
	</Grid>
);

export default GridViews