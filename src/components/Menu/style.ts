import styled from 'styled-components'

export const Container = styled.div`
  position: fixed;
  z-index: 9999;
  left: 0;
  top: 0;
  background: linear-gradient(to bottom, #fffffffa 0%, #fffffffa 100%);
  padding: 30px;
  user-select: none;
  pointer-events: none;
  opacity: 0;
  transition: all 0.15s ease-in;
  box-shadow: 0 0 200px 20px #00000088;
  height: calc(100vh + 60px);
  padding-bottom: 60px;
  max-height: 100vh;
  overflow-y: auto;
  width: 100%;
  left: -100%;

  &.opened {
    transition: all 0.35s ease;
    opacity: 1;
    pointer-events: all;
    left: 0;

    .close-btn {
      opacity: 1;
    }
  }

  .close-btn {
    position: absolute;
    right: 25px;
    top: 25px;
    z-index: 999;
    background: transparent;
    opacity: 0;
    transition: opacity 0.5s 0.29s;
  }

  ul.top-list {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 10px;

    li {
      align-self: stretch;
      flex-grow: 1;
      border-radius: 15px;
      outline: 2px solid #a2b3c5;
      font-size: 0.93em;
      min-height: 3.5em;
      background: white;

      a {
        width: 100%;
        height: 100%;
        padding: 0.75em 0.85em 0.75em 0.6em;
        display: flex;
        align-items: center;

        span {
          svg {
            min-width: max-content;
          }
          display: flex;
          min-width: min-content;
          max-width: 20vw;
          gap: 6px;
          align-items: center;
          line-height: 1.1em;
          font-weight: 500;
          font-size: 0.95em;
          color: #4e5862;
        }
      }
    }
  }

  .category-holder {
    position: relative;
  }

  .cat-list {
    /* position: absolute; */
    border-top: 1px solid #c2c2c2;
    margin: 15px 0;
    left: 0;
    top: 0;
    z-index: 9999;
    gap: 15px;
    align-content: flex-start;
    gap: 20px;
    overflow-y: auto;

    li {
      width: 100%;
    }
  }
`
