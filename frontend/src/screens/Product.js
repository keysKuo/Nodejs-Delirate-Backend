import GridViews from "../components/GridViews";
import { Container, Image } from "semantic-ui-react";

export default function ProductScreen() {
    return (
        <>
            {/* <h1>Product Screen</h1> */}
            <div className="center-box container">
                <Image style={{ maxWidth: '70%'}} src="https://assets.bigcartel.com/theme_images/78110562/banner+copy.png" />
            </div>
            
            <Container >
                <GridViews style={{ marginLeft: '20px'}} />
            </Container> 
        </>
    )
}