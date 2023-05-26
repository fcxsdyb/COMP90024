//  COMP90024 GROUP48
//  Yuhang Zhou     ID:1243037
//  Jitao Feng      ID:1265994
//  Hui Liu         ID:1336645
//  Jihang Yu       ID:1341312
//  Xinran Ren      ID:1309373

import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

// PieMastodon component that renders a pie chart using Echarts
const PieMastodon = ({ data }) => {
    const chartRef = useRef(null);

    useEffect(() => {
        // Initialize the Echarts chart using the chartRef
        var myChart = echarts.init(chartRef.current);

        // Define the chart options
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

        // Set the chart options
        option && myChart.setOption(option);
    }, [data]);

    return (
        <div ref={chartRef} style={{ width: "100%", height: "400px" }}></div>
    );
}

export default PieMastodon;
