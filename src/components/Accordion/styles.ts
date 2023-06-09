import styled from 'styled-components'

export const Container = styled.div`
  /* Accordion */
  .dlv_accord {
    background-color: #ffffff11;
    background: linear-gradient(0deg, #00000008 0%, #ffffff11 89%, #ffffff11 90%, #ffffff88 99%);
    cursor: pointer;
    padding: 11px 18px 11px 32px;
    width: 100%;
    border-radius: 8px;
    text-align: left;
    outline: none;
    font-size: 15px;
    transition: 0.4s;
    position: relative;
    transition: background-color 0.4s, border-radius 0.35s;
    user-select: none;
  }

  .dlv_accord.active {
    border-radius: 8px 8px 0 0;
    background-color: #00000006 !important;
  }

  .dlv_accord:hover {
    background-color: transparent;
  }

  .dlv_acc_panel {
    padding: 0;
    background-color: #ffffff88;
    overflow: hidden;
    max-height: 0;
    transition: max-height 0.25s ease, border-radius 0.35s;
    border-radius: 8px 8px 0px 0px;
  }

  .dlv_acc_panel.active {
    border-radius: 0 0 8px 8px;
    box-shadow: -1px 0px 0px 0px #f2f2f2 inset, 1px 0px 0px 0px #f2f2f2 inset, 0px -1px 0px 0px #f2f2f2 inset;
  }

  .panel_content {
    padding: 10px 16px 20px 16px;
  }

  button.dlv_accord::after {
    content: '';
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='dimgray' viewBox='0 0 50 50'%3E%3Cpath d='M 18.136719 3 C 17.875 3.003906 17.628906 3.105469 17.441406 3.289063 L 11.417969 9.265625 C 11.027344 9.65625 11.023438 10.289063 11.410156 10.679688 L 25.644531 25.03125 L 11.296875 39.265625 C 10.902344 39.65625 10.898438 40.289063 11.289063 40.679688 L 17.265625 46.703125 C 17.65625 47.097656 18.289063 47.101563 18.679688 46.710938 L 39.765625 25.796875 C 40.15625 25.40625 40.160156 24.773438 39.769531 24.378906 L 18.859375 3.296875 C 18.667969 3.101563 18.40625 2.996094 18.136719 3 Z'%3E%3C/path%3E%3C/svg%3E");
    width: 12.5px;
    height: 12.5px;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    transition: transform 0.05s ease;
    left: 15px;
  }

  button.dlv_accord.arrow-right {
    padding-right: 36px;
  }

  button.dlv_accord.no-arrow::after {
    content: unset !important;
  }

  button.dlv_accord.arrow-right::after {
    left: unset !important;
    right: 18px;
  }

  button.dlv_accord.active:after {
    transform: translateY(-50%) rotate(90deg);
  }

  @media screen and (min-width: 768px) {
    .dlv_acc_panel.footer {
      padding: 0;
      background-color: transparent;
      max-height: unset;
      transition: none;
      border-radius: 0;
    }

    button.dlv_accord.footer {
      padding: 0;
      width: 100%;
      border-radius: 0;
      transition: none;
      cursor: default;
      background: transparent;
    }

    button.dlv_accord.footer::after {
      content: unset;
    }

    button.dlv_accord.footer.active {
      background: transparent;
      background-color: transparent !important;
    }

    button.dlv_accord.footer.active:after {
      transform: none;
    }

    .dlv_acc_panel.footer.active {
      box-shadow: none;
      border-radius: none;
    }

    .panel_content.footer {
      padding: 0;
    }
  }
`
