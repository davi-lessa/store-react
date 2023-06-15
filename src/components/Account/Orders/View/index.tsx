import { motion } from 'framer-motion'
import React from 'react'

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
  const { data: orderData, isFetching } = useQuery(
    'order-' + props.orderId,
    async () => {
      try {
        const req = await customerRequest.get<OrderAPIResponse>(customerRoutes.orderById(props.orderId))
        const res = req.data
        return res
      } catch (error) {
        return { data: [], error: true }
      }
    },
    { staleTime: 1000 * 60, refetchOnWindowFocus: true }
  )

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { duration: 0.25 } }} exit={{ opacity: 0 }}>
      <Container>
        <h2>Pedido #{props.orderId}</h2>
      </Container>
    </motion.div>
  )
}

export default ViewOrder
