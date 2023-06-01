import styled from 'styled-components'

export const ProductContainer = styled.div`
  padding: 0 5%;
  min-height: 500px;
  background-color: var(--gray-bluish);
  height: 100%;

  h1 {
    font-size: 1.5em;
  }

  --lateral-padding: 0 5%;

  @media screen and (max-width: 922px) {
    padding: 0;
  }

  font-family: 'ML', 'Saira Condensed', 'Segoe UI', sans-serif !important;
`

export const ProductMarginHolder = styled.div`
  max-width: var(--desktop-max-width);
  margin: 0 auto;
  padding: 25px;

  @media screen and (max-width: 922px) {
    padding: 0;
    max-width: 100vw;
  }
`

export const ProductContent = styled.div`
  background: white;
  border-radius: 8px;
  padding: 15px;
  display: grid;
  grid-template-columns: auto 375px;
  grid-template-areas:
    'pictures selling'
    'description selling';
  gap: 20px;
  max-width: 100vw;

  @media screen and (max-width: 922px) {
    grid-template-columns: 100%;
    grid-template-areas:
      'pictures'
      'selling'
      'description';
    padding: 0;
    gap: 0;
  }
`

export const PictureBox = styled.div`
  width: 100%;
  transition: width 0.5s;
  display: grid;
  grid-template-columns: min-content auto;
  gap: 5px;
  grid-area: pictures;
  grid-template-areas: 'roller carousel';
  position: sticky;
  top: 15px;
  border-bottom: 1px solid #ddd;
  max-width: 100vw;

  img {
    width: 100%;
  }

  @media screen and (max-width: 922px) {
    border-bottom: none;
    grid-template-columns: 1fr;
    grid-template-areas:
      'carousel'
      'roller';
  }

  &:has(.roller ul li:hover) .image-preview {
    /* display: flex; */
    opacity: 1;
    transition: opacity 0.5s ease;
  }

  .roller {
    transition: width 0.5s;
    grid-area: roller;
    width: 60px;
    /* pointer-events: none; */

    ul {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;

      li {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        border-radius: 4px;
        padding: 2px;
        cursor: pointer;
        user-select: none;
        pointer-events: all;
        box-shadow: 0px 0px 1px 1px #ccc;
        min-height: 50px;

        &:hover {
          &::after {
            opacity: 1;
          }
        }

        img {
          border-radius: 4px;
        }

        &.active {
          /* box-shadow: 0px 2px 1px 2px #3483fa88; */
          &::after {
            outline-width: 3px;
            opacity: 1;
          }
        }

        &::after {
          content: '';
          position: absolute;
          top: 0px;
          left: 0px;
          width: 100%;
          height: 100%;
          border-radius: inherit;
          transition: opacity 0.25s ease;
          opacity: 0;
          outline: 2px solid rgb(52, 131, 250);
        }
      }
    }

    @media screen and (max-width: 922px) {
      width: 100%;

      ul {
        flex-wrap: nowrap;
        overflow-x: auto;
        max-width: 100vw;
        pointer-events: all;
        padding: 4px 25px 10px 10px;
        display: flex;
        gap: 6px;

        li {
          width: unset;
          height: 100%;

          img {
            width: unset;
            height: 50px;
          }
        }
      }
    }
  }

  .img-carousel {
    grid-area: carousel;
    width: 100%;
    justify-content: center;
    padding: 40px 0;
    overflow: hidden;
    position: relative;

    .image-preview {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background-color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 999;
      pointer-events: none;
      opacity: 0;
      transition: opacity 0.5s ease 0.075s;

      &.permanent {
        opacity: 1;
      }

      img {
        height: unset;
        width: 100%;
      }

      @media screen and (max-width: 922px) {
        display: none;
      }
    }

    @media screen and (max-width: 922px) {
      padding: 0;
      max-width: 100vw !important;
      max-height: 650px;
      min-height: 100vw;
      width: 100vw;
      display: flex;
      align-items: center;
      justify-content: center;

      img {
        max-width: 100vw !important;
        width: 100vw;
      }
    }

    img {
      height: 100%;
      max-width: 450px;
    }
  }

  .swiper {
    width: 100%;
    height: 100%;
  }
  .swiper-slide {
    text-align: center;
    font-size: 18px;
    background: #fff;

    /* Center slide text vertically */
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .swiper-slide img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

export const Selling = styled.div`
  grid-area: selling;
  user-select: none;

  .sell-box {
    position: sticky;
    position: -webkit-sticky;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 15px 20px 20px 20px;
    top: 15px;
    overflow: hidden;
    max-height: calc(100vh - 35px);

    @media screen and (max-width: 922px) {
      max-height: 100%;
      position: relative !important;
      top: unset;
      border: none !important;
      padding: 5px 25px;

      border-bottom: 1px solid #ddd !important;
      border-radius: 0 !important;
    }

    .sell-box-sell-button {
      min-height: 50vh;
    }

    .sell-box-flags {
      display: flex;
      flex-wrap: wrap;
      gap: 4px;
      margin-top: 5px;
      letter-spacing: 0.1px;

      span.flag {
        font-size: 0.73em;
        padding: 2px 5px;
        border-radius: 4px;
        background-color: #ff7200;
        color: white;
        font-weight: bold;
        cursor: default;
      }
    }

    .sell-box-qty-selled {
      span {
        font-size: 0.9em;
        color: #aaa;
      }
    }

    .sell-box-title {
      h1 {
        line-height: 1;
        margin: 2px 0;
        color: #111;
      }
    }

    .sell-box-stars {
      display: flex;
      gap: 7px;
      align-items: center;
      margin: 5px 0;
      width: max-content;

      .stars {
        cursor: pointer;
        display: flex;
        align-items: center;
      }

      .star {
        width: 15px;
        height: 15px;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='15' height='15' viewBox='0 0 10 10'%3E%3Cpath fill='%233483fa' d='M5.056 8L1.931 9.648l.597-3.49L0 3.684l3.494-.509L5.056 0l1.562 3.176 3.494.51-2.528 2.471.597 3.491z'%3E%3C/path%3E%3C/svg%3E");
      }

      &:hover {
        .star {
          opacity: 0.9;
        }
      }
    }

    .sell-box-stars .sell-box-parcel-max {
      font-size: 1em;
      margin-bottom: 10px;
    }
    .sell-box-old-price {
      /* margin-top: 5px; */
      span {
        margin-top: 50px;
        color: #aaa;
      }
    }

    .sell-box-price {
      h2 {
        font-size: 2.1em;
        line-height: 1;
        sup {
          font-size: 0.65em;
          vertical-align: super;
          line-height: 1;
        }
      }
    }

    .variations {
      .selected-name {
        font-weight: bold;
      }

      ul.var-options {
        display: flex;
        flex-wrap: wrap;
        gap: 9px;
        margin: 7.5px 0 15px 0;

        li {
          background-color: transparent;
          border-radius: 4px;
          cursor: pointer;
          outline: 1px solid #ddd;
          width: fit-content;
          padding: 5px 10px;
          transition: outline-color 0.25s ease-in-out;

          @media screen and (max-width: 320px) {
            outline: 2px solid #ccc !important;
            min-height: 40px;
            width: 100% !important;
            display: flex;
            align-items: center;
          }

          span {
            width: fit-content;
            pointer-events: none;
            font-size: 0.9rem;
          }

          &.selected {
            outline: 2px solid #3483fa !important;
          }
          &:hover {
            outline: 1px solid #3483fa;
          }
        }
      }
    }

    .sell-box-sell-box {
      margin-top: 10px;

      .input-holder-sbs {
        display: grid;
        grid-template-columns: auto 1fr;
        gap: 10px;

        @media screen and (max-width: 320px) {
          grid-template-columns: 1fr;
        }
      }

      select#quantity {
        padding: 10px 8px;
        background-color: white;

        @media screen and (max-width: 320px) {
          border: 2px solid #3483fa !important;
        }
      }

      /* Buy button */
      button {
        border-radius: 4px;
        background-color: #3483fa;
        color: white;
        font-weight: bold;
        font-size: 0.95em;
        min-height: 45px;
      }

      #addToCartBtn {
        min-height: 45px;
      }
    }

    .sell-box-payment-conditions {
      margin: 25px 0 10px 0;

      button {
        border: 1px solid #ddd;
        padding: 5px;
      }

      .boleto-accord,
      .parcelas-accord {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 11px;
        gap: 10px;
        border-radius: 4px 4px 0 0;
        width: 100%;
        height: 100%;
      }

      .parcelas-accord {
        span {
          width: 100%;
          max-width: max-content;
        }
      }

      .boleto-accord {
        border-radius: 0 0 4px 4px;
        border-top: none;
        background: transparent;
      }

      .dlv_accord.arrow-right {
        padding-right: 36px;
      }

      .dlv_acc_panel {
        &.active {
          border-radius: 0 !important;
        }

        &.parcelsgroup div {
          display: flex;
          flex-direction: column;
          flex-wrap: wrap;
          font-size: 0.95em;
          gap: 3px 25px;
          max-height: 10.5em;

          .parcel-wrapper {
            display: grid;
            grid-template-columns: auto 1fr auto;
            justify-items: center;
            gap: 10px;
            justify-content: space-between;

            .parcel-count {
              font-weight: bold;
            }

            .separator {
              width: 100%;
              position: relative;

              &::after {
                content: '';
                width: 100%;
                height: 0px;
                border-top: 1px solid #d8d8d8;
                position: absolute;
                top: 50%;
                left: 0;
                transform: translateY(-50%);
              }
            }
          }
        }
      }

      .bandeiras {
        display: flex;
        flex-wrap: wrap;
        gap: 5px;

        li {
          display: flex;
          align-items: center;
        }
      }
    }

    .sell-box-free-shipping {
      margin-bottom: 10px;
      padding: 12px 10px;
      border: 1px dashed #ddd;
      border-radius: 4px;
    }

    .sell-box-shipping-calc {
      margin-bottom: 10px;
      position: relative;

      .block-title {
        color: #3483fa;
        margin-bottom: 4px;
        display: block;
      }

      .cep-holder {
        grid-template-columns: 7fr 3fr;
        display: grid;
        align-items: center;
        gap: 10px;
        height: 100%;

        #cepInput {
          border: 1px solid #ddd;
          border-radius: 4px;
          padding: 10px 10px;
          width: 100%;
          height: 100%;
          font-size: 1em;
        }

        button {
          background: #f8f8f8;
          border-radius: 6px;
          font-weight: 400;
          font-size: 15px;
          padding: 7px 10px;
          height: 100%;
          color: #000;
          border: 1px solid #ddd;
        }
      }

      .cep-result {
        border-radius: 6px;
        border: 1px solid #ddd;
        padding: 15px;
        margin-top: 15px;
      }
    }

    .sell-box-warranties {
      li {
        &:not(:last-of-type) {
          margin-bottom: 10px;
        }
        span {
          display: flex;
          align-items: center;
          gap: 3px;
        }
      }
    }
  }
