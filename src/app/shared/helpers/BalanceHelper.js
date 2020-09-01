export class BalanceHelper {
    // Transform 3221.51 in 3.221,51
    formatBalance(x) {
        if (!x) {
            return '-,-'
        }
        const formattedBalance = x
            .toString()
            .replace('.', ',')
            .replace(/\B(?=(\d{3})+(?!\d))/g, '.')
        if (formattedBalance.indexOf(',') === -1) {
            return formattedBalance.concat('.00')
        }
        return formattedBalance
    }
}
