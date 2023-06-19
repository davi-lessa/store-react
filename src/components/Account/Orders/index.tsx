import { motion } from 'framer-motion'
import React, { useEffect } from 'react'

import { Container, OrderList } from './styles'
import { useQuery } from 'react-query'
import { customerRequest, customerRoutes } from 'api'
import { OrderData } from 'types/orders'
import { formatPrice } from 'utils/price'
import { useNavigate, useParams } from 'react-router-dom'
import ViewOrder from './View'
import { List } from 'react-content-loader'

interface OrderAPIResponse {
  data: OrderData[]
}

const Orders: React.FC = () => {
  const params = useParams()
  const orderIdParam = params.ref
  const navigate = useNavigate()

  const {
    data: ordersData,
    isFetching,
    isError,
  } = useQuery(
    'orders',
    async () => {
      try {
        const req = await customerRequest.get<OrderAPIResponse>(customerRoutes.orders)
        if (req.status != 200) throw new Error('123')
        const res = req.data
        return res
      } catch (error) {
        throw new Error('Failed on getting orders')
      }
    },
    { staleTime: 1000 * 120, refetchOnWindowFocus: true, refetchOnMount: true, enabled: !orderIdParam, retry: 2, retryDelay: 3000 }
  )

  if (orderIdParam) return <ViewOrder orderId={orderIdParam}></ViewOrder>

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { duration: 0.25 } }} exit={{ opacity: 0 }}>
      <Container>
        <h2>Pedidos</h2>

        {isError ? (
          <p>Não foi possível obter os seus pedidos.</p>
        ) : isFetching ? (
          <List></List>
        ) : ordersData?.data?.length ? (
          <OrderList>
            {ordersData.data.map((order, orderIndex) => {
              return (
                <motion.li
                  key={'order-' + order.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { duration: 0.25, delay: orderIndex * 0.1 } }}
                  exit={{ opacity: 0 }}
                >
                  <div className="image">
                    <img src={'123'} alt="" />
                  </div>
                  <div className="info">
                    <h3>Pedido #{order.id}</h3>

                    <p>Valor: {formatPrice(order.value_total)}</p>
                    <p>Status: {order.status.data.name}</p>
                  </div>

                  <div className="actions">
                    <button className="button" onClick={() => navigate('/minhaconta/pedidos/' + String(order.id), { preventScrollReset: false })}>
                      Ver pedido
                    </button>
                  </div>
                </motion.li>
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
