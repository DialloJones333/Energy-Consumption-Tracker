import { useState } from 'react';

const CompareRatesForm = () => {
    const [timeFrame, setTimeFrame] = useState('');
    const [timeFrames] = useState(['1 Day', '1 Week', '1 Month', '1 Year']);
    const [region, setRegion] = useState('');
    const [regions] = useState(['Eastern', 'Central', 'Western']);

    

    return (
        <div className=" min-h-screen flex items-center w-full h-full justify-center">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-6">
                    Filter
                </h2>
                <form>
                    <div className="mb-6">
                        <label
                            className="block text-sm font-bold mb-2"
                            htmlFor="region">
                            Region
                        </label>
                        <select
                            className="shadow-lg appearance-none border rounded w-full py-2 px-3 text-slate-800 mb-3 leading-tight focus:outline-none focus:shadow-outline bg-white"
                            id="device-type"
                            value={region}
                            onChange={(e) => setRegion(e.target.value)}
                        >
                            <option value="">Select region</option>
                            {regions.map((type) => (
                                <option key={type} value={type}>{type}</option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-6">
                        <label
                            className="block text-slate-800 text-sm font-bold mb-2"
                            htmlFor="device-type"
                        >
                            Time Frame
                        </label>
                        <select
                            className="shadow-lg appearance-none border rounded w-full py-2 px-3 text-slate-800 mb-3 leading-tight focus:outline-none focus:shadow-outline bg-white"
                            id="device-type"
                            value={timeFrame}
                            onChange={(e) => setTimeFrame(e.target.value)}
                        >
                            <option value="">Select time frame</option>
                            {timeFrames.map((type) => (
                                <option key={type} value={type}>{type}</option>
                            ))}
                        </select>
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            className="bg-stone-400 hover:bg-green-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline shadow-lg"
                            type="button"
                        >
                            Apply
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CompareRatesForm;
