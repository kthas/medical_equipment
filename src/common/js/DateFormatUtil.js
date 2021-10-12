import moment from 'moment';
export function formatDate(v, isUTC = true, dateFormat = 'YYYY-MM-DD HH:mm:ss'){
    if (v) {
      return isUTC ? moment.utc(v)
        .local()
        .format(dateFormat) : moment.utc(v)
        .format(dateFormat);
    }
  
    return '';
  }
export default{
  formatDate
}
