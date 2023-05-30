import React from 'react'
import { MdOutlineMail as MailIcon, MdWhatsapp as WhatsIcon, MdOutlineWatchLater as WatchIcon } from 'react-icons/all'
import { BtnGoTop, Container, FooterList } from './styles'
import { Link } from 'react-router-dom'

const Footer: React.FC = () => {
  function goTop() {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
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
                <p>
                  <Link to="/minhaconta">Minha conta</Link>
                </p>
                <p>
                  <Link to="/sobre-nos">Sobre Nós</Link>
                </p>
                <p>
                  <Link to="/atendimento">Fale Conosco</Link>
                </p>
                <p>
                  <Link to="/rastreamento">Rastrear Pedido</Link>
                </p>
                <p>
                  <Link to="/faq">FAQ</Link>
                </p>
              </div>
            </div>
          </li>

          <li className="us">
            <h3>Atendimento</h3>
            <p>
              <WatchIcon size={20} />
              de segunda à sexta - 9h às 17:30h
            </p>
            <p className="us">
              <WhatsIcon size={20} />
              <Link
                to={'https://api.whatsapp.com/send?phone=5571992973090&text=Ol%C3%A1!%20Gostaria%20de%20falar%20com%20um%20atendente.'}
                target="_blank"
              >
                +55 (71) 99156-4853
              </Link>
            </p>
            <p>
              <MailIcon size={20} /> <Link to={'mailto:sac@minox71.com.br'}>sac@minox71.com.br</Link>
            </p>
          </li>

          <li>
            <h3>Receba Ofertas Exclusivas</h3>
            <p>Inscreva-se para receber nossos cupons e nossas melhores promoções.</p>
            <div className="input-holder">
              <input type="email" className="email" placeholder="Seu melhor e-mail" />
              <button className="mail-reg-btn">Cadastrar</button>
            </div>
          </li>
        </FooterList>
      </Container>
    </>
  )
}

export default Footer
