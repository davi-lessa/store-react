import styled from 'styled-components'

export const Container = styled.div`
  min-height: 350px;
  padding: 50px 7% 75px 7%;
  background-color: white;
  overflow: hidden;
  user-select: none;
  max-width: var(--desktop-max-width);
  margin: 0 auto;
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
    max-width: 100%;
    overflow: hidden;
    position: relative;
    padding: 1px;

    p {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 1em;
      margin-bottom: 8px;

      svg {
        flex-shrink: 0;
      }

      &.subscribe-congrats {
        padding: 15px;
        background: #fafbfc;
        border: 1px solid #ccc;
      }
    }

    .input-holder {
      padding: 1px;
      display: grid;
      width: min-content;
      grid-template-columns: 7fr 3fr;
      width: 100%;
      margin-top: 16px;
      border-radius: 6px;

      transition: 0.25s ease;
      &.invalid {
        outline: 1px solid red;
      }
      &.valid {
        outline: 1px solid forestgreen;
      }

      input {
        padding: 12px 15px;
        background-color: #f2f3f5;
        font-size: 1em;
        border-radius: 6px 0 0 6px;
        width: 100%;
      }
      button {
        padding: 12px 15px;
        background: forestgreen;
        font-size: 0.95em;
        color: white;
        width: 100%;
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
