import Lottie from 'react-lottie'
// @ts-ignore
import typingAnimation from '../shared/assets/animations/typing.json'
import HilightCode from '../shared/components/Hilights'
import UseBootStream from '../shared/components/Boot'
import llamaAvatar from '../shared/assets/images/chat_avatar.png'
const StreamComponent = ({ prompt }: { prompt?: string }) => {
  const { codeLines, language, textLines, lines } = UseBootStream(prompt!)

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: typingAnimation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  }

  return (
    <div className="stream-wrapper">
      <div className="editor">
        <div className="stream-wrapper__text">
          <div className="stream-wrapper__text__user">
            <img src={llamaAvatar} className="stream-wrapper__text__avatar" />
            <p className="stream-wrapper__text__name">Open ai assistant</p>
          </div>
          {codeLines && (
            <HilightCode readyToUse={codeLines} language={language! || 'jsx'} addLinesNumbers />
          )}
          <p className="stream-wrapper__text__content">{textLines}</p>
          {!lines && (
            <Lottie options={defaultOptions} height={25} width={50} style={{ margin: 0 }} />
          )}
        </div>
      </div>
    </div>
  )
}

export default StreamComponent
