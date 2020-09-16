import 'styled-coponents';

declare module 'styled-components' {
    export interface DefaultTheme {
        appBackground: string;
        backgroundsColor: {
            gray: string;
            blackOpacity: string;
            darkGray: string;
        };
        textColors: {
            green: string;
            white: string;
            red: string;
        };
        fontStyles: {
            h1: string;
            h2: string;
            h3: string;
            p2: string;
            p3: string;
        };
    }
}
