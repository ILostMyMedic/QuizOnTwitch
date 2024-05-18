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

const Layout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    function openSidebar(): void {
        setSidebarOpen(!sidebarOpen);
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
