/* eslint-disable @typescript-eslint/ban-ts-comment */
import { apiRequest, infoRoutes } from 'api'
import React, { useEffect } from 'react'
import { useQuery } from 'react-query'
import { Navigate, useParams } from 'react-router-dom'
import { Container } from './styles'
import FAQ from './FAQ'

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

interface ExtendedData {
  component: React.FC
}
type Extended = InfoApiResponse['data'] & ExtendedData

const renderSlugs: { [key: string]: Partial<Extended> } = {
  faq: { component: FAQ, title: 'FAQ' },
}

const InfoPage: React.FC<Props> = (props: Props) => {
  const params = useParams()
  const infoSlug = props?.slug || params.slug || null
  const routeExists = !!infoRoutes?.[infoSlug as string]
  const localRender = renderSlugs?.[infoSlug as string]

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
    { enabled: !!infoSlug && routeExists && !localRender, staleTime: 60 * 60 * 1000, refetchOnMount: true, retry: 1, retryDelay: 5000 }
  )

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  if (!routeExists) return <Navigate to={'/'} replace={true}></Navigate>
  const DynamicComponent = localRender ? localRender.component : null

  return (
    <Container>
      {localRender && (
        <>
          <h2>{localRender.title}</h2>
          <br />
          {DynamicComponent ? <DynamicComponent></DynamicComponent> : <></>}
          <p>Veja também</p>
          <ul></ul>
        </>
      )}

      {infoData && isFetched && (
        <>
          <h2>{infoData?.data.title}</h2>
          <div dangerouslySetInnerHTML={{ __html: infoData?.data.text }}></div>
          <p>Veja também</p>
          <ul></ul>
        </>
      )}
    </Container>
  )
}

export default InfoPage
