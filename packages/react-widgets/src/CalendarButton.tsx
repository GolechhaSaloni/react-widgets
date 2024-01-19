import cn from 'classnames'
import * as React from 'react'
import { ReactNode } from 'react'
import IntuitButton from './Button'

export interface Props extends React.HTMLProps<HTMLButtonElement> {
  label?: string
  icon?: ReactNode
  busy?: boolean
  spinner?: ReactNode
  children?: ReactNode
}

function CalendarButton({ className, ...props }: Props) {
  return (
    <IntuitButton
      {...props}
      tabIndex={undefined}
      className={cn(className, 'rw-calendar-btn')}
    />
  )
}

export default CalendarButton
