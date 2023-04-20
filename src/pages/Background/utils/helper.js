import dayjs from "dayjs";

/**
 * 获取当前格式化后的时间
 */
export function getCurDateTime(date){
  return dayjs(date).format("YYYY/MM/DD HH:mm:ss")
}

/**
 * 返回存储 record 的key 时间格式 
 * @param {*} date 
 * @returns 
 */
export function recordDateFormatKey(date=new Date()){
  return dayjs(date).format("YYYY-MM-DD")
}
