import { useEffect, useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import api from '../../../services/api';

// Component for the yearly chart
const YearlyChart = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        // Fetch yearly consumption data
        const fetchData = async () => {
            try {
                // Send a GET request to the yearly consumption endpoint
                const response = await api.get('/yearly-consumption/', {
                    // Include the user's token in the Authorization header
                    headers: {
                        Authorization: 'Token ${token}'
                    }
                });
                // Set a constant for the months
                const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                // Format the data
                const formattedData = response.data.map(item => ({
                    name: months[item.month - 1],
                    Usage: item.total_consumption
                }));
                // Set the data
                setData(formattedData);
            // Catch any errors and log them to the console
            } catch (error) {
                console.error('Error fetching yearly consumption data', error);
            }
        };

        // Call the fetchData function
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