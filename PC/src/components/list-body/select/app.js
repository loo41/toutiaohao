const {
  getPHPSESSID,
  login,
  selectClass,
  selectSeat,
  checkSeatNum,
  getSetInfo,
  getRoomInfo,
  ckeckSeat,
  SignOutSeat
} = require('./api')

class Run {
  constructor ({PHPSESSID = '', username = '', passwd = '', roomId = '', seatNum = '', page = 1, rows = 600}) {
    this.PHPSESSID = PHPSESSID,
    this.username = username,
    this.passwd = passwd,
    this.roomId = roomId,
    this.seatNum = seatNum
    this.page = page
    this.rows = rows
    this.init()
  }
  async init () {
    const {username, passwd, roomId, seatNum, page, rows} = this
    console.log(this.PHPSESSID = await getPHPSESSID())
    console.log(await login({username, passwd, PHPSESSID: this.PHPSESSID}))
    console.log(await selectClass({roomId, PHPSESSID: this.PHPSESSID}))
    console.log(await getRoomInfo({PHPSESSID: this.PHPSESSID}))
    console.log(await getSetInfo({PHPSESSID: this.PHPSESSID, page, rows}))
    console.log(await checkSeatNum({PHPSESSID}))
    console.log(await selectSeat({seatNum, PHPSESSID: this.PHPSESSID}))
    console.log(await ckeckSeat({PHPSESSID: this.PHPSESSID}))
    console.log(await SignOutSeat({PHPSESSID: this.PHPSESSID}))
  }
}

new Run({PHPSESSID: '', username: 20163765, passwd: 10250011, roomId: 4, seatNum: 014})