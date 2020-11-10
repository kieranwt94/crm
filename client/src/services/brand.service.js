import axios from 'axios';

class BrandService {
    async getBrands() {
        try {
            return await axios.get('/api/brands').then(response => {
                return response.data;
            });
        } catch(error) {
            return error.response.msg;
        }
    }

    async getBrandById(id) {
        try {
            return await axios.get(`/api/brands/${id}`).then(response => {
                return response.data;
            });
        } catch (error) {
            return error.response.msg;
        }
        
    }

    async addBrand(brand) {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }

            await axios.post('/api/brands', brand, config);
        } catch (error) {
            return error.response.msg;
        }
    }

    async deleteBrand(id) {
        try {
            await axios.delete(`/api/brands/${id}`);
        } catch(error) {
            return error.response.msg;
        }
    }

    async updateBrand(brand) {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        try {
            await axios.put(`/api/brands/${brand.id}`, brand, config);
        } catch (error) {
            return error.response.msg;
        }
    }
}

export default new BrandService();
