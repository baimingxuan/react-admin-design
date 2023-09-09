import React, { useState, useEffect } from 'react'
import { CountToProp } from './types'
import { isNumber } from '@/utils/is'

const CountTo: React.FC<CountToProp> = (props: CountToProp) => {
  const { startVal } = props
  const [sourceValue, setSourceValue] = useState(startVal)

  return (
    <span></span>
  )
}

export default CountTo