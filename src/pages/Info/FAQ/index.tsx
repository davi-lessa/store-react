import Accordion, { AccordionProps } from 'components/Accordion'
import React from 'react'
import { Container } from './styles'

// import { Container } from './styles';
// interface Props {
//   list: { question: string; answer: string }[]
// }

const FAQ: React.FC = () => {
  const faqList = [
    {
      question: 'Quais são os efeitos colaterais mais comuns do uso de minoxidil?',
      answer:
        '<p>Os efeitos colaterais mais comuns que podem surgir com o uso minoxidil, considerando uma dosagem padrão de até 1ml por aplicação, incluem irritação da pele/couro cabeludo, coceira, vermelhidão e descamação locais. <br><br>É muito comum que se tenha ao menos um desses sintomas ao se utilizar o minoxidil, principalmente quando se está começando o tratamento. <br><br>Em algumas semanas, é também comum que a pele se acostume e se diminua essa irritação característica.</p>',
    },
    {
      question: 'Quanto tempo leva para ver resultados com o minoxidil?',
      answer:
        'Os resultados do minoxidil podem variar de pessoa para pessoa. Geralmente, leva de dois a quatro meses de uso regular para ver resultados significativos, como o crescimento de fios capilares mais grossos. É importante ter paciência e manter a frequência de uso correta para obter resultados satisfatórios.',
    },
    { question: 'Se eu parar de usar minoxidil, o cabelo que cresceu irá cair?', answer: '' },
    { question: 'Quanto tempo devo deixar o minoxidil no couro cabeludo antes de lavar?', answer: '' },
    { question: 'Qual a melhor marca de minoxidil?', answer: '' },
    { question: 'O minoxidil interfere na libido?', answer: '' },
    { question: 'Preciso de prescrição médica para usar minoxidil?', answer: '' },
    {
      question: 'Como o minoxidil ajuda no crescimento capilar?',
      answer:
        'O minoxidil ajuda no crescimento capilar ao dilatar os vasos sanguíneos do couro cabeludo, o que aumenta o fluxo sanguíneo para os folículos capilares. Isso promove a nutrição dos folículos, estimula o crescimento de fios mais fortes e prolonga a fase de crescimento dos cabelos.',
    },
    {
      question: 'Existe alguma contraindicação para o uso de minoxidil?',
      answer:
        'O minoxidil é geralmente seguro para a maioria das pessoas. No entanto, pessoas com problemas cardíacos, problemas de pressão arterial ou doença no couro cabeludo devem consultar um médico antes de fazer seu uso. Além disso, mulheres grávidas ou amamentando devem evitá-lo nesse período.',
    },
    { question: 'Posso utilizar outros produtos para o cabelo enquanto uso minoxidil?', answer: '' },
    { question: 'Posso usar minoxidil em outras partes do corpo além do couro cabeludo?', answer: '' },
    { question: '', answer: '' },
  ]

  return (
    <Container>
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
