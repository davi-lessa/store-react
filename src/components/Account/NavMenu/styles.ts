import styled from 'styled-components'

export const MenuList = styled.div`
  padding: 20px;
  list-style: none;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 5px;

  li {
    width: 100%;
    border-radius: 10px;
    padding: 10px 15px;
    user-select: none;
    transition: all 0.25s ease;
    cursor: pointer;

    a {
      text-decoration: none;
    }

    &:hover {
      span::after {
        width: 100%;
      }
    }

    span {
      position: relative;

      &::after {
        content: '';
        position: absolute;
        width: 0%;
        height: 0px;
        left: 0;
        bottom: -5px;
        border-bottom: 2px solid gray;
        transition: width 0.25s ease;
      }
    }
  }

  @media screen and (max-width: 922px) {
    display: flex;
    gap: 15px;
    align-items: stretch;
    padding: 15px;
    overflow-x: auto;
    flex-wrap: nowrap;
    border-radius: 10px;
    margin-top: 20px;
    background: #e1e2e4;

    li {
      background: white;
      outline: 1px solid #d0d1d2;
      width: min-content;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 12px;
      background-color: white;
      min-width: 75px;

      span {
        width: min-content;
        text-align: center;
      }
    }
  }

  &.page-nav {
    li {
      /* border-radius: 8px 20px; */
    }
  }
`
