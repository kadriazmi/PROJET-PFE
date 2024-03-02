import ReviewButton from '@src/modules/shared/components/Buttons/Review'
import { Modal } from 'antd'
import { Highlight, themes } from 'prism-react-renderer'
import { useState } from 'react'
import emptyFileIcon from '../../../shared/assets/icons/svgs/no-data.svg'
import FileExtensionIcon from '../FileExtensionIcon'
import HilightCode from '../Hilights'
import StreamComponent from '../Stream'
interface IFile {
  file: {
    content: string
    name: string
    path: string
  }
}
export default function Editor({ file }: IFile) {
  const [isModalOpen, setModalState] = useState(false)
  return (
    <div className="editor">
      {file.content ? (
        <>
          <HilightCode file={file}  addLinesNumbers/>
          <ReviewButton title={'Review changes'} onClick={() => setModalState(true)} />
        </>
      ) : (
        <div className="one-commit-page__content__blanc__one-file">
          <img className="one-commit-page__content__blanc__one-file__src" src={emptyFileIcon} />
          <p className="one-commit-page__content__blanc__one-file__message">empty file</p>
        </div>
      )}
      <Modal
        title={'Code Review'}
        open={isModalOpen}
        className="editor__modal"
        onCancel={() => setModalState(false)}
      >
        <StreamComponent code={atob(file?.content)} file={file} />
      </Modal>
    </div>
  )
}
