import cn from 'classnames'
import React from 'react'
import IntuitButton, { Props as ButtonProps } from './Button'

interface Props extends ButtonProps {
  className?: string
  children?: any
}
function InputAddon({ className, ...props }: Props) {
  return (
    <IntuitButton
      {...props}
      className={cn(className, 'rw-input-addon rw-picker-btn')}
    />
  )
}

export default InputAddon
