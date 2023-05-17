import styled from 'styled-components'

export const Container = styled.div`
  display: grid;
  height: max-content;
  place-items: center;
  padding: 50px 25px;
`

export const LoginWrapper = styled.div`
  width: 400px;
  height: 450px;
  border: 1px solid #e8e8e8;
  padding: 40px 35px;
  border-radius: 20px;
  user-select: none;
  box-shadow: 0 3px 25px 0 #0000001a;
  margin-bottom: 50px;
  background: white;

  * {
    font-family: 'Inter', 'ML', 'Segoe UI', sans-serif;
  }

  .mb-20 {
    margin-bottom: 20px;
  }
  .mt-20 {
    margin-top: 20px;
  }

  h2,
  h3 {
    text-align: center;
    font-weight: bold;
  }

  label {
    text-align: center;
    width: 100%;
  }

  @media screen and (max-width: 922px) {
    width: 100%;
  }
`

export const ButtonsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  gap: 10px;
`
export const InputWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  gap: 10px;

  input {
    width: 100%;
    border: 1px solid #c8c8c8;
    padding: 12px 16px;
    border-radius: 10px;
  }
`

export const LoginButton = styled.button`
  background-color: transparent;
  border: 1px solid #d8d8d8;
  padding: 10px 15px;
  border-radius: 25px;
  display: flex;
  align-items: center;
  gap: 8px;
  line-height: 20px;
  box-shadow: 0 1px 3px 0 #00000022;
  width: 100%;
  font-weight: 500;
  background: white;
  color: #555;
  min-height: 45px;
  display: flex;
  justify-content: center;

  line-height: 100%;

  &.facebook {
    background: #1877f2;
    color: white;
  }

  &:hover {
    opacity: 0.95;
  }
`