`

export const Description = styled.div`
  grid-area: description;

  .html-desc {
    ul {
      list-style-position: inside !important;
    }
    .html-specs {
      padding: 25px 35px 35px 35px;
    }

    * {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif !important;
    }

    img {
      max-width: 100%;
      width: 100%;
    }
  }
`

//  .related-container .product-reviews, .related-products{    padding: 0 5%;  }

export const RelatedContainer = styled.div`
  margin-top: 15px;
  border-radius: 6px;
  padding: 0 var(--lateral-padding);

  @media screen and (max-width: 922px) {
    padding: 20px;
  }

  > h2 {
    margin-top: 25px;

    @media screen and (max-width: 922px) {
      margin-top: 0;
    }
  }
`

export const RelatedProducts = styled.div`
  padding: 0 var(--lateral-padding);

  ul.products-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    grid-gap: 10px;
    grid-auto-rows: minmax(420px, auto);

    @media screen and (max-width: 922px) {
      grid-template-columns: 1fr 1fr;
      grid-auto-rows: minmax(300px, auto);
    }

    li {
      outline: 1px solid #ddd;
      border-radius: 8px;
      overflow: hidden;
      background: white;
      box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.02);

      img {
        max-width: 100%;
        width: 100%;
        display: block;
        transition: opacity 0.25s ease;
        user-select: none;
      }

      .product-info {
        border-top: 1px solid #ddd;
        padding: 10px;
        padding-bottom: 20px;
      }

      .product-price {
        font-size: 1.5rem;
        color: black;

        sup {
          font-size: 1rem;
          vertical-align: top;
          line-height: 1;
        }
      }

      .product-old-price {
        text-decoration: line-through;
        font-size: 0.9rem;
        color: #aaa;
        /* margin-top: 5px; */
        line-height: 1;
      }

      .product-name {
        font-size: 1rem;

        @media screen and (max-width: 922px) {
          .product-name {
            font-size: 0.9rem;
          }
        }
      }

      a {
        width: 100%;
        height: 100%;
        display: block;

        &:hover {
          img {
            opacity: 0.85;
          }
        }
      }

      .monthly-price {
        span {
          font-size: 0.85rem;
          line-height: 1;
          color: #00a65a !important;
        }
      }

      &[data-discount]::before {
        content: attr(data-discount);
        color: white;
        font-weight: bold;
        font-size: 11px;
        position: absolute;
        top: 8px;
        left: 8px;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 65px;
        height: 21px;
        border-radius: 50px;
        background-color: #00000088;
        outline: 1.5px solid #ff7200;
        box-shadow: 0 0 16px -5px #00000066;
        z-index: 10;
      }
    }
  }
