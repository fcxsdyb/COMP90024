import React, { useEffect, useState } from 'react';
import ReactEcharts from 'echarts-for-react';
import * as echarts from 'echarts/core';
import { MapChart } from 'echarts/charts';
import { TooltipComponent, ToolboxComponent, TitleComponent, VisualMapComponent } from 'echarts/components';
import { SVGRenderer } from 'echarts/renderers';
import ausGeoJson from './aus_states/aus_state.json';

echarts.use(
    [TooltipComponent, ToolboxComponent, TitleComponent, VisualMapComponent, MapChart, SVGRenderer]
);

function DensityMap({ mapData }) {
    const [option, setOption] = useState(null);

    useEffect(() => {
        echarts.registerMap('AUS', ausGeoJson);

        setOption({
            title: {
                text: 'Australia Population Estimates (2023)',
                subtext: 'Data from www.abs.gov.au',
                sublink: 'https://www.abs.gov.au',
                left: 'right'
            },
            tooltip: {
                trigger: 'item',
                showDelay: 0,
                transitionDuration: 0.2
            },
            visualMap: {
                left: 'right',
                min: 5,
                max: 1000,
                inRange: {
                    color: [
                        '#313695',
                        '#4575b4',
                        '#74add1',
                        '#abd9e9',
                        '#e0f3f8',
                        '#ffffbf',
                        '#fee090',
                        '#fdae61',
                        '#f46d43',
                        '#d73027',
                        '#a50026'
                    ]
                },
                text: ['High', 'Low'],
                calculable: true
            },
            toolbox: {
                show: true,
                left: 'left',
                top: 'top',
                feature: {
                    dataView: { readOnly: false },
                    restore: {},
                    saveAsImage: {}
                }
            },
            series: [
                {
                    name: 'AUS PopEstimates',
                    type: 'map',
                    roam: true,
                    map: 'AUS',
                    emphasis: {
                        label: {
                            show: true
                        }
                    },
                    data: mapData
                }
            ]
        });
    }, [mapData]);

    return (
        <div>
            {option && <ReactEcharts style={{ height: '600px', width: '100%' }} option={option} />}
        </div>
    );
}

export default DensityMap;
