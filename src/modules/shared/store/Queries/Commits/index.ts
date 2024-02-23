import { message } from 'antd'
import axiosInstance from '@src/modules/auth/utils/axios'
import { endpoints } from '../../routes/endPoints.routes'

export async function fetchGitHubPullRequestCommits(props: {
  repo: string
  user: string
  ref: string
}) {
  const { user, repo, ref } = props
  try {
    const response = await axiosInstance.get(
      endpoints.getPullRequestsCommits
        .replace(':user', user)
        .replace(':repo', repo)
        .replace(':ref', ref)
    )
    return response.data
  } catch (error) {
    message.error('Failed to fetch pull request commits')
  }
}
