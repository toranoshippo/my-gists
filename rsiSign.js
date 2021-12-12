/*
 * RSI値が30以下, 70以上になった時にサインを出す
*/
process.stdin.resume();
process.stdin.setEncoding('utf8');
const SYMBOL_LIST = ["EURUSD", "GBPUSD", "JJJJJJ", "kkkkkk", "iiiiii"]

let rsi_list = []

let symbol_size = 0
let rsi_prev    = 0
let rsi_now     = 0

const TOP_LINE    = 70
const BOTTOM_LINE = 30

const init = rsi => {

    symbol_size = SYMBOL_LIST.length    
    
    for (let i = 0; i < symbol_size; i++) rsi_list[i] = rsi[i]
}
const sign = (SYMBOL_LIST, rsiNow) => {
    for (let i = 0; i < symbol_size; i++) {
        rsi_prev    = rsi_list[i]
        rsi_list[i] = rsiNow[i]
        rsi_now     = rsiNow[i]
        
        
        console.log(rsi_prev + ' : ' + rsi_now)
        
        if (rsi_prev != rsi_now) {
            // ↗︎下から70にタッチ
            if (rsi_prev < TOP_LINE && rsi_now >= TOP_LINE) {
                // TODO: push通知
                console.log(SYMBOL_LIST[i] + '下から70にタッチ：上げ')
            }
            // ↘︎ 上から70にタッチ
            else if (rsi_prev >= TOP_LINE && rsi_now <= TOP_LINE) {
                // TODO: push通知
                console.log(SYMBOL_LIST[i] + '上から70にタッチ：下げ')
            }
            // ↘︎ 上から30にタッチ
            else if (rsi_prev >= BOTTOM_LINE && rsi_now <= BOTTOM_LINE) {
                // TODO: push通知
                console.log(SYMBOL_LIST[i] + '上から30にタッチ：下げ')
            }
            // ↘︎ 上から30にタッチ
            else if (rsi_prev < BOTTOM_LINE && rsi_now >= BOTTOM_LINE) {
                // TODO: push通知
                console.log(SYMBOL_LIST[i] + '上から30にタッチ：上げ')
            }
        }
    }
}


function main() {
    let rsi = [60, 70, 80, 40, 20]
    init(rsi)

    rsi     = [70, 80, 60, 30, 40]
    sign(SYMBOL_LIST, rsi)
    console.log('-------')
    
    rsi     = [70, 69, 60, 40, 30]
    sign(SYMBOL_LIST, rsi)
    console.log('-------') 
    
    rsi     = [70, 69, 70, 30, 40]
    sign(SYMBOL_LIST, rsi)
    console.log('-------')
}

main()
