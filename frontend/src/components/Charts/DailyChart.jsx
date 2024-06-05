import { PureComponent } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
    {
        name: '12AM',
        Energy: 1500,
    },
    {
        name: '2AM',
        Energy: 2000,
    },
    {
        name: '4AM',
        Energy: 2500,
    },
    {
        name: '6AM',
        Energy: 3000,
    },
    {
        name: '8AM',
        Energy: 3500,
    },
    {
        name: '10AM',
        Energy: 4000,
    },
    {
        name: '12PM',
        Energy: 4000,
    },
    {
        name: '2PM',
        Energy: 3500,
    },
    {
        name: '4PM',
        Energy: 3000,
    },
    {
        name: '6PM',
        Energy: 2500,
    },
    {
        name: '8PM',
        Energy: 2000,
    },
    {
        name: '10PM',
        Energy: 1500,
    },
];

class DailyChart extends PureComponent {
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
                    <XAxis dataKey="name" scale="point" padding={{ left: 10, right: 10 }} tick={{ fill: '#1e293b' }} />
                    <YAxis tick={{ fill: '#1e293b' }} />
                    <Tooltip />
                    <Legend />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Bar dataKey="Energy" fill="#a8a29e" background={{ fill: '#eee' }} />
                </BarChart>
            </ResponsiveContainer>
        );
    }
}

export default DailyChart;