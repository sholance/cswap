import React, { useState, useEffect } from 'react'
import { Sparklines, SparklinesLine, SparklinesSpots } from 'react-sparklines-typescript';
import JSONdata from "./data.json";

interface data {
    prices: any;
}
export default function Trade() {
    const [chartData, setChartData] = useState([
        5,
        9,
        5,
        7,
        3,
        5,
        5,
        1,
        5,
        4,
        10,
        5,
        20
    ])

    return (
        <div>
            <h4 className='chart-header'>Assets Chart (WIP)</h4>
            <div className='chart-body'>
                <div className='chart'>
                    <Sparklines data={chartData} limit={10} height={100}>
                        <SparklinesLine color="#3d2b7c" />
                        <SparklinesSpots />
                    </Sparklines>
                </div>
                <div className='chart-desc'>
                    celo/usd
                </div>

            </div>

        </div>
    )
}
