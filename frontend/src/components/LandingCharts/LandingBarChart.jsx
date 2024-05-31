import { PureComponent } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
    {
        name: '12AM',
        uv: 4000,
        pv: 2400,
        amt: 2400,
    },
    {
        name: '2AM',
        uv: 3000,
        pv: 1398,
        amt: 2210,
    },
    {
        name: '4AM',
        uv: 2000,
        pv: 1100,
        amt: 2290,
    },
    {
        name: '6AM',
        uv: 2780,
        pv: 3908,
        amt: 2000,
    },
    {
        name: '8AM',
        uv: 1890,
        pv: 4800,
        amt: 2181,
    },
    {
        name: '10AM',
        uv: 2390,
        pv: 3800,
        amt: 2500,
    },
    {
        name: '12PM',
        uv: 3490,
        pv: 4300,
        amt: 2100,
    },
];

class LandingBarChart extends PureComponent {
    render () {
        return (
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    width={500}
                    height={300}
                    data={data}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                    barSize={20}
                >
                    <XAxis dataKey="name" scale="point" padding={{ left: 10, right: 10 }} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Bar dataKey="pv" fill="#a8a29e" background={{ fill: '#eee' }} />
                </BarChart>
            </ResponsiveContainer>
        );
    }
}

export default LandingBarChart;
