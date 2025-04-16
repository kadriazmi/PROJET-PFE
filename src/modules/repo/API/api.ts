import axiosInstance from '@src/modules/auth/utils/axios'
import { endpoints } from '@src/modules/shared/store/routes/endpoints.routes'
import { message } from 'antd'

export async function fetchGitHubRepos() {
  try {
    const response = await axiosInstance.get(endpoints.getRepositories)
    return response.data
  } catch (error) {
    message.error('Failed to fetch GitHub repositories')
  }
}
