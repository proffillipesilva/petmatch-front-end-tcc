import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaHome, FaPaw, FaStar, FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import { IoIosHeart } from "react-icons/io";
import Logo from '../../features/splash/assets/Frame1.png';

const Navbar = () => {
    const { isAuthenticated, user, logout } = useAuth();
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef(null);
    const welcomeMessage = user?.nomeOng || user?.nomeAdotante || "Bem-vindo(a)";

    useEffect(() => {
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMenuOpen(false);
            }
        }
        if (menuOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [menuOpen]);

    const handleNavigate = (path) => {
        navigate(path);
        setMenuOpen(false);
    };

    const handleLogout = () => {
        logout();
        setMenuOpen(false);
    };

    return (
        <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
            <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
                <div onClick={() => handleNavigate("/")} className="cursor-pointer">
                    <img src={Logo} alt="Logo PetMatch" className="max-w-[120px]" />
                </div>
                <div className="flex items-center space-x-6">
                    <ul className="flex items-center space-x-4">
                        <li><button onClick={() => handleNavigate("/")} className="flex items-center gap-2 text-gray-600 hover:text-yellow-500 transition"><FaHome /> Início</button></li>
                        <li><button onClick={() => handleNavigate("/adotar")} className="flex items-center gap-2 text-gray-600 hover:text-yellow-500 transition"><FaPaw /> Adotar</button></li>
                        <li><button onClick={() => handleNavigate("/novidades")} className="flex items-center gap-2 text-gray-600 hover:text-yellow-500 transition"><FaStar /> Novidades</button></li>
                    </ul>
                    <div className="relative" ref={menuRef}>
                        <button onClick={() => setMenuOpen(!menuOpen)} className="flex items-center space-x-2 text-gray-700 hover:text-yellow-500">
                            <FaUserCircle className="h-6 w-6" />
                            <span>{welcomeMessage}</span>
                        </button>
                        {menuOpen && (
                            <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-xl z-20">
                                {isAuthenticated ? (
                                    <button onClick={handleLogout} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                                        <FaSignOutAlt className="inline mr-2" />Sair
                                    </button>
                                ) : (
                                    <>
                                        <button onClick={() => handleNavigate("/login")} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">Entrar</button>
                                        <button onClick={() => handleNavigate("/tipo-cadastro")} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">Cadastre-se</button>
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;