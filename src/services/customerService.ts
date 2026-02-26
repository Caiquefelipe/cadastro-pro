import axios from 'axios'
import type { ICustomer } from 'src/interfaces/ICustomer'

// Base URL for API requests — centralize the server address here
const BASE_URL = 'https://cadastro-pro-backend-net-3.onrender.com/api'

class CustomerService {
  async getCustomers(): Promise<ICustomer[]> {
    const response = await axios.get(`${BASE_URL}/customer`)
    console.log(response.data)

    return response.data
  }

  async addCustomer(data: ICustomer) {
    const response = await axios.post(`${BASE_URL}/customer`, data)
    return response.data
  }

  async editCustomer(id: number, data: ICustomer) {
    const response = await axios.put(`${BASE_URL}/customer/${id}`, data)
    return response.data
  }

  async getCustomerById(id: number): Promise<ICustomer> {
    const response = await axios.get(`${BASE_URL}/customer/${id}`)
    return response.data
  }

  async deleteCustomer(id: number): Promise<ICustomer> {
    const response = await axios.delete(`${BASE_URL}/customer/${id}`)
    return response.data.customers
  }
}
export default new CustomerService()