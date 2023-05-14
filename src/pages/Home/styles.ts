import styled from 'styled-components'

export const Container = styled.div`
  overflow: hidden;
  background-color: #f2f3f5;

  .slider {
    max-width: 100vw;
  }

  a {
    text-decoration: none;
  }

  hr {
    width: 100%;
    height: 1px;
    background-color: #ffffff44;
    box-shadow: 0 -1px 1px 0 #00000011;
    margin: 5px 0;
    display: block;
  }

  @keyframes growShrink {
    from {
      transform: translate(-50%, -50%) scale(0.7);
    }

    to {
      transform: translate(-50%, -50%) scale(1);
    }
  }

  @keyframes slowShow {
    from {
      opacity: 0;
    }

    to {
      opacity: 1;
    }
  }
`

export const Products = styled.div`
  max-width: var(--desktop-max-width);
  margin: 0 auto;
  opacity: 0;
  animation: slowShow 0.5s linear forwards 0.7s;

  .flickity-page-dots {
    bottom: 12px !important;

    .dot {
      background: white !important;

      &.is-selected {
        background: white !important;
        outline: 2px solid #ffffff44;
      }
    }
  }

  .flickity-prev-next-button {
    opacity: 0 !important;
    width: 0px !important;
    height: 0px !important;
    background: #abb1b4 !important;
    transition: width 0.25s, height 0.25s, opacity 0.25s, background 0.35s;

    &[disabled] {
      display: none;
    }

    &:hover {
      background: #3483fa !important;
    }

    @media screen and (max-width: 768px) {
      display: none;
    }
  }

  .flickity-button-icon {
    fill: white !important;
  }

  .flickity-enabled {
    &:hover {
      .flickity-prev-next-button {
        width: 50px !important;
        height: 50px !important;
        opacity: 1 !important;
      }
    }
  }

  .cat-title {
    text-transform: capitalize;

    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    margin-top: 50px;

    @media screen and (max-width: 768px) {
      padding: 0 25px;

      h2.title {
        font-size: 1.75rem;
      }
    }

    h2 {
      font-size: 2rem;
    }

    img {
      width: 100%;
      min-height: 250px;
      background-color: #aaa;

      @media screen and (max-width: 400px) {
        min-height: 150px;
      }
    }

    a.see-all {
      font-weight: 600;
      font-size: 1rem;
      color: #3483fa !important;
      text-decoration: none;
      position: relative;
      transition: color 0.15s, transform 0.25s !important;
      height: min-content;

      &:hover {
        transform: translateX(-10px);
        position: relative;
      }

      &:hover::after {
        transform: translate(0%, -50%);
        opacity: 1;
      }

      &::after {
        content: '⇢';
        right: -20px;
        top: 50%;
        position: absolute;
        opacity: 0;
        transform: translate(25%, -50%);
        transition: opacity 0.35s 0.1s, transform 0.35s 0.1s;
        pointer-events: none;
      }
    }
  }

  .cat-expand-six {
    animation: slowShow 0.5s linear forwards;
    padding: 0 100px;
    display: grid;
    grid-gap: 10px;
    grid-template-columns: 1fr 1fr 1fr 1fr;

    @media screen and (max-width: 768px) {
      padding: 0 5px;
      .products {
        grid-template-columns: 1fr;
      }
    }
  }

  .description {
    display: flex;
    flex-wrap: wrap;
    grid-area: description;
    align-content: flex-start;
    overflow: hidden;
    position: relative;
    cursor: grab;
    min-height: 155px;

    padding-bottom: 10px;

    > * {
      flex-basis: 100%;
    }
  }

  .prod-title {
    text-decoration: none;
    font-size: 1.1em;
    margin-top: 10px !important;
    display: block;
    padding: 0 10px;

    @media screen and (max-width: 768px) {
      font-size: 0.95rem;
    }
  }

  [data-discount]::before {
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

  .product {
    &:hover .img-holder-link::after {
      opacity: 1;
    }
  }
  .product::before {
    top: 12px;
  }

  .img-holder-link {
    border-bottom: 2px solid #ededed;
    grid-area: img;
    position: relative;
    width: 100%;

    &::after {
      content: '';
      width: 100%;
      height: 100%;
      position: absolute;
      background-color: #ffffff22;
      top: 0;
      left: 0;
      opacity: 0;
      transition: opacity 0.25s;
    }

    img {
      display: block;
      width: 100%;
    }
  }

  .old-price {
    color: #aaa;
    font-size: 0.9rem;
    margin-top: 2px;
    text-decoration: line-through;
    padding: 0 10px;
  }

  .price {
    font-size: 1.5rem;
    font-weight: 400;
    color: black;
    padding: 0 10px;

    sup {
      font-size: 1rem;
      vertical-align: top;
    }
  }

  .monthly-price {
    color: #676767;
    font-size: 0.85rem;
    padding: 0 10px;

    span {
      color: #444;
    }
  }

  .monthly-price span {
  }
`
export const SmallProduct = styled.div`
  display: grid;
  grid-gap: 10px;
  grid-template-columns: min-content 1fr;
  grid-template-areas: 'img description';
  margin-bottom: 10px;
  position: relative;

  @media screen and (max-width: 768px) {
    margin: 7.5px 0 !important;

    &:first-of-type {
      order: 1 !important;
    }

    &:last-of-type {
      order: 3 !important;
    }
  }

  ::before {
    font-size: 10px;
    width: 60px;
    height: 18px;
    left: 4px;
    top: 4px;
  }

  .img img {
    width: 100px;

    @media screen and (max-width: 768px) {
      max-width: 150px;
      width: 125px;
    }
  }

  .prod-title {
    display: block;
    color: #444;
    font-size: 1.1rem !important;
    font-weight: 600;
  }

  .old-price {
    color: #aaa;
    text-decoration: line-through;
  }

  .price {
    font-size: 1.25rem;
    font-weight: 400;
    color: black;
  }

  .monthly-price {
    color: #676767;
    font-size: 0.85rem;
  }
`

