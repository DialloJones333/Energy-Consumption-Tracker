import { PureComponent } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
    {
        name: 'Jan',
        Usage: 4500,
        Goal: 5000,
    },
    {
        name: 'Feb',
        Usage: 3300,
        Goal: 4298,
    },
    {
        name: 'Mar',
        Usage: 5200,
        Goal: 6800,
    },
    {
        name: 'Apr',
        Usage: 3780,
        Goal: 4908,
    },
    {
        name: 'May',
        Usage: 4890,
        Goal: 5950,
    },
    {
        name: 'Jun',
        Usage: 3390,
        Goal: 3800,
    },
    {
        name: 'Jul',
        Usage: 4490,
        Goal: 5300,
    },
    {
        name: 'Aug',
        Usage: 2220,
        Goal: 4100,
    },
    {
        name: 'Sep',
        Usage: 4500,
        Goal: 5000,
    },
    {
        name: 'Oct',
        Usage: 3300,
        Goal: 4298,
    },
    {
        name: 'Nov',
        Usage: 5200,
        Goal: 6800,
    },
    {
        name: 'Dec',
        Usage: 3780,
        Goal: 4908,
    },
];

class YearlyChart extends PureComponent {
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
                    <Area type="monotone" dataKey="Usage" stackId="1" stroke="#a8a29e" fill="#a8a29e" />
                    <Area type="monotone" dataKey="Goal" stackId="1" stroke="#10B981" fill="#10B981" />
                </AreaChart>
            </ResponsiveContainer>
        );
    }
}

export default YearlyChart;