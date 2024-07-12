import { useState, useEffect } from 'react';
import api from '../../services/api';

// Component to display notifications
const NotificationTable = () => {
    const [notifications, setNotifications] = useState([]);

    // Fetch notifications on component mount
    useEffect(() => {
        fetchNotifications();
    }, []);

    // Function to fetch notifications
    const fetchNotifications = async () => {
        try {
            // Send a GET request to the notifications endpoint
            const response = await api.get('/notifications/', {
                // Include the users authorization token in the Authorization headers
                headers: { 'Authorization': `Token ${localStorage.getItem('token')}` }
            });
            // Update the state with the fetched notifications
            setNotifications(response.data);
        // Catch any errors and display them on the console
        } catch (error) {
            console.error('Error fetching notifications', error);
        }
    };

    // Function to toggle the read status of a notification
    const toggleReadStatus = async (id) => {
        try {
            // Send a PUT request to the notifications endpoint to update the read status
            const response = await api.put(`/notifications/${id}/`, null, {
                // Include the users authorization token in the Authorization headers
                headers: { 'Authorization': `Token ${localStorage.getItem('token')}` }
            });
            // Update the state with the updated notification data
            setNotifications(notifications.map(notification =>
                notification.id === id ? response.data : notification
            ));
        // Catch any errors and display them on the console
        } catch (error) {
            console.error('Error updating notification status', error);
        }
    };

    return (
        <div className="w-full mt-20">
            <table className="table">
                <thead>
                    <tr>
                        <th></th>
                        <th>User</th>
                        <th>Message</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {/* Map over the notifications array and render a table row for each notification */}
                    {notifications.map(notification => (
                        <tr key={notification.id}>
                            <th>
                                <input
                                    type="checkbox"
                                    className={`checkbox checkbox-lg ${notification.read ? 'checkbox-info' : 'checkbox-error'}`}
                                    checked={notification.read}
                                    onChange={() => toggleReadStatus(notification.id)}
                                />
                            </th>
                            <td>
                                <div className="flex items-center gap-3">
                                    <div className="avatar">
                                        <div className="mask mask-squircle w-12 h-12">
                                            <img src="images/tree_of_life_avatar_pic.jpeg" alt="Avatar" />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="font-bold">{notification.name}</div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <p>{notification.message}</p>
                            </td>
                            <td>{new Date(notification.created_at).toLocaleDateString()}</td>
                            <td>{new Date(notification.created_at).toLocaleTimeString()}</td>
                            <th>
                                <button
                                    className={`btn btn-xs ${notification.read ? 'btn-info' : 'btn-error'}`}
                                    onClick={() => toggleReadStatus(notification.id)}
                                >   
                                    {notification.read ? 'Read' : 'Unread'}
                                </button>
                            </th>
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr>
                        <th></th>
                        <th>User</th>
                        <th>Message</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th></th>
                    </tr>
                </tfoot>
            </table>
        </div>
    );
};

export default NotificationTable;