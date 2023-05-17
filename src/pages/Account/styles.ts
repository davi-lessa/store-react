import styled from 'styled-components'

export const Container = styled.div`
  height: 100%;
  max-width: var(--desktop-max-width);
  margin: 0 auto;
  padding: 25px 7%;

  display: grid;
  grid-template-areas: 'header header' 'navmenu content';
  grid-template-rows: 50px 1fr;
  grid-template-columns: 200px 1fr;

  .nav-menu-holder {
    grid-area: navmenu;
  }
`

export const Header = styled.div`
  grid-area: header;
`
export const Content = styled.div`
  grid-area: content;
  background: white;
  padding: 25px;
  border-radius: 20px;
  max-height: 500px;
  box-shadow: 0 0px 20px 0 #00000011;
`
