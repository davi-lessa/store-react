import { motion, wrap } from 'framer-motion'
import React, { useEffect, useRef } from 'react'

import { Container } from './styles'
import { useQuery } from 'react-query'
import { customerRequest, customerRoutes } from 'api'
import { OrderData } from 'types/orders'

interface OrderAPIResponse {
  data: OrderData[]
}

interface Props {
  orderId: string
}

const ViewOrder: React.FC<Props> = (props: Props) => {
  const wrapperRef = useRef<HTMLDivElement>(null)

  const {
    data: orderData,
    isFetching,
    isError,
  } = useQuery(
    'order-' + props.orderId,
    async () => {
      try {
        const req = await customerRequest.get<OrderAPIResponse>(customerRoutes.orderById(props.orderId))
        if (req.status != 200) throw new Error()
        const res = req.data
        return res
      } catch (error) {
        throw new Error('Failed on getting order')
        // return { data: [], error: true }
      }
    },
    { staleTime: 1000 * 60 * 5, refetchOnWindowFocus: true, refetchOnMount: true, retry: 2, retryDelay: 2000 }
  )

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.25 } }}
      exit={{ opacity: 0 }}
      ref={wrapperRef}
      style={{ scrollMarginTop: '135px' }}
    >
      <Container>
        <h2>Pedido #{props.orderId}</h2>
      </Container>
    </motion.div>
  )
}

export default ViewOrder
