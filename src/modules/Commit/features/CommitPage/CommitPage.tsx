import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router'
import { Tooltip } from 'antd'
import * as Diff2Html from 'diff2html'
import 'diff2html/bundles/css/diff2html.min.css'
import { PATH } from '@src/modules/auth/routes/paths'
import LoadingScreen from '@src/modules/shared/components/Loading'
import MainContainer from '@src/modules/shared/layout/MainContainer/MainContainer'
import { useAppSelector } from '@src/modules/shared/store'
import { fetchOneCommit } from '@src/modules/shared/store/Queries/Commits'
import Editor from '../../components/Editor'
import emptyFile from '../../../shared/assets/images/folder_empty.png'
import {
  fetchOneFileChangesContent,
  fetchOneFileContent,
} from '@src/modules/shared/store/Queries/Files'
interface IOneCommitFile {
  filename: string
  sha: string
  deletions: number
  additions: number
}
export default function CommitPage() {
  const { id, commitId } = useParams()
  const { user } = useAppSelector((state) => state.auth)
  const [selectedFile, setSelectedFile] = useState<{ path: string; sha: string } | null>(null)
  const [htmlString, setHtmlString] = useState('')

  const { data: commitContent, isLoading: isCommitContentLoading } = useQuery({
    queryFn: () =>
      fetchOneCommit({
        repo: id!,
        user: user?.user_metadata?.user_name,
        ref: commitId!,
      }),
    queryKey: ['oneCommit', {}],
    staleTime: Infinity,
    cacheTime: 1,
  })
  const { data: fileContent, isLoading: isFileContentLoading } = useQuery({
    queryFn: () =>
      fetchOneFileContent({
        repo: id!,
        user: user?.user_metadata?.user_name,
        ref: selectedFile?.sha!,
        path: selectedFile?.path!,
      }),
    queryKey: ['oneFile', { selectedFile }],
    staleTime: Infinity,
    cacheTime: 1,
    enabled: !!selectedFile,
  })
  const { data: fileChangesContent, isLoading } = useQuery({
    queryFn: () =>
      fetchOneFileChangesContent({
        repo: id!,
        owner: user?.user_metadata?.user_name,
        sha: commitId!,
        path: selectedFile?.path!,
      }),
    queryKey: ['oneFileChanges', { selectedFile }],
    staleTime: Infinity,
    cacheTime: 1,
    enabled: !!selectedFile,
  })
  
  useEffect(() => {
    function extractDiffContent(diffString: string, fileName: string) {
      const fileStartIndex = diffString?.indexOf(`diff --git a/${fileName} b/${fileName}`)
      const stringLength = `diff --git a/${fileName} b/${fileName}`?.length
      const fileEndIndex = diffString
        ?.slice(fileStartIndex + stringLength + 1)
        ?.indexOf('diff --git')
      return diffString.slice(fileStartIndex, fileEndIndex)
    }
    if (fileChangesContent) {
      console.log(fileChangesContent, 'fileChangesContent')
      const extractDiffString = extractDiffContent(fileChangesContent, selectedFile?.path!)
      const diffHtml = Diff2Html.html(extractDiffString, {
        inputFormat: 'diff',
        highlight: true,
        //@ts-ignore
        colorScheme: 'dark',
        outputFormat: 'side-by-side',
        drawFileList: true,
        DiffStyleType: 'char',
      })
      setHtmlString(diffHtml)
    }
  }, [fileChangesContent, selectedFile])
  function handelFileSelect(file: string, ref: string) {
    setSelectedFile({ path: file, sha: ref })
  }

  return (
    <MainContainer
      linkProps={{
        links: [
          { name: 'repositories', href: PATH.REPO },
          { name: 'pull requests', href: PATH.PULLS.replace(':id', id!) },
          { name: 'commit', href: '' },
        ],
        title: commitContent?.commit?.message!,
      }}
      style={{ paddingBottom: 0 }}
    >
      {isCommitContentLoading ? (
        <LoadingScreen blur />
      ) : (
        <div className="one-commit-page">
          <div className="one-commit-page__files">
            <p className="one-commit-page__files__title">Files :</p>
            {commitContent?.files?.map((file: IOneCommitFile) => (
              <div
                className={`one-commit-page__files__one-file ${
                  selectedFile?.path === file.filename
                    ? 'one-commit-page__files__one-file--active'
                    : ''
                }`}
                key={file.filename}
                onClick={() => handelFileSelect(file.filename, commitContent.sha)}
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
              {isFileContentLoading ? (
                <LoadingScreen size="m" />
              ) : fileContent ? (
                htmlString ? (
                  <>
                    <Editor
                      file={{
                        name: fileContent?.name,
                        content: fileContent?.content,
                        path: fileContent?.path,
                      }}
                      htmlContent={htmlString}
                    />
                    <div id="container" />
                  </>
                ) : null
              ) : (
                <div className="one-commit-page__content__blanc__one-file">
                  <img className="one-commit-page__content__blanc__one-file__src" src={emptyFile} />
                  <p className="one-commit-page__content__blanc__one-file__message">
                    no file selected
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </MainContainer>
  )
}
