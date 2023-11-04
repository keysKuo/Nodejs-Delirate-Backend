import React from 'react';
import { Container, Divider } from 'semantic-ui-react';
import PricingTable from '../../components/Client/PricingTable';

export default function PricingScreen() {
    return (
        <>
            <Container style={{ width: '60%', marginTop: '60px' }} textAlign="center">
                <h1 style={{ fontSize: '4rem' }}>
                    Create the decentralized online store for your creative business. Get started today for free.
                </h1>
                <Divider style={{ margin: '50px 0' }} />
                <p style={{ fontSize: '1.7rem' }}>
                    Get online with our easy store builder, website themes for artists and creators, and expert customer
                    support. We keep things simple and affordable and that means no hidden fees or weird data sharing
                    practices. By signing up, you’ll be supporting an indie business that cares about you.
                </p>
            </Container>
            <Container style={{ width: '80%', marginTop: '60px' }}>
                <PricingTable />
            </Container>
        </>
    );
}
