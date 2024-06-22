import { PureComponent } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
    {
        name: 'Jan',
        Usage: 4500,
    },
    {
        name: 'Feb',
        Usage: 3300,
    },
    {
        name: 'Mar',
        Usage: 5200,
    },
    {
        name: 'Apr',
        Usage: 3780,
    },
    {
        name: 'May',
        Usage: 4890,
    },
    {
        name: 'Jun',
        Usage: 3390,
    },
    {
        name: 'Jul',
        Usage: 4490,
    },
    {
        name: 'Aug',
        Usage: 2220,
    },
    {
        name: 'Sep',
        Usage: 4500,
    },
    {
        name: 'Oct',
        Usage: 3300,
    },
    {
        name: 'Nov',
        Usage: 5200,
    },
    {
        name: 'Dec',
        Usage: 3780,
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
                    <Area type="monotone" dataKey="" stackId="1" stroke="#10B981" fill="#10B981" />
                </AreaChart>
            </ResponsiveContainer>
        );
    }
}

export default YearlyChart;