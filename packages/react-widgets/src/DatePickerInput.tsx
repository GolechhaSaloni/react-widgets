import React, { useMemo, useRef, useState } from 'react'
import { isNullOrInvalid } from './dates'
import IntuitInput, { IntuitInputProps } from './Input'
import { Localizer, RequiredDateMethods } from './Localization'

export interface DatePickerInputProps<TDateFormat = unknown>
  extends Omit<IntuitInputProps, 'value' | 'onChange'> {
  formatter: RequiredDateMethods
  editing: boolean
  editFormat?: TDateFormat
  displayFormat?: TDateFormat
  parse: (str: string) => Date | null
  value?: Date | null
  onChange: (date: Date | null, rawValue: string) => void
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void
  localizer: Localizer<TDateFormat>

  disabled?: boolean
  readOnly?: boolean
}

const DatePickerInput = React.forwardRef(
  (
    {
      value,
      formatter,
      editing,
      editFormat,
      displayFormat,
      localizer,
      parse,
      onChange,
      onBlur,
      disabled,
      readOnly,
      ...props
    }: DatePickerInputProps,
    ref: React.Ref<HTMLInputElement>,
  ) => {
    const needsFlush = useRef(false)

    const nextTextValue = useMemo(
      () =>
        value instanceof Date && isValid(value)
          ? localizer.formatDate(
              value,
              formatter,
              editing ? editFormat : displayFormat,
            )
          : '',
      [value, formatter, localizer, displayFormat, editing, editFormat],
    )

    const [prevValue, setPrevValue] = useState<string | null>(nextTextValue)
    const [textValue, setTextValue] = useState(nextTextValue)

    if (prevValue !== nextTextValue) {
      setPrevValue(nextTextValue)
      setTextValue(nextTextValue)
    }

    const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
      if (onBlur) onBlur(event)

      if (needsFlush.current) {
        let date = parse(event.target.value)

        const dateIsInvalid = event.target.value != '' && isNullOrInvalid(date)
        if (dateIsInvalid) {
          setTextValue('')
        }
        needsFlush.current = false

        setPrevValue(null)
        onChange(date, event.target.value)
      }
    }

    const handleChange = ({ target }: React.FormEvent<HTMLInputElement>) => {
      needsFlush.current = true
      setTextValue((target as HTMLInputElement).value)
    }

    return (
      <IntuitInput
        {...props}
        type="text"
        ref={ref}
        className="rw-widget-input"
        value={textValue}
        disabled={disabled}
        readOnly={readOnly}
        onChange={handleChange}
        onBlur={handleBlur}
      />
    )
  },
)

DatePickerInput.displayName = 'DatePickerInput'

export default DatePickerInput

function isValid(d: Date) {
  return !isNaN(d.getTime())
}
