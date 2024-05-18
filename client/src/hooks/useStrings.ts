import { useContext, useEffect, useState } from 'react';
import { LanguageContext } from '../context/languageContext';

export const useStrings = () => {
    const context = useContext(LanguageContext);

    if (!context) {
        throw new Error('useStrings must be used within a LanguageProvider');
    }

    const [cachedStrings, setCachedStrings] = useState<any>({});

    useEffect(() => {
        setCachedStrings(context.contextStrings);
    }, [context.contextStrings]);

    return cachedStrings;
};
