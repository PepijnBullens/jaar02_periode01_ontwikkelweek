import React from "react";

export default function Loading() {
    return (
        <div className="h-full w-full flex items-center justify-center flex-grow">
            <div className="w-10 h-10 border-4 border-t-gray-700 border-gray-300 rounded-full animate-spin"></div>
        </div>
    );
}
