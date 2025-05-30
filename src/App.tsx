import React, { Suspense } from 'react';
import './App.css';
import { Navigate, Route, Routes, BrowserRouter } from 'react-router-dom';
import publicRoutes from './routes';

function App() {
    return (
        <BrowserRouter>
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    {publicRoutes.map((route, index) => {
                        const Layout = route.layout || React.Fragment;
                        if (route.child) {
                            return (
                                <Route key={index} element={<Layout />}>
                                    {route.child &&
                                        route.child.map((childRoute, subIndex) => {
                                            const Page = childRoute.component;
                                            return <Route key={subIndex} path={childRoute.path} element={<Page />} />;
                                        })}
                                </Route>
                            );
                        } else {
                            const Page = route.component;
                            return <Route key={index} path={route.path} element={<Page />} />;
                        }
                    })}

                    {/* Route bắt tất cả các URL không hợp lệ và chuyển hướng về trang chủ */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </Suspense>
        </BrowserRouter>
    );
}

export default App;
