import DividerPart from '../components/Divider';
import { Container } from 'semantic-ui-react';
import TokenDashboard from '../components/TokenDashboard';

export default function HomeScreen() {
    return (
        <>
            <Container className='home-banner'>
                <DividerPart />
            </Container>

            <Container>
               <TokenDashboard />
            </Container>

            {/* <p>Go to <Link to="/products">Product page</Link></p> */}
        </>
    )
}