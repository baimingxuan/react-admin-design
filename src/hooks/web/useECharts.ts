import type { RefObject } from 'react'
import type { EChartsOption } from 'echarts'
import { useRef, useEffect, useState } from 'react'
import { useUnmount, useDebounceFn, useTimeout, useEventListener } from 'ahooks'
import echarts from '@/utils/echarts'

export function useECharts(
  elRef: RefObject<HTMLDivElement>,
  options: EChartsOption,
  loading: boolean = true,
  theme: 'light' | 'dark' | 'default' = 'default'
) {
  let chartInstance: echarts.ECharts | null = null
  let resizeFn: Fn = resize
  let removeResizeFn: Fn = () => {}
  const [cacheOptions, setCacheOptions] = useState<EChartsOption>()

  useEffect(() => {
    if (loading) return
    setOptions(options)
  }, [loading])

  function initCharts(t = theme) {
    const el = elRef?.current
    if (!el) return

    chartInstance = echarts.init(el, t)
  }

  function setOptions(options: EChartsOption, clear = true) {
    setCacheOptions(options)
    if (elRef?.current?.offsetHeight === 0) {
      useTimeout(() => {
        setOptions(cacheOptions!)
      }, 30)
      return
    }
    useTimeout(() => {
      if (!chartInstance) {
        initCharts('default')

        if (!chartInstance) return
      }
      clear && chartInstance?.clear()

      chartInstance?.setOption(cacheOptions!)
    }, 30)
  }

  function resize() {
    chartInstance?.resize()
  }

  function getInstance(): echarts.ECharts | null {
    if (!chartInstance) {
      initCharts('default')
    }
    return chartInstance
  }

  useUnmount(() => {
    if (!chartInstance) return
    chartInstance.dispose()
    chartInstance = null
  })

  return {
    echarts,
    resize,
    setOptions,
    getInstance
  }
}