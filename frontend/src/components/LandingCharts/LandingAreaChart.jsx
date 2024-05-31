import { PureComponent } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
    {
        name: 'January',
        uv: 4000,
        pv: 2400,
    },
    {
        name: 'February',
        uv: 3000,
        pv: 1398,
    },
    {
        name: 'March',
        uv: 2000,
        pv: 9800,
    },
    {
        name: 'April',
        uv: 2780,
        pv: 3908,
    },
    {
        name: 'May',
        uv: 1890,
        pv: 4800,
    },
    {
        name: 'June',
        uv: 2390,
        pv: 3800,
    },
    {
        name: 'July',
        uv: 3490,
        pv: 4300,
    },
    {
        name: 'August',
        uv: 4220,
        pv: 5100,
    },
];

class LandingAreaChart extends PureComponent {
    render() {
        return (
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                    width={500}
                    height={400}
                    data={data}
                    margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis tick={{ fill: '#1e293b' }} dataKey="name" />
                    <YAxis tick={{ fill: '#1e293b' }} />
                    <Tooltip />
                    <Area type="monotone" dataKey="uv" stackId="1" stroke="#a8a29e" fill="#a8a29e" />
                    <Area type="monotone" dataKey="pv" stackId="1" stroke="#10B981" fill="#10B981" />
                </AreaChart>
            </ResponsiveContainer>
        );
    }
}

export default LandingAreaChart;