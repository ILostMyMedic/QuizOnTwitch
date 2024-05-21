import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import CommandNavigation from '../components/CommandNavigation';
import Navigation from './navigation';
import Wrapper from './wrapper';
import SideMenu from './sidemenu';
import Footer from './footer';
import Promotion from './promote';
import Cookies from './cookies';
import { QuizProvider } from '../context/quizContext';
import { useAuth0 } from '@auth0/auth0-react';
import Loading from './loading'; 

const Layout = () => {
    const { isLoading } = useAuth0();

    const [sidebarOpen, setSidebarOpen] = useState(false);

    function openSidebar(): void {
        setSidebarOpen(!sidebarOpen);
    }

    if (isLoading) {
        return <Loading />;
    }

    return (
        <CommandNavigation>
            <QuizProvider>
                <Navigation />
                <Promotion />
                <Wrapper sidebarOpen={sidebarOpen} setSidebarOpen={openSidebar}>
                    <Outlet />
                </Wrapper>
                <SideMenu />
                <Cookies />
                <Footer />
            </QuizProvider>
        </CommandNavigation>
    );
};

export default Layout;
