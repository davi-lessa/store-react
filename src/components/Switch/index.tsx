import React, { useEffect, useState } from 'react'

import { Ball, Container } from './styles'

interface Props {
  defaultChecked?: boolean
  controllerVar: boolean
  onClick: any
  onChange?: any
}

const Switch: React.FC<Props> = (props: Props) => {
  const [enabled, setEnabled] = useState(props?.controllerVar || props?.defaultChecked ? true : false)

  function changeHandler() {
    props?.onChange(!enabled)
    setEnabled(() => !enabled)
  }

  function clickHandler() {
    if (props.onClick) return props.onClick()
    typeof props.controllerVar === 'undefined' && changeHandler()
  }

  useEffect(() => {
    setEnabled(() => props?.controllerVar)
  }, [props?.controllerVar])

  return (
    <Container className={enabled ? 'enabled' : ''} onClick={clickHandler}>
      <Ball className="ball"></Ball>
    </Container>
  )
}

export default Switch
