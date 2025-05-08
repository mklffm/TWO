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

// Default test user
const DEFAULT_USER: MockUser = {
  id: '1',
  email: 'test@example.com',
  firstName: 'Test',
  lastName: 'User',
  password: 'password123',
};

// Get mock users from localStorage
const getMockUsers = (): MockUser[] => {
  if (typeof window === 'undefined') return [DEFAULT_USER];
  
  try {
    const users = localStorage.getItem(MOCK_USERS_KEY);
    if (!users) {
      // Initialize with default user if no users exist
      const defaultUsers = [DEFAULT_USER];
      saveMockUsers(defaultUsers);
      return defaultUsers;
    }
    return JSON.parse(users);
  } catch (e) {
    console.error('Error getting mock users:', e);
    return [DEFAULT_USER];
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
  // Create a more JWT-like structure with three parts: header.payload.signature
  const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const payload = btoa(JSON.stringify({
    ...user,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 86400, // 24 hours
  }));
  const signature = btoa("mock_signature");
  
  // Combine in JWT format
  return `${header}.${payload}.${signature}`;
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
  
  // Initialize storage with default user if needed
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
  if (!token) {
    return null;
  }
  
  try {
    // Split the token into its components
    const parts = token.split('.');
    if (parts.length !== 3) {
      console.error('Invalid token format');
      return null;
    }
    
    // Decode the payload (second part)
    const decoded = JSON.parse(atob(parts[1]));
    
    // Check if token is expired
    const now = Math.floor(Date.now() / 1000);
    if (decoded.exp && decoded.exp < now) {
      console.error('Token expired');
      return null;
    }
    
    return {
      id: decoded.id,
      email: decoded.email,
      firstName: decoded.firstName,
      lastName: decoded.lastName,
    };
  } catch (e) {
    console.error('Error decoding token:', e);
    return null;
  }
};

// Make sure default user is added on initial load
if (typeof window !== 'undefined') {
  const users = getMockUsers();
  if (!users.some(user => user.email === DEFAULT_USER.email)) {
    saveMockUsers([...users, DEFAULT_USER]);
  }
}

export default {
  mockRegister,
  mockLogin,
  mockGetUserFromToken,
}; 