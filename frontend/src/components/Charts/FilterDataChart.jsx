import { PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
    {
        name: '1st',
        Consumption: 3000,
    },
    {
        name: '2nd',
        Consumption: 4200,

    },
    {
        name: '3rd',
        Consumption: 1000,

    },
    {
        name: '4th',
        Consumption: 4200,

    },
    {
        name: '5th',
        Consumption: 1890,

    },
    {
        name: '6th',
        Consumption: 4200,

    },
    {
        name: '7th',
        Consumption: 1000,

    },
];

class FilterDataChart extends PureComponent {
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
                    <Line type="monotone" dataKey="Consumption" stroke="#10B981" />
                </LineChart>
            </ResponsiveContainer>
            );
        }
    }

export default FilterDataChart;
