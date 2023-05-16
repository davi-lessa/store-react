import styled from 'styled-components'

export const Container = styled.div`
  height: 75px;
  width: 100vw;

  background: var(--bg-color);
  font-family: 'Saira Condensed', 'Inter', 'Segoe UI', sans-serif;

  border-bottom: 1px solid #e2e2e2;
`

export const Content = styled.div`
  width: 100%;
  max-width: var(--desktop-max-width);
  margin: 0 auto;

  height: 100%;

  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 7%;
  /* border-bottom: 1px solid ; */

  @media screen and (max-width: 768px) {
    padding: 0 25px;
  }

  h1 {
    display: inline-block;
    user-select: none;
    margin-left: 8px;
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

  @media screen and (max-width: 768px) {
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

export const LeftSide = styled.div``
export const RightSide = styled.div`
  display: flex;
  gap: 12px;

  .username {
    font-size: 1.25em;
    margin-right: 7px;
    font-weight: bold;
    transition: all 0.25s ease;
  }
`
