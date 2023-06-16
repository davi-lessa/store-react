import styled from 'styled-components'

export const Container = styled.div`
  height: 100%;
  min-height: 80vh;
  max-width: var(--desktop-max-width);
  margin: 0 auto;
  padding: 50px 7%;

  display: grid;
  grid-template-areas: 'header content' 'navmenu content';
  grid-template-rows: max-content 1fr;
  grid-template-columns: 200px 1fr;
  gap: 0 35px;

  .nav-menu-holder {
    grid-area: navmenu;
  }

  @media screen and (max-width: 922px) {
    padding: 35px 7%;
    grid-template-rows: min-content min-content auto;
    grid-template-columns: 1fr;
    grid-template-areas: 'header header' 'navmenu navmenu' 'content content';
  }
`

export const Header = styled.div`
  grid-area: header;
`
export const Content = styled.div`
  grid-area: content;
  background: white;
  padding: 35px;
  max-height: 500px;
  box-shadow: 0 0px 20px 0 #00000011;

  @media screen and (max-width: 922px) {
    margin-top: 10px;
    padding: 20px;
  }
`
