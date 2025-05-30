import axiosInstance from '../lib/axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api/v1';

class AuthService {
  async login(email, password) {
    try {
      const response = await axiosInstance.post('api/v1/auth/login', {
        email,
        password
      });
      if (response.data.token) {
        localStorage.setItem('user', JSON.stringify(response.data));
      }
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  logout() {
    localStorage.removeItem('user');
  }

  getCurrentUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  isTokenValid() {
    const user = this.getCurrentUser();
    if (!user || !user.token) return false;

    try {
      const token = user.token;
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));

      const { exp } = JSON.parse(jsonPayload);
      return exp * 1000 > Date.now();
    } catch (error) {
      return false;
    }
  }

  hasRole(role) {
    const user = this.getCurrentUser();
    if (!user || !user.token) return false;

    try {
      const token = user.token;
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));

      const { roles } = JSON.parse(jsonPayload);
      return roles.includes(role);
    } catch (error) {
      return false;
    }
  }

  isAdmin() {
    return this.hasRole('ROLE_ADMIN');
  }

  isDoctor() {
    return this.hasRole('ROLE_DOCTOR');
  }

  getAuthHeader() {
    const user = this.getCurrentUser();
    if (user && user.token) {
      return { Authorization: `Bearer ${user.token}` };
    }
    return {};
  }
}

export default new AuthService(); 