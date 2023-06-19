import styled from 'styled-components'

export const Container = styled.div`
  background: #cdcecf;
  display: inline-block;
  width: 48px;
  height: 25px;
  padding: 2px;
  border-radius: 25px;
  cursor: pointer;
  position: relative;
  transition: all 0.25s ease;

  &.enabled {
    background: forestgreen;

    .ball {
      left: unset;
      transform: translate(calc(100% + 3px), -50%);
    }
  }
`

export const Ball = styled.div`
  position: absolute;
  top: 50%;
  transform: translate(0, -50%);
  left: 3px;
  width: 20px;
  height: 19px;
  background: white;
  border-radius: 50%;
  transition: all 0.25s ease;
`
