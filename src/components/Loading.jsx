import React from 'react';

const Loading = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-64">
                <div className="relative h-2 bg-gray-300 rounded-full overflow-hidden">
                    <div className="absolute left-0 top-0 h-2 w-1/3 bg-blue-500 rounded-full animate-loading-bar"></div>
                </div>
            </div>
            <style>
                {`
                @keyframes loading-bar {
                    0% { left: -33%; }
                    100% { left: 100%; }
                }
                .animate-loading-bar {
                    animation: loading-bar 1.2s cubic-bezier(.4,0,.2,1) infinite;
                }
                `}
            </style>
        </div>
    );
};

export default Loading;