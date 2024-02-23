import { message } from 'antd'
import axiosInstance from '@src/modules/auth/utils/axios'
import { endpoints } from '../../routes/endPoints.routes'

export async function fetchGitHubRepositories() {
  try {
    const response = await axiosInstance.get(endpoints.getRepositories)
    return response.data
  } catch (error) {
    message.error('Failed to fetch GitHub repositories')
  }
}
