import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import api from '../../../services/api';

const SignUpForm = () => {
    // State variables to hold the form data and error messages
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [messages, setMessages] = useState([]);
    const navigate = useNavigate();

    // Reference to the first name input field
    const nameInputRef = useRef(null);

    // Focus the first name input field when the component mounts
    useEffect(() => {
        if (nameInputRef.current) {
            nameInputRef.current.focus();
        }
    }, []);

    // Function to handle the form submission
    const handleSubmit = async (e) => {
        // Prevent the default form submission behavior
        e.preventDefault();
        // Check if the passwords match
        if (password !== confirmPassword) {
            setMessages([{ message: "Passwords do not match" }]);
            return;
        }
        // Send a POST request to the register endpoint with the form data
        try {
            await api.post('/register/', {
                first_name: firstName,
                last_name: lastName,
                username,
                email,
                password,
                password_confirm: confirmPassword
            });
            // Redirect the user to the login page
            navigate('/login');
        } catch (error) {
            // If there is an error, set the error messages
            if (error?.response?.data) {
                const errorMessages = Object.values(error.response.data).flat().map(msg => ({ message: msg }));
                setMessages(errorMessages);
            } else {
                // If there is no error message, set a generic error message
                setMessages([{ message: "Something went wrong. Please try again." }]);
            }
        }
    };

    // Function to render the error messages
    const renderErrors = () => {
        // Map through the messages array and display each message
        return messages.map((msg) => (
            <div key={uuidv4()} className="text-red-500">
                {msg.message}
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