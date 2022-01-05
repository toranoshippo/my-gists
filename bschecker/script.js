const ERR_MSG = '未入力項目または不正な文字入力があります'
const LINE    = '======================='

const ITEM_LIST = [
  'period'                             // 第何期
  , 'current_assets'                   // 流動資産
  , 'fixed_asset'                      // 固定資産
  , 'total_assets'                     // 資産合計(流動資産 + 固定資産)
  , 'current_liabilities'              // 流動負債
  , 'shareholders_equity'              // 株主資本
  , 'capital'                          // 資本金
  , 'capital_surplus'                  // 資本余剰金
  , 'capital_reserve'                  // 資本準備金
  , 'retained_earnings'                // 利益剰余金
  , 'other_retained_earnings'          // その他利益余剰金
  , 'net_income'                       // (うち当期純利益)
  , 'total_net_assets_and_liabilities' // 純資産及び負債の合計()
]

const ITEM_HASH = {
  '資産の部': [
    '流動資産'
    , '固定資産'
    , '合計'
  ]
  , '負債及び純資産の部': [
    '流動負債'
    , '株主資本'
    , '資本金'
    , '資本余剰金'
    , '資本準備金'
    , '利益剰余金'
    , 'その他利益余剰金'
    , '(うち当期純利益)'
    , '合計'
  ]
}

const ASSETS_KEY = Object.keys(ITEM_HASH)[0]
const LIABILITIES＿NETASSETS＿KEY = Object.keys(ITEM_HASH)[1]

const FIRLD_LIST = [
  '科目'
  , '科目'
  , '金額(千円)'
]

let result
window.onload = () => {
  result = `<form name="form" action="main.html">`
  result += `<h1 id="${ITEM_LIST[0]}">第<input type="text" size="1" name="${ITEM_LIST[0]}">期決算公告</h1>`
  result += `<table border="1" width="450" ><tr>`
  FIRLD_LIST.forEach(element => result += `<th>${element}</th>`)
  result += `</tr>`

  let i = 1
  for (const KEY in ITEM_HASH) {
    if (KEY === ASSETS_KEY) {
      appendTableElement(KEY, i)
      i += KEY.length -1
    } else if (KEY === LIABILITIES＿NETASSETS＿KEY) {
      appendTableElement(KEY, i)
    }
  }
  result += `</table><input type="button" value="判定する" onclick="btnClick()"></form>`

  document.getElementById('render').innerHTML = result
}

