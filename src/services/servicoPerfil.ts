import type { ICliente } from 'src/interfaces/ICliente'
import axios from 'axios'

// Base URL for API requests — centralize the server address here
const BASE_URL = 'http://localhost:5001'

class ServicoClientes {
  async pegarClientes(): Promise<ICliente[]> {
    const response = await axios.get(`${BASE_URL}/clientes`)
    return response.data
  }

  async adicionarCliente(data: ICliente) {
    const response = await axios.post(`${BASE_URL}/clientes`, data)
    return response.data.clientes
  }

  async editarCliente(data: ICliente) {
    const response = await axios.put(`${BASE_URL}/clientes/${data.id}`, data)
    return response.data
  }

  async pegarClientePorId(id: number): Promise<ICliente> {
    const response = await axios.get(`${BASE_URL}/clientes/${id}`)
    return response.data
  }

  async deletarCliente(id: number): Promise<ICliente> {
    const response = await axios.delete(`${BASE_URL}/clientes/${id}`)
    return response.data.clientes
  }
}
export default new ServicoClientes()