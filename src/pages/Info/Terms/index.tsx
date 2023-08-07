import React from 'react'

import { Div } from './styles'

const Terms: React.FC = () => {
  return (
    <Div style={{ display: 'grid', gap: '8px', color: '#333' }}>
      <h3>1. Aceitação dos Termos</h3>
      <p>
        Bem-vindo à nossa loja e-commerce! Ao acessar e utilizar nosso site, você concorda em cumprir e ficar vinculado aos seguintes termos e
        condições de uso. Se você não concorda com esses termos, por favor, não continue utilizando o site.
      </p>

      <h3>2. Uso do Site</h3>
      <p>
        2.1. O acesso ao nosso site é permitido apenas para uso pessoal e não comercial. Você concorda em não utilizar o site para fins ilegais ou não
        autorizados.
      </p>
      <p>2.2. Você é responsável por garantir que todas as informações fornecidas durante o processo de compra sejam precisas e atualizadas.</p>

      <h3>3. Propriedade Intelectual</h3>
      <p>
        3.1. Todo o conteúdo exibido em nosso site, incluindo textos, imagens, logotipos, gráficos e software, é de propriedade exclusiva da nossa
        loja e-commerce e está protegido por leis de direitos autorais e propriedade intelectual.
      </p>
      <p>
        3.2. Você não tem permissão para reproduzir, distribuir, modificar ou usar qualquer conteúdo do site para fins comerciais sem nossa
        autorização expressa por escrito.
      </p>

      <h3>4. Privacidade e Segurança</h3>
      <p>
        4.1. Nós valorizamos a sua privacidade. As informações que você fornece ao nosso site serão tratadas de acordo com nossa Política de
        Privacidade. Certifique-se de lê-la para entender como suas informações são coletadas, usadas e protegidas.
      </p>
      <p>
        4.2. Você é responsável por manter a confidencialidade das suas informações de login e por todas as atividades que ocorrerem em sua conta.
      </p>

      <h3>5. Produtos e Pagamentos</h3>
      <p>
        5.1. Os preços dos produtos exibidos em nosso site estão sujeitos a alterações sem aviso prévio. Faremos o possível para garantir que as
        informações sobre preços sejam precisas e atualizadas.
      </p>
      <p>
        5.2. Aceitamos várias formas de pagamento, conforme detalhado em nosso site. As informações de pagamento fornecidas por você serão tratadas de
        forma segura e de acordo com os padrões de segurança aplicáveis.
      </p>

      <h3>6. Garantia e Devoluções</h3>
      <p>
        6.1. Nossos produtos estão sujeitos a garantias contra defeitos de fabricação. Caso você identifique um problema, entre em contato conosco de
        acordo com nossa Política de Devoluções.
      </p>

      <h3>7. Limitação de Responsabilidade</h3>
      <p>
        7.1. Em nenhuma circunstância seremos responsáveis por quaisquer danos diretos, indiretos, incidentais, especiais ou consequenciais
        decorrentes do uso do nosso site ou da compra de produtos através dele.
      </p>

      <h3>8. Alterações aos Termos</h3>
      <p>
        8.1. Reservamos o direito de modificar ou atualizar estes Termos de Uso a qualquer momento. Quaisquer alterações entrarão em vigor
        imediatamente após a publicação no site. Recomendamos que você reveja periodicamente os Termos para estar ciente de quaisquer modificações.
      </p>

      <h3>9. Contato</h3>
      <p>
        9.1. Se você tiver alguma dúvida sobre estes Termos de Uso, entre em contato conosco através dos meios de contato fornecidos em nosso site.
      </p>
    </Div>
  )
}

export default Terms
