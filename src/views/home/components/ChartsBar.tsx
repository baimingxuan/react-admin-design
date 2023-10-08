import type { EChartsOption } from 'echarts'
import { FC } from 'react'
import { Card } from 'antd'
import { useECharts } from '@/hooks/web/useECharts'

interface propState {
  loading: boolean
}

const ChartsBar: FC<propState> = ({ loading }) => {
  const optionConf: EChartsOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        lineStyle: {
          width: 1,
          color: '#fa541c'
        }
      }
    },
    grid: {
      left: 0,
      right: '1%',
      top: '2%',
      bottom: 0,
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      axisTick: {
        alignWithLabel: true
      }
    },
    yAxis: {
      type: 'value',
      max: value => {
        return Math.ceil(value.max / 100) * 100 + 300
      }
    },
    label: {
      show: true,
      fontSize: 14,
      color: '#1890ff',
      position: 'top',
      formatter: '{c}'
    },
    series: [
      {
        type: 'bar',
        name: '访问量',
        barWidth: '40%',
        color: ['#1890ff'],
        data: [782, 925, 1196, 812, 328, 223, 1080]
      }
    ]
  }

  const { chartRef } = useECharts(optionConf, loading)

  return (
    <Card
      loading={loading}
      bordered={false}
    >
      <div
        ref={chartRef}
        style={{
          width: '100%',
          height: '350px'
        }}
      />
    </Card>
  )
}

export default ChartsBar