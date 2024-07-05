import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import api from '../../../services/api';

const FilterDataChart = ({ filters }) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        if (filters.device && filters.timeFrame) {
            const fetchData = async () => {
                try {
                    const response = await api.get('/filter-consumption/', {
                        params: {
                            device: filters.device,
                            time_frame: filters.timeFrame,
                        },
                    });
                    setData(response.data);
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            };

            fetchData();
        }
    }, [filters]);

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
                <XAxis tick={{ fill: '#1e293b' }} dataKey="timestamp" />
                <YAxis tick={{ fill: '#1e293b' }} />
                <Tooltip />
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