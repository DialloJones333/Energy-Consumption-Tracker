import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../../services/api';

const SignUpForm = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState('');
    const navigate = useNavigate();

    const nameInputRef = useRef(null);

    useEffect(() => {
        if (nameInputRef.current) {
            nameInputRef.current.focus();
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setErrors({ password: ["Passwords do not match"] });
            return;
        }
        try {
            await api.post('/register/', {
                first_name: firstName,
                last_name: lastName,
                username,
                email,
                password,
                password_confirm: confirmPassword
            });
            navigate('/login');
        } catch (error) {
            if (error.response && error.response.data) {
                setErrors(error.response.data);
            } else {
                setErrors({ non_field_errors: ["Something went wrong. Please try again."] });
            }
        }
    };

    const renderErrors = () => {
        return Object.entries(errors).map(([field, messages]) => (
            <div key={field} className="text-red-500 mb-2">
                {messages.map((message, index) => (
                    <p key={index}>{field.charAt(0).toUpperCase() + field.slice(1)}: {message}</p>
                ))}
            </div>
        ));
    };

    return (
        <div className="flex items-center justify-center w-full">
            <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-6">
                    Sign Up
                </h2>
                {renderErrors()}
                <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <label
                            className="block text-md font-bold mb-2"
                            htmlFor="first-name">
                            First Name
                        </label>
                        <input
                            className="shadow-md appearance-none border rounded w-full py-2 px-3 text-slate-800 leading-tight focus:outline-none focus:shadow-outline bg-white"
                            id="first-name"
                            type="text"
                            placeholder="Enter your first name"
                            ref={nameInputRef}
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </div>
                    <div className="mb-6">
                        <label
                            className="block text-slate-800 text-md font-bold mb-2"
                            htmlFor="last-name"
                        >
                            Last Name
                        </label>
                        <input
                            className="shadow-md appearance-none border rounded w-full py-2 px-3 text-slate-800 mb-3 leading-tight focus:outline-none focus:shadow-outline bg-white"
                            id="last-name"
                            type="text"
                            placeholder="Enter your last name"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </div>
                    <div className="mb-6">
                        <label
                            className="block text-slate-800 text-md font-bold mb-2"
                            htmlFor="username"
                        >
                            Username
                        </label>
                        <input
                            className="shadow-md appearance-none border rounded w-full py-2 px-3 text-slate-800 mb-3 leading-tight focus:outline-none focus:shadow-outline bg-white"
                            id="username"
                            type="text"
                            placeholder="Create a unique username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="mb-6">
                        <label
                            className="block text-md font-bold mb-2"
                            htmlFor="email">
                            Email
                        </label>
                        <input
                            className="shadow-md appearance-none border rounded w-full py-2 px-3 text-slate-800 leading-tight focus:outline-none focus:shadow-outline bg-white"
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
                            placeholder="Create a password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="mb-6">
                        <label
                            className="block text-slate-800 text-md font-bold mb-2"
                            htmlFor="confirm-password"
                        >
                            Password Again
                        </label>
                        <input
                            className="shadow-md appearance-none border rounded w-full py-2 px-3 text-slate-800 mb-3 leading-tight focus:outline-none focus:shadow-outline bg-white"
                            id="confirm-password"
                            type="password"
                            placeholder="Enter the password again"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            className="bg-stone-400 hover:bg-green-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline shadow-lg"
                            type="submit">
                            Sign Up
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignUpForm;