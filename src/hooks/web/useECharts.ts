import type { EChartsOption } from 'echarts'
import { useRef, useEffect } from 'react'
import { useDebounceFn } from 'ahooks'
import echarts from '@/utils/echarts'

export function useECharts(
  options: EChartsOption,
  loading: boolean = true,
  theme: 'light' | 'dark' | 'default' = 'default'
) {
  const chartRef = useRef<HTMLDivElement>(null)
  let chartInstance: echarts.ECharts | null = null

  const { run: resizeFn } = useDebounceFn(
    () => {
      chartInstance?.resize()
    },
    { wait: 200 }
  )

  useEffect(() => {
    initCharts()

    return () => {
      disposeCharts()
    }
  }, [])

  useEffect(() => {
    if (loading) return
    setOptions(options)

    return () => {
      disposeCharts()
    }
  }, [loading, options])

  const initCharts = (t = theme) => {
    const el = chartRef?.current
    if (!el) return

    chartInstance = echarts.init(el, t)

    window.addEventListener('resize', resizeFn)
  }

  const setOptions = (options: EChartsOption) => {
    if (!chartInstance) {
      initCharts()

      if (!chartInstance) return
    }

    chartInstance?.clear()

    chartInstance?.setOption(options)
  }

  const disposeCharts = () => {
    if (!chartInstance) return
    window.removeEventListener('resize', resizeFn)
    chartInstance.dispose()
    chartInstance = null
  }

  const getInstance = (): echarts.ECharts | null => {
    if (!chartInstance) {
      initCharts()
    }
    return chartInstance
  }

  return { chartRef, getInstance }
}
