import * as dayjs from 'dayjs'
import acceptedIcon from '../../shared/assets/images/verifie.png'
import rejectedIcon from '../../shared/assets/images/rejected.png'
import { IPullRequest } from '../features/PullRequests'
import Avatar from '@src/modules/shared/components/Avatar/Avatar'
import MergeIcon from '@src/modules/shared/assets/icons/merge'

export default function OnePullRequest({ pull }: { pull: IPullRequest }) {
  return (
    <div className="pull-request__header">
      <div className="pull-request__header__primary">
        <p className="pull-request__header__primary__title">
          {`Merge branch ${pull?.base.ref} into
        ${pull?.head.ref}`}{' '}
          <MergeIcon />
        </p>
        <p className="pull-request__header__primary__date">
          Created At : {dayjs(pull?.created_at).format('YYYY-MM-DD HH:MM')}
        </p>
      </div>
      <div className="pull-request__header__info">
        <div className="pull-request__header__info__up">
          <div className="pull-request__header__info__image">
            <Avatar
              pic_url={pull.user.avatar_url}
              includeToolTip={{ title: `Created by  ${pull?.user?.login}` }}
              bordered
            />
          </div>
          <div className="pull-request__header__info__status">
            <p
              className={`pull-request__header__info__status__text ${
                pull.locked ? 'status--close' : 'status--open'
              }`}
            >
              {pull.locked ? 'Close' : 'Open'}
            </p>
            <img
              className="pull-request__header__info__status__icon"
              src={pull.locked ? rejectedIcon : acceptedIcon}
            />
          </div>
        </div>
        <p className="pull-request__header__info__date">
          Updated at : {dayjs(pull?.updated_at).format('YYYY-MM-DD HH:MM')}
        </p>
      </div>
    </div>
  )
}
