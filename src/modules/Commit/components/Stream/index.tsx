import { useState, useEffect } from 'react'
import Lottie from 'react-lottie'
import HilightCode from '../Hilights'
import llamaAvatar from '../../assets/images/chat_avatar.png'
//@ts-ignore
import typingAnimation from '../../../shared/assets/animations/typing.json'
interface IStreamComponent {
  code: string
  file: any
}
const StreamComponent = ({ code }: IStreamComponent) => {
  const [lines, setLines] = useState<string>('')
  const [codeLines, setCodeLines] = useState('')
  const [textLines, setTextLines] = useState('')
  const [language, setLanguage] = useState('')
  const message = ` ${code} `

  const API_KEY = import.meta.env.VITE_APP_BOOT_KEY
  useEffect(() => {
    async function startChat() {
      const messages = [
        {
          role: 'system',
          content:
            'You are ChatGPT, a language model trained to provide code review and feedback. Your task is to process the provided code snippet, identify the issues, and add descriptions to explain each one. Additionally, suggest how to solve each issue.return all codes in one block , always  start with code block and return a text obligatory and do not include text inside code block , specify if the code is a jsx / tsx or ts / js',
        },
        {
          role: 'user',
          content: message,
        },
      ]
      try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${API_KEY}`,
          },
          body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: messages,
            stream: true,
            stop: ['\n\n\n\n'],
          }),
        })
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const reader = response?.body?.getReader()
        let jsonBuffer = ''
        while (true) {
          const { done, value } = (await reader?.read()) || {}
          if (done) {
            break
          }
          const chunk = new TextDecoder().decode(value)
          jsonBuffer += chunk

          const jsonObjects = jsonBuffer.split('data:')
          jsonBuffer = jsonObjects.pop() as string
          jsonObjects.forEach((jsonObject) => {
            try {
              const jsonData = JSON.parse(jsonObject)
              if (jsonData && jsonData.choices && jsonData.choices.length > 0) {
                const content = jsonData.choices[0].delta.content || ''
                setLines((prev: string) => prev + content!)
              }
            } catch (error) {
              console.error('Error parsing JSON:', error)
            }
          })
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    startChat()
    return () => {}
  }, [])

  useEffect(() => {
    const processLines = (lines: string) => {
      const linesCodeStart = lines.indexOf('```')
      const linesCodeEnd = lines.lastIndexOf('```')

      if (linesCodeStart !== -1 && linesCodeStart === linesCodeEnd) {
        const codeBlock = lines.slice(linesCodeStart + 3)
        const languageEndIndex = codeBlock.indexOf('\n')
        if (languageEndIndex !== -1) {
          const language = codeBlock.slice(0, languageEndIndex)
          setLanguage(language)
          setCodeLines(codeBlock.slice(languageEndIndex + 1))
        }
      } else if (linesCodeStart !== -1 && linesCodeStart !== linesCodeEnd) {
        const codeBlock = lines.slice(linesCodeStart + 3, linesCodeEnd)
        const textBlock = lines.slice(linesCodeEnd + 3)
        const languageEndIndex = codeBlock.indexOf('\n')
        if (languageEndIndex !== -1) {
          const language = codeBlock.slice(0, languageEndIndex)
          setLanguage(language)
          setCodeLines(codeBlock.slice(languageEndIndex + 1))
          setTextLines(textBlock)
        }
      }
    }
    processLines(lines)
  }, [lines])

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
            <p className="stream-wrapper__text__name">Llama-2 ai assistant</p>
          </div>
          {codeLines && <HilightCode readyToUse={codeLines} language={language! || 'jsx'} />}
          <p className="stream-wrapper__text__content">{textLines}</p>
          {!lines && (
            <Lottie options={defaultOptions} height={25} width={50} style={{margin : 0 }}/>
          )}
        </div>
      </div>
    </div>
  )
}

export default StreamComponent
