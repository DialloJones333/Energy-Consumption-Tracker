import { PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
    {
        name: '1st',
        Local: 3000,
        User: 2200,
    },
    {
        name: '2nd',
        Local: 4200,
        User: 1398,
    },
    {
        name: '3rd',
        Local: 2000,
        User: 5500,
    },
    {
        name: '4th',
        Local: 2780,
        User: 3908,
    },
    {
        name: '5th',
        Local: 1890,
        User: 4800,
    },
    {
        name: '6th',
        Local: 1390,
        User: 3800,
    },
    {
        name: '7th',
        Local: 2690,
        User: 4800,
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
                    <Line type="monotone" dataKey="User" stroke="#10B981" />
                </LineChart>
            </ResponsiveContainer>
            );
        }
    }

export default LandingLineChart
