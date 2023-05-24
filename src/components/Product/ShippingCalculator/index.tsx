import { apiRequest, apiRoutes } from 'api'
import React, { useEffect, useRef, useState } from 'react'
import { useQuery } from 'react-query'
import queryClient from 'services/queryClient'
import { z } from 'zod'
import InputMask, { conformToMask } from 'react-text-mask'

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

interface ShippingCalcResponse {
  a: 1
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
  const [currentCep, setCurrentCep] = useState<string>('')
  const cepInput = useRef('')
  const savedCep = localStorage.getItem('last_cep') || ''

  const { data: shippingData } = useQuery(
    'shipping-calc-' + props.itemInfo.id + props.itemInfo.quantity,
    async () => {
      try {
        if (!currentCep) return null
        ItemCalculationSchema.parse({ ...props.itemInfo, id: '1' })
        const req = await apiRequest.post<ShippingCalcResponse>(apiRoutes.shippingCalc, { ...props.itemInfo, cep: currentCep })
        return req.data
      } catch (error) {
        console.warn(error)
        return null
      }
    },
    { staleTime: 60 * 1000 * 60, enabled: !!currentCep }
  )

  console.log(shippingData)

  function updateCEP() {
    if (!cepInput.current) return
    const conformed = conformToMask(cepInput.current, [/[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, '-', /[0-9]/, /[0-9]/, /[0-9]/])
    const formatted = conformed.conformedValue.match(/[0-9]/g)?.join('') || ''
    if (conformed?.meta?.someCharsRejected || formatted?.length < 8) return
    localStorage.setItem('last_cep', formatted)
    setCurrentCep(cepInput.current)
    queryClient.invalidateQueries({ queryKey: 'shipping-calc-' + props.itemInfo.id + props.itemInfo.quantity })
  }

  return (
    <>
      <span className="block-title">Calcular frete</span>
      <div className="input-holder-sbs cep-holder">
        <InputMask
          mask={[/[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, '-', /[0-9]/, /[0-9]/, /[0-9]/]}
          type="tel"
          className="freight-input"
          placeholder={savedCep || 'CEP'}
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
      <div className="cep-result" hidden></div>
    </>
  )
}

export default ShippingCalculator
