import { useState } from 'react';
import { PieChart, Pie, Sector, ResponsiveContainer } from 'recharts';

// Sample data for the chart
const data = [
    { name: 'Device A', value: 510 },
    { name: 'Device B', value: 325 },
    { name: 'Device C', value: 180 },
    { name: 'Device D', value: 300 },
];

// Function to render the active shape of the chart
const renderActiveShape = (props) => {
    const RADIAN = Math.PI / 180;
    const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent } = props;
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
            <text x={cx} y={cy} dy={-10} textAnchor="middle" fill={fill} style={{ fontSize: '14px' }}>{`kWh: ${payload.value}`}</text>
            <text x={cx} y={cy} dy={10} textAnchor="middle" fill={fill} style={{ fontSize: '14px' }}>
                {`Rate ${(percent * 100).toFixed(2)}%`}
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
            <text x={ex} y={ey} textAnchor={textAnchor} fill="#1e293b" style={{ fontSize: '16px', fontWeight: 'bold' }}>
                {payload.name}
            </text>
        </g>
    );
};

// Component for the landings pages pie chart
const LandingPieChart = () => {
    const [activeIndex, setActiveIndex] = useState(0);

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
                    fill="#4ade80"
                    dataKey="value"
                    onMouseEnter={onPieEnter}
                />
            </PieChart>
        </ResponsiveContainer>
    );
};

export default LandingPieChart;