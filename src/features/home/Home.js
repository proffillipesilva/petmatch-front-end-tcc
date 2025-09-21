import React from 'react';

const Home = () => {
    return (
        <div className="container mx-auto mt-8 p-6 bg-white shadow-md rounded-lg">
            <h1 className="text-3xl font-bold mb-4">Bem-vindo(a) ao PetMatch!</h1>
            <h2 className="text-2xl font-semibold mb-2">História do nosso site:</h2>
            <p className="mb-4 text-gray-700">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <p className="text-gray-700">
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-gray-100 p-4 rounded-lg shadow-sm h-40">Card 1</div>
                <div className="bg-gray-100 p-4 rounded-lg shadow-sm h-40">Card 2</div>
                <div className="bg-gray-100 p-4 rounded-lg shadow-sm h-40">Card 3</div>
                <div className="bg-gray-100 p-4 rounded-lg shadow-sm h-40">Card 4</div>
            </div>
        </div>
    );
};

export default Home;