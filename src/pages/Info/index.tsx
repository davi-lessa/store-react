/* eslint-disable @typescript-eslint/ban-ts-comment */
import { apiRequest, infoRoutes } from 'api'
import React, { useEffect, lazy, Suspense } from 'react'
import { useQuery } from 'react-query'
import { Navigate, useParams } from 'react-router-dom'
import { Container } from './styles'
import { motion } from 'framer-motion'
import Terms from './Terms'
import Privacy from './Privacy'
import About from './About'
const FAQ = lazy(() => import('./FAQ'))

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

const localRenderSlugs: { [key: string]: Partial<Extended> } = {
  faq: { component: FAQ, title: 'FAQ' },
  terms: { component: Terms, title: 'Termos de uso' },
  privacy: { component: Privacy, title: 'Política de Privacidade' },
  about: { component: About, title: 'Sobre nós' },
}

const InfoPage: React.FC<Props> = (props: Props) => {
  const params = useParams()
  const infoSlug = props?.slug || params.slug || null
  const routeExists = !!infoRoutes?.[infoSlug as string]
  const localRender = localRenderSlugs?.[infoSlug as string]

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
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { duration: 0.5 } }}>
      <Container>
        {localRender && (
          <>
            <h2>{localRender.title}</h2>
            <br />
            {DynamicComponent ? (
              <Suspense fallback={<p>Carregando...</p>}>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <DynamicComponent></DynamicComponent>
                </motion.div>
              </Suspense>
            ) : (
              <></>
            )}
            {localRender?.seeAlso ? <p>Veja também</p> : ''}

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
    </motion.div>
  )
}

export default InfoPage
