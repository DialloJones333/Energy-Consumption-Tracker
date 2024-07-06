import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import PropTypes from 'prop-types';
import api from '../../../services/api';

const DailyChart = ({ token }) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchConsumptionData = async () => {
            try {
                const response = await api.get('/consumption-records/total_consumption/', {
                    headers: {
                        'Authorization': `Token ${token}`
                    }
                });

                const formattedData = response.data.map(item => {
                    let hour = item.hour;
                    let period = 'AM';

                    if (hour === 0) {
                        hour = 12;
                    } else if (hour >= 12) {
                        period = 'PM';
                        if (hour > 12) {
                            hour -= 12;
                        }
                    }

                    return {
                        name: `${hour}${period}`,
                        Energy: item.total_consumption
                    };
                });

                setData(formattedData);
            } catch (error) {
                console.error('Failed to fetch consumption data:', error);
            }
        };

        fetchConsumptionData();
    }, [token]);

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
};

DailyChart.propTypes = {
    token: PropTypes.string.isRequired
};

export default DailyChart;