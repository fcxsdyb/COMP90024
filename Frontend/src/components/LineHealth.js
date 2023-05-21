import React from 'react';
import ReactECharts from 'echarts-for-react';

const LineChart = ({ lineData }) => {
    const getOption = () => ({
        title: {
            text: 'Stacked Line'
        },
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
