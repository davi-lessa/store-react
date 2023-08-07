import React, { useState } from 'react'
import { MdOutlineMail as MailIcon, MdWhatsapp as WhatsIcon, MdOutlineWatchLater as WatchIcon } from 'react-icons/all'
import { BtnGoTop, Container, FooterList } from './styles'
import { Link } from 'react-router-dom'
import { useQuery } from 'react-query'
import { apiRequest, apiRoutes } from 'api'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'store'
import { z } from 'zod'
import { actions as commonActions } from 'store/reducers/common'

const Footer: React.FC = () => {
  const [subscribeEmail, setSubscribeEmail] = useState<string>('')
  const [isValidEmail, setIsValidEmail] = useState(false)
  const [shouldFetch, setShouldFetch] = useState(false)
  const dispatch = useDispatch()

  const isAlreadySubscribed = useSelector((state: RootState) => state.common.hasSubscribed)

  const { data: subscribeData, refetch: subscribeRefetch } = useQuery(
    'subscribe',
    async () => {
      try {
        const req = await apiRequest.post(apiRoutes.subscribe, { email: subscribeEmail })
        const res = req.data
        if (res.status === 'ok') dispatch(commonActions.setSubscribed(true))

        setShouldFetch(false)
        setSubscribeEmail('')
        return req.data
      } catch (error) {
        setShouldFetch(false)
        setSubscribeEmail('')
      }
    },
    { enabled: subscribeEmail.length > 0 && !isAlreadySubscribed && shouldFetch, retry: 1, retryDelay: 3000 }
  )

  function goTop() {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }

  const items = {
    '/minhaconta': 'Minha conta',
    '/rastreamento': 'Rastreamento',
    '/atendimento': 'Atendimento',
    '/faq': 'Perguntas frequentes',
    '/politica-de-privacidade': 'Política de Privacidade',
    '/termos-de-uso': 'Termos de uso',
    '/sobre-nos': 'Sobre Nós',
  }

  function updateEmail(e: React.ChangeEvent) {
    const value = (e.currentTarget as HTMLInputElement).value
    setSubscribeEmail(value)
    const isValid = z.string().min(7).includes('.', { position: 4 }).email().catch('false').parse(value)

    if (isValid != 'false') setIsValidEmail(true)
    else setIsValidEmail(false)
    // setIsValidEmail(true)
  }

  function doSubscribe() {
    if (isValidEmail) setShouldFetch(true)
  }

  return (
    <>
      <BtnGoTop id="footerGoTopBtn" onClick={goTop}>
        VOLTAR AO TOPO
      </BtnGoTop>
      <Container>
        <FooterList>
          <li>
            <h3>Páginas Úteis</h3>
            <div className="dlv_acc_panel footer">
              <div className="panel_content footer">
                {Object.entries(items).map(([route, label], i) => (
                  <p key={'footer-nav-' + i}>
                    <Link to={route}>{label}</Link>
                  </p>
                ))}
              </div>
            </div>
          </li>

          <li className="us">
            <h3>Atendimento</h3>
            <p>
              <WatchIcon size={20} />
              segunda à sexta - 9h às 17:30h
            </p>
            <p className="us">
              <WhatsIcon size={20} />
              <Link to={'https://api.whatsapp.com/send?phone=5571992973090&text=Ol%C3%A1!.'} target="_blank">
                +55 (71) 99123-5678
              </Link>
            </p>
            <p>
              <MailIcon size={20} /> <Link to={'mailto:davi.c.lessa@gmail.com'}>sac@minox71.com.br</Link>
            </p>
          </li>

          <li>
            <h3>Receba Ofertas Exclusivas</h3>
            {isAlreadySubscribed ? (
              <p className="subscribe-congrats">Parabéns! Você está inscrito para receber promoções exclusivas!</p>
            ) : (
              <>
                <p>Inscreva-se para receber promoções e novidades imperdíveis. Cancele a qualquer momento no seu e-mail.</p>
                <div className={`input-holder ${!isAlreadySubscribed && subscribeEmail.length >= 7 ? (isValidEmail ? 'valid' : 'invalid') : ''}`}>
                  <input type="email" className="email" placeholder="Seu melhor e-mail" value={subscribeEmail} onChange={updateEmail} />
                  <button className="mail-reg-btn" onClick={doSubscribe}>
                    Cadastrar
                  </button>
                </div>
              </>
            )}
          </li>
        </FooterList>
      </Container>
    </>
  )
}

export default Footer
