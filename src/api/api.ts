import axios from 'axios';

export interface User {
  id: number;
  name: string;
  email: string;
  username: string;
}

const API_URL = 'https://jsonplaceholder.typicode.com/users';

export const fetchUsers = async (): Promise<User[]> => {
  try {
    // Искусственная задержка 3 секунды для демонстрации loading состояния
    await new Promise(resolve => setTimeout(resolve, 3000));

    // 50% вероятность ошибки для демонстрации error состояния
    if (Math.random() > 0.5) {
      throw new Error('Simulated error: Failed to fetch users');
    }

    const response = await axios.get<User[]>(API_URL, { timeout: 5000 });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.code === 'ECONNABORTED') {
        throw new Error('Request timeout: The server did not respond within 5 seconds');
      }
      throw new Error(`Error fetching data: ${error.message}`);
    }
    throw new Error(error instanceof Error ? error.message : 'Unknown error occurred');
  }
};