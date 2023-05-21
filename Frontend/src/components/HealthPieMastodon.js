import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

const HealthPieMastodon = ({ data }) => {
    const chartRef = useRef(null);

    useEffect(() => {
        var myChart = echarts.init(chartRef.current);

        var option = {
            tooltip: {
                trigger: 'item'
            },
            legend: {
                top: '5%',
                left: 'center'
            },
            series: [
                {
                    name: 'Access From',
                    type: 'pie',
                    radius: ['40%', '70%'],
                    avoidLabelOverlap: false,
                    label: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        label: {
                            show: true,
                            fontSize: 30,
                            fontWeight: 'bold'
                        }
                    },
                    labelLine: {
                        show: false
                    },
                    data: data
                }
            ]
        };

        option && myChart.setOption(option);
    }, [data]);

    return (
        <div ref={chartRef} style={{width: "100%", height: "400px"}}></div>
    );
}

export default HealthPieMastodon;
