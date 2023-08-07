import styled from 'styled-components'

export const Container = styled.div`
  .apanel,
  .abutton {
    font-family: 'Inter', 'ML', 'Saira Condensed', 'Segoe UI', sans-serif;
  }

  .accordion-wrapper {
    &:first-of-type {
      button.dlv_accord {
        border-radius: 8px 8px 0 0 !important;
      }
    }
    &:last-of-type {
      button.dlv_accord {
        border-radius: 0 0 8px 8px !important;
      }
    }
    button.dlv_accord {
      border: 1px solid #f2f3f4;
      border-radius: 0px !important;
    }
  }
  .dlv_acc_panel {
    border-radius: none !important;
    border: none !important;
  }
`
