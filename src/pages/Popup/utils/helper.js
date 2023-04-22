import dayjs from "dayjs";

/**
 * 获取当前格式化后的时间
 */
export function getCurDateTime(date){
  return dayjs(date).format("HH:mm:ss")
}

/**
 * 返回存储 record 的key 时间格式 
 * @param {*} date 
 * @returns 
 */
export function recordDateFormatKey(date=new Date()){
  return dayjs(date).format("YYYY-MM-DD")
}

/**
 * 根据分钟数，返回xx小时xx分钟
 * @param {*} minutes 
 * @returns 
 */
export function convertMinutesToHoursAndMinutes(minutes=0) {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  if (hours === 0 && remainingMinutes === 0) {
    return "0分钟";
  } else if (hours === 0) {
    return `${remainingMinutes}分钟`;
  } else if (remainingMinutes === 0) {
    return `${hours}小时`;
  } else {
    return `${hours}小时${remainingMinutes}分钟`;
  }
}