const btnClick = () => {
  let value_list = [
    form.period.value                    // 第何期
    , form.current_assets.value          // 流動資産
    , form.fixed_asset.value             // 固定資産
    , form.current_liabilities.value     // 流動負債
    , form.shareholders_equity.value     // 株主資本
    , form.capital.value                 // 資本金
    , form.capital_surplus.value         // 資本余剰金
    , form.capital_reserve.value         // 資本準備金
    , form.retained_earnings.value       // 利益剰余金
    , form.other_retained_earnings.value // その他利益余剰金
    , form.net_income.value              // (うち当期純利益)
  ]

  value_list = value_list.map(element => {
    if (element.match(/[０-９]/)) {
      element = replaceCharCode(element)
    }
    return parseInt(element)
  })

  //'資産の部'の合計を追加
  value_list.splice(3,0,value_list[1] + value_list[2])

  // '負債及び純資産の部'の合計を追加
  value_list.push(value_list.reduce((sum, element, index) => {
    if (index > 3) sum += element
    return sum
  }, 0))

  let blank_flag = true
  let financial_results
  for (let index = 0; index < value_list.length; index++) {
    if (isNaN(value_list[index])) {
      blank_flag = false
      alert(ERR_MSG)
      break
    }
    if (index === 0) financial_results = `第${value_list[index]}期決算公告`
  }

  if (blank_flag) {

    document.getElementById(ITEM_LIST[0]).innerHTML = financial_results

    /* 売上高 = 「総資産 × １倍」 */
    const AMOUNT_OF_SALES = (value_list[1] + value_list[2]) * 1
    /* 「過去の平均的な年間利益」=「（利益剰余金 − 当期純利益）÷（当期の期数 −１）」 */
    const KEYAVG_ANNUAL_PROFIT_IN_THE_PAST = (value_list[9] - value_list[11]) / (value_list[0] - 1)
    /* 流動比率 = 流動資産 ÷ 流動負債 */
    const CURRENT_RATIO = Math.floor((value_list[1] / value_list[4]) * 100)

    const parseIntCalc = num => parseInt((AMOUNT_OF_SALES / 12 * num), 10)
    /* 現金・預金 ＝ 売上高 ÷ 12ヶ月 × 1.5ヶ月 */
    const CASH_AND_DEPOSIT    = parseIntCalc(1.5)
    /* 売掛金 ＝ 売上高 ÷ 12ヶ月 × ２ヶ月 */
    const ACCOUNTS_RECEIVABLE = parseIntCalc(2)
    /* 棚卸資産 ＝ 売上高 ÷ 12ヶ月 × １ヶ月 */
    const INVENTORY           = parseIntCalc(1)

    const result_list = [
      `売上高:${AMOUNT_OF_SALES}`
      , `過去の平均的な年間利益:${KEYAVG_ANNUAL_PROFIT_IN_THE_PAST}`
      , `流動比率:${CURRENT_RATIO}`
      , `現金・預金:${CASH_AND_DEPOSIT}`
      , `売掛金:${ACCOUNTS_RECEIVABLE}`
      , `棚卸資産:${INVENTORY}`
    ]

    result_list.push(LINE,'「過去の平均利益」')
    if (KEYAVG_ANNUAL_PROFIT_IN_THE_PAST < value_list.length - 2) {
      result_list.push('-> <font class="color">当期は不調気味？</font>')
    } else if ((value_list.length - 2 / value_list.length - 1) * 100 < 1){
      result_list.push('-> 「粉飾決算の可能性」もアタマに入れておくとよいでしょう。')
    } else {
      result_list.push('-> おおむね問題なし')
    }

    /* 流動比率は200%以上が望ましく、100%未満はマズイ */
    result_list.push(LINE,'「流動比率」')
    if (CURRENT_RATIO >= 200) {
      result_list.push('-> Good')
    } else if (CURRENT_RATIO < 100) {
      result_list.push('-> <font class="color">Bad</font>')
    } else {
      result_list.push('-> おおむね問題なし')
    }

    result_list.push(LINE,'「ヤバイ会社かどうか」')
    if ((CASH_AND_DEPOSIT + ACCOUNTS_RECEIVABLE + INVENTORY) < value_list[2]) {
      result_list.push('-> <font class="color">流動資産のなかに架空資産や不良資産が混じっている可能性あり</font>')
    } else {
      result_list.push('-> おおむね問題なし')
    }

    let html = `<div><ul type="disc">`
    result_list.forEach(element => html += `<p>${element}</p>`)
    html += `</ul></div>`
    document.getElementById('result').innerHTML = html
  }
}

// 全角→半角に変換する
const replaceCharCode = element => {
  return element.replace(/[０-９]/g, s => {
    return String.fromCharCode(s.charCodeAt(0)-0xFEE0)
  })
}

const appendTableElement = (KEY, i) => {
  ITEM_HASH[KEY].forEach((element, index) => {
    if (index === 0) {
      result += `<tr><td rowspan="${ITEM_HASH[KEY].length}"><b>${KEY}</b></td>`
    }
    result += `<td>${element}</td>`
    result += `<td id="${ITEM_LIST[i]}"width="100">`
    if (KEY === ASSETS_KEY){
      if (i !== KEY.length -1){
        result += `<input type="text" name="${ITEM_LIST[i]}">`
      }
    } else if (KEY === LIABILITIES＿NETASSETS＿KEY){
      if (i !== ITEM_HASH[ASSETS_KEY].length + ITEM_HASH[LIABILITIES＿NETASSETS＿KEY].length){
        result += `<input type="text" name="${ITEM_LIST[i]}">`
      }
    }
    result += `</td></tr>`
    i++
  })
}
