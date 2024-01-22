import cn from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'

export interface IntuitInputProps extends React.AllHTMLAttributes<HTMLInputElement> {
  component?: React.ElementType
}

const IntuitInput = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      disabled,
      readOnly,
      value,
      tabIndex,
      type = 'text',
      component: Component = 'input',
      ...props
    },
    ref,
  ) => (
    <Component
      {...props}
      ref={ref}
      type={type}
      tabIndex={tabIndex || 0}
      autoComplete="off"
      disabled={disabled}
      readOnly={readOnly}
      aria-disabled={disabled}
      aria-readonly={readOnly}
      value={value == null ? '' : value}
      className={cn(className, 'rw-input')}
    />
  ),
)

IntuitInput.displayName = 'Input'
IntuitInput.propTypes = {
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  value: PropTypes.string,
  type: PropTypes.string,
  tabIndex: PropTypes.number,
  component: PropTypes.any,
}

export default IntuitInput
