import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

// Using Echarts as the chart library
// Bar chart for car accidents, using the provided data
const BarCarAccident = ({ data }) => {
    const chartRef = useRef(null);

    useEffect(() => {
        // Delay execution to allow rendering before initializing the chart
        setTimeout(() => {
            // Initialize the Echarts chart instance
            const chartInstance = echarts.init(chartRef.current);

            // Set the chart options
            const option = {
                // Define the X-axis as a category axis with data from the 'state' property of each item in the 'data' array
                xAxis: {
                    type: 'category',
                    data: data.map(item => item.state),
                    axisLabel: {
                        interval: 0
                    },
                },
                // Define the Y-axis as a value axis
                yAxis: {
                    type: 'value',
                },
                // Define the series data as a bar chart, using the 'road_traffic_injuries_death' property of each item in the 'data' array
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

            // Set the chart options
            chartInstance.setOption(option);

            // Add a resize event listener to make the chart responsive
            window.addEventListener('resize', chartInstance.resize);

            // Cleanup function to remove the resize event listener when the component is unmounted
            return () => {
                window.removeEventListener('resize', chartInstance.resize);
            };
        }, 0);
    }, [data]);

    // Render a div element to contain the chart, with a ref to attach the chart instance and a defined width and height
    return <div ref={chartRef} style={{ width: '100%', height: '500px' }}></div>;
};

export default BarCarAccident;
