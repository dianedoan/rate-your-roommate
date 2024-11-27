import { authService } from './authService';

// Helper functions for authentication
export const isAuthenticated = () => {
    return authService.getCurrentAuthState().isAuthenticated;
};
  
export const getAuthToken = () => {
    return authService.getCurrentAuthState().token;
};
  
export const getCurrentUser = () => {
    return authService.getCurrentAuthState().user;
};
  
export const logout = () => {
    authService.logout();
};
  
//API calls
export const authHeader = () => {
    const token = getAuthToken();
    return token ? { 'Authorization': `Bearer ${token}` } : {};
};