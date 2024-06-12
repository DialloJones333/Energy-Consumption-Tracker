import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import api from '../../../services/api';
import useAuth from '../../../services/useAuth';

const LoginForm = () => {
    const { login } = useAuth();
    const userNameInputRef = useRef(null);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/login/', {
                username,
                password
            });
            login()
            navigate('/dashboard');
        } catch (error) {
            setError(error.response?.data || { non_field_errors: ["Something went wrong. Please try again."] });
        }
    };
    
    const renderError = () => {
        return Object.entries(error).map(([field, messages]) => (
            <div key={field} className="text-red-500 mb-2">
                {messages.map((message) => (
                    <p key={uuidv4()}>{field.charAt(0).toUpperCase() + field.slice(1)}: {message}</p>
                ))}
            </div>
        ));
    };

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
                <form onSubmit={handleSubmit}>
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