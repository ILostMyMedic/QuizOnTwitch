import React, { createContext, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getStrings } from '../store/reducers/languageReducer';
import * as enUS from '../language/en-US';
import { RootState } from '../store';
import { IStringBundle } from '../interfaces/strings';

interface LanguageContextProps {
    currentLanguage: string;
    contextStrings: IStringBundle | {};
}

const LanguageContext = createContext<LanguageContextProps>({
    currentLanguage: 'en-US',
    contextStrings: enUS.default as IStringBundle,
});

const LanguageProvider: React.FC<{ children: React.ReactNode }> = (
    { children },
) => {
    const language = useSelector((state: RootState) => state.language.language);
    const strings = useSelector((state: RootState) => state.language.strings);
    const dispatch = useDispatch();

    const currentLanguage = language || 'en-US'; // Default language
    const contextStrings = strings || {};

    useEffect(() => {
        import(`../language/${currentLanguage}.ts`).then((module) => {
            dispatch(getStrings(module.default));
        });
    }, [currentLanguage, dispatch]);

    // if strings object have any empty values, it will be replaced with default language strings
    if(language !== 'en-US' && Object.values(contextStrings).some((value) => value === '')) {
        // get the missing strings from the default language
        import(`../language/en-US.ts`).then((module) => {
            dispatch(getStrings(module.default));
        });
    }

    return (
        <LanguageContext.Provider
            value={{
                currentLanguage,
                contextStrings,
            }}
        >
            {children}
        </LanguageContext.Provider>
    );
};

export { LanguageContext, LanguageProvider };
