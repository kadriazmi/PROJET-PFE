import { Fragment, ReactElement } from 'react'

export default function GuestLayout({ children }: { children: ReactElement | ReactElement[] }) {
  return <Fragment>{children}</Fragment>
}
