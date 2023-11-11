import React from 'react';
import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <MDBFooter bgColor='white' className='text-center text-lg-start text-muted'>
      <section style={{ marginLeft: '20px'}} className='d-flex justify-content-center justify-content-lg-center p-4 border-bottom'>

        <div className='py-4'>
          <a href='/' className='me-4 text-reset'>
            <MDBIcon color='secondary' fab icon='facebook-f' />
          </a>
          <a href='/' className='me-4 text-reset'>
            <MDBIcon color='secondary' fab icon='twitter' />
          </a>
          <a href='/' className='me-4 text-reset'>
            <MDBIcon color='secondary' fab icon='google' />
          </a>
          <a href='/' className='me-4 text-reset'>
            <MDBIcon color='secondary' fab icon='instagram' />
          </a>
          <a href='/' className='me-4 text-reset'>
            <MDBIcon color='secondary' fab icon='linkedin' />
          </a>
          <a href='/' className='me-4 text-reset'>
            <MDBIcon color='secondary' fab icon='github' />
          </a>
        </div>
      </section>

      <section className=''>
        <MDBContainer style={{ maxWidth: '80%'}} className='text-left text-md-start mt-5'>
          <MDBRow className='mt-3'>
            <MDBCol md='3' lg='4' xl='3' className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4 text-dark'>
                <MDBIcon  color='dark' icon='desktop' className='me-3' />
                SUD Technology
              </h6>
              <p style={{ lineHeight: '1.4rem'}}>
              At SUD Technology, we are dedicated to shaping the future of technology. We are innovators, thought leaders, and problem solvers who thrive on the cutting edge of technological advancements.
              </p>
            </MDBCol>

            <MDBCol md='2' lg='2' xl='2' className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4 text-dark'>Products</h6>
              <p>
                <a href='https://github.com/keysKuo/NEAR-MERN-Delirate-Blockchain2023.git' className='text-reset'>
                  Delirate
                </a>
              </p>
              <p>
                <a href='https://github.com/keysKuo/Nodejs-EzTicket.git' className='text-reset'>
                  EzTicket
                </a>
              </p>
              <p>
                <a href='https://github.com/keysKuo/Manfu.git' className='text-reset'>
                  Manfu
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Verifiket
                </a>
              </p>
            </MDBCol>

            <MDBCol md='3' lg='2' xl='2' className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4 text-dark'>Useful links</h6>
              <p>
                <Link to='/pricing' className='text-reset'>
                  Pricing
                </Link>
              </p>
              <p>
                <Link to='/' className='text-reset'>
                  Settings
                </Link>
              </p>
              <p>
                <Link to='/' className='text-reset'>
                  Orders
                </Link>
              </p>
              <p>
                <Link to='/contact' className='text-reset'>
                  Contact
                </Link>
              </p>
            </MDBCol>

            <MDBCol md='4' lg='3' xl='3' className='mx-auto mb-md-0 mb-4'>
              <h6 className='text-uppercase fw-bold mb-4 text-dark'>Contact</h6>
              <p>
                <MDBIcon color='secondary' icon='home' className='me-2' />
                931 Jonathan, IL 60017, US
              </p>
              <p>
                <MDBIcon color='secondary' icon='envelope' className='me-3' />
                nkeyskuo124@gmail.com
              </p>
              <p>
                <MDBIcon color='secondary' icon='phone' className='me-3' /> +85 767 916 592
              </p>
              <p>
                <MDBIcon color='secondary' icon='print' className='me-3' /> None
              </p>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>

      <div className='text-center p-4 footer'>
        
        <a className='text-light fw-bold' href='https://github.com/keysKuo/'>
        © 2023 Copyright: SUD Technology
        </a>
      </div>
    </MDBFooter>
  );
}