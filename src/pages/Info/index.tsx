/* eslint-disable @typescript-eslint/ban-ts-comment */
import { apiRequest, infoRoutes } from 'api'
import React from 'react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'

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

  const { data: infoData, isFetched } = useQuery<InfoApiResponse>(
    'info-' + infoSlug,
    async () => {
      //@ts-ignore
      const req = await apiRequest.get<InfoApiResponse>(infoRoutes?.[infoSlug] || 'none')
      return req.data
    },
    { enabled: !!infoSlug, staleTime: 60 * 60 * 1000 }
  )

  return (
    <>
      {isFetched && (
        <>
          <h2>{infoData?.data.title}</h2>
          <p>{infoData?.data.text}</p>
          <p>Veja também</p>
          <ul></ul>
        </>
      )}
    </>
  )
}

export default InfoPage
