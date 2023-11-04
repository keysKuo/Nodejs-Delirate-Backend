import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomeScreen from "./screens/Home";
import LoginScreen from "./screens/Login";
import RootLayout from "./screens/Root";
import OTPVerifyScreen from "./screens/OTPVerify";
import ItemScreen from "./screens/Item";
import PricingScreen from "./screens/Pricing";
import RegisterScreen from "./screens/Register";
import CreateItemScreen from "./screens/CreateItem";

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
      
    ]
  }
])

function App() {
  return <RouterProvider router={router} />;
}

export default App;
