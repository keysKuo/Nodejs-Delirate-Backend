import React from 'react';
import '../../assets/pricing.css'

const PricingTable = () => {
  return (
      <div className="pricing">
          <div className="pricing-plan">
              <div
                  style={{
                      backgroundImage: `url("https://images.ctfassets.net/pkn4mh4dn52b/5IyQfCfACvzcWtcOO6mZPi/ce2592ec3951afa22105671d702f4b00/gold-plan-bg.jpg?fm=webp&w=828&q=75")`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                  }}
                  className="pricing-header"
              >
                  <p>5 products</p>
                  <h2 className="price">$0 Always Free!</h2>
                  <p>No credit card needed</p>
                  <button>Get Started</button>
              </div>
              <div className="pricing-body">
                  <h4>Gold Features</h4>
                  <ul>
                      <li>One image per product</li>
                      <li>Free customizable themes</li>
                      <li>Sell online &amp; in person</li>
                      <li>Multiple payment options</li>
                      <li>Real-time stats</li>
                      <li>Use a custom domain</li>
                      <li>Offer discounts &amp; run promos</li>
                      <li>Shipment tracking</li>
                      <li>Product option groups</li>
                      <li>Sales tax autopilot</li>
                  </ul>
              </div>
          </div>
          <div className="pricing-plan">
              <div
                  style={{
                      backgroundImage: `url("https://images.ctfassets.net/pkn4mh4dn52b/6mlCwDSuEMv1tEYHqd6KOw/3ab86215c8c6f8f0e9832fdfa67c546a/platinum-plan-bg.jpg?fm=webp&w=828&q=75")`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                  }}
                  className="pricing-header"
              >
                  <p>50 products</p>
                  <h2 className="price">1 Near/month</h2>
                  <p>or $9.99/month</p>
                  <button>Get Started</button>
              </div>
              <div className="pricing-body">
                  <h4>Platinum features</h4>
                  <ul>
                      <li>Five images per product</li>
                      <li>Free customizable themes</li>
                      <li>Sell online &amp; in person</li>
                      <li>Multiple payment options</li>
                      <li>Real-time stats</li>
                      <li>Use a custom domain</li>
                      <li>Theme code editing</li>
                      <li>Google Analytics</li>
                      <li>Inventory tracking</li>
                      <li>Offer discounts &amp; run promos</li>
                      <li>Bulk editing</li>
                      <li>Shipment tracking</li>
                      <li>Product option groups</li>
                      <li>Sales tax autopilot</li>
                  </ul>
              </div>
          </div>

          <div className="pricing-plan">
              <div
                  style={{
                      backgroundImage: `url("https://images.ctfassets.net/pkn4mh4dn52b/8LUbY1JEPSBUdQit194WP/7c8ba8eb5731d4dcc3f144402b55374f/diamond-plan-bg.jpg?fm=webp&w=828&q=75")`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                  }}
                  className="pricing-header"
              >
                  <p>500 products</p>
                  <h2 className="price">5 Near/month</h2>
                  <p>or $19.99/month</p>
                  <button>Get Started</button>
              </div>
              <div className="pricing-body">
                  <h4>Diamond features</h4>
                  <ul>
                      <li>Five images per product</li>
                      <li>Free customizable themes</li>
                      <li>Sell online &amp; in person</li>
                      <li>Multiple payment options</li>
                      <li>Real-time stats</li>
                      <li>Use a custom domain</li>
                      <li>Theme code editing</li>
                      <li>Google Analytics</li>
                      <li>Inventory tracking</li>
                      <li>Offer discounts &amp; run promos</li>
                      <li>Bulk editing</li>
                      <li>Shipment tracking</li>
                      <li>Product option groups</li>
                      <li>Sales tax autopilot</li>
                  </ul>
              </div>
          </div>
      </div>
  );
};

export default PricingTable;