import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import api from '../../../services/api';
import moment from 'moment';

// Component for the filtered data chart
const FilterDataChart = ({ filters }) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        // If both device and time frame filters are provided, fetch data
        if (filters.device && filters.timeFrame) {
            // Function to fetch data
            const fetchData = async () => {
                try {
                    // Send a GET request to the filter-consumption endpoint to get the filtered data
                    const response = await api.get('/filter-consumption/', {
                        // Pass the device and time frame filters as query parameters
                        params: {
                            device: filters.device,
                            time_frame: filters.timeFrame,
                        },
                    });
                    // Update the data state with the fetched data
                    setData(response.data);
                // Catch any errors and display them on the console
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            };

            // Call the fetchData function
            fetchData();
        }
    }, [filters]);

    // Function to format the timestamp
    const formatTimestamp = (timestamp) => {
        return moment(timestamp).format('MMM DD, YYYY');
    };

    // Custom tooltip formatter using optional chaining
    const customTooltip = ({ payload, label }) => {
        // Check if the payload is not empty
        if (payload?.length) {
            // If the payload is not empty, return a custom tooltip
            return (
                <div className="custom-tooltip" style={{ backgroundColor: 'rgba(0, 0, 0, 0.75)', padding: '5px', borderRadius: '3px', color: '#fff' }}>
                    <p className="label">{`Date: ${formatTimestamp(label)}`}</p>
                    <p className="intro">{`Consumption: ${payload[0]?.value} kWh`}</p>
                </div>
            );
        }

        // If the payload is empty, return null
        return null;
    };

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
                <XAxis tick={{ fill: '#1e293b' }} dataKey="timestamp" tickFormatter={formatTimestamp} />
                <YAxis tick={{ fill: '#1e293b' }} />
                <Tooltip content={customTooltip} />
                <Legend />
                <Line type="monotone" dataKey="consumption" stroke="#10B981" />
            </LineChart>
        </ResponsiveContainer>
    );
};

FilterDataChart.propTypes = {
    filters: PropTypes.shape({
        device: PropTypes.string.isRequired,
        timeFrame: PropTypes.string.isRequired,
    }).isRequired,
};

export default FilterDataChart;