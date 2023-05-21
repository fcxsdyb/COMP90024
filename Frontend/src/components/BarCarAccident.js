import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

const BarCarAccident = ({ data }) => {
    const chartRef = useRef(null);

    useEffect(() => {
        setTimeout(() => {
            const chartInstance = echarts.init(chartRef.current);
            const option = {
                xAxis: {
                    type: 'category',
                    data: data.map(item => item.state),
                    axisLabel: {
                        interval: 0
                    },
                },
                yAxis: {
                    type: 'value',
                },
                series: [
                    {
                        data: data.map(item => item.road_traffic_injuries_death),
                        type: 'bar',
                        showBackground: true,
                        backgroundStyle: {
                            color: 'rgba(180, 180, 180, 0.2)',
                        },
                    },
                ],
            };

            chartInstance.setOption(option);

            // Responsiveness handler
            window.addEventListener('resize', chartInstance.resize);

            // Cleanup function
            return () => {
                window.removeEventListener('resize', chartInstance.resize);
            };
        }, 0);
    }, [data]);

    return <div ref={chartRef} style={{ width: '100%', height: '500px' }}></div>;
};

export default BarCarAccident;
