import React, { useRef } from 'react'

import { Container } from './styles'

interface Props {
  data: [button: any, panel: any, options: AccordOptions][]
}

interface AccordOptions {
  groupName: string
  buttonClass: string
  panelClass: string
  arrowRight: boolean
}

const Accordion: React.FC<Props> = (props: Props) => {
  const accordionWrapperRef = useRef<HTMLDivElement>(null)

  const accordionClickHandler = (e: React.MouseEvent) => {
    const caller = e.currentTarget.closest('button.dlv_accord') || e.currentTarget
    if (!caller || (caller && caller.nodeName != 'BUTTON' && caller.classList.contains('dlv_accord'))) return
    const group = (caller as HTMLButtonElement).dataset.group || 'default'

    const activeAcc = accordionWrapperRef.current
    if (!activeAcc) return
    activeAcc.querySelector(`.dlv_accord.active${group != 'default' ? '[data-group="' + group + '"]' : ':not([data-group])'}`)

    if (activeAcc != caller) {
      activeAcc.classList.remove('active')

      const activeNextSibling = activeAcc?.nextElementSibling

      if (activeNextSibling) {
        ;(activeNextSibling as HTMLElement).style.maxHeight = '0px'
        activeNextSibling?.classList?.remove('active')
      }
    }

    const panel = caller.nextElementSibling as HTMLElement
    console.log(panel)
    if (!panel || !panel.classList.contains('dlv_acc_panel')) return
    caller.classList.toggle('active')
    panel.classList.toggle('active')
    if (panel.style.maxHeight.includes('px') && panel.style.maxHeight != '0px') {
      panel.style.maxHeight = '0px'
    } else {
      panel.style.maxHeight = panel.scrollHeight + 'px'
    }
  }

  return (
    <Container>
      <div className="innerWrapper" ref={accordionWrapperRef}>
        {props.data.map(([button, panel, options]) => {
          return (
            <div key={'accord-' + Math.random()}>
              <button
                className={`dlv_accord ${options.arrowRight && 'arrow-right'} ${options.buttonClass}`}
                onClick={accordionClickHandler}
                data-group={options.groupName || null}
              >
                {button}
              </button>

              <div className={`dlv_acc_panel ${options.panelClass}`}>
                <div className="panel_content">{panel}</div>
              </div>
            </div>
          )
        })}
      </div>
    </Container>
  )
}

export default Accordion
