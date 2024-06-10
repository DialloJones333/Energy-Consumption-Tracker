import { PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
    {
        name: '1st',
        User: 3000,
        Local: 2200,
    },
    {
        name: '2nd',
        User: 4200,
        Local: 1398,
    },
    {
        name: '3rd',
        User: 2000,
        Local: 5500,
    },
    {
        name: '4th',
        User: 2780,
        Local: 3908,
    },
    {
        name: '5th',
        User: 1890,
        Local: 4800,
    },
    {
        name: '6th',
        User: 1390,
        Local: 3800,
    },
    {
        name: '7th',
        User: 2690,
        Local: 4800,
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
                    <XAxis tick={{ fill: '#1e293b' }} dataKey="name" />
                    <YAxis tick={{ fill: '#1e293b' }} />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="Local" stroke="#a8a29e" activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="User" stroke="#4ade80" />
                </LineChart>
            </ResponsiveContainer>
            );
        }
    }

export default LandingLineChart
