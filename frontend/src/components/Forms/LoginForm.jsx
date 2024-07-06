import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import useAuth from '../../../services/useAuth';

const LoginForm = () => {
    // Import the login function from the useAuth hook
    const { login } = useAuth();
    const userNameInputRef = useRef(null);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [messages, setMessages] = useState([]);
    const navigate = useNavigate()

    // Function to handle the login form submission
    const handleLogin = async (e) => {
        e.preventDefault();
        // Call the login function with the username and password
        try {
            await login(username, password);
            navigate('/dashboard');
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

    // Focus the username input field when the component mounts
    useEffect(() => {
        if (userNameInputRef.current) {
            userNameInputRef.current.focus();
        }
    }, []);

    return (
        <div className="flex items-center justify-center w-full">
            <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-6">
                    Log In
                </h2>
                {renderError()}
                <form onSubmit={handleLogin}>
                    <div className="mb-6">
                        <label
                            className="block text-md font-bold mb-2"
                            htmlFor="username">
                            Username
                        </label>
                        <input
                            className="shadow-md appearance-none border rounded w-full py-2 px-3 text-slate-800 leading-tight focus:outline-none focus:shadow-outline bg-white"
                            id="username"
                            type="text"
                            placeholder="Enter your username"
                            ref={userNameInputRef}
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="mb-6">
                        <label
                            className="block text-slate-800 text-md font-bold mb-2"
                            htmlFor="password"
                        >
                            Password
                        </label>
                        <input
                            className="shadow-md appearance-none border rounded w-full py-2 px-3 text-slate-800 mb-3 leading-tight focus:outline-none focus:shadow-outline bg-white"
                            id="password"
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            className="bg-stone-400 hover:bg-green-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline shadow-lg"
                            type="submit"
                        >
                            Log In
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;