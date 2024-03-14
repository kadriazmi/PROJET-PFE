import { Tooltip } from 'antd'
import { Fragment, ReactElement } from 'react'

interface IAvatar {
  pic_url: string
  includeToolTip?: {
    color?: string
    title: string
  }
  bordered?: boolean
}
export default function Avatar({ pic_url, includeToolTip, bordered }: IAvatar) {
  const Wrapper = ({ children }: { children: ReactElement }) => (
    <div className={`avatar ${bordered ? 'avatar--bordred' : ''}`}>
      {includeToolTip ? (
        <Tooltip title={includeToolTip?.title} color={includeToolTip?.color || 'gold'}>
          {children}
        </Tooltip>
      ) : (
        <Fragment>{children}</Fragment>
      )}
    </div>
  )
  return (
    <Wrapper>
      <img className="avatar--src" src={pic_url} alt="" />
    </Wrapper>
  )
}
