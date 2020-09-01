import moment from 'moment'

export class DateHelper {
    // You can use this method to choose the date format for endpoints
    formatDate(d) {
        return moment(d).format('DD/MM/YYYY')
    }
}
