import React, { useEffect, useRef } from 'react'

import { Container } from './styles'
import MinoxImg from 'assets/img/minox.png'
import MinoxBg from 'assets/img/banner_bg.jpg'
import { useNavigate } from 'react-router-dom'

const AnimatedBanner: React.FC = () => {
  const composition = useRef<HTMLDivElement>(null)
  const back = useRef<HTMLDivElement>(null)
  let loaded = 0
  const navigate = useNavigate()

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

      <button onClick={() => navigate('/produto/minoxidil-kirkland-5')}>Ver mais detalhes</button>
    </Container>
  )
}

export default AnimatedBanner
