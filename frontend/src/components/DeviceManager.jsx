import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import api from '../../services/api';

const DeviceManager = () => {
    const DeviceInputRef = useRef(null);
    const [device, setDevice] = useState('')
    const [deviceType, setDeviceType] = useState('');
    const [deviceTypes] = useState(['LED Bulbs', 'Incandescent Bulbs', 'CFL Bulbs', 'Smart Bulbs', 'Smart Plugs', 'Smart Thermostats', 'Fans', 'Televisions', 'Gaming Consoles', 'Desktop Computers', 'Laptops']);
    const [hoursUsed, setHoursUsed] = useState('')
    const [messages, setMessages] = useState([]);

    const navigate = useNavigate();

    // Focus the device input field when the component mounts
    useEffect(() => {
        if (DeviceInputRef.current) {
            DeviceInputRef.current.focus();
        }
    }, []);

    // Function to handle adding a device
    const handleDevices = async () => {
        try {
            // Make a POST request to my devices endpoint
            const response = await api.post('/devices/', {
                // Add the values of the input fields in the response
                "device": device,
                "device_type": deviceType,
                "hours_used": hoursUsed,
            }, {
                    // Include the users authorization token in the Authorization headers
                    headers: {
                        'Authorization': `Token ${localStorage.getItem('token')}`,
                    },
            });

            // Log the response
            console.log(response.data);
            navigate('/dashboard')

        // Catch any errors
        } catch (error) {
            setMessages([error.response.data.error]);
        }
    };

    // Function to render the error messages
    const renderError = () => {
        // If the messages array is not an array, return null
        if (!Array.isArray(messages)) {
            return null;
        }

        // Map through the messages array and display each message
        return messages.map((message) => (
            <div key={uuidv4()} className="text-red-500">
                {message}
            </div>
        ));
    };

    return (
        <div className="flex items-center justify-center w-full">
            <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-6">
                    Add Device
                </h2>
                {renderError()}
                <form>
                    <div className="mb-6">
                        <label
                            className="block text-md font-bold mb-2"
                            htmlFor="device">
                            Device Name
                        </label>
                        <input
                            className="shadow-md appearance-none border rounded w-full py-2 px-3 text-slate-800 leading-tight focus:outline-none focus:shadow-outline bg-white"
                            id="device"
                            type="text"
                            placeholder="Enter device name"
                            ref={DeviceInputRef}
                            value={device}
                            onChange={(e) => setDevice(e.target.value)}
                            maxLength={30} // Set the maxLength to 30 characters
                        />
                    </div>
                    <div className="mb-6">
                        <label
                            className="block text-slate-800 text-md font-bold mb-2"
                            htmlFor="device-type"
                        >
                            Device Type
                        </label>
                        <select
                            className="shadow-md appearance-none border rounded w-full py-2 px-3 text-slate-800 mb-3 leading-tight focus:outline-none focus:shadow-outline bg-white"
                            id="device-type"
                            value={deviceType}
                            onChange={(e) => setDeviceType(e.target.value)}
                        >
                            <option value="">Select device type</option>
                            {deviceTypes.map((type) => (
                                <option key={type} value={type}>{type}</option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-6">
                        <label
                            className="block text-md font-bold mb-2"
                            htmlFor="daily-usage">
                            Average Daily Usage (Hours)
                        </label>
                        <input
                            className="shadow-md appearance-none border rounded w-full py-2 px-3 text-slate-800 leading-tight focus:outline-none focus:shadow-outline bg-white"
                            id="daily-usage"
                            type="text"
                            placeholder="Enter the hours the device is plugged in per day"
                            value={hoursUsed}
                            onChange={(e) => setHoursUsed(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            className="bg-stone-400 hover:bg-green-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline shadow-lg"
                            type="button"
                            onClick={handleDevices}
                        >
                            Add Device
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default DeviceManager;
