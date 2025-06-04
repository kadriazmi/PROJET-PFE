import useBootStream from '../shared/components/Boot/index'
import HilightCode from '../shared/components/Hilights/index'

interface StreamComponentProps {
  code: string
  filename?: string
}

const StreamComponent: React.FC<StreamComponentProps> = ({ code, filename }) => {
  const { codeLines, textLines, language, lines } = useBootStream(code)

  return (
    <div>
      <HilightCode addLineNumbers readyToUse={codeLines} language={language} />
    </div>
  )
}

export default StreamComponent
