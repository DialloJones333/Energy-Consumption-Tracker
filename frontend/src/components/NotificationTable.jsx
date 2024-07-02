import { useState, useEffect } from 'react';
import api from '../../services/api';

const NotificationTable = () => {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await api.get('/notifications/', {
                    headers: {
                        'Authorization': `Token ${localStorage.getItem('token')}`
                    }
                });
                setNotifications(response.data);
            } catch (error) {
                console.error('Error fetching notifications:', error);
            }
        };

        fetchNotifications();
    }, []);

    const toggleReadStatus = async (id) => {
        try {
            const response = await api.put(`/notifications/${id}/`, null, {
                headers: {
                    'Authorization': `Token ${localStorage.getItem('token')}`
                }
            });
            setNotifications(notifications.map(notification =>
                notification.id === id ? response.data : notification
            ));
        } catch (error) {
            console.error('Error updating notification status:', error);
        }
    };

    return (
        <div className="w-full mt-20 ">
            <table className="table">
                {/* head */}
                <thead>
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Message</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {notifications.map((notification) => (
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
                                            <img src="images/tree_of_life_avatar_pic.jpeg" alt="Avatar Tailwind CSS Component" />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="font-bold">{notification.user}</div>
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
                {/* foot */}
                <tfoot>
                    <tr>
                        <th></th>
                        <th>Name</th>
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