import { useState } from 'react';

const NotificationTable = () => {
    const [notifications, setNotifications] = useState([
        { id: 1, name: 'Diallo Jones', message: 'Your consumption usage was down 8% this past week. Keep up the good work!', date: '6/5/24', time: '12.12 PM', read: true },
        { id: 2, name: 'Diallo Jones', message: 'Your consumption usage was up 2% this past month. Visit the tips and tricks page to learn how to keep it down!', date: '7/1/24', time: '3.33 PM', read: false },
    ]);

    const toggleReadStatus = (id) => {
        setNotifications((prevNotifications) =>
            prevNotifications.map((notification) =>
                notification.id === id
                    ? { ...notification, read: !notification.read }
                    : notification
            )
        );
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
                                        <div className="font-bold">{notification.name}</div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <p>{notification.message}</p>
                            </td>
                            <td>{notification.date}</td>
                            <td>{notification.time}</td>
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