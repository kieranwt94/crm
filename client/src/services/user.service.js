import axios from 'axios';

class UserService {
    async getUsers() {
        try {
            return await axios.get('/api/users').then(response => {
                return response.data;
            });
        } catch (error) {
            return error.response.msg;
        }
    }

    async getUserById(id) {
        try {
            return await axios.get(`/api/users/${id}`).then(response => {
                return response.data;
            });
        } catch (error) {
            return error.response.msg;
        }

    }

    async addUser(user) {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }

            await axios.post('/api/users', user, config);
        } catch (error) {
            return error.response.msg;
        }
    }

    async deleteUser(id) {
        try {
            await axios.delete(`/api/users/${id}`);
        } catch (error) {
            return error.response.msg;
        }
    }

    async updateUser(user) {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        try {
            await axios.put(`/api/users/${user.id}`, user, config);
        } catch (error) {
            return error.response.msg;
        }
    }
}

export default new UserService();
