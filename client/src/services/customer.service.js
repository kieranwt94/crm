import axios from 'axios';

class CustomerService {
    async getCustomers() {
        try {
            return await axios.get('/api/customers').then(response => {
                return response.data;
            });
        } catch (error) {
            return error.response.msg;
        }
    }

    async getCustomerById(id) {
        try {
            return await axios.get(`/api/customers/${id}`).then(response => {
                return response.data;
            });
        } catch (error) {
            return error.response.msg;
        }

    }

    async addCustomer(customer) {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }

            await axios.post('/api/customers', customer, config);
        } catch (error) {
            return error.response.msg;
        }
    }

    async deleteCustomer(id) {
        try {
            await axios.delete(`/api/customers/${id}`);
        } catch (error) {
            return error.response.msg;
        }
    }

    async updateCustomer(customer) {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        try {
            await axios.put(`/api/customers/${customer.id}`, customer, config);
        } catch (error) {
            return error.response.msg;
        }
    }
}

export default new CustomerService();
