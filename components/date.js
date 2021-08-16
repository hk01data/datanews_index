import { parseISO, format } from 'date-fns'

export default function ADate({ dateString }) {
  // let dateString = '2021-07-15 15:09:08.065416+00'
  let newDateString = dateString.replace('T', ' ').replace('Z', '').replace('z', '') + '00+00'
  const date = parseISO(newDateString)
  return <time dateTime={newDateString}>{format(date, 'LLLL d, yyyy')}</time>
}
