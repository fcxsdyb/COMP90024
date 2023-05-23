import React from 'react';
import ReactECharts from 'echarts-for-react';

// LineChart component that renders a line chart using the echarts-for-react library
const LineChart = ({ lineData }) => {
    // Function to get the chart options
    const getOption = () => ({
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: ['New South Wales', 'Victoria', 'Queensland', 'South Australia', 'Western Australia', 'Tasmania', 'Northern Territory']
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        toolbox: {
            feature: {
                saveAsImage: {}
            }
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['November 2016', 'November 2020', 'November 2021']
        },
        yAxis: {
            type: 'value'
        },
        series: lineData
    });

    return (
        <ReactECharts
            option={getOption()}
            style={{ height: '350px', width: '100%' }}
            className='react_for_echarts' />
    );
}

export default LineChart;
