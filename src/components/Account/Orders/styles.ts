import styled from 'styled-components'

export const Container = styled.div`
  h2 {
    margin-bottom: 15px;
  }
`

export const OrderList = styled.ul`
  li {
    padding: 20px;
    border: 1px solid #e2e2e2;
    user-select: none;
    display: grid;
    grid-template-columns: 75px 1fr auto;
    gap: 15px;

    &:hover {
      background: #fcfcfc;
    }

    h3 {
      user-select: text;
      margin-bottom: 10px;
    }

    .right {
    }

    .image {
      position: relative;
      padding-bottom: 100%; /* Aspect ratio of 1:1 */
      overflow: hidden;
      width: 100%;
      height: min-content;

      img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
      }
    }

    @media screen and (max-width: 922px) {
      grid-template-columns: 1fr;

      .image {
        width: 75px;
        height: 75px;
        padding: 0;
        order: 3;
      }
    }

    button {
      font-weight: 500;
      font-family: 'Inter', 'ML', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }
  }
`
