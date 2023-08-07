import styled from 'styled-components'

export const Div = styled.div`
  margin-top: 32px;
  padding: 16px 28px 64px 28px;
  background: white;
  border: 1px solid #e2e2e2;
  display: grid;
  gap: 8px;

  p {
    padding-left: 16px;
    @media screen and (min-width: 768px) {
      padding-right: 10%;
    }
    color: #555;
  }
  h3 {
    margin-top: 16px;
    color: black;
  }
`
