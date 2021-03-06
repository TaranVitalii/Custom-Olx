import { DefaultTheme } from 'styled-components';

const theme: DefaultTheme = {
    backgroundsColor: {
        gray: '#C0C0C0',
        blackOpacity: 'rgba(0, 0, 0, 0.2)',
        darkGray: 'rgba(55, 64, 58,0.8)',
    },
    textColors: {
        green: '#008000',
        white: '#fff',
        red: '#DC143C',
    },
    appBackground: '#fff',
    fontStyles: {
        h1: `font-size:28px;
        font-weight:600;
        line-height:34px;`,
        h2: `font-size:26px;
        font-weight:600;
        line-height:34px;`,
        h3: `font-size:22px;
        font-weight:600;
        line-height:28px;`,
        p2: `font-size:18px;
        font-weight:400;
        line-height:22px;`,
        p3: `font-size:16px;
        font-weight:400;
        line-height:20px;`,
    },
};

export default theme;
