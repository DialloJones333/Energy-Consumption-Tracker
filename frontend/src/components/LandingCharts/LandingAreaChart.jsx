import { PureComponent } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Sample data for the chart
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
        Usage: 5220,
    },
    {
        name: 'Oct',
        Usage: 3120,
    },
    {
        name: 'Nov',
        Usage: 5820,
    },
    {
        name: 'Dec',
        Usage: 3330,
    },
];

// Component for the landings pages area chart
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
                    <Area type="monotone" dataKey="Usage" stackId="1" stroke="#4ade80" fill="#4ade80" />
                </AreaChart>
            </ResponsiveContainer>
        );
    }
}

export default LandingAreaChart;