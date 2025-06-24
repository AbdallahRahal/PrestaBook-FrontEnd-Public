import React, { useEffect, useState } from 'react';

interface ErrorNotificationProps {
    message: string;
    duration?: number; // Durée d'affichage avant de disparaître automatiquement (en millisecondes)
    onClose?: () => void;
}

const ErrorNotification: React.FC<ErrorNotificationProps> = ({ message, duration = 3000 }) => {
    const [show, setShow] = useState(true);

    useEffect(() => {
        // Masquer automatiquement après une durée donnée
        const timer = setTimeout(() => {
            setShow(false);
        }, duration);

        return () => clearTimeout(timer);
    }, [duration]);

    return (
        <div className={"z-1000 fixed left-1/2 transform -translate-x-1/2 top-10 p-4 bg-red-200 bg-opacity-80 border border-red-400 text-red-800 rounded-md shadow-lg transition-all duration-500"}>
            {message}
        </div>
    );
};

export default ErrorNotification;
