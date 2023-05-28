import { apiRequest, apiRoutes } from 'api'
import React, { useEffect, useRef, useState } from 'react'
import { useQuery } from 'react-query'
import queryClient from 'services/queryClient'
import { z } from 'zod'
import InputMask, { conformToMask } from 'react-text-mask'
import { Container } from './styles'

// import { Container } from './styles';
interface Props {
  itemInfo: {
    id: string
    length: number
    width: number
    height: number
    weight: number
    quantity: number
  }
}

export interface ShippingCalcResponse {
  options: Option[]
}

export interface Option {
  name: string
  service: string
  price: string
  days: string
}

const ItemCalculationSchema = z.object({
  id: z.string(),
  length: z.number(),
  width: z.number(),
  height: z.number(),
  weight: z.number(),
  quantity: z.number(),
})

const ShippingCalculator: React.FC<Props> = (props: Props) => {
  const [currentCep, setCurrentCep] = useState<string>(localStorage.getItem('last_cep') || '')
  const savedCep = localStorage.getItem('last_cep') || ''
  const cepInput = useRef(savedCep)
  const maskRegexArray = [/[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, '-', /[0-9]/, /[0-9]/, /[0-9]/]
  const calcClicked = useRef(false)

  const {
    data: shippingResult,
    isFetched,
    isFetching,
  } = useQuery(
    'shipping-calc-' + props.itemInfo.id + props.itemInfo.quantity + currentCep,
    async () => {
      try {
        if (!currentCep || !calcClicked.current) return null
        ItemCalculationSchema.parse({ ...props.itemInfo, id: '1' })
        const req = await apiRequest.post<ShippingCalcResponse>(apiRoutes.shippingCalc, {
          ...props.itemInfo,
          cep: currentCep.match(/[0-9]/g)?.join(''),
        })
        calcClicked.current = false
        return req.data
      } catch (error) {
        calcClicked.current = false
        return null
      }
    },
    { staleTime: 60 * 1000 * 60, enabled: !!currentCep }
  )

  function updateCEP() {
    if (!cepInput.current) return
    const conformed = conformToMask(cepInput.current, maskRegexArray)
    const formatted = conformed.conformedValue.match(/[0-9]/g)?.join('') || ''
    if (conformed?.meta?.someCharsRejected || formatted?.length < 8) return
    localStorage.setItem('last_cep', formatted)
    calcClicked.current = true

    queryClient.invalidateQueries({ queryKey: 'shipping-calc-' + props.itemInfo.id + props.itemInfo.quantity + currentCep })
    setCurrentCep(cepInput.current)
  }

  function getOptions() {
    return shippingResult?.options
      ?.sort((a, b) => Number(a.price) - Number(b.price))
      .map((option) => {
        return (
          <div key={'shp-option-' + props.itemInfo.id + option.name}>
            <div className="cep-result-option">
              <span>
                <strong className="freightName">{option.name}</strong>
              </span>
              <span className="freightDays">
                {option.days}
                <br />
                <span className="freightPrice">R$ {option.price.replace('.', ',')}</span>
              </span>
            </div>
          </div>
        )
      })
  }

  return (
    <Container>
      <span className="block-title">Calcular frete</span>
      <div className="input-holder-sbs cep-holder">
        <InputMask
          mask={maskRegexArray}
          type="tel"
          className="freight-input"
          placeholder={savedCep ? conformToMask(savedCep, maskRegexArray).conformedValue : 'CEP'}
          id="cepInput"
          defaultValue={savedCep}
          onChange={(e) => {
            cepInput.current = e.currentTarget.value
          }}
          keepCharPositions={false}
        />
        <button className="freight-button hoverable" onClick={updateCEP}>
          Calcular
        </button>
      </div>
      <div className={`cep-result ${isFetching || shippingResult?.options.length ? '' : 'hidden'}`}>
        {isFetched && shippingResult?.options.length ? (
          <div>
            <h4 style={{ marginBottom: '15px' }}>
              Frete para: <strong>{conformToMask(currentCep, maskRegexArray).conformedValue}</strong>
            </h4>
            {getOptions()}
          </div>
        ) : isFetching ? (
          <span>Carregando...</span>
        ) : (
          <span></span>
        )}
      </div>
    </Container>
  )
}

export default ShippingCalculator
