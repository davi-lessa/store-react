import Accordion, { AccordionProps } from 'components/Accordion'
import React from 'react'
import { Container } from './styles'

// import { Container } from './styles';
// interface Props {
//   list: { question: string; answer: string }[]
// }

const FAQ: React.FC = () => {
  // const faqList = [
  //   {
  //     question: 'Quais são os efeitos colaterais mais comuns do uso de minoxidil?',
  //     answer:
  //       'Considerando uma dosagem padrão de até 1ml por aplicação, pode ocorrer irritação da pele/couro cabeludo, coceira, vermelhidão e descamação no local de aplicação. É muito comum que se tenha ao menos um desses sintomas ao se utilizar o minoxidil, principalmente quando se está começando o tratamento. <br>Também é comum que ao longo das semanas a pele vá se acostumando e se diminuam esses sintomas característicos.',
  //   },
  //   {
  //     question: 'Quanto tempo leva para ver resultados com o minoxidil?',
  //     answer:
  //       'Os resultados do minoxidil podem variar de pessoa para pessoa. Geralmente, leva de 2 a 4 meses de uso regular para ver resultados significativos, como o crescimento de fios capilares mais grossos. É importante ter paciência e manter a frequência de uso correta para obter resultados satisfatórios.',
  //   },
  //   { question: 'Se eu parar de usar minoxidil, o cabelo que cresceu irá cair?', answer: '' },
  //   { question: 'Quanto tempo devo deixar o minoxidil no couro cabeludo antes de lavar?', answer: '' },
  //   { question: 'Qual a melhor marca de minoxidil?', answer: '' },
  //   { question: 'O minoxidil interfere na libido?', answer: '' },
  //   { question: 'Preciso de prescrição médica para usar minoxidil?', answer: '' },
  //   {
  //     question: 'Como o minoxidil ajuda no crescimento capilar?',
  //     answer:
  //       'O minoxidil ajuda no crescimento capilar ao dilatar os vasos sanguíneos do couro cabeludo, o que aumenta o fluxo sanguíneo para os folículos capilares. Isso promove a nutrição dos folículos, estimula o crescimento de fios mais fortes e prolonga a fase de crescimento dos cabelos.',
  //   },
  //   {
  //     question: 'Existe alguma contraindicação para o uso de minoxidil?',
  //     answer:
  //       'O minoxidil é geralmente seguro para a maioria das pessoas. No entanto, pessoas com problemas cardíacos, problemas de pressão arterial ou doença no couro cabeludo devem consultar um médico antes de fazer seu uso. Além disso, mulheres grávidas ou amamentando devem evitá-lo nesse período.',
  //   },
  //   { question: 'Posso utilizar outros produtos para o cabelo enquanto uso minoxidil?', answer: '' },
  //   { question: 'Posso usar minoxidil em outras partes do corpo além do couro cabeludo?', answer: '' },
  //   { question: '', answer: '' },
  // ]

  const faqList = [
    {
      question: 'Como faço para fazer uma compra na loja?',
      answer:
        'É simples! Basta navegar pelo catálogo de produtos, escolher os itens que deseja adquirir, adicionar ao carrinho e seguir o processo de finalização de compra. Caso tenha alguma dúvida, nosso guia passo a passo está disponível para ajudar.',
    },
    {
      question: 'Quais são as opções de pagamento disponíveis?',
      answer:
        'Aceitamos diversas formas de pagamento, incluindo cartões de crédito e pix. Escolha a opção que melhor se adequa a você durante o checkout.',
    },
    {
      question: 'Qual é o prazo de entrega dos produtos?',
      answer:
        'O prazo de entrega varia de acordo com a região e o método de envio selecionado. Geralmente, o prazo estimado é exibido durante o processo de compra. Após a confirmação do pedido, você receberá informações de rastreamento para acompanhar a entrega.',
    },
    {
      question: 'Posso trocar ou devolver um produto?',
      answer:
        'Sim, aceitamos trocas e devoluções dentro do prazo estipulado por lei. Se você não estiver satisfeito com sua compra, entre em contato conosco para obter instruções sobre como proceder com a troca ou devolução.',
    },
    {
      question: 'Como acompanho o status do meu pedido?',
      answer:
        'Assim que seu pedido for confirmado, você receberá um e-mail de confirmação contendo informações de rastreamento. Utilize esses detalhes para acompanhar o status da entrega. Você também pode acessar sua conta em nosso site para verificar o andamento do pedido.',
    },
    {
      question: 'Os produtos possuem garantia?',
      answer:
        'Sim, todos os produtos possuem garantia contra defeitos de fabricação. Caso encontre algum problema, entre em contato conosco e teremos o prazer de ajudar a resolver a situação.',
    },
    // Adicione mais perguntas e respostas conforme necessário
  ]

  return (
    <Container>
      <h4>Encontre respostas para possíveis dúvidas que você possa ter:</h4>
      <br />
      <Accordion
        data={faqList.map(
          (faqItem) =>
            [
              faqItem.question,
              faqItem.answer,
              { arrowRight: true, groupName: 'mxdfaq', dangerousHtml: true, panelClass: 'apanel', buttonClass: 'abutton' },
            ] as AccordionProps['data'][0]
        )}
      ></Accordion>
    </Container>
  )
}

export default FAQ
