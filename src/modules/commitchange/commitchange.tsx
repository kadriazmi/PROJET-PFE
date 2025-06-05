import { fetchCommitChanges, fetchCommitDiff } from '@src/modules/commitChange/API/api'
import { Modal, Tooltip } from 'antd'
import * as Diff2Html from 'diff2html'
import 'diff2html/bundles/css/diff2html.min.css'
import { useState } from 'react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import emptyFile from '../shared/assets/images/folder_empty.png'
import ReviewButton from '../shared/components/Buttons/Review'
import MainContainer from '../shared/layout/MainContainer/MainContainer'
import { useAppSelector } from '../shared/store'
import StreamComponent from './review'
import LoadingScreen from '../shared/components/Loading'

function splitDiffByFiles(diffString: string) {
  const files = diffString.split(/^diff --git /gm).slice(1)

  return files.map((fileBlock) => {
    const lines = fileBlock.split('\n')
    const match = lines[0].match(/^a\/(.+?)\s/)
    const fileName = match ? match[1] : 'Unknown file'
    return { fileName, diff: 'diff --git ' + fileBlock }
  })
}

const CommitChanges = () => {
  const { commitSHA, id } = useParams()
  const { user } = useAppSelector((state) => state.auth)
  const username = user?.user_metadata.user_name
  const [commitMessage, setCommitMessage] = useState<string>('')
  const [selectedFile, setSelectedFile] = useState<string | null>(null)
  const [filesDiff, setFilesDiff] = useState<{ fileName: string; diff: string }[] | null>(null)

  const [isModalOpen, setIsModalOpen] = useState(false)

  const { data, isLoading } = useQuery({
    queryKey: ['commitChanges', commitSHA],
    queryFn: () => fetchCommitChanges(username, id!, commitSHA!),
    onSuccess: (data) => {
      setCommitMessage(data?.commit?.message!)
    },
    enabled: !!username && !!id && !!commitSHA,
  })
  useQuery({
    queryKey: ['commit-diff', commitSHA],
    queryFn: () => fetchCommitDiff(username, id!, commitSHA!),
    onSuccess: (data) => {
      setFilesDiff(splitDiffByFiles(data!))
    },
    enabled: !!username && !!id && !!commitSHA,
  })

  const files = data?.files || []

  const selectedFileDiff = filesDiff?.find((file: any) => file.fileName === selectedFile)
  const diffHtml =
    !!selectedFileDiff &&
    Diff2Html.html(selectedFileDiff?.diff!, {
      inputFormat: 'diff',
      highlight: true,
      //@ts-ignore
      colorScheme: 'dark',
      outputFormat: 'line-by-line',
      drawFileList: true,
      DiffStyleType: 'char',
    })

  if (isLoading) return <LoadingScreen size="full" blur />
  return (
    <MainContainer
      linkProps={{
        title: commitMessage,
        links: [
          { name: 'Repositories', href: '/repositories' },
          { name: 'Pull Requests', href: `/repositories/${id}/pulls` },
          { name: 'Commits'!, href: '' },
        ],
      }}
    >
      <div className="one-commit-page">
        <div className="one-commit-page__files">
          <p className="one-commit-page__files__title">Files :</p>
          {files?.map((file: any) => (
            <div
              className={`one-commit-page__files__one-file ${
                selectedFile === file.filename ? 'one-commit-page__files__one-file--active' : ''
              }`}
              key={file.filename}
              onClick={() => setSelectedFile(file?.filename)}
            >
              <p className="one-commit-page__files__one-file__name">{file.filename}</p>
              <div className="one-commit-page__files__one-file__stats">
                <Tooltip title={'deletions'} color={'#ef233c'}>
                  <span className="one-commit-page__file-changes one-commit-page__file-changes--delete">
                    {`${file?.deletions}`.padStart(2, '0')}
                  </span>
                </Tooltip>
                <Tooltip title={'additions'} color={'#2dc653'}>
                  <span className="one-commit-page__file-changes one-commit-page__file-changes--addition">
                    {`${file?.additions}`.padStart(2, '0')}
                  </span>
                </Tooltip>
              </div>
            </div>
          ))}
        </div>

        <div className="one-commit-page__content">
          <p className="one-commit-page__files__title">File Content :</p>
          <div className="one-commit-page__content__blanc">
            <div className="one-commit-page__content__blanc__editor">
              {!!selectedFileDiff?.diff ? (
                <div className="code-diff__wrapper">
                  <div className="code-diff" dangerouslySetInnerHTML={{ __html: diffHtml }} />
                </div>
              ) : (
                <div className="one-commit-page__content__blanc__one-file">
                  <img className="one-commit-page__content__blanc__one-file__src" src={emptyFile} />
                  <p className="one-commit-page__content__blanc__one-file__message">
                    no file selected
                  </p>
                </div>
              )}
              {!!selectedFileDiff?.diff ? (
                <div className="stream-wrapper__button">
                  <ReviewButton title={'Review changes'} onClick={() => setIsModalOpen(true)} />
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
      <Modal
        open={isModalOpen}
        key={selectedFile}
        onCancel={() => setIsModalOpen(false)}
        title="Code Review"
        className="editor__modal"
      >
        <StreamComponent prompt={selectedFileDiff?.diff || ''} />
      </Modal>
    </MainContainer>
  )
}

export default CommitChanges
