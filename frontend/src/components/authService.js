const API_URL = 'http://localhost:5000/api'; // adjust port if different

export const authService = {
    register: async (userData) => {
        try {
            const response = await fetch(`${API_URL}/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData)
            });
            
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || 'Registration failed');
            }
            
            return await response.json();
        } catch (error) {
            throw error;
        }
    },

    login: async (credentials) => {
        try {
            const response = await fetch(`${API_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials)
            });
            
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || 'Login failed');
            }
            
            return await response.json();
        } catch (error) {
            throw error;
        }
    }
};