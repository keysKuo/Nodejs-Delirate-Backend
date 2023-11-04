import { Outlet } from 'react-router-dom';
import Navigation from '../../components/Admin/Navigation';
import classes from '../../assets/root.module.css';


export default function AdminLayout() {
    return (
        <>
            <Navigation />
            <main className={classes.content}>
                <Outlet />
            </main>
            
            {/* <Footer /> */}
        </>
    );
}
