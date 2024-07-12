import { useEffect, useState } from 'react';
import { PieChart, Pie, Sector, ResponsiveContainer } from 'recharts';
import PropTypes from 'prop-types';
import api from '../../../services/api';

// Component for rendering the device chart
const DeviceChart = ({ token }) => {
    const [data, setData] = useState([]);
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        // Function for fetching the users devices
        const fetchDevices = async () => {
            try {
                // Send a GET request to the devices endpoint
                const response = await api.get('/devices/', {
                    // Set the Authorization header to the users token
                    headers: {
                        'Authorization': `Token ${token}`
                    }
                });
                // Set the data to the devices with the calculated consumption
                setData(response.data.map(device => ({
                    id: device.id,
                    brand: device.brand,
                    deviceType: device.device_type,
                    kWh: calculateConsumption(device.device_type, device.hours_used_per_day)
                })));
                // Catch any errors and log them to the console
            } catch (error) {
                console.error('Failed to fetch devices:', error);
            }
        };

        // Call the fetchDevices function
        fetchDevices();
    }, [token]);

    // Function to calculate the consumption of a device
    const calculateConsumption = (deviceType, hoursUsed) => {
        // Consumption rates for different devices in kWh
        const consumptionRates = {
            'LED Bulbs': 0.01,
            'Incandescent Bulbs': 0.06,
            'CFL Bulbs': 0.01,
            'Smart Bulbs': 0.05,
            'Smart Plugs': 0.01,
            'Smart Thermostats': 0.1,
            'Fans': 0.075,
            'Televisions': 0.1,
            'Gaming Consoles': 0.15,
            'Desktop Computers': 0.2,
            'Laptops': 0.05,
            'Microwave Ovens': 1.2,
            'Refrigerators': 1.5,
            'Washing Machines': 0.3,
            'Dryers': 3.0,
            'Dishwashers': 1.5,
            'Air Conditioners': 1.3,
            'Heaters': 1.5,
            'Water Heaters': 4.0,
            'Electric Ovens': 2.0,
            'Electric Kettles': 0.1,
            'Hair Dryers': 1.5,
            'Coffee Makers': 0.1
        };
        // Return the consumption rate multiplied by the hours used
        return consumptionRates[deviceType] * hoursUsed;
    };

    // Function to get the abbreviation for a device type
    const getDeviceTypeAbbreviation = (deviceType) => {
        const abbreviations = {
            'LED Bulbs': 'LED',
            'Incandescent Bulbs': 'Inc',
            'CFL Bulbs': 'CFL',
            'Smart Bulbs': 'SB',
            'Smart Plugs': 'SP',
            'Smart Thermostats': 'ST',
            'Fans': 'Fan',
            'Televisions': 'TV',
            'Gaming Consoles': 'GC',
            'Desktop Computers': 'PC',
            'Laptops': 'Lap',
            'Microwave Ovens': 'MO',
            'Refrigerators': 'Ref',
            'Washing Machines': 'WM',
            'Dryers': 'Dry',
            'Dishwashers': 'DW',
            'Air Conditioners': 'AC',
            'Heaters': 'HTR',
            'Water Heaters': 'WH',
            'Electric Ovens': 'EO',
            'Electric Kettles': 'EK',
            'Hair Dryers': 'HD',
            'Coffee Makers': 'CM'
        };
        // Return the abbreviation or the device type if no abbreviation exists
        return abbreviations[deviceType] || deviceType;
    };

    const renderActiveShape = (props) => {
        const RADIAN = Math.PI / 180;
        const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, kWh } = props;
        const sin = Math.sin(-RADIAN * midAngle);
        const cos = Math.cos(-RADIAN * midAngle);
        const sx = cx + (outerRadius + 10) * cos;
        const sy = cy + (outerRadius + 10) * sin;
        const mx = cx + (outerRadius + 30) * cos;
        const my = cy + (outerRadius + 30) * sin;
        const ex = mx + (cos >= 0 ? 1 : -1) * 22;
        const ey = my;
        const textAnchor = cos >= 0 ? 'start' : 'end';

        return (
            <g>
                <text x={ex} y={ey} textAnchor={textAnchor} fill="#1e293b" style={{ fontSize: '14px', fontWeight: 'bold' }}>
                    {payload.brand}
                </text>
                <text x={ex} y={ey + 15} textAnchor={textAnchor} fill="#1e293b" style={{ fontSize: '12px', fontWeight: 'bold' }}>
                    {`${getDeviceTypeAbbreviation(payload.deviceType)} (ID: ${payload.id})`}
                </text>
                <Sector
                    cx={cx}
                    cy={cy}
                    innerRadius={innerRadius}
                    outerRadius={outerRadius}
                    startAngle={startAngle}
                    endAngle={endAngle}
                    fill={fill}
                />
                <Sector
                    cx={cx}
                    cy={cy}
                    startAngle={startAngle}
                    endAngle={endAngle}
                    innerRadius={outerRadius + 6}
                    outerRadius={outerRadius + 10}
                    fill={fill}
                />
                <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
                <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
                <text x={cx} y={cy} dy={-10} textAnchor="middle" fill={fill} style={{ fontSize: '14px' }}>{`kWh: ${kWh.toFixed(2)}`}</text>
                <text x={cx} y={cy} dy={10} textAnchor="middle" fill={fill} style={{ fontSize: '14px' }}>
                    {`Rate ${(percent * 100).toFixed(2)}%`}
                </text>
            </g>
        );
    };

    const onPieEnter = (_, index) => {
        setActiveIndex(index);
    };

    return (
        <ResponsiveContainer width="100%" height="100%">
            <PieChart width={350} height={350}>
                <Pie
                    activeIndex={activeIndex}
                    activeShape={renderActiveShape}
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={70}
                    fill="#10B981"
                    dataKey="kWh"
                    onMouseEnter={onPieEnter}
                />
            </PieChart>
        </ResponsiveContainer>
    );
};

DeviceChart.propTypes = {
    token: PropTypes.string.isRequired,
    cx: PropTypes.number,
    cy: PropTypes.number,
    midAngle: PropTypes.number,
    innerRadius: PropTypes.number,
    outerRadius: PropTypes.number,
    startAngle: PropTypes.number,
    endAngle: PropTypes.number,
    fill: PropTypes.string,
    payload: PropTypes.shape({
        brand: PropTypes.string,
        deviceType: PropTypes.string,
        id: PropTypes.number,
    }),
    percent: PropTypes.number,
    kWh: PropTypes.number,
};

export default DeviceChart;