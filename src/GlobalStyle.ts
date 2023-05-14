import { createGlobalStyle } from 'styled-components'

import ProximaNovaRegular from 'assets/fonts/proximanova-regular.woff2'
import ProximaNovaSemiBold from 'assets/fonts/proximanova-semibold.woff2'
const styled = { createGlobalStyle }

export const GlobalStyle = styled.createGlobalStyle`
  :root {
    --desktop-max-width: 1700px;

    --primary-color: #0063db;
    --primary-color-lighter: #deebfa;
    --primary-color-darker: #085bbf;
    --primary-color-contrast: white;
    --primary-color-lighter-contrast: #0063db;
    --primary-color-darker-contrast: white;

    --secondary-color: #9362ef;
    --secondary-color-lighter: #fde2c0;
    --secondary-color-lighter-contrast: #af00db;
    --secondary-color-contrast: #fff;

    --tertiary-color: #cc7a00;
    --tertiary-color-lighter: #fde7c0;
    --tertiary-color-contrast: white;
    --tertiary-color-lighter-contrast: black;

    /* Light mode */
    --background-color-light: #fff;
    --text-color-light: #4d4d4d;
    --text-color-lighter: #7c7c7c;
    --text-color-darker: #1f1f1f;

    /* Dark mode */
    --background-color-dark: #0a0a0a;
    --text-color-dark: #fff;
    --text-color-lighter: #bdbdbd;
    --text-color-darker: #a3a3a3;

    /* Sections */
    --section-title-fw: 600;

    --section-title-fs-desktop: 58px;
    --section-title-lh-destkop: 60px;
    --section-title-fs-mobile: 40px;
    --section-title-lh-mobile: 42px;

    --section-p-fs: 16px;
    --section-p-lh: 24px;

    --margin-top-1: 7px;
    --margin-top-2: 12px;
    --margin-top-3: 16px;
  }

  /* Use these variables in your CSS */
  .light {
    --theme-bg-color: var(--background-color-light);
    --theme-text-color: var(--text-color-light);
  }

  .dark {
    --theme-bg-color: var(--background-color-dark);
    --theme-text-color: var(--text-color-dark);
  }

  .primary {
    color: var(--primary-color);
    background-color: var(--primary-color-contrast);
  }

  .primary-lighter {
    color: var(--primary-color-lighter-contrast);
    background-color: var(--primary-color-lighter);
  }

  .primary-darker {
    color: var(--primary-color-darker-contrast);
    background-color: var(--primary-color-darker);
  }

  .secondary {
    color: var(--secondary-color-contrast);
    background-color: var(--secondary-color);
  }

  .tertiary {
    color: var(--tertiary-color-contrast);
    background-color: var(--tertiary-color);
  }

  @font-face {
    font-family: ML;
    font-weight: 400;
    font-style: normal;
    font-display: swap;
    src: url(${ProximaNovaRegular}) format('woff2');
  }

  @font-face {
    font-family: ML;
    font-weight: 600;
    font-style: normal;
    font-display: swap;
    src: url(${ProximaNovaSemiBold}) format('woff2');
  }

  button {
    cursor: pointer;
  }

  .button {
    display: flex;
    width: auto;
    height: 42px;
    padding: 0 20px;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    background-color: #0063db;
    color: #fff;
    font-size: 14px;
    line-height: 18px;
    font-weight: 600;
    letter-spacing: -0.1px;
    text-decoration: none;
  }

  body {
    font-family: 'Inter', sans-serif;
    background-color: var(--bg-color);
    letter-spacing: -0.65px;
    color: var(--text-color);
    overflow-x: hidden;

    &.locked {
      overflow-y: hidden;

      @media screen and (min-width: 922px) {
        padding-right: 17px;
      }
    }
  }

  h1 {
    font-size: 32px;
  }
  h2 {
    font-size: 24px;
  }
  h3 {
    font-size: 18.72px;
  }
  h4 {
    font-size: 16px;
  }
  h5 {
    font-size: 13.28px;
  }
  h6 {
    font-size: 10.72px;
  }
  a {
    color: inherit;
  }
`
