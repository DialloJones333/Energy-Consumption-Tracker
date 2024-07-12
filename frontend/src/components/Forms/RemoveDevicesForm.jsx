import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import api from '../../../services/api';

const DeviceManager = () => {
    // State variables for the devices and error messages
    const [device, setDevice] = useState('');
    const [devices, setDevices] = useState([]);
    const [messages, setMessages] = useState([]);
    const navigate = useNavigate();

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

    // Function to handle removing a device
    const handleDevices = async () => {
        try {
            // Make a DELETE request to my devices endpoint
            const response = await api.delete(`/devices/${device}/`, {
                headers: {
                    // Include the user's token in the Authorization header
                    'Authorization': `Token ${localStorage.getItem('token')}`,
                },
            });

            // Log the response and navigate to the dashboard
            console.log(response.data);
            navigate('/dashboard');
        // Catch any errors and display them on the screen
        } catch (error) {
            setMessages([error.response?.data?.error || 'An error occurred']);
        }
    };

    // Function to render the error messages
    const renderError = () => {
        // If messages is not an array, return null
        if (!Array.isArray(messages)) {
            return null;
        }

        // If messages is an array, return a list of error messages
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
                    Remove Devices
                </h2>
                {renderError()}
                <form>
                    <div className="mb-6">
                        <label
                            className="block text-md font-bold mb-2"
                            htmlFor="device-type"
                        >
                            Remove Device
                        </label>
                        <select
                            className="shadow-md appearance-none border rounded w-full py-2 px-3 text-slate-800 mb-3 leading-tight focus:outline-none focus:shadow-outline bg-white"
                            id="device"
                            value={device}
                            onChange={(e) => setDevice(e.target.value)}
                        >
                            <option value="">Select device</option>
                            {devices.map((device) => (
                                <option key={device.id} value={device.id}>{`${device.device_type} (ID: ${device.id})`}</option>
                            ))}
                        </select>
                    </div>
                    <div className="flex items-center justify-center">
                        <button
                            className="bg-stone-400 hover:bg-red-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline shadow-lg"
                            type="button"
                            onClick={handleDevices}
                        >
                            Remove Device
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default DeviceManager;