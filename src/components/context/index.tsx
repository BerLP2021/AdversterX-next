'use client';

import { useMatchMedia } from '@/hooks/useMatchMedia';
import { createContext, useContext } from 'react';

const MatchMediaContext = createContext({} as MatchedMediaResult);

export const MatchMediaProvider = ({ children }: { children: React.ReactNode }) => {
    const mediaQueriesMatches = useMatchMedia();

    return (
        <MatchMediaContext.Provider value={mediaQueriesMatches}>
            {children}
        </MatchMediaContext.Provider>
    );
};

export const useMatchMediaContext = () => {
    const context = useContext(MatchMediaContext);
    if (!context) {
        throw new Error('useTodos must be used within a MatchMediaProvider');
    }
    return context;
};

export default MatchMediaContext;
