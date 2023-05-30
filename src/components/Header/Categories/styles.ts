import styled from 'styled-components'

export const CategorySection = styled.div`
  min-height: 3em;
`

export const CategoriesList = styled.ul`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  line-height: 100%;
  gap: 10px 15px;
  font-size: 1em;
  padding: 1em 7%;
  font-family: 'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif !important;
  overflow: visible;

  a {
    text-decoration: none;
  }

  span {
    position: relative;

    &::after {
      content: '';
      position: absolute;
      width: 0%;
      height: 0px;
      left: 50%;
      transform: translateX(-50%);
      bottom: -3px;
      border-bottom: 2px solid gray;
      transition: width 0.25s ease;
    }

    &:hover {
      &::after {
        width: 100%;
      }
    }
  }
`
