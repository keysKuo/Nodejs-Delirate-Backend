import { Container } from "semantic-ui-react";
import axios from "axios";
import { useEffect, useState } from "react";
import QRCode from 'qrcode'
import { Image } from "react-ui";

export default function OrderScreen() {
    const [ orders, setOrders ] = useState([]);
    const [ selectedItems , setSelectedItems ] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    'http://localhost:8080/order/get_orders_by_store/6535707330ae787533e5e631',
                );
                // console.log(response.data); // Assuming your data is in response.data
                const data = response.data;
                if (data.success) {
                    let temp = data.data;
                    for(let i = 0; i < temp.length; i++) {
                        let qrcode = await QRCode.toDataURL(temp[i].link);
                        temp[i].qrcode = qrcode;
                    }
                    setOrders([ ...temp ])
                    setSelectedItems([...orders[0].items])
                }
                // Process your data and set state here
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);
    

    return (
        <>
            <Container style={{ transform: 'translateX(10%)' }}>
                <div style={{ paddingTop: '60px', visibility: 'hidden', backgroundColor: 'white' }}></div>
                <section class="mb-4">
                    {orders.map((order, index) => {
                        return (
                            <div oncli key={index} class="card" style={{ minHeight: '100px' }}>
                                <div class="card-body">
                                    <div class="row">
                                        <div class="col-md-4 text-left">
                                            <h4 class="h4-responsive">
                                                <strong>Order code </strong>
                                                <strong>
                                                    <span class="blue-text">{order.ISBN_code}</span>
                                                </strong>
                                            </h4>
                                            <p>
                                                <small>From:</small>
                                            </p>
                                            <p>
                                                <strong>{order.store.name}</strong>
                                            </p>
                                            <p>{order.store.location}</p>
                                            <p>{order.createdAt}</p>
                                        </div>

                                        <div class="col-md-4 text-right">
                                            <p>
                                                <small>To:</small>
                                            </p>
                                            <p>
                                                <strong>{order.customer.name}</strong>
                                            </p>
                                            <p>{order.customer.address}</p>
                                            <p>{order.customer.phone}</p>
                                            <p>{order.customer.email}</p>
                                        </div>
                                        <div class="col-md-4 text-right">
                                            <Image style={{ width: '60%'}} src={order.qrcode} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </section>
            </Container>
            <Container>
                <section style={{ transform: 'translateX(10%)' }} className="mb-5">
                    <div style={{ minHeight: '100px' }} className="card">
                        <div className="card-body">
                            <div className="table-responsive">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>Item list</th>
                                            <th>Quantity</th>
                                            <th>Unit Price</th>
                                            <th>Tax</th>
                                            <th>Total price</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {selectedItems.map((item, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td>{item.info.model}</td>
                                                    <td>{item.qty}</td>
                                                    <td>${item.price}</td>
                                                    <td>${Math.round(item.price * 0.1, 4)}</td>
                                                    <td>${Math.round(item.price * 1.1, 4)}</td>
                                                </tr>
                                            );
                                        })}
                                        
                                    </tbody>
                                </table>
                            </div>

                            <ul className="list-unstyled text-right">
                                <li>
                                    <strong>Sub Total:</strong>
                                    <span className="float-right ml-3">${selectedItems.reduce((accumulator, item) => accumulator + item.price, 0)}</span>
                                </li>
                                <li>
                                    <strong>TAX:</strong>
                                    <span className="float-right ml-3">${selectedItems.reduce((accumulator, item) => accumulator + Math.round(item.price * 0.1, 4), 0)}</span>
                                </li>
                                <li>
                                    <strong>TOTAL:</strong>
                                    <span className="float-right ml-3">${selectedItems.reduce((accumulator, item) => accumulator + Math.round(item.price * 1.1, 4), 0)}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>
            </Container>

            <Container>
                <div className="p-4"></div>
            </Container>
        </>
        // <h1>Dashboard Screen</h1>
    );
}