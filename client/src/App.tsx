import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import RouterComponent from './routes/router';
import { RootState } from './store';
import { LanguageProvider } from './context/languageContext';

const App = () => {
    const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);

    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDarkMode]);

    return (
        <div className={`bg-main-light dark:bg-main-dark min-h-screen dark:text-zinc-300`}>
            <LanguageProvider>
                <RouterProvider router={RouterComponent} />
            </LanguageProvider>
        </div>
    );
};

export default App;
