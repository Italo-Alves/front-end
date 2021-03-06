import React, { useEffect, useRef } from 'react'
import ReactInputMask, { Props as InputProps } from 'react-input-mask'
import { useField } from '@unform/core'

interface Props extends InputProps {
  name: string
  label?: string
}

const Input: React.FC<Props> = ({ name, label, ...rest }) => {
  const inputRef = useRef(null)
  const { fieldName, registerField, defaultValue, error } = useField(name)

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
      setValue(ref: any, value: string) {
        ref.setInputValue(value)
      },
      clearValue(ref: any) {
        ref.setInputValue('')
      }
    })
  }, [fieldName, registerField])

  return (
    <>
      {label && <label htmlFor={fieldName}>{label}</label>}

      <ReactInputMask
        id={fieldName}
        ref={inputRef}
        defaultValue={defaultValue}
        {...rest}
      />

      {error && (
        <span>
          {error}
          <br />
        </span>
      )}
    </>
  )
}

export default Input
