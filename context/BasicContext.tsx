'use client';

import { getCountry } from "@/api/basic";
import { createContext, useContext, useState, ReactNode, useLayoutEffect, JSX } from "react";

type BasicContextType = {
    country: [];
    setCountry: (country: string) => void;
};

const BasicContext = createContext<BasicContextType | undefined>(undefined);


export const BasicContextProvider = ({ children }: { children: ReactNode }): JSX.Element => {
    const [country, setCountry] = useState<any>([]);

    return (
        <BasicContext.Provider value={{ country, setCountry }}>
            {children}
        </BasicContext.Provider>
    );
};

/**
 * Custom hook to access session context. Throws error if used outside provider.
 *
 * @returns {SessionContextType} The session context value
 */
export const useBasic = (): BasicContextType => {
    const context = useContext(BasicContext);
    if (!context) throw new Error("useBasic must be used within BasicContextProvider");
    return context;
};
