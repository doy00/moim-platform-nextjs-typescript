import { mockCurrentUser } from '@/data/mockData';

export const mockAuth = {
  getCurrentUser: () => {
    return Promise.resolve(mockCurrentUser);
  },
  
  signIn: (email: string, password: string) => {
    return Promise.resolve({ 
      user: mockCurrentUser, 
      error: null 
    });
  },
  
  signUp: (email: string, password: string, userData: any) => {
    return Promise.resolve({ 
      user: mockCurrentUser, 
      error: null 
    });
  },
  
  signOut: () => {
    return Promise.resolve({ error: null });
  },
  
  isAuthenticated: () => {
    return true;
  }
};