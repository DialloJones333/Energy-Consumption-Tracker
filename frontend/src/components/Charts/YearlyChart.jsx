import { useEffect, useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import api from '../../../services/api';

// Render a chart that displays monthly device data for the year
const YearlyChart = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get('/yearly-consumption/', {
                    headers: {
                        Authorization: 'Token ${token}'
                    }
                });
                const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                const formattedData = response.data.map(item => ({
                    name: months[item.month - 1],
                    Usage: item.total_consumption
                }));
                setData(formattedData);
            } catch (error) {
                console.error('Error fetching yearly consumption data', error);
            }
        };

        fetchData();
    }, []);

    return (
        <ResponsiveContainer width="100%" height={400}>
            <AreaChart
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
            </AreaChart>
        </ResponsiveContainer>
    );
};

export default YearlyChart;