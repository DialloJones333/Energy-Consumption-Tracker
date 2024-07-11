import { PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
    {
        name: '1st',
        Weekly: 3000,
        Monthly: 3000,
    },
    {
        name: '2nd',
        Weekly: 4200,
        Monthly: 1198,
    },
    {
        name: '3rd',
        Weekly: 500,
        Monthly: 4500,
    },
    {
        name: '4th',
        Weekly: 4200,
        Monthly: 1198,
    },
    {
        name: '5th',
        Weekly: 500,
        Monthly: 4500,
    },
    {
        name: '6th',
        Weekly: 4200,
        Monthly: 1198,
    },
    {
        name: '7th',
        Weekly: 500,
        Monthly: 5500,
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
                    <Line type="monotone" dataKey="Monthly" stroke="#a8a29e" activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="Weekly" stroke="#4ade80" />
                </LineChart>
            </ResponsiveContainer>
            );
        }
    }

export default LandingLineChart
