import { motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'

import { Container, OlderRaffleList } from './styles'
import { customerRequest, customerRoutes } from 'api'
import { useQuery } from 'react-query'
import Switch from 'components/Switch'
import { Code } from 'react-content-loader'
import queryClient from 'services/queryClient'
import { Link } from 'react-router-dom'

interface RaffleUserAPIResponse {
  data: any
}

interface OlderRafflesAPIResponse {
  data: any[]
}

const Raffles: React.FC = () => {
  const {
    data: raffleUserData,
    isFetching: raffleUserIsFetching,
    isFetched: raffleUserIsFetched,
    isError: raffleUserIsError,
  } = useQuery(
    'raffle-user',
    async () => {
      try {
        const req = await customerRequest.get<RaffleUserAPIResponse>(customerRoutes.rafflesUser)
        if (req.status != 200) throw new Error()
        const res = req.data
        return res
      } catch (error) {
        throw new Error('Failed on getting orders')
      }
    },
    { staleTime: 1000 * 60 * 10, refetchOnWindowFocus: true, refetchOnMount: true, retry: 2, retryDelay: 3000 }
  )

  const {
    data: olderRafflesData,
    isFetching: olderRafflesIsFetching,
    isFetched: olderRafflesIsFetched,
    isError: olderRafflesIsError,
  } = useQuery(
    'raffles-older',
    async () => {
      try {
        const req = await customerRequest.get<OlderRafflesAPIResponse>(customerRoutes.olderRaffles)
        if (req.status != 200) throw new Error()
        const res = req.data
        return res
      } catch (error) {
        throw new Error('Failed on getting orders')
      }
    },
    { staleTime: 1000 * 60 * 15, refetchOnWindowFocus: true, refetchOnMount: true, retry: 2, retryDelay: 3000 }
  )

  const [rafflesActive, setRafflesActive] = useState(raffleUserData?.data?.active ? true : false)
  const [isUpdating, setIsUpdating] = useState(false)

  useEffect(() => {
    if (raffleUserData?.data?.active) setRafflesActive(() => true)
  }, [raffleUserData])

  async function updateActive(value: boolean) {
    try {
      const req = await customerRequest.post(customerRoutes.rafflesUser, { value })
      if (req.status != 200) throw new Error('bad-request')

      const newData = { ...raffleUserData }
      newData.data.active = value
      queryClient.setQueryData('raffle-user', newData)
      return true
    } catch (error) {
      return false
    }
  }

  async function activeChangeHandler() {
    if (isUpdating) return
    setIsUpdating(true)
    const status = !rafflesActive
    const updated = await updateActive(status)
    if (updated) {
      setRafflesActive(status)
      setIsUpdating(false)
      return true
    }
    setIsUpdating(false)
    return false
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { duration: 0.25 } }} exit={{ opacity: 0 }} key={111}>
      <Container className={rafflesActive ? 'active' : ''}>
        <h2>Sorteios</h2>

        {raffleUserIsFetching ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { duration: 0.25 } }} exit={{ opacity: 0 }} key={'rf-en-1'}>
            <Code></Code>
          </motion.div>
        ) : raffleUserIsFetched && !raffleUserIsError ? (
          <div>
            <div className="holder">
              <span>Participar de Sorteios</span>
              <Switch defaultChecked={rafflesActive} onClick={activeChangeHandler} controllerVar={rafflesActive}></Switch>

              {rafflesActive ? (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { duration: 0.25 } }} exit={{ opacity: 0 }} key={'rf-en-1'}>
                  Você está participando dos próximos sorteios.
                </motion.p>
              ) : (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { duration: 0.25 } }} exit={{ opacity: 0 }} key={'rf-en-2'}>
                  Inscreva-se para os próximos sorteios. Ao se inscrever, você concorda com a <strong>Política de Sorteios</strong>
                </motion.p>
              )}
            </div>
            <br />
            <p>Você ainda não ganhou nenhum sorteio.</p>

            <br />

            <h3>Próximos e finalizados</h3>
            {olderRafflesIsError ? (
              <p>Não foi possível obter sorteios anteriores</p>
            ) : olderRafflesIsFetching ? (
              <Code></Code>
            ) : olderRafflesData?.data?.length ? (
              <OlderRaffleList>
                {olderRafflesData.data.map((raffle) => (
                  <li key={'rf' + raffle.ref}>
                    <p>
                      <strong>SORTEIO #{raffle?.ref}</strong>
                    </p>
                    <hr />

                    <p className="date">
                      <strong>Realização:</strong>&nbsp;
                      {new Date(raffle?.date?._seconds * 1000)?.toLocaleString('pt-BR', {
                        day: '2-digit',
                        month: '2-digit',
                        year: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit',
                        weekday: 'long',
                      })}
                    </p>

                    <p className="winner">
                      <strong>Vencedor: </strong> {raffle?.winner_code ? raffle?.winner_code : '—'}
                    </p>

                    {raffle?.live?.url && (
                      <p className="live">
                        <strong>Live do sorteio: </strong>
                        <Link to={raffle?.live?.url} target="_blank">
                          Abrir
                        </Link>
                      </p>
                    )}

                    <p className={`status ${raffle?.status != 'FINISHED' ? 'open' : ''}`}>
                      <span>{raffle?.status == 'FINISHED' ? 'Finalizado' : 'A realizar'}</span>
                    </p>
                  </li>
                ))}
              </OlderRaffleList>
            ) : (
              <p>Não há sorteios anteriores</p>
            )}
          </div>
        ) : (
          <p>Falha ao carregar dados de sorteio</p>
        )}
      </Container>
    </motion.div>
  )
}

export default Raffles
