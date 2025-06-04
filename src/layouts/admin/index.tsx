import { Outlet } from 'react-router-dom';
import Header from './Header';

const Layout = () => {
    return (
        <div className="w-fit">
            <Header />
            <main className="w-fit">
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;
