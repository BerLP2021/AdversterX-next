type MediaQueries = {
    isMobile: string;
    isTablet: string;
    isDesktop: string;
};

type MatchedMediaResult = { [K in keyof MediaQueries]: boolean };
