import styled from 'styled-components'

export const CartContainer = styled.div`
  position: fixed;
  pointer-events: none;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100%;
  z-index: 1000;
  opacity: 0;
  transition: opacity 0.15s 0.15s;
  user-select: none;

  button {
    cursor: pointer;
    background: transparent;
  }

  &.open {
    transition: opacity 0s;
    opacity: 1;
  }

  &.open .cb-mask {
    opacity: 1;
    pointer-events: all;
  }

  &.open .cb-content {
    right: 0;
  }

  .cb-mask {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    opacity: 0;
    transition: opacity 0.25s ease;
    pointer-events: none;
    z-index: 8;
  }

  .cb-content {
    position: absolute;
    width: 80vw;
    max-width: 400px;
    height: 100vh;
    right: -80vw;
    top: 0;
    background-color: #fff;
    box-shadow: 0 0 15px 5px rgba(0, 0, 0, 0.25);
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 62px auto auto;
    /* grid-template-rows: 62px auto 256px; */
    transition: right 0.3s ease-out;
    pointer-events: all;
    z-index: 9;
  }

  .cb-header {
    border-bottom: 1px solid #ccc;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 15px;
  }

  .cb-products {
    .qty-holder {
      display: flex;
      align-items: center;
      margin-top: 5px;
      gap: 4px;
    }

    .cb-qtybtn {
      height: 25px;
      width: 25px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 0;
      border-radius: 10px;
      font-size: 1.1rem;
      font-weight: bold;
      color: #333;
      background-color: #f8f8f8;
      border: 1px solid #e8e8e8;
    }

    .cb-qtybtn.minus {
      margin-right: 5px;
    }

    .cb-qtybtn.plus {
      margin-left: 5px;
    }

    ul.products {
      display: flex;
      flex-wrap: wrap;
      height: 100%;
      max-height: calc(100vh - 350px);
      padding: 25px;
      overflow-x: hidden;
      overflow-y: auto;
      align-content: flex-start;

      & > li.item {
        height: max-content;
        width: 100%;
        display: grid;
        grid-template-columns: 65px 1fr;
        gap: 8px 12px;
        border-bottom: 1px solid;
        border-color: #eeeeeeff;
        position: relative;
        padding-bottom: 10px;
        margin-bottom: 15px;
        right: 0;
        transition: right 0.3s, height 0.5s 0.3s, padding-bottom 0.5s 0.3s, margin-bottom 0.5s 0.3s, border-color 1s;
        overflow: hidden;

        &:last-child {
          margin-bottom: 0;
          border-color: #eeeeee00;
          padding-bottom: 0;
        }

        .item-info {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2px;
        }

        .item-title {
          font-size: 0.9rem;
          line-height: 1;
          color: #555;
          padding-right: 35px;
          font-weight: bold;
        }

        .item-price {
          font-size: 1rem;
        }

        .item-old-price {
          font-size: 0.7rem;
          color: #777;
          line-height: 1;

          span {
            color: #555;
            text-decoration: line-through;
            line-height: 1;
          }
        }

        .item-shipping {
          font-size: 0.85rem;
        }

        .item-img {
          max-width: 65px;
          max-height: 65px;
          border-radius: 4px;
          overflow: hidden;
          border: 1px solid #ddd;
          padding: 3px;
          display: flex;

          img {
            width: 100%;
            object-fit: contain;
          }
        }

        .item-remove-btn {
          position: absolute;
          top: 2px;
          right: 2px;
          background-color: #f8f8f8;
          box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.08);
          border: 1px solid #e8e8e8;
          border-radius: 10px;
        }
      }
    }
  }

  .cb-item-variation {
    font-size: 0.85rem;
    color: #888;
    line-height: 1;
    margin-top: 2px;
    margin-bottom: 2px;
  }

  .cb-item-variation strong {
    color: #888;
    line-height: 1;
  }

  .cb-products ul.products li .item-remove-btn,
  .cb-content .close-btn {
    display: grid;
    place-items: center;
    width: 24px;
    height: 24px;
    cursor: pointer;
  }

  .cb-content .close-btn {
    background-size: 18px;
    width: 32px;
    height: 32px;
  }

  .cb-footer {
    border-top: 1px solid #ccc;
    position: relative;
    padding: 15px;
    overflow-y: auto;

    .calculations-wrapper {
      display: flex;
      gap: 5px;
      flex-wrap: wrap;
      animation: blink 0.35s ease-in-out forwards;
    }

    span {
      font-size: 1em;
      text-align: right;
      width: max-content;
      color: #444;
    }

    div {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }

    hr {
      width: 100%;
      height: 0;
      outline: none;
      border-bottom: 1px solid #e2e2e2;
      margin: 3px 0;
      background-color: transparent;
    }
    .cb-totals {
      margin-bottom: 20px;
      font-weight: bold;
      color: black;
    }
  }

  .empty-cart {
    padding: 25px;
    animation: fadeIn 0.5s;
    display: grid;
    justify-items: center;
    align-content: flex-start;
    text-align: center;
  }

  .blink {
    animation: blink 0.35s;
  }

  .blink-delay {
    animation: blink 0.55s;
  }

  #goCheckout,
  #continueShop,
  button.default {
    width: 100%;
    min-height: 45px;
    background-color: #3483fa;
    color: white;
    border-radius: 4px;
  }

  button.default {
    background-color: #fdfdfd;
    border: 1px solid #ccc;
    color: black;
  }

  #continueShop {
    margin-bottom: 5px;
    background-color: #fdfdfd;
    color: black;
    border: 1px solid #ccc;
  }

  .cb-content::after {
    content: '';
    top: 99%;
    right: 0;
    width: 100%;
    height: 300px;
    background-color: white;
    position: absolute;
    z-index: -1;
  }

  header.openAccountBox #accountBox {
    transform: translate(50%, 0) scale(1);
    opacity: 1;
    pointer-events: all;
  }

  @media screen and (max-width: 922px) {
    .cb-footer {
      padding-bottom: 50px;
    }
    .cb-content {
      grid-template-rows: 62px 9fr 10fr;
    }
    .cb-products {
      overflow-y: hidden;
      ul.products {
        max-height: 100%;
      }
    }
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }

    to {
      opacity: 1;
    }
  }

  @keyframes blink {
    0% {
      opacity: 0;
    }

    25% {
      opacity: 0;
    }

    100% {
      opacity: 1;
    }
  }
`
