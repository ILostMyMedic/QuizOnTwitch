import { useState, useRef } from 'react';
import useAuth from '../hooks/useAuth';
import { Bars3Icon, BellIcon } from '@heroicons/react/24/outline';
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import routes from "../routes/paths"
import { useNavigate } from 'react-router-dom';
import SideMenu from './sidemenu';

interface NavigationProps {
    children: React.ReactNode;
    sidebarOpen: boolean; // Flag indicating if the sidebar is open
    setSidebarOpen: () => void; // Function to open the sidebar
}



const Wrapper: React.FC<NavigationProps> = ({ children, sidebarOpen, setSidebarOpen }) => {
    const searchRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();
    const user = "x";

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = searchRef.current?.value;
    };

    const search = () => {
        // navigate to routes.discovery.root?search=searchValue
        navigate(`${routes.discover.root}?search=${searchRef.current?.value}`);
    }


    return (
        <div className="flex flex-nowrap" id="content">
            <main className="flex-1">
                <div className="">{children}</div>
            </main>

            {/* side menu */}
            {/* <aside className="relative hidden w-96 border-l border-gray-200 xl:flex">
                <div className="absolute top-20 w-96">
                    <div className="px-4 py-6 sm:px-6 lg:px-8">

                    </div>
                </div>
            </aside> */}


        </div>
    );
};

export default Wrapper;
