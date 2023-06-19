import React, { useEffect, useState } from 'react'

import { Ball, Container } from './styles'

interface Props {
  defaultChecked?: boolean
  changeVar: boolean
  onChange?: any
}

const Switch: React.FC<Props> = (props: Props) => {
  const [enabled, setEnabled] = useState(props?.changeVar || props?.defaultChecked ? true : false)
  console.log(props.defaultChecked)

  function changeHandler() {
    props?.onChange(!enabled)
    setEnabled(() => !enabled)
  }

  useEffect(() => {
    setEnabled(() => props?.changeVar)
  }, [props?.changeVar])

  return (
    <Container className={enabled ? 'enabled' : ''} onClick={() => changeHandler()}>
      <Ball className="ball"></Ball>
    </Container>
  )
}

export default Switch
