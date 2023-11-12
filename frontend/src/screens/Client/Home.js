import DividerPart from '../../components/Client/Divider';
import { Container, Grid } from 'semantic-ui-react';
import { Image } from 'react-ui';
import TokenDashboard from '../../components/Client/TokenDashboard';
import logo from '../../static/delirate_new.png';

export default function HomeScreen() {
    return (
        <>
            <Container className="home-banner">
                <DividerPart />
            </Container>

            <Container className="mb-5">
                <TokenDashboard />
            </Container>

            <Container
                style={{
                    width: '100%',
                    height: '400px',
                    background: '#134E5E' /* fallback for old browsers */,
                    background: '-webkit-linear-gradient(to right, #134E5E, #71B280)' /* Chrome 10-25, Safari 5.1-6 */,
                    background:
                        'linear-gradient(to right, #134E5E, #71B280)' /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */,
                }}
            >
                <div style={{ height: '100%' }} className="center-box">
                    <Image style={{ width: '30%' }} src={logo} />
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
                            <h4 style={{ fontWeight: '700' }}>Verify product authenticity</h4>
                            <p style={{ fontSize: '1em'}}>
                                Ensure that only authentic units are shipped to customers. Whether fulfilled by us or
                                shipped directly by selling partners, products cannot be listed on us or shipped without
                                valid Delirate codes.
                            </p>

                            <h4 style={{ fontWeight: '700' }}>Engage with customers</h4>
                            <p style={{ fontSize: '1em'}}>
                                Connect with customers post-purchase, no matter where they bought your product. The
                                Delirate Shopping app allow customers to scan Delirate codes to confirm authenticity and
                                access content you provide.
                            </p>

                            <h4 style={{ fontWeight: '700' }}>Optimize your supply chain</h4>
                            <p style={{ fontSize: '1em'}}>
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
