import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomeScreen from './screens/Client/Home';
import LoginScreen from './screens/Client/Login';
import RootLayout from './screens/Client/Root';
import OTPVerifyScreen from './screens/Client/OTPVerify';
import ItemScreen from './screens/Client/Item';
import PricingScreen from './screens/Client/Pricing';
import RegisterScreen from './screens/Client/Register';
import CreateItemScreen from './screens/Client/CreateItem';
import AdminLayout from './screens/Admin/Admin';
import DashboardScreen from './screens/Admin/Dashboard';
import { ThemeProvider } from 'react-ui';
import OrderScreen from './screens/Admin/Order';

const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        children: [
            { path: '/', element: <HomeScreen /> },
            { path: '/login', element: <LoginScreen /> },
            { path: '/register', element: <RegisterScreen /> },
            { path: '/confirm_otp', element: <OTPVerifyScreen /> },
            { path: '/items', element: <ItemScreen /> },
            { path: '/pricing', element: <PricingScreen /> },
            { path: '/create', element: <CreateItemScreen /> },
        ],
    },
    {
        path: '/admin',
        element: <AdminLayout />,
        children: [{ path: '/admin/dashboard', element: <OrderScreen /> }],
    },
]);

function App() {
    return <ThemeProvider>
        <RouterProvider router={router} />
    </ThemeProvider>
}

export default App;
