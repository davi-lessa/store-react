import styled from 'styled-components'

export const HeaderStyle = styled.header`
  border-bottom: 1px solid rgb(226, 226, 226);
`

export const Container = styled.div`
  height: 75px;
  width: 100%;

  background: var(--bg-color);
  font-family: 'Saira Condensed', 'Inter', 'Segoe UI', sans-serif;
  border-bottom: 1px solid #e2e2e2;
`

export const Content = styled.div`
  width: 100%;
  max-width: var(--desktop-max-width);
  margin: 0 auto;

  height: 100%;

  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 20px;
  align-items: center;
  padding: 0 7%;

  @media screen and (max-width: 922px) {
    padding: 0 var(--default-padding-h);
    gap: 7px;

    h1 {
      font-size: 1.8em;
    }
  }

  h1 {
    display: inline-block;
    user-select: none;
    margin-left: 5px;
    font-weight: bold;
  }
`

export const Advice = styled.div`
  min-height: 35px;
  height: auto;
  user-select: none;
  display: grid;
  place-items: center;
  border-bottom: 1px solid #e1e2e3;
  padding: 5px 15px;
  text-align: center;
  font-family: 'Saira Condensed', 'Inter', 'Segoe UI', sans-serif;
  font-size: 1em;

  background: linear-gradient(45deg, rgb(44 100 211 / 78%) 0%, rgb(44, 100, 211) 50%, rgb(33 81 177) 100%);
  color: white;
  letter-spacing: 0.5px;

  @media screen and (max-width: 922px) {
    font-size: 0.8em;
  }
`

export const CartBtn = styled.button`
  background: transparent;
  cursor: pointer;
  align-items: center;
  display: flex;
  font-weight: bold;
`

export const AccountBtn = styled.button`
  background: transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  padding-top: 3px;
  position: relative;

  &:hover {
    .username {
      position: relative;
      opacity: 1;
      transform: scaleX(1);
      width: max-content;
    }
  }
`

export const LeftSide = styled.div`
  display: flex;
  align-items: center;

  h1 {
    width: max-content;
  }
`

export const Center = styled.div``

export const RightSide = styled.div`
  display: flex;
  gap: 12px;

  .username {
    font-size: 1.25em;
    margin-right: 7px;
    font-weight: bold;
    transition: all 0.25s ease;
    font-family: 'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif !important;
  }

  @media screen and (max-width: 922px) {
    gap: 8px;
    .username {
      font-size: 1.15em;
      margin-right: 3px;
    }
  }
`

export const MenuButton = styled.button`
  background-color: transparent;
  margin-right: 10px;
`
