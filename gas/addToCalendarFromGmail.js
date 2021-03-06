//https://masa-enjoy.com/gas-dateobject-timezone
// 時間設定するときに時間がずれるから上見て対応

const MAIL_ADDRESS = 'taigamiura22@gmail.com'

function registCalenderEvent() {
  const myCalendar = CalendarApp.getCalendarById(MAIL_ADDRESS)

  const gii = getImportantIndicator()
  for (let i = 0; i < gii.length; i++) {
    const {
      title
      , startDate
      , endDate
      , description
    } = getEventData(gii, i)

    Logger.log(title, startDate, endDate, {description})
    myCalendar.createEvent(title, startDate, endDate, {description})
  }
}

const getEventData = (gii, firstIndex) => {
  const data = gii[firstIndex]
  const t = data[0].split(/:/)

  const now = new Date()
  const startDate = new Date(
    now.getFullYear()  + '/' +
    (now.getMonth()+1) + '/' +
    now.getDate()      + ' ' +
    t[0] + ':' + t[1]
  )
  return {
    "title"        : data[1]
    , "startDate"  : startDate
    , "endDate"    : startDate
    , "description": data[2] + '\n' + data[3] + '\n' + data[4]
  }
}

// メール本文から重要度Lv1(☆)以上をピックアップ
const getImportantIndicator = () => {
  // 重要度Lv1以上をピックアップ
  const list = (body => {
    let data = []
    for (let i = 0; i < body.length; i++){
      if (body[i].indexOf('☆') !== -1) {
        let row = []
        for (var j = 4; j >= 0; j--) {
          row.push(body[i - j])
        }
        data.push(row)
      }
    }
    return data
  })(getGmail())

  // 指定した国のみ抽出
  return list.filter(v => {
    if (
      v[1].indexOf('日本') !== -1
      // || v[1].indexOf('ユーロ') !== -1
      || v[1].indexOf('アメリカ') !== -1
      // || v[1].indexOf('イギリス') !== -1
    ) {
      return true
    }
  })
}

const getGmail = () => {
  const now = new Date()
  now.setDate(now.getDate() - 1)
  yesterday = now.getFullYear() + '/' + (now.getMonth()+1)  + '/'+ now.getDate()
  const mailSubject = 'subject:本日の経済指標予定【マネーパートナーズ】'
  const yyyymmdd = now.getFullYear() + '/' + (now.getMonth()+1)  + '/'+ now.getDate()
  const query = mailSubject + ' after:' + yyyymmdd
  const threads = GmailApp.search(query, 0, 1)
  const messagesForThreads = GmailApp.getMessagesForThreads(threads)
  return messagesForThreads[0][0].getPlainBody().split(/\r\n|\n/)
}

function setTrigger() {
  const setTime = new Date();
  const dayOfWeek = setTime.getDay()
  // 平日7:35
  if (dayOfWeek !== 0 || dayOfWeek !== 6) {
    setTime.setHours(7);
    setTime.setMinutes(35); 
    ScriptApp.newTrigger('registCalenderEvent').timeBased().at(setTime).create()
  }
}
