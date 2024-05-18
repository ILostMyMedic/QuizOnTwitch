import { useState, useEffect } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { Link } from 'react-router-dom';
import routes from '../routes/paths';
import { Button } from '../components/button';
import { Text } from '../components/text';

const Cookies = () => {
    const [show, setShow] = useState(false);
    const [accepted, setAccepted] = useLocalStorage('cookies', false);

    useEffect(() => {
        if (!accepted) {
            setShow(true);
        }
    }, [accepted]);

    const handleDismiss = () => {
        setAccepted(true);
        setShow(false);
    };

    if (!show) return null;


    return (
        <div className="pointer-events-none fixed inset-x-0 bottom-0 px-6 pb-6 z-50">
            <div className="pointer-events-auto ml-auto max-w-xl rounded-xl bg-container-light dark:bg-container-dark p-6 shadow-lg ring-1 ring-gray-900/10">
                <Text>
                    This website uses cookies to supplement a balanced diet and provide a much
                    deserved reward to the senses after consuming bland but nutritious meals.
                    Accepting our cookies is optional but recommended, as they are delicious. See
                    our{' '}
                    <Link to={routes.legal.cookies} className="font-semibold text-primary">
                        cookie policy
                    </Link>
                    .
                </Text>
                <div className="mt-4 flex items-center gap-x-5">
                    <Button
                        className="rounded-md bg-gray-900 px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
                        onClick={handleDismiss}
                    >
                        Accept all
                    </Button>
                    <Button
                        type="button"
                        className="text-sm font-semibold leading-6 text-gray-900"
                        onClick={() => setShow(false)}
                        outline
                    >
                        Reject all
                    </Button>
                </div>
            </div>
        </div>
    );
}


export default Cookies