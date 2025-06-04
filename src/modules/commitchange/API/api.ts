import axiosInstance from '@src/modules/auth/utils/axios'
import { endpoints } from '@src/modules/shared/store/routes/endpoints.routes'
import { message } from 'antd'

export async function fetchCommitChanges(user: string, repo: string, commitSHA: string) {
  try {
    const url = endpoints.getOneFileChanges
      .replace(':owner', user)
      .replace(':repo', repo)
      .replace(':sha', commitSHA)

    const response = await axiosInstance.get(url)

    return response.data
  } catch (error) {
    message.error('Failed to fetch commit changes')
    throw error
  }
}

export async function fetchCommitDiff(user: string, repo: string, commitSHA: string) {
  try {
    const response = await axiosInstance.get(
      endpoints.getOneCommitChanges
        .replace(':owner', user)
        .replace(':repo', repo)
        .replace(':commitSHA', commitSHA),
      {
        headers: { Accept: 'application/vnd.github.v3.diff; charset=utf-8' },
      }
    )

    return response.data
  } catch (error) {
    message.error('Failed to fetch commit diff')
    throw error
  }
}

export const BootApiKey =
  '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'
export const BootApiRoute = 'https://api.openai.com/v1/chat/completions'
