import React from "react";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black text-white">
      <div className="animate-bounce text-7xl font-extrabold">🚀</div>
      <h1 className="text-6xl font-bold mt-4">404</h1>
      <p className="text-lg mt-2">
        Oops! Looks like you’ve drifted off into the void...
      </p>
      <p className="text-md text-gray-400">
        But don’t worry, we have a spaceship ready to take you home!
      </p>

      <a
        href="/"
        className="mt-6 px-6 py-3 text-black bg-yellow-400 hover:bg-yellow-500 rounded-md text-lg font-semibold shadow-lg transform hover:scale-105 transition"
      >
        🚀 Take Me Home
      </a>

      <div className="absolute bottom-2 text-gray-500">
        <p>Lost in space? Refresh for another adventure!</p>
      </div>
    </div>
  );
};

export default NotFound;
