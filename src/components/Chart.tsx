import React from 'react'
import {
    LineChart,
    Line,
    XAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
const Chart = ({ title, data, dataKey, grid }: any) => {
    return (
        <div style={{
            margin: '20px', padding: '20px',
            backgroundColor: 'white',
            boxShadow: '0px 0px 15px -10px rgba(0, 0, 0, 0.75)'
        }}>
            <h3 className="chartTitle">{title}</h3>
            <ResponsiveContainer width="100%" aspect={4 / 1}>
                <LineChart data={data}>
                    <XAxis dataKey="name" stroke="#5550bd" />
                    <Line type="monotone" dataKey={dataKey} stroke="#5550bd" />
                    <Tooltip />
                    {grid && <CartesianGrid stroke="#e0dfdf" strokeDasharray="5 5" />}
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}

export default Chart