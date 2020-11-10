import axios from 'axios';

class ServiceService {
    async getServices() {
        try {
            return await axios.get('/api/services').then(response => {
                return response.data;
            });
        } catch (error) {
            return error.response.msg;
        }
    }

    async getServiceById(id) {
        try {
            return await axios.get(`/api/services/${id}`).then(response => {
                return response.data;
            });
        } catch (error) {
            return error.response.msg;
        }

    }

    async addService(service) {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }

            await axios.post('/api/services', service, config);
        } catch (error) {
            return error.response.msg;
        }
    }

    async deleteService(id) {
        try {
            await axios.delete(`/api/services/${id}`);
        } catch (error) {
            return error.response.msg;
        }
    }

    async updateService(service) {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        try {
            await axios.put(`/api/services/${service.id}`, service, config);
        } catch (error) {
            return error.response.msg;
        }
    }
}

export default new ServiceService();
