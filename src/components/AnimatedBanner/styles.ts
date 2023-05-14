import styled from 'styled-components'

export const Container = styled.div`
  position: relative;
  height: 138.88vw;
  width: 100%;
  background-color: black;
  overflow: hidden;
  user-select: none;

  --after-anim: 'firstOneShow 1s ease-out 3s forwards';

  img {
    width: 100%;
  }

  &.loaded {
    .back {
      animation: backShow 1.75s ease-in-out forwards;
    }

    .front {
      animation: frontShow 2s ease-out forwards 1s;
    }

    .ball-x {
      animation: ball-x 10s ease-in-out infinite;
    }

    .ball-y {
      animation: ball-y 10s ease-in-out infinite;
    }

    .glass {
      animation: glass 6s ease forwards 2s;
    }

    button {
      animation: btnUp 2.75s cubic-bezier(0.83, 0.56, 0.47, 0.99) forwards 1s;
    }
  }

  &::after {
    content: '#1';
    position: absolute;
    font-size: 72px;
    color: #ffffff88;
    left: calc(50% - 140px);
    opacity: 0;
    top: 50%;
    pointer-events: none;
    z-index: 3;
    animation: var(--after-anim);
    font-family: 'Saira Condensed', 'ML', -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Ubuntu, Helvetica Neue,
      sans-serif, Apple Color Emoji;
  }

  @keyframes firstOneShow {
    from {
      transform: translateX(140px);
      filter: blur(10px);
      opacity: 1;
      text-shadow: 0px 0px white;
    }

    to {
      transform: translate(0);
      filter: blur(0) drop-shadow(0 0 5px #ffff00dd);
      opacity: 1;
      text-shadow: 1px 1px #ffffffdd;
    }
  }

  .front,
  .back {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;

    img {
      height: 100%;
      object-fit: fill;
    }
  }

  .glass {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #ffffff00;
    border-radius: 25px;
    outline: 4px solid #ffffff33;
    border: 1px solid #ffffff66;
    height: 85%;
    width: 65%;
    z-index: 3;
    opacity: 0;
    box-shadow: 0 0 25px 5px #00000088 inset;
  }

  .ball-x {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    /* animation: ball-x 10s ease-in-out infinite; */
  }

  .ball-y {
    position: absolute;
    top: 0%;
    left: 0;
    width: 25px;
    height: 25px;
    background: radial-gradient(white 0%, purple 15%, transparent 30%);
    border-radius: 50%;
    z-index: 8;
    /* animation    : ball-y 10s ease-in-out infinite; */
  }

  .back {
    z-index: 2;
  }

  .front {
    z-index: 4;
    filter: blur(15px) brightness(0.05) contrast(1.2);
  }

  button {
    position: absolute;
    left: 50%;
    bottom: 15%;
    background: linear-gradient(45deg, red, blue);
    color: white;
    z-index: 4;
    width: 60%;
    height: 50px;
    border-radius: 6px;
    box-shadow: 2px 0 10px 5px rgba(0, 0, 0, 0.3);
    border: 2px solid rgb(2, 2, 2);
    transform: translate(-50%, 350px);
    padding: 0 15px;
    letter-spacing: 1px;
    line-height: 120%;
    font-size: 1.1em;
    font-weight: 300;
    font-family: 'Saira Condensed', 'Inter', 'Segoe UI', sans-serif;

    cursor: pointer;
  }

  .b-blink {
    animation: brightness-blink 8s infinite linear alternate-reverse !important;
  }

  @media screen and (min-width: 922px) {
    width: 100%;
    max-height: 480px;
    text-align: center;

    .front img {
      width: unset;
      height: 480px;
    }

    .back img {
      width: 100%;
      height: 480px;
    }

    .glass {
      width: 25%;
      height: calc(100% - 15%);
      transition: filter 1s ease;
    }

    .glass:hover {
      filter: brightness(4) contrast(1.5);
    }

    button {
      width: 30%;
      height: 55px;
      /* bottom: 10%; */
    }
  }

  @keyframes brightness-blink {
    0% {
      filter: brightness(1);
    }

    25% {
      filter: brightness(0.7);
    }

    50% {
      filter: brightness(1.1);
    }

    75% {
      filter: brightness(0.4);
    }
  }

  @keyframes pulse {
    0% {
      transform: scale(1);
    }

    50% {
      transform: scale(1.1);
    }

    100% {
      transform: scale(1);
    }
  }

  @keyframes btnUp {
    0% {
      transform: translate(-50%, 350px) scale(2);
      pointer-events: none;
    }

    99% {
      pointer-events: none;
    }

    100% {
      transform: translate(-50%, 0) scale(1);
      pointer-events: all;
    }
  }

  @keyframes backShow {
    0% {
      /* opacity: .75; */
      filter: blur(15px) brightness(0.75) hue-rotate(-20deg);
    }

    70% {
      filter: blur(0px) brightness(1.25) hue-rotate(20deg);
    }

    100% {
      /* opacity: 1; */
      filter: blur(0px) brightness(1) hue-rotate(0deg);
    }
  }

  @keyframes frontShow {
    0% {
      /* opacity: 0; */
      filter: blur(10px) brightness(0.1) contrast(1.2);
    }

    50% {
      filter: blur(0px) brightness(0.45) contrast(1.2);
    }

    80% {
      filter: blur(0px) brightness(0.9) contrast(1.2);
    }

    100% {
      /* opacity: 1; */
      filter: blur(0px) brightness(1) contrast(1);
    }
  }

  @keyframes ball-x {
    0% {
      left: 2%;
      opacity: 0;
    }

    5% {
      opacity: 0;
    }

    25% {
      left: 100%;
      filter: brightness(5);
    }

    30% {
    }

    35% {
      opacity: 1;
      filter: brightness(1);
    }

    50% {
      left: 100%;
      filter: brightness(5);
    }

    60% {
      filter: brightness(1);
    }

    75% {
      left: 0;
    }

    85% {
      opacity: 1;
    }

    95% {
      left: 0;
      filter: brightness(2);
    }

    100% {
      left: 2%;
      opacity: 0;
      filter: brightness(0);
    }
  }

  @keyframes ball-y {
    15% {
      top: 0;
    }

    55% {
      top: 100%;
    }

    70% {
      top: 100%;
    }
  }

  @keyframes glass {
    0% {
      opacity: 0;
      transform: translate(-50%, -50%) skew(4deg, 4deg);
      backdrop-filter: blur(0px);
    }

    50% {
      opacity: 1;
      transform: translate(-50%, -50%) skew(10deg, 10deg);
    }

    60% {
      backdrop-filter: blur(0px);
    }

    100% {
      opacity: 1;
      background: #ffffff11;
      transform: translate(-50%, -50%) skew(10deg, 10deg);
      backdrop-filter: blur(5px);
    }
  }
`
