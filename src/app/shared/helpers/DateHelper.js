import moment from 'moment'

export class DateHelper {
    // You can use this method to choose the date format for endpoints
    formatDate(d) {
        return moment(d).format('DD/MM/YYYY')
    }

    calculateSecondsLeftTo(round_limit, choose_card_limit, choose_winner_limit) {
        if (!round_limit || !choose_card_limit || !choose_winner_limit) {
            return {
                seconds_to_limit: "?", seconds_to_card_limit: '?', seconds_to_winner_limit: '?'
            }
        }
        const now = moment()
        const data = {
            seconds_to_limit: moment(round_limit).diff(now, 'seconds'),
            seconds_to_card_limit: moment(choose_card_limit).diff(now, 'seconds'),
            seconds_to_winner_limit: moment(choose_winner_limit).diff(now, 'seconds')
        }

        if (data.seconds_to_card_limit > 0) {
            data.seconds_to_winner_limit = moment(choose_winner_limit).diff(choose_card_limit, 'seconds')
        } else {
            data.seconds_to_card_limit = 0
        }

        if (data.seconds_to_winner_limit < 0) {
            data.seconds_to_winner_limit = 0
        }

        return data
    }
}
