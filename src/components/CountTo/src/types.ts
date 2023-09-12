import { CSSProperties } from 'react'

type VoidFn = () => void

export enum transitionState {
  LINEAR = 'linear',
  EASE_IN_SINE = 'easeInSine', 
  EASE_OUT_SINE = 'easeOutSine'
}

export interface CountToProp {
  // Number to start at (0)
  startVal?: number
  // Number to end at (2020)
  endVal?: number
  // Animation duration in millisecond (1500)
  duration?: number
  // Whether auto play (true)
  autoplay?: boolean
  // Number of decimal (0)
  decimals?: number
  // Text prepended to result ('')
  prefix?: string
  // Text appended to result ('')
  suffix?: string
  // Grouping separator (,)
  separator?: string
  // Decimal symbol (.)
  decimal?: string
  // Font size (32)
  size?: number
  // Font color (#e65d6e)
  color?: string
  // Turn on digital animation (true)
  useEasing?: boolean
  // Digital animation (linear)
  transition?: transitionState
  // Class name
  className?: string
  // Custom style
  style?: CSSProperties
  // Callback to execute after transition started
  onStarted?: VoidFn
  // Callback to execute after transition finished
  onFinished?: VoidFn
}