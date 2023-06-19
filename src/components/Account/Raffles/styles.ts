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
    max-width: 50%;
    align-items: center;
    gap: 15px 10px;
    margin-top: 20px;
    outline: 2px solid lightgrey;
    width: 100%;
    padding: 15px 20px;
    border-radius: 10px;
    color: black;

    p {
      margin-bottom: 0;
    }

    span {
      font-weight: 500;
    }

    @media screen and (max-width: 922px) {
      max-width: 100%;
    }
  }
`
