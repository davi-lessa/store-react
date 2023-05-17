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
        /* transform: translateX(-50%); */
        border-bottom: 2px solid gray;
        transition: width 0.25s ease;
      }
    }
  }

  &.page-nav {
    li {
      border-radius: 8px 20px;
    }
  }
`
