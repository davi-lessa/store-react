import styled from 'styled-components'

export const Container = styled.div`
  .cep-result {
    &.hidden {
      display: none;
    }

    .cep-result-option {
      display: flex;
      justify-content: space-between;
      background: #f2f2f2;
      padding: 15px 20px;
      border-radius: 8px;
      margin-top: 5px;

      .freightName {
        font-weight: bold;
      }
      .freightDays {
        text-align: right;
        font-size: 0.85em;
        color: #555;
      }
      .freightPrice {
        font-weight: bold;
        color: #444;
        font-size: 0.9rem;
      }
    }
  }
`
