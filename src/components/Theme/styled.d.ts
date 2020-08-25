import 'styled-coponents';

declare module 'styled-components' {
    export interface DefaultTheme {
        appBackground: string;
        backgroundsColor: {
            gray: string;
        };
        textColors: {
            green: string;
        };
        fontStyles: {
            h1: string;
            h2: string;
            h3: string;
            p2: string;
        };
    }
}
