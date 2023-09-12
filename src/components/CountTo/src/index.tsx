import React, { useState, useEffect } from 'react'
import { useTransition, TransitionPresets } from '@/hooks/animation/useTransition'
import { CountToProp, transitionState } from './types'
import { isNumber } from '@/utils/is'

const CountTo: React.FC<CountToProp> = (props) => {

  const {
    startVal = 0,
    endVal = 2020,
    duration = 1500,
    autoplay,
    size = 32,
    color = '#e65d6e',
    useEasing,
    transition = transitionState.LINEAR,
    className,
    style,
    onStarted,
    onFinished
  } = props

  const [sourceValue, setSourceValue] = useState(startVal)
  const [showValue, setShowValue] = useState('')

  let outputValue = useTransition(sourceValue!)

  // useEffect(() => {
  //   start()
  // }, [])

  useEffect(() => {
    setShowValue(formatNumber(outputValue))
  }, [props])

  const start = () => {
    setSourceValue(endVal)
    run()
  }

  const reset = () => {
    setSourceValue(startVal)
    run()
  }

  const run = () => {
    outputValue = useTransition(sourceValue!, {
      disabled: false,
      duration: duration,
      onFinished: () => onFinished,
      onStarted: () => onStarted,
      ...(useEasing ? { transition: TransitionPresets[transition] } : {})
    })
  }

  const formatNumber = (num: number | string) => {
    if (!num && num !== 0) {
      return ''
    }
    const { decimals = 0, decimal = '.', separator = ',', suffix = '', prefix = '' } = props
    num = Number(num).toFixed(decimals)
    num += ''

    const x = num.split('.')
    let x1 = x[0]
    const x2 = x.length > 1 ? decimal + x[1] : ''

    const rgx = /(\d+)(\d{3})/
    if (separator && !isNumber(separator)) {
      while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + separator + '$2')
      }
    }
    return prefix + x1 + x2 + suffix
  }

  return (
    <span
      className={className}
      style={{
        color: color,
        fontSize: size + 'px',
        ...style
      }}
    >
      {showValue}
    </span>
  )
}

export default CountTo