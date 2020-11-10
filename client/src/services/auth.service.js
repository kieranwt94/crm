import axios from 'axios';
import { setAuthToken } from 'utils';
import jwt_decode from 'jwt-decode';

class AuthService {
    isLoggedIn() {
    }
    
    async login(email_address, password) {
        try {
            return await axios
                .post('/api/auth/login', {
                    email_address,
                    password
                })
                .then(response => {
                    const { token } = response.data;
                    const decoded = jwt_decode(token);

                    localStorage.setItem('token', token);
                    localStorage.setItem('user', JSON.stringify(decoded));
                    setAuthToken(token);
                });
        } catch(error) {
            console.log(error);
        }
    }

    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    }
}

export default new AuthService();
