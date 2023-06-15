import { motion } from 'framer-motion'
import React from 'react'

import { Container, OrderList } from './styles'
import { useQuery } from 'react-query'
import { customerRequest, customerRoutes } from 'api'
import { OrderData } from 'types/orders'
import { formatPrice } from 'utils/price'
import { useNavigate, useParams } from 'react-router-dom'
import ViewOrder from './View'

interface OrderAPIResponse {
  data: OrderData[]
}

const Orders: React.FC = () => {
  const params = useParams()
  const orderIdParam = params.ref
  const navigate = useNavigate()

  const { data: ordersData, isFetching } = useQuery(
    'orders',
    async () => {
      try {
        const req = await customerRequest.get<OrderAPIResponse>(customerRoutes.orders)
        const res = req.data
        return res
      } catch (error) {
        return { data: [], error: true }
      }
    },
    { staleTime: 1000 * 60, refetchOnWindowFocus: true }
  )

  if (orderIdParam) return <ViewOrder orderId={orderIdParam}></ViewOrder>

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { duration: 0.25 } }} exit={{ opacity: 0 }}>
      <Container>
        <h2>Pedidos</h2>
        {ordersData?.data ? (
          <OrderList>
            {ordersData.data.map((order) => {
              return (
                <li key={'order-' + order.id}>
                  <div className="image">
                    <img src={'123'} alt="" />
                  </div>
                  <div className="info">
                    <h3>Pedido #{order.id}</h3>

                    <p>Valor: {formatPrice(order.value_total)}</p>
                    <p>Status: {order.status.data.name}</p>
                  </div>

                  <div className="actions">
                    <button className="button" onClick={() => navigate('/minhaconta/pedidos/' + String(order.id), { preventScrollReset: true })}>
                      Ver pedido
                    </button>
                  </div>
                </li>
              )
            })}
          </OrderList>
        ) : (
          <p>Você ainda não realizou nenhum pedido.</p>
        )}
      </Container>
    </motion.div>
  )
}

export default Orders
