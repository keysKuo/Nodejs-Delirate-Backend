import DividerPart from '../../components/Client/Divider';
import { Container, Grid } from 'semantic-ui-react';
import { Image } from 'react-ui';
import TokenDashboard from '../../components/Client/TokenDashboard';
import logo2 from '../../static/delirate-logo2.png';

export default function HomeScreen() {
    return (
        <>
            <Container className="home-banner">
                <DividerPart />
            </Container>

            <Container className="mb-5">
                <TokenDashboard />
            </Container>

            <Container style={{ width: '100%', height: '400px', backgroundColor: '#232f3e' }}>
                <div style={{ height: '100%' }} className="center-box">
                    <Image style={{ width: '250px' }} src={logo2} />
                </div>
            </Container>

            <Container className="mt-5 w-75">
                <div className="centerbox mb-5">
                    <h1 style={{ fontSize: '3rem', marginBottom: '50px' }}>See results with Delirate</h1>
                    <p style={{ fontSize: '1.5rem' }}>
                        Delirate uses secure, unique codes that identify individual units, stop counterfeits from
                        reaching customers, improve customer engagement, and give brands valuable insights to help
                        optimize supply chains.
                    </p>
                </div>

                <Container textAlign="justified" className="w-100">
                    <Grid columns={2} relaxed="very">
                        <Grid.Column>
                            <Image src="https://m.media-amazon.com/images/G/01/brandregistry/abpm_trh1_551122.png" />
                        </Grid.Column>
                        <Grid.Column>
                            <h4 style={{ fontWeight: '700'}}>Verify product authenticity</h4>
                            <p>
                                Ensure that only authentic units are shipped to customers. Whether fulfilled by us or
                                shipped directly by selling partners, products cannot be listed on us or shipped without
                                valid Delirate codes.
                            </p>

                            <h4 style={{ fontWeight: '700'}}>Engage with customers</h4>
                            <p>
                                Connect with customers post-purchase, no matter where they bought your product. The
                                Delirate Shopping app allow customers to scan Delirate codes to confirm authenticity and
                                access content you provide.
                            </p>

                            <h4 style={{ fontWeight: '700'}}>Optimize your supply chain</h4>
                            <p>
                                Gain additional insights on your items at the batch or lot level, helping you identify
                                supply chain or other issues, diagnose their root cause, implement solutions, and
                                improve products with minimal disruption to your business.
                            </p>
                        </Grid.Column>
                    </Grid>
                </Container>
            </Container>

            {/* <p>Go to <Link to="/products">Product page</Link></p> */}
        </>
    );
}
