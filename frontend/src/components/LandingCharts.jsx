import LandingLineChart from './LandingCharts/LandingLineChart';
import LandingPieChart from './LandingCharts/LandingPieChart';
import LandingBarChart from './LandingCharts/LandingBarChart';
import LandingAreaChart from './LandingCharts/LandingAreaChart';
import '../styles/custom-spacing.css'

const LandingCharts = () => {
    return (
        <div className="flex flex-col items-center gap-8 mt-8">
            <div className="flex flex-wrap justify-center gap-8 w-full">
                <div className="custom-w-104 custom-h-72 bg-gray-200 flex items-center justify-center rounded-lg">
                    <LandingLineChart />
                </div>
                <div className="custom-w-104 custom-h-72 bg-gray-200 flex items-center justify-center rounded-lg">
                    <LandingPieChart />
                </div>
                <div className="custom-w-104 custom-h-72 bg-gray-200 flex items-center justify-center rounded-lg">
                    <LandingBarChart />
                </div>
            </div>
            <div className="w-full max-w-4xl h-96 bg-gray-200 flex items-center justify-center rounded-lg">
                <LandingAreaChart />
            </div>
        </div>
    )
}
export default LandingCharts;