import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import api from '../utils/axios';
import {
    FaHeart,
    FaCalendarAlt,
    FaMapMarkerAlt
} from 'react-icons/fa';

const Wishlist = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const [events, setEvents] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }

        const fetchWishlist = async () => {
            try {
                setLoading(true);
                setError('');

                const [bookmarkResponse, bookingResponse] =
                    await Promise.all([
                        api.get('/bookmarks'),
                        api.get('/bookings/my')
                    ]);

                const savedEvents = bookmarkResponse.data
                    .map(bookmark => bookmark.event)
                    .filter(event =>
                        event && typeof event === 'object' && event._id
                    );

                setEvents(savedEvents);
                setBookings(bookingResponse.data);
            } catch (err) {
                console.error('Wishlist loading error:', err);
                setError('Unable to load wishlist. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        fetchWishlist();
    }, [user, navigate]);

    const removeFromWishlist = async (eventId) => {
        try {
            await api.post('/bookmarks', { eventId });

            setEvents(previousEvents =>
                previousEvents.filter(event => event._id !== eventId)
            );
        } catch (err) {
            console.error('Error removing wishlist event:', err);
            alert('Unable to remove event from wishlist.');
        }
    };

    const getBookingStatus = (eventId) => {
        const booking = bookings.find(item => {
            const bookedEventId = item.eventId?._id || item.eventId;

            return String(bookedEventId) === String(eventId);
        });

        if (!booking) return null;

        if (booking.status === 'confirmed') return 'Booked';
        if (booking.status === 'pending') return 'Pending';
        if (booking.status === 'cancelled') return 'Cancelled';

        return booking.status;
    };

    if (loading) {
        return (
            <div className="text-center py-20 text-xl font-semibold">
                Loading wishlist...
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
                <FaHeart className="text-red-500 text-3xl" />

                <div>
                    <h1 className="text-3xl font-extrabold text-gray-900">
                        My Wishlist
                    </h1>

                    <p className="text-gray-500 mt-1">
                        All your favourite events in one place.
                    </p>
                </div>
            </div>

            {error ? (
                <div className="bg-red-50 text-red-600 p-5 rounded-xl">
                    <p>{error}</p>

                    <button
                        onClick={() => window.location.reload()}
                        className="mt-3 underline font-bold"
                    >
                        Retry
                    </button>
                </div>
            ) : events.length === 0 ? (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
                    <FaHeart className="text-gray-200 text-6xl mx-auto mb-4" />

                    <h2 className="text-xl font-bold text-gray-800 mb-2">
                        Your wishlist is empty
                    </h2>

                    <p className="text-gray-500 mb-6">
                        Open an event and click the heart icon to save it here.
                    </p>

                    <Link
                        to="/"
                        className="inline-block bg-gray-900 hover:bg-black text-white font-bold py-3 px-8 rounded-lg"
                    >
                        Browse Events
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {events.map(event => {
                        const status = getBookingStatus(event._id);

                        return (
                            <div
                                key={event._id}
                                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition border border-gray-100 flex flex-col"
                            >
                                <div className="h-48 bg-gray-900 relative flex items-center justify-center overflow-hidden">
                                    {event.image ? (
                                        <img
                                            src={event.image}
                                            alt={event.title}
                                            className="w-full h-full object-contain"
                                        />
                                    ) : (
                                        <span className="text-white text-2xl font-bold">
                                            {event.category || 'Event'}
                                        </span>
                                    )}

                                    <button
                                        type="button"
                                        onClick={() => removeFromWishlist(event._id)}
                                        title="Remove from Wishlist"
                                        className="absolute top-3 right-3 bg-white p-3 rounded-full shadow hover:scale-110 transition"
                                    >
                                        <FaHeart className="text-red-500 text-xl" />
                                    </button>
                                </div>

                                <div className="p-6 flex-grow flex flex-col">
                                    <div className="flex justify-between items-center gap-2 mb-2">
                                        <span className="text-xs font-bold text-gray-600 uppercase">
                                            {event.category}
                                        </span>

                                        {status && (
                                            <span className={`px-2 py-1 text-xs font-bold rounded ${
                                                status === 'Booked'
                                                    ? 'bg-green-100 text-green-700'
                                                    : status === 'Pending'
                                                        ? 'bg-yellow-100 text-yellow-700'
                                                        : status === 'Cancelled'
                                                            ? 'bg-red-100 text-red-700'
                                                            : 'bg-gray-100 text-gray-700'
                                            }`}>
                                                {status}
                                            </span>
                                        )}
                                    </div>

                                    <h2 className="text-xl font-bold text-gray-900 mb-3">
                                        {event.title}
                                    </h2>

                                    <div className="space-y-2 text-sm text-gray-600 mb-4">
                                        <p className="flex items-center gap-2">
                                            <FaCalendarAlt className="text-gray-400" />

                                            {event.date
                                                ? new Date(event.date).toLocaleDateString()
                                                : 'Date unavailable'}
                                        </p>

                                        <p className="flex items-center gap-2">
                                            <FaMapMarkerAlt className="text-gray-400" />

                                            {event.location || 'Location unavailable'}
                                        </p>
                                    </div>

                                    <p className="text-lg font-bold text-gray-900 mb-4">
                                        {event.ticketPrice === 0
                                            ? 'FREE'
                                            : `₹${event.ticketPrice}`}
                                    </p>

                                    <Link
                                        to={`/events/${event._id}`}
                                        className="mt-auto block text-center bg-gray-900 hover:bg-black text-white font-semibold py-3 rounded-lg transition"
                                    >
                                        View Details
                                    </Link>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default Wishlist;