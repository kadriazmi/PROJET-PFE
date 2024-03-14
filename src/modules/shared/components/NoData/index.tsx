import noDataIcon from '../../assets/images/ghost-costume.png'
export default function NoData({ title = 'no data found' }: { title: string }) {
  return (
    <div className="no-data">
      <img className="no-data__image" src={noDataIcon} alt="no data" />
      <p className="no-data__title">{title}</p>
    </div>
  )
}
