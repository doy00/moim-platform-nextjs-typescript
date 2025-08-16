import { mockCurrentUser } from '@/data/mockData';

export const mockAuth = {
  getCurrentUser: () => {
    return Promise.resolve(mockCurrentUser);
  },
  
  signIn: (email: string, password: string) => {
    return Promise.resolve({ 
      me: mockCurrentUser, 
      tokens: {
        accessToken: 'mock_access_token',
        refreshToken: 'mock_refresh_token'
      }
    });
  },
  
  signUp: (email: string, password: string, userData: any) => {
    return Promise.resolve({ 
      me: mockCurrentUser, 
      tokens: {
        accessToken: 'mock_access_token',
        refreshToken: 'mock_refresh_token'
      }
    });
  },
  
  signOut: () => {
    return Promise.resolve({ message: 'Successfully signed out' });
  },
  
  isAuthenticated: () => {
    return true;
  }
};