import { PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
    {
        name: '1st',
        uv: 4000,
        pv: 2400,
        amt: 2400,
    },
    {
        name: '2nd',
        uv: 3000,
        pv: 1398,
        amt: 2210,
    },
    {
        name: '3rd',
        uv: 2000,
        pv: 9800,
        amt: 2290,
    },
    {
        name: '4th',
        uv: 2780,
        pv: 3908,
        amt: 2000,
    },
    {
        name: '5th',
        uv: 1890,
        pv: 4800,
        amt: 2181,
    },
    {
        name: '6th',
        uv: 2390,
        pv: 3800,
        amt: 2500,
    },
    {
        name: '7th',
        uv: 2690,
        pv: 4800,
        amt: 2500,
    },
];

class LandingLineChart extends PureComponent {
    render() {
        return (
            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                    width={500}
                    height={300}
                    data={data}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="pv" stroke="#a8a29e" activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="uv" stroke="#10B981" />
                </LineChart>
            </ResponsiveContainer>
            );
        }
    }

export default LandingLineChart
