import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import api from '../../services/api';

const DeviceManager = () => {
    const DeviceInputRef = useRef(null);
    const [deviceType, setDeviceType] = useState('');
    const [deviceTypes] = useState([
        'LED Bulbs', 'Incandescent Bulbs', 'CFL Bulbs', 'Smart Bulbs', 'Smart Plugs', 'Smart Thermostats',
        'Fans', 'Televisions', 'Gaming Consoles', 'Desktop Computers', 'Laptops', 'Microwave Ovens',
        'Refrigerators', 'Washing Machines', 'Dryers', 'Dishwashers', 'Air Conditioners', 'Heaters',
        'Water Heaters', 'Electric Ovens', 'Electric Kettles', 'Hair Dryers', 'Coffee Makers'
    ]);
    const [hoursUsed, setHoursUsed] = useState('');
    const [brand, setBrand] = useState('');
    const [brands] = useState([
        'Apple', 'Samsung', 'LG', 'Sony', 'Dell', 'HP', 'Philips', 'Panasonic', 'Bosch', 'Whirlpool',
        'GE', 'Toshiba', 'Asus', 'Acer', 'Lenovo', 'Microsoft', 'Nokia', 'Huawei', 'Xiaomi',
        'Google', 'Amazon', 'Other'
    ]);
    const [otherBrand, setOtherBrand] = useState('');
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
        const deviceBrand = brand === 'Other' ? otherBrand : brand;
        try {
            // Make a POST request to my devices endpoint
            const response = await api.post('/devices/', {
                device_brand: deviceBrand,
                device_type: deviceType,
                hours_used: hoursUsed,
            }, {
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
        if (!Array.isArray(messages)) {
            return null;
        }

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
                    Add Devices
                </h2>
                {renderError()}
                <form>
                    <div className="mb-6">
                        <label
                            className="block text-md font-bold mb-2"
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
                            htmlFor="brand"
                        >
                            Brand
                        </label>
                        <select
                            className="shadow-md appearance-none border rounded w-full py-2 px-3 text-slate-800 mb-3 leading-tight focus:outline-none focus:shadow-outline bg-white"
                            id="brand"
                            value={brand}
                            onChange={(e) => setBrand(e.target.value)}
                        >
                            <option value="">Select brand</option>
                            {brands.map((brand) => (
                                <option key={brand} value={brand}>{brand}</option>
                            ))}
                        </select>
                        {brand === 'Other' && (
                            <input
                                className="shadow-md appearance-none border rounded w-full py-2 px-3 text-slate-800 leading-tight focus:outline-none focus:shadow-outline bg-white mt-3"
                                type="text"
                                placeholder="Enter brand"
                                value={otherBrand}
                                onChange={(e) => setOtherBrand(e.target.value)}
                            />
                        )}
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
                        <button
                            className="bg-stone-400 hover:bg-red-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline shadow-lg"
                            type="button"
                            onClick={() => navigate('/dashboard')}
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