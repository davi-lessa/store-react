import { motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'

import { Container } from './styles'
import { customerRequest, customerRoutes } from 'api'
import { useQuery } from 'react-query'
import Switch from 'components/Switch'
import { BulletList } from 'react-content-loader'

interface RafflesAPIResponse {
  data: any
}

const Raffles: React.FC = () => {
  const {
    data: rafflesData,
    isFetching,
    isFetched,
    isError,
  } = useQuery(
    'raffles',
    async () => {
      try {
        const req = await customerRequest.get<RafflesAPIResponse>(customerRoutes.raffles)
        if (req.status != 200) throw new Error('123')
        const res = req.data
        return res
      } catch (error) {
        throw new Error('Failed on getting orders')
      }
    },
    { staleTime: 1000 * 60, refetchOnWindowFocus: true, refetchOnMount: true, retry: 2, retryDelay: 3000 }
  )

  const [rafflesActive, setRafflesActive] = useState(rafflesData?.data?.active ? true : false)

  useEffect(() => {
    if (rafflesData?.data?.active) setRafflesActive(() => true)
  }, [rafflesData])

  async function updateActive(value: boolean) {
    try {
      const req = await customerRequest.post(customerRoutes.raffles)
      if (req.status != 200) throw new Error('bad-request')
      const res = req.data
      return res
    } catch (error) {
      return false
    }
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { duration: 0.25 } }} exit={{ opacity: 0 }}>
      <Container className={rafflesActive ? 'active' : ''}>
        <h2>Sorteios</h2>

        {isFetching ? (
          <BulletList></BulletList>
        ) : isFetched && !isError ? (
          <div>
            <div className="holder">
              <span>Participar de Sorteios</span>
              <Switch defaultChecked={rafflesActive} onChange={(status: boolean) => setRafflesActive(status)} changeVar={rafflesActive}></Switch>

              {rafflesActive ? (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { duration: 0.25 } }} exit={{ opacity: 0 }} key={'rf-en-1'}>
                  Você está participando dos próximos sorteios.
                </motion.p>
              ) : (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { duration: 0.25 } }} exit={{ opacity: 0 }} key={'rf-en-2'}>
                  Inscreva-se para os próximos sorteios. Ao se inscrever, você concorda com a Política de Sorteio
                </motion.p>
              )}
            </div>
            <br />
            <p>Você ainda não ganhou de nenhum sorteio.</p>
          </div>
        ) : (
          <p>Falha ao carregar dados de sorteio</p>
        )}
      </Container>
    </motion.div>
  )
}

export default Raffles
