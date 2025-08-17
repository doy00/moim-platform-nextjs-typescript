import { mockCurrentUser, testAccount } from '@/data/mockData';

export const mockAuth = {
  getCurrentUser: () => {
    return Promise.resolve(mockCurrentUser);
  },
  
  signIn: (email: string, password: string) => {
    // 테스트 계정 인증 체크
    if (email === testAccount.email && password === testAccount.password) {
      return Promise.resolve({ 
        me: mockCurrentUser, 
        tokens: {
          accessToken: 'mock_access_token',
          refreshToken: 'mock_refresh_token'
        }
      });
    }
    
    // 일반적인 목업 로그인 (다른 계정들도 허용)
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