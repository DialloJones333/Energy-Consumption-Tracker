import { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import api from '../../../services/api';
import moment from 'moment';

// Custom Tooltip to match the color and style of the badge
const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload?.length) {
        return (
            <div className="custom-tooltip" style={{ backgroundColor: 'rgba(214, 211, 209, 0.8)', padding: '10px', borderRadius: '5px' }}>
                <p className="label" style={{ fontWeight: 'bold' }}>{moment(label).format('YYYY-MM-DD')}</p>
                <p className="intro">{`Consumption: ${payload[0]?.value}`}</p>
            </div>
        );
    }

    // If there is no active tooltip, return null
    return null;
};


CustomTooltip.propTypes = {
    active: PropTypes.bool,
    payload: PropTypes.array,
    label: PropTypes.string,
};

// Custom tick for x-axis to make text bold
const CustomXAxisTick = ({ x, y, payload }) => {
    return (
        <g transform={`translate(${x},${y})`}>
            <text x={0} y={0} dy={16} textAnchor="middle" fill="#666" style={{ fontWeight: 'bold' }}>
                {moment(payload.value).format('YYYY-MM-DD')}
            </text>
        </g>
    );
};

CustomXAxisTick.propTypes = {
    x: PropTypes.number,
    y: PropTypes.number,
    payload: PropTypes.object,
};

// Component for the filter data chart
const FilterDataChart = ({ filters }) => {
    const [data, setData] = useState([]);

    // Process response data
    const processResponseData = (responseData) => {
        return responseData
            // Remove duplicate records
            .filter((record, index, self) =>
                index === self.findIndex((t) => t.timestamp === record.timestamp)
            )
            // Add formatted timestamp
            .map(record => ({
                ...record,
                formattedTimestamp: moment(record.timestamp).format('YYYY-MM-DD')
            }))
            // Sort by timestamp
            .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
    };

    // Fetch and process data
    const fetchData = useCallback(async () => {
        try {
            // Send a GET request to the filter-consumption endpoint with the device and time frame filters
            const response = await api.get('/filter-consumption/', {
                params: {
                    device: filters.device,
                    time_frame: filters.timeFrame,
                },
            });
            // Process the response data
            const uniqueSortedData = processResponseData(response.data);
            // Update the data state with the processed data
            setData(uniqueSortedData);
        // Catch any errors and display them on the console
        } catch (error) {
            console.error('Failed to fetch data:', error);
        }
    }, [filters]);

    // Fetch data when the filters change
    useEffect(() => {
        if (filters.device && filters.timeFrame) {
            fetchData();
        }
    }, [fetchData, filters]);

    return (
        <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="formattedTimestamp" tick={<CustomXAxisTick />} />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Line type="monotone" dataKey="consumption" stroke="#82ca9d" />
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