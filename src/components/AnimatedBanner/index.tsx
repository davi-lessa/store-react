import React, { useEffect, useRef } from 'react'

import { Container } from './styles'
import MinoxImg from 'assets/img/minox.png'
import MinoxBg from 'assets/img/banner_bg.jpg'

const AnimatedBanner: React.FC = () => {
  const composition = useRef<HTMLDivElement>(null)
  const back = useRef<HTMLDivElement>(null)
  let loaded = 0

  function applyAnim() {
    loaded++

    if (loaded < 2) return
    composition.current?.classList.add('loaded')
    setTimeout(() => {
      back.current && back.current.classList.add('b-blink')
    }, 3000)
  }

  return (
    <Container ref={composition}>
      <div className="front">
        <img src={MinoxImg} alt="" onLoad={() => applyAnim()} />
      </div>

      <div className="back" ref={back}>
        <img src={MinoxBg} alt="" onLoad={() => applyAnim()} />
      </div>

      <div className="glass">
        <div className="ball-x">
          <div className="ball-y"></div>
        </div>
      </div>

      <button>Comece o seu Tratamento</button>
    </Container>
  )
}

export default AnimatedBanner
