import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAppSelector } from '../shared/store'
import axiosInstance from '@src/modules/auth/utils/axios'
import { endpoints } from '@src/modules/shared/store/routes/endpoints.routes'
import * as Diff2Html from 'diff2html'
import 'diff2html/bundles/css/diff2html.min.css'
import './CommitChange.scss'
import './filebar.scss'
import LoadingScreen from '@src/modules/shared/components/Loading'
import MainContainer from '../shared/layout/MainContainer/MainContainer'

function splitDiffByFiles(diffString: string) {
  const files = diffString.split(/^diff --git /gm).slice(1)
  return files.map((fileBlock) => {
    const lines = fileBlock.split('\n')
    const match = lines[0].match(/^a\/(.+?)\s/)
    const fileName = match ? match[1] : 'Unknown file'
    return { fileName, diff: 'diff --git ' + fileBlock }
  })
}

const CommitChange = () => {
  const { id } = useParams<{ id: string }>()
  const { commitSHA } = useParams<{ commitSHA: string }>()
  const { user } = useAppSelector((state) => state.auth)
  const username = user?.user_metadata.user_name
  const repo = id
  const [commitMessage, setCommitMessage] = useState<string>('')
  const [diffString, setDiffString] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [fileDiffs, setFileDiffs] = useState<{ fileName: string; diff: string }[]>([])
  const [selectedFile, setSelectedFile] = useState<string | null>(null)

  useEffect(() => {
    const fetchDiff = async () => {
      try {
        const url = endpoints.getOneFileChanges
          .replace(':owner', username)
          .replace(':repo', repo)
          .replace(':sha', commitSHA!)
        const commitRes = await axiosInstance.get(url)
        setCommitMessage(commitRes.data.commit.message)
        const diffRes = await axiosInstance.get(url, {
          headers: { Accept: 'application/vnd.github.v3.diff; charset=utf-8' },
        })
        setDiffString(diffRes.data)
        const diffs = splitDiffByFiles(diffRes.data)
        setFileDiffs(diffs)
        if (diffs.length > 0) setSelectedFile(diffs[0].fileName)
      } catch (error) {
        console.error(error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchDiff()
  }, [commitSHA, username, repo])

  if (isLoading) {
    return <LoadingScreen size="s" />
  }

  if (!diffString || fileDiffs.length === 0) {
    return <p>No changes found for this commit.</p>
  }

  return (
    <MainContainer
      linkProps={{
        title: commitMessage,
        links: [
          { name: 'Repositories', href: '/repositories' },
          { name: 'Pull Requests', href: `/repositories/${id}/pulls` },
          { name: 'Commit', href: '' },
        ],
      }}
    >
      <div className="commit-change" style={{ display: 'flex' }}>
        <div className="file-bar">
          {fileDiffs.map((file) => (
            <div
              key={file.fileName}
              className={`file-bar__item${
                selectedFile === file.fileName ? ' file-bar__item--active' : ''
              }`}
              onClick={() => setSelectedFile(file.fileName)}
            >
              {file.fileName}
            </div>
          ))}
        </div>
        <div className="code-diff__wrapper" style={{ flex: 1 }}>
          <div
            className="code-diff"
            dangerouslySetInnerHTML={{
              __html: Diff2Html.html(
                fileDiffs.find((f) => f.fileName === selectedFile)?.diff || '',
                {
                  inputFormat: 'diff',
                  highlight: true,
                  colorScheme: 'dark',
                  outputFormat: 'line-by-line',
                  drawFileList: false,
                  DiffStyleType: 'char',
                }
              ),
            }}
          />
        </div>
      </div>
    </MainContainer>
  )
}

export default CommitChange
