import { getCurDateTime, recordDateFormatKey } from "./helper";

const RecordList_Key = "recordlist";
const UserSetting_Key = "userSetting";


// set
export function setStore(data) {
  chrome.storage.local.set(data)
};
export function getStore(key) {
  return chrome.storage.local.get(key)
};

export function clearStore() {
  chrome.storage.clearStore();
}


/**
 * 记录要记录的信息
 * key: 时间，格式为 2023-04-19，或者其它时间类型
 * start: "", // 开始时间
 * end: "", // 结束时间
 */
export async function record(data = {}, date = new Date()) {
  const dateStr = recordDateFormatKey(date);

  const newRecordData = {
    ...data,
    updated: getCurDateTime(),
  }
  const records = await getRecordList();

  const todayRecord = records[dateStr] || {};

  // 创建时间
  if (!todayRecord?.created) {
    Object.assign(todayRecord, { created: getCurDateTime() })
  }
  Object.assign(todayRecord,newRecordData)
  Object.assign(records, { [dateStr]: todayRecord})
  console.log("records",records);
  await setStore({ [RecordList_Key]: records });
}

/**
 * 获取指定日期下的记录
 */
export async function getRecord(date = new Date()) {
  const key = recordDateFormatKey(date);
  const records = await getRecordList();
  return records?.[key];
}

/**
 * 获取所有记录，数据结构
 * { 
 *    [timeline]:{
 *        start: "",
 *        end: "",
 *        duration: "", // 工作累计时长
 *        created: "", // 创建该数据时间
 *    }
 * }
 * 返回的是一个对象
 */
export async function getRecordList() {
  const _rds = await getStore([RecordList_Key]);
  return _rds?.[RecordList_Key] || {};
}

/**
 * 记录chrome 当天最早启动时间
 * 为工时开始
 */
export async function setTodayStartTime() {
  // 查看今天记录了没有
  const today = await getRecord();
  if (!today?.start) {
    // 记录
    record({ start: getCurDateTime() })
  }
}


/**
 * 目前不考虑跨天数，只考虑一天内的
 * @returns {
 *    workStart // 工作开始时间 date
 *    workEnd   // 结束时间 date
 *    workRestArr  // 休息时间，不计算在工作内的时间，可以有多个时间段   [[date,date],[date,date]]
 *    workLong // 工作时长
 * }
 */
export async function getUserSetting() {
  const _rds = await getStore([UserSetting_Key]);
  return _rds?.[UserSetting_Key] || {};
}

export async function setUserSetting(data = {}) {
  const newSetting = { ...data };

  const oldSetting = await getUserSetting();
  Object.assign(oldSetting, newSetting);

  return setStore({ [UserSetting_Key]: oldSetting });
}

