import axiosInstance from '@src/modules/auth/utils/axios'
import { message } from 'antd'
import { endpoints } from '../../routes/endPoints.routes'

export async function fetchOneFileContent(props: {
  repo: string
  user: string
  ref: string
  path: string
}) {
  const { user, repo, ref, path } = props
  try {
    const response = await axiosInstance.get(
      endpoints.getOneFileContent
        .replace(':user', user)
        .replace(':repo', repo)
        .replace(':path', path)
        .replace(':ref', ref)
    )
    return response.data
  } catch (error) {
    message.error('Failed to fetch file content')
  }
}
export async function fetchOneFileChangesContent(props: {
  owner: string
  repo: string
  sha: string
  path: string
}) {
  const { repo, owner, sha, path } = props
  try {
    const response = await axiosInstance.get(
      endpoints.getOneFileChanges
        .replace(':user', owner)
        .replace(':repo', repo)
        .replace(':path', path)
        .replace(':sha', sha),
      {
        headers: {
          Accept: 'application/vnd.github.v3.diff',
        },
      }
    )
    return response.data
  } catch (error) {
    message.error('Failed to fetch file content')
  }
}
