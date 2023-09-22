const DAYS_OF_WEEK = {
  MONDAY: 1,
  TUESDAY: 2,
  WEDNESDAY: 3,
  THURSDAY: 4,
  FRIDAY: 5,
  SATURDAY: 6,
  SUNDAY: 0
}
const START_PARTY_HOUR = 17;

export interface IIsPartyTime {
  is: boolean,
  left: number
}
export class DateUtils {

  static isWeekend(date: Date) {
    return date.getDay() == 6 || date.getDay() == 0
  }

  static isPartyTime(date: Date): IIsPartyTime {
    if (this.isWeekend(date)) return { is: true, left: this.getTimeUntilFriday(date) };

    if (date.getDay() === DAYS_OF_WEEK.FRIDAY) {
      if (date.getHours() >= START_PARTY_HOUR) return { is: true, left: this.getTimeUntilFriday(date) };
    }
    return { is: false, left: this.getTimeUntilFriday(date) };
  }

  static getTimeUntilFriday(currentDate: Date) {
    const nextFriday = this.getNextFriday(currentDate)
    return nextFriday.getTime() - currentDate.getTime();
  }

  static getTimeUntilMonday(currentDate: Date) {
    const nextMonday = this.getNextMonday(currentDate)
    return nextMonday.getTime() - currentDate.getTime();
  }

  static getNextFriday(currentDate: Date) {
    var resultDate = new Date(currentDate.getTime());
    resultDate.setDate(resultDate.getDate() + ((7 - resultDate.getDay() + DAYS_OF_WEEK.FRIDAY) % 7 || 7))
    resultDate.setHours(START_PARTY_HOUR);
    resultDate.setMinutes(0);
    resultDate.setSeconds(0);
    return resultDate;
  }

  static getNextMonday(currentDate: Date) {
    var resultDate = new Date(currentDate.getTime());
    resultDate.setDate(resultDate.getDate() + ((7 - resultDate.getDay() + DAYS_OF_WEEK.MONDAY) % 7 || 7))
    resultDate.setHours(START_PARTY_HOUR);
    resultDate.setMinutes(0);
    resultDate.setSeconds(0);
    return resultDate;
  }

  static formatTimeLeft(time: number) {
    const date = new Date(time);
    return `${date.getHours()} : ${date.getMinutes()} : ${date.getSeconds()}`
  }
}
