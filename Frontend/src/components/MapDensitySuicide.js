import React, { useEffect, useState } from 'react';
import ReactEcharts from 'echarts-for-react';
import * as echarts from 'echarts/core';
import { MapChart } from 'echarts/charts';
import { TooltipComponent, ToolboxComponent, TitleComponent, VisualMapComponent } from 'echarts/components';
import { SVGRenderer } from 'echarts/renderers';
import ausGeoJson from './aus_states/aus_state.json';

// Register necessary Echarts components
echarts.use(
    [TooltipComponent, ToolboxComponent, TitleComponent, VisualMapComponent, MapChart, SVGRenderer]
);

// MapDensitySuicide component that renders a density map for suicide-related tweets using Echarts
function MapDensitySuicide({ mapData }) {
    const [option, setOption] = useState(null);

    useEffect(() => {
        // Register the map data for Australia
        echarts.registerMap('AUS', ausGeoJson);

        // Set the chart options
        setOption({
            title: {
                text: 'Suicide-related tweets expressing negative sentiment in different Australian states (2022)',
                subtext: 'Data from Twitter Corpus',
                sublink: 'https://twitter.com/',
                left: 'right'
            },
            tooltip: {
                trigger: 'item',
                showDelay: 0,
                transitionDuration: 0.2
            },
            visualMap: {
                left: 'right',
                min: 0.13,
                max: 0.14,
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
                    name: 'Tweets',
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

export default MapDensitySuicide;
