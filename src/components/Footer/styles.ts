import styled from 'styled-components'

export const Container = styled.div`
  min-height: 350px;
  padding: 50px 7% 75px 7%;
  background-color: white;
  overflow: hidden;
  user-select: none;
  .us {
    user-select: text;
  }
`

export const FooterList = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 30px;
  padding: 0 calc(7% + 20px);

  @media screen and (max-width: 922px) {
    padding: 10px;
    grid-template-columns: 1fr;
    grid-template-rows: repeat(3, max-content);
  }

  h3 {
    letter-spacing: 0.8px;
    margin-bottom: 8px;
    font-size: 1.15em;
    font-weight: 500;
    color: black;
  }

  li {
    line-height: 1.25;
    letter-spacing: 0.3px;

    p {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 1em;
      margin-bottom: 8px;

      svg {
        flex-shrink: 0;
      }
    }

    .input-holder {
      display: flex;
      margin-top: 16px;

      input {
        flex: 1;
        padding: 12px 15px;
        background-color: #f2f3f5;
        font-size: 1em;
        border-radius: 6px 0 0 6px;
      }
      button {
        padding: 12px 15px;
        background: forestgreen;
        font-size: 0.95em;
        color: white;
        border-radius: 0 6px 6px 0;
      }
    }
  }
`

export const BtnGoTop = styled.button`
  width: 100%;
  height: 40px;
  background: rgb(44, 100, 211);
  text-align: center;
  line-height: 40px;
  vertical-align: middle;
  color: white;
  font-family: 'Saira Condensed', 'Inter', 'ML', 'Segoe UI', sans-serif;
  letter-spacing: 0.5px;
  font-size: 1em;
`
