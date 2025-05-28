import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Language } from '../types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, username: string, displayName: string, language: Language) => Promise<void>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => {},
  signup: async () => {},
  logout: () => {},
  updateUser: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check local storage for saved user data
    const savedUser = localStorage.getItem('utopia-user');
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setUser({
          ...parsedUser,
          joinedAt: new Date(parsedUser.joinedAt)
        });
      } catch (error) {
        console.error('Failed to parse saved user data', error);
        localStorage.removeItem('utopia-user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    // In a real app, we would make an API call here
    // For demo purposes, we'll simulate a successful login with mock data
    setIsLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Create a mock user
    const mockUser: User = {
      id: 'user-1',
      email,
      username: email.split('@')[0],
      displayName: email.split('@')[0],
      avatar: `https://source.unsplash.com/random/200x200/?person&${Math.random()}`,
      bio: 'Welcome to my Utopia profile!',
      followers: Math.floor(Math.random() * 500),
      following: Math.floor(Math.random() * 200),
      joinedAt: new Date(),
      language: localStorage.getItem('utopia-language') as Language || 'en'
    };

    setUser(mockUser);
    localStorage.setItem('utopia-user', JSON.stringify(mockUser));
    setIsLoading(false);
  };

  const signup = async (
    email: string, 
    password: string, 
    username: string, 
    displayName: string,
    language: Language
  ): Promise<void> => {
    // In a real app, we would make an API call here
    setIsLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Create a new user
    const newUser: User = {
      id: `user-${Date.now()}`,
      email,
      username,
      displayName,
      avatar: `https://source.unsplash.com/random/200x200/?person&${Math.random()}`,
      bio: '',
      followers: 0,
      following: 0,
      joinedAt: new Date(),
      language
    };

    setUser(newUser);
    localStorage.setItem('utopia-user', JSON.stringify(newUser));
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('utopia-user');
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem('utopia-user', JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        isAuthenticated: !!user, 
        isLoading, 
        login, 
        signup, 
        logout,
        updateUser 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};