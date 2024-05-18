import { Link } from 'react-router-dom';
import localSettings from '../local.settings.json';
import routes from '../routes/paths';
import { useStrings } from '../hooks/useStrings';


const Footer = () => {
    const strings = useStrings();

    const navigation = {
        main: [
            { name: strings.footerTermsOfService, href: routes.legal.terms },
            { name: strings.footerPrivacyPolicy, href: routes.legal.privacy },
            { name: strings.footerPackagesAndLicenses, href: routes.legal.packages },
            { name: strings.footerCredits, href: routes.legal.credits },
        ],
    };
    return (
        <div className="relative z-40">
            <div className="relative">
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                    <div className="w-full border-t border-gray-300 dark:border-white/10 " />
                </div>
            </div>
            <footer className="z-40">
                <div className="mx-auto max-w-8xl overflow-hidden px-6 py-20 sm:py-24 lg:px-8">
                    <nav
                        className="-mb-6 columns-2 sm:flex sm:justify-center sm:space-x-12"
                        aria-label="Footer"
                    >
                        {navigation.main.map((item) => (
                            <div key={item.name} className="pb-6">
                                <Link
                                    to={item.href}
                                    className="text-sm leading-6 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
                                >
                                    {item.name}
                                </Link>
                            </div>
                        ))}
                    </nav>
                    <p className="mt-10 text-center text-xs leading-5 text-gray-500 dark:text-600">
                        &copy; {new Date().getFullYear()} {localSettings.appName}. {strings.footerCopyRight}
                    </p>
                </div>
            </footer>
        </div>
    );
}


export default Footer;