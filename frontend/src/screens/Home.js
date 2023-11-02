import { Link } from 'react-router-dom';

export default function HomeScreen() {
    return (
        <>
            <h1>Home Screen</h1>
            <p>Go to <Link to="/products">Product page</Link></p>
        </>
    )
}