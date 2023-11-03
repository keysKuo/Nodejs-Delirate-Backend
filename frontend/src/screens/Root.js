import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import classes from '../assets/root.module.css'
import Footer from "../components/Footer";

export default function RootLayout() {
    return (
        <>
            <Header />
            <main className={classes.content}>
                <Outlet />
            </main>
            <Footer />
        </>
    )
}