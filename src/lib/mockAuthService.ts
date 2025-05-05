/**
 * Mock Authentication Service
 * 
 * This provides a client-side authentication service for cases when the backend is down
 * or when testing in development. This is NOT secure and should only be used temporarily.
 */

// Simple storage for mock users
const MOCK_USERS_KEY = 'mira_mock_users';

// Types
interface MockUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string; // WARNING: This is not secure, only for development
}

// Get mock users from localStorage
const getMockUsers = (): MockUser[] => {
  if (typeof window === 'undefined') return [];
  
  try {
    const users = localStorage.getItem(MOCK_USERS_KEY);
    return users ? JSON.parse(users) : [];
  } catch (e) {
    console.error('Error getting mock users:', e);
    return [];
  }
};

// Save mock users to localStorage
const saveMockUsers = (users: MockUser[]): void => {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(MOCK_USERS_KEY, JSON.stringify(users));
  } catch (e) {
    console.error('Error saving mock users:', e);
  }
};

// Generate a mock token
const generateMockToken = (user: Omit<MockUser, 'password'>): string => {
  // In a real app, this would be a JWT. Here, we just stringify and encode the user object
  const payload = btoa(JSON.stringify(user));
  return `mock_token_${payload}`;
};

// Register a new user
export const mockRegister = async (
  firstName: string,
  lastName: string,
  email: string,
  password: string
): Promise<{ token: string }> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  const users = getMockUsers();
  
  // Check if user exists
  if (users.some(user => user.email === email)) {
    throw new Error('Email already registered');
  }
  
  // Create new user
  const newUser: MockUser = {
    id: Date.now().toString(),
    email,
    firstName,
    lastName,
    password, // In a real app, this would be hashed
  };
  
  // Save user
  saveMockUsers([...users, newUser]);
  
  // Return token (without password)
  const { password: _, ...userWithoutPassword } = newUser;
  const token = generateMockToken(userWithoutPassword);
  
  return { token };
};

// Login a user
export const mockLogin = async (
  email: string,
  password: string
): Promise<{ token: string }> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  const users = getMockUsers();
  
  // Find user
  const user = users.find(user => user.email === email);
  
  // Check if user exists and password is correct
  if (!user || user.password !== password) {
    throw new Error('Invalid credentials');
  }
  
  // Return token (without password)
  const { password: _, ...userWithoutPassword } = user;
  const token = generateMockToken(userWithoutPassword);
  
  return { token };
};

// Get current user from token
export const mockGetUserFromToken = (token: string): {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
} | null => {
  if (!token || !token.startsWith('mock_token_')) {
    return null;
  }
  
  try {
    const payload = token.replace('mock_token_', '');
    const decoded = JSON.parse(atob(payload));
    
    return {
      id: decoded.id,
      email: decoded.email,
      firstName: decoded.firstName,
      lastName: decoded.lastName,
    };
  } catch (e) {
    console.error('Error decoding mock token:', e);
    return null;
  }
};

export default {
  mockRegister,
  mockLogin,
  mockGetUserFromToken,
}; 