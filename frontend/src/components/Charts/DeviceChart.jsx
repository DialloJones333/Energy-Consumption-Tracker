import { useEffect, useState } from 'react';
import { PieChart, Pie, Sector, ResponsiveContainer } from 'recharts';
import PropTypes from 'prop-types';
import api from '../../../services/api';

const DeviceChart = ({ token }) => {
    const [data, setData] = useState([]);
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const fetchDevices = async () => {
            try {
                const response = await api.get('/devices/', {
                    headers: {
                        'Authorization': `Token ${token}`
                    }
                });
                setData(response.data.map(device => ({
                    name: device.name,
                    value: calculateConsumption(device.device_type, device.hours_used_per_day)
                })));
            } catch (error) {
                console.error('Failed to fetch devices:', error);
            }
        };

        fetchDevices();
    }, [token]);

    const calculateConsumption = (deviceType, hoursUsed) => {
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
            'Laptops': 0.05
        };
        return consumptionRates[deviceType] * hoursUsed;
    };

    const renderActiveShape = (props) => {
        const RADIAN = Math.PI / 180;
        const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
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
                    {payload.name}
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
                <text x={cx} y={cy} dy={-10} textAnchor="middle" fill={fill} style={{ fontSize: '14px' }}>{`Value ${value.toFixed(2)}`}</text>
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
                    dataKey="value"
                    onMouseEnter={onPieEnter}
                />
            </PieChart>
        </ResponsiveContainer>
    );
};

DeviceChart.propTypes = {
    token: PropTypes.string.isRequired,
    cx: PropTypes.number.isRequired,
    cy: PropTypes.number.isRequired,
    midAngle: PropTypes.number.isRequired,
    innerRadius: PropTypes.number.isRequired,
    outerRadius: PropTypes.number.isRequired,
    startAngle: PropTypes.number.isRequired,
    endAngle: PropTypes.number.isRequired,
    fill: PropTypes.string.isRequired,
    payload: PropTypes.shape({
        name: PropTypes.string.isRequired
    }).isRequired,
    percent: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

export default DeviceChart;