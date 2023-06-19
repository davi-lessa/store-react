import styled from 'styled-components'

export const Container = styled.div`
  h2 {
    margin-bottom: 15px;
  }

  p {
    margin-bottom: 10px;
  }

  &.active {
    .holder {
      outline: 2px solid forestgreen;
    }
  }

  .holder {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    max-width: 50%;
    align-items: center;
    gap: 15px 10px;
    margin-top: 20px;
    outline: 2px solid lightgrey;
    width: 100%;
    padding: 15px 20px;
    border-radius: 10px;
    color: black;
    user-select: none;

    p {
      margin-bottom: 0;
      display: block;
      width: 100%;
    }

    span {
      font-weight: 500;
    }

    @media screen and (max-width: 922px) {
      max-width: 100%;
    }
  }
`

export const OlderRaffleList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin: 20px 0;
  cursor: default;

  li {
    background: #f8f9fa;
    padding: 15px 20px;
    color: #333;
    box-shadow: 0 0 5px 0 #aaa;
    border: 1px solid white;
    outline: 1px solid #ccc;

    p.status {
      text-align: right;

      span {
        padding: 3px 10px;
        display: inline-block;
        font-size: 0.9em;
        border-radius: 20px;
        border: 2px solid forestgreen;
        color: forestgreen;
      }

      &.open span {
        color: rgb(52, 131, 250);
        border-color: rgb(52, 131, 250);
      }
      margin-bottom: 5px;
    }

    a {
      color: rgb(52, 131, 250);
    }

    @media screen and (max-width: 922px) {
      width: 100%;
    }

    p {
      margin-bottom: 5px;
    }

    &:hover {
      background: #fcfdfe;
    }

    strong {
      font-weight: 500;
      color: black;
    }
  }
`
