import { message } from 'antd'
import axiosInstance from '@src/modules/auth/utils/axios'
import { endpoints } from '../../routes/endPoints.routes'

export async function fetchGitHubRepositoryPullsRequests(props: { repo: string; user: string }) {
  const { user, repo } = props
  try {
    const response = await axiosInstance.get(
      endpoints.getPullRequests.replace(':user', user).replace(':repo', repo)
    )
    return response.data
  } catch (error) {
    message.error('Failed to fetch GitHub repositories')
  }
}
