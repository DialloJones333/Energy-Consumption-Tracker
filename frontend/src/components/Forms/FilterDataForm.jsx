import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import api from '../../../services/api';

// Component for the filter data form
const FilterDataForm = ({ onFilterChange }) => {
    // State variables for the device and time frame filters
    const [timeFrame, setTimeFrame] = useState('');
    const [timeFrames] = useState(['1 Day', '1 Week', '1 Month', '1 Year']);
    const [device, setDevice] = useState('');
    const [devices, setDevices] = useState([]);

    useEffect(() => {
        // Fetch user devices
        const fetchDevices = async () => {
            try {
                // Send a GET request to the devices endpoint
                const response = await api.get('/devices/');
                // Update the devices state with the fetched devices
                setDevices(response.data);
                // Catch any errors and display them on the console
            } catch (error) {
                console.error("Error fetching devices:", error);
            }
        };

        // Call the fetchDevices function
        fetchDevices();
    }, []);

    const handleApply = () => {
        // Call the onFilterChange function with the device and time frame values
        onFilterChange({ device, timeFrame });
    };

    return (
        <div className="flex items-center justify-center w-full">
            <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-6">Filter</h2>
                <form>
                    <div className="mb-6">
                        <label className="block text-md font-bold mb-2" htmlFor="device">Device</label>
                        <select
                            className="shadow-md appearance-none border rounded w-full py-2 px-3 text-slate-800 mb-3 leading-tight focus:outline-none focus:shadow-outline bg-white"
                            id="device"
                            value={device}
                            onChange={(e) => setDevice(e.target.value)}
                        >
                            <option value="">Select device</option>
                            <option value="All">All</option>
                            {devices.map((device) => (
                                <option key={device.id} value={device.id}>{`${device.device_type} (ID: ${device.id})`}</option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-6">
                        <label className="block text-slate-800 text-md font-bold mb-2" htmlFor="time-frame">Time Frame</label>
                        <select
                            className="shadow-md appearance-none border rounded w-full py-2 px-3 text-slate-800 mb-3 leading-tight focus:outline-none focus:shadow-outline bg-white"
                            id="time-frame"
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
                            onClick={handleApply}
                        >
                            Apply
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

FilterDataForm.propTypes = {
    onFilterChange: PropTypes.func.isRequired,
};

export default FilterDataForm;