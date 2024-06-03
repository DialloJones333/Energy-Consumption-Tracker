import { PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
    {
        name: '1st',
        Yours: 3000,
        Local: 2200,
    },
    {
        name: '2nd',
        Yours: 4200,
        Local: 1398,
    },
    {
        name: '3rd',
        Yours: 1000,
        Local: 5500,
    },
    {
        name: '4th',
        Yours: 4200,
        Local: 1398,
    },
    {
        name: '5th',
        Yours: 1890,
        Local: 4800,
    },
    {
        name: '6th',
        Yours: 4200,
        Local: 1398,
    },
    {
        name: '7th',
        Yours: 1000,
        Local: 5500,
    },
];

class CompareRatesChart extends PureComponent {
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
                    <Line type="monotone" dataKey="Yours" stroke="#10B981" />
                </LineChart>
            </ResponsiveContainer>
            );
        }
    }

export default CompareRatesChart
