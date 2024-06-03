import { useEffect, useRef } from 'react';

const DeviceManager = () => {
    const DeviceInputRef = useRef(null);

    useEffect(() => {
        if (DeviceInputRef.current) {
            DeviceInputRef.current.focus();
        }
    }, []);

    return (
        <div className=" min-h-screen flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-6">
                    Add Device
                </h2>
                <form>
                    <div className="mb-6">
                        <label
                            className="block text-sm font-bold mb-2"
                            htmlFor="device">
                            Device Name
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-slate-800 leading-tight focus:outline-none focus:shadow-outline bg-white"
                            id="device"
                            type="text"
                            placeholder="Enter device name"
                            ref={DeviceInputRef}
                        />
                    </div>
                    <div className="mb-6">
                        <label
                            className="block text-slate-800 text-sm font-bold mb-2"
                            htmlFor="device-type"
                        >
                            Device Type
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-slate-800 mb-3 leading-tight focus:outline-none focus:shadow-outline bg-white"
                            id="device-type"
                            type="text"
                            placeholder="Enter device type"
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            className="bg-stone-400 hover:bg-green-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline shadow-lg"
                            type="button"
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
