import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import PropTypes from 'prop-types';
import api from '../../../services/api';

const DailyChart = ({ token }) => {
    const [data, setData] = useState([]);

    // Function to fetch consumption data from the backend
    useEffect(() => {
        const fetchConsumptionData = async () => {
            try {
                // Make an API request to get the total consumption data
                const response = await api.get('/consumption-records/total_consumption/', {
                    // Include the users token in the Authorization header
                    headers: {
                        'Authorization': `Token ${token}`
                    }
                });

                // Format the data to include AM/PM notation
                const formattedData = response.data.map(item => {
                    let hour = item.hour;
                    let period = 'AM';

                    // If the hour is 0, set it to 12
                    if (hour === 0) {
                        hour = 12;
                    // If the hour is greater than 12, subtract 12 from it and set the period to PM
                    } else if (hour >= 12) {
                        period = 'PM';
                        if (hour > 12) {
                            hour -= 12;
                        }
                    }
                    
                    // Format the data and return it
                    return {
                        name: `${hour}${period}`,
                        Energy: item.total_consumption
                    };
                });

                // Update the state with the formatted data
                setData(formattedData);
            } catch (error) {
                console.error('Failed to fetch consumption data:', error);
            }
        };

        // Call the fetchConsumptionData function when the component mounts
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