import React from 'react'
import { Div } from './styles'

// import { Container } from './styles';

const Privacy: React.FC = () => {
  return (
    <>
      <p>
        Esta Política de Privacidade descreve como são coletadas, usadas e protegidas as informações pessoais fornecidas por você ao acessar e
        utilizar nosso site. Ao utilizar nosso site, você concorda com os termos desta Política de Privacidade.
      </p>
      <Div>
        <h3>1. Informações Coletadas</h3>
        <p>
          1.1. Durante sua interação com nosso site, podemos coletar informações pessoais, como nome, endereço de e-mail, informações de pagamento e
          outras informações relevantes para a prestação de serviços.
        </p>

        <h3>2. Uso das Informações</h3>
        <p>
          2.1. As informações coletadas podem ser usadas para processar pedidos, fornecer suporte ao cliente, melhorar nossos produtos e serviços,
          enviar comunicações relevantes e cumprir obrigações legais.
        </p>

        <h3>3. Compartilhamento de Informações</h3>
        <p>
          3.1. Não compartilharemos suas informações pessoais com terceiros, exceto quando necessário para a execução de serviços, cumprimento de
          obrigações legais ou com o seu consentimento.
        </p>

        <h3>4. Segurança das Informações</h3>
        <p>
          4.1. Implementamos medidas de segurança para proteger suas informações pessoais contra acesso não autorizado, alteração, divulgação ou
          destruição.
        </p>

        <h3>5. Cookies e Tecnologias Semelhantes</h3>
        <p>
          5.1. Nosso site utiliza cookies e tecnologias semelhantes para melhorar a experiência do usuário e coletar informações sobre a utilização do
          site.
        </p>

        <h3>6. Links para Sites Externos</h3>
        <p>
          6.1. Nosso site pode conter links para sites externos. Não nos responsabilizamos pelas práticas de privacidade ou conteúdo desses sites.
        </p>

        <h3>7. Alterações na Política de Privacidade</h3>
        <p>
          7.1. Reservamos o direito de modificar ou atualizar esta Política de Privacidade a qualquer momento. Quaisquer alterações entrarão em vigor
          imediatamente após a publicação no site.
        </p>

        <h3>8. Contato</h3>
        <p>
          8.1. Se você tiver alguma dúvida sobre esta Política de Privacidade, entre em contato conosco através dos meios de contato fornecidos em
          nosso site.
        </p>
      </Div>
    </>
  )
}

export default Privacy
