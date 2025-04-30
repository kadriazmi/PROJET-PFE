import axiosInstance from '@src/modules/auth/utils/axios'
import { endpoints } from '@src/modules/shared/store/routes/endpoints.routes'
import { message } from 'antd'

export async function fetchPullRequests(user: string, repo: string) {
  try {
    const url = endpoints.getPullRequests.replace(':user', user).replace(':repo', repo)
    const response = await axiosInstance.get(url)
    return response.data
  } catch (error) {
    message.error('Failed to fetch pull requests')
    return []
  }
}

export async function fetchCommits(user: string, repo: string, pullNumber: number) {
  try {
    const url = endpoints.getPullRequestsCommits
      .replace(':user', user)
      .replace(':repo', repo)
      .replace(':ref', pullNumber.toString())
    const response = await axiosInstance.get(url)
    return response.data
  } catch (error) {
    message.error('Failed to fetch commits')
    return []
  }
}