export const BigProduct = styled.div`
  display: flex;
  align-content: flex-start;
  flex-wrap: wrap;
  background: white;
  width: min-content;
  border-radius: 8px;
  padding-bottom: 10px;
  width: 100%;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  position: relative;
  overflow: hidden;

  &:first-of-type {
    order: 0 !important;
  }

  &:last-of-type {
    order: 2 !important;
  }

  img {
    @media screen and (max-width: 768px) {
      max-width: 100%;
    }
  }

  .prod-title,
  .old-price,
  .price,
  .monthly-price {
    padding: 0 10px;
  }

  .price {
    font-size: 1.5rem;
  }

  .prod-title {
    font-weight: 600;
    margin-top: 5px;
    display: block;
    color: #444;
    margin-top: 10px;
    font-size: 1.1rem !important;
  }
`

export const SliderContainer = styled.div`
  padding: 0 100px;
  margin: 0 auto;
  overflow: hidden;

  @media screen and (max-width: 768px) {
    padding: 0;
    .wrapper:first-of-type {
      padding-left: 25px !important;
    }
  }
`

export const SliderProductHolder = styled.div`
  background: white;
  max-width: 250px;
  margin-right: 10px;
  margin-top: 3px;
  margin-bottom: 3px;
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  animation: slowShow 0.5s ease;
  flex-basis: 100%;
  position: relative;
  user-select: none;

  @media screen and (max-width: 768px) {
    .description {
      min-height: 155px;
    }

    padding: 0;

    .cat-title {
      padding: 0 20px;
    }
  }

  cursor: pointer;

  .slider-product {
    background: white;
    max-width: 250px;
    margin-right: 10px;
    margin-top: 3px;
    margin-bottom: 3px;
    overflow: hidden;
    border-radius: 8px;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  }
`