`

export const Specs = styled.div`
  padding: 25px;
  max-width: 600px;

  @media screen and (max-width: 922px) {
    max-width: 100%;
    width: 100%;
  }

  h2 {
    margin-bottom: 16px;
  }

  .specs-content {
    display: grid;
    grid-gap: 1px;
    grid-template-columns: minmax(125px, max-content) 1fr;
    place-items: center;
    grid-auto-rows: minmax(50px, auto);
    margin-top: 5px;
    background: #ddd;
    border-radius: 6px;
    overflow: hidden;
    border: 1px solid #ddd;

    @media screen and (max-width: 320px) {
      grid-template-columns: 1fr 1.75fr !important;
      padding: 25px 10px 35px 10px;

      span {
        word-break: break-word;
        padding: 8px 5px;
        font-size: 0.95em;
      }
    }

    span {
      height: 100%;
      width: 100%;
      display: flex;
      align-items: center;
      padding: 8px 15px;
      background: var(--gray-bluish);
      color: black;
      transition: background 0.25s ease;

      &:nth-of-type(odd) {
        background: #eaebec;
      }

      &.pos-impar-esq {
        box-shadow: 5px 0 2px -1px #00000004;
        z-index: 2;
        user-select: none;
        font-weight: 500;
        background: var(--gray-bluish);
      }
      &.pos-impar-dir {
        background: #fbfcfd !important;
        &:hover {
          background: lightgray !important;
        }
      }

      &.pos-par-esq {
        background: #fbfcfd !important;
        box-shadow: 5px 0 2px -1px #00000004;
        z-index: 2;
        user-select: none;
        font-weight: 500;
      }

      &.pos-par-dir {
        background: #fbfcfd !important;
        &:hover {
          background: lightgray !important;
        }
      }
    }
  }
`
