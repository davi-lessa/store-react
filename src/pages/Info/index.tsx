/* eslint-disable @typescript-eslint/ban-ts-comment */
import { apiRequest, infoRoutes } from 'api'
import React from 'react'
import { useQuery } from 'react-query'
import { Navigate, useNavigate, useParams } from 'react-router-dom'

// import { Container } from './styles';

interface Props {
  slug?: string
}

interface InfoApiResponse {
  data: {
    title: string
    text: string
    seeAlso: {
      title: string
      url: string
    }[]
  }
}

const InfoPage: React.FC<Props> = (props: Props) => {
  const params = useParams()
  const infoSlug = props?.slug || params.slug || null
  const routeExists = infoRoutes?.[infoSlug as string]

  const { data: infoData, isFetched } = useQuery<InfoApiResponse>(
    'info-' + infoSlug,
    async () => {
      try {
        if (!infoSlug || !routeExists) throw new Error('no route for info', { cause: 'invalid-route' })
        //@ts-ignore
        const req = await apiRequest.get<InfoApiResponse>(infoRoutes?.[infoSlug])
        return req.data
      } catch (error) {
        throw new Error('Error at getting info')
      }
    },
    { enabled: !!infoSlug && !!routeExists, staleTime: 60 * 60 * 1000, refetchOnMount: true, retry: 1, retryDelay: 5000 }
  )

  if (!routeExists) return <Navigate to={'/'} replace={true}></Navigate>

  return (
    <>
      {infoData && isFetched && (
        <>
          <h2>{infoData?.data.title}</h2>
          <p dangerouslySetInnerHTML={{ __html: infoData?.data.text }}></p>
          <p>Veja também</p>
          <ul></ul>
        </>
      )}
    </>
  )
}

export default InfoPage
