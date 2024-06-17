import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../../services/api';
import useAuth from '../../../services/useAuth';
import { v4 as uuidv4 } from 'uuid';

const ChangePasswordForm = () => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newPasswordAgain, setNewPasswordAgain] = useState('');
    const [messages, setMessages] = useState([]);
    const { logout } = useAuth();
    const currentPasswordInputRef = useRef(null);

    const navigate = useNavigate();

    // Focus the current password input field when the component mounts
    useEffect(() => {
        if (currentPasswordInputRef.current) {
            currentPasswordInputRef.current.focus();
        }
    }, []);

    // Function to handle changing the users password
    const handleChangePassword = async () => {
        try {
            // Send a POST request to my update-password endpoint
            const response = await api.post('/update-password/', {
                // Include the values from the input fields in the response
                current_password: currentPassword,
                new_password: newPassword,
                new_password_again: newPasswordAgain,
            }, {
                // Include the users authorization token in the Authorization headers
                headers: {
                    'Authorization': `Token ${localStorage.getItem('token')}`,
                },
            });

            // Log the response and log the user out
            console.log(response.data);
            await logout();
            navigate('/login');
        // Catch any errors and display them on the screen
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
                    Change Your Password
                </h2>
                {renderError()}
                <form>
                    <div className="mb-6">
                        <label
                            className="block text-md font-bold mb-2"
                            htmlFor="password">
                            Current Password
                        </label>
                        <input
                            className="shadow-md appearance-none border rounded w-full py-2 px-3 text-slate-800 leading-tight focus:outline-none focus:shadow-outline bg-white"
                            id="current_password"
                            type="password"
                            placeholder="Enter your current password"
                            ref={currentPasswordInputRef}
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                        />
                    </div>
                    <div className="mb-6">
                        <label
                            className="block text-slate-800 text-md font-bold mb-2"
                            htmlFor="password"
                        >
                            New Password
                        </label>
                        <input
                            className="shadow-md appearance-none border rounded w-full py-2 px-3 text-slate-800 mb-3 leading-tight focus:outline-none focus:shadow-outline bg-white"
                            id="new_password"
                            type="password"
                            placeholder="Enter your new password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                    </div>
                    <div className="mb-6">
                        <label
                            className="block text-slate-800 text-md font-bold mb-2"
                            htmlFor="password"
                        >
                            New Password Again
                        </label>
                        <input
                            className="shadow-md appearance-none border rounded w-full py-2 px-3 text-slate-800 mb-3 leading-tight focus:outline-none focus:shadow-outline bg-white"
                            id="new_password_again"
                            type="password"
                            placeholder="Enter your new password again"
                            value={newPasswordAgain}
                            onChange={(e) => setNewPasswordAgain(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            className="bg-stone-400 hover:bg-green-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline shadow-lg"
                            type="button"
                            onClick={handleChangePassword}
                        >
                            Change Password
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ChangePasswordForm;