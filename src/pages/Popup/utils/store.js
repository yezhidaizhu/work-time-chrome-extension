import { getCurDateTime, recordDateFormatKey } from "./helper";

const RecordList_Key = "recordlist";

// set
export function setStore(data){
  chrome.storage.local.set(data)
};
export function getStore(key){
  return chrome.storage.local.get(key)
};

export function clearStore(){
  chrome.storage.clearStore();
}


/**
 * 记录要记录的信息
 * key: 时间，格式为 2023-04-19，或者其它时间类型
 */
export async function record(data={
  start:"", // 开始时间
  end:"", // 结束时间
},date=new Date()){
  const dateStr = recordDateFormatKey(date);

  const recordData = {
    start: data?.start ? getCurDateTime(data?.start) : "" ,
    end: data?.end ? getCurDateTime(data?.end) : "" ,
    updated: getCurDateTime(),
  }
  const records = await getRecordList();
  // 创建时间
  if(!records[dateStr]?.created){
    Object.assign(recordData,{created:getCurDateTime()})
  }
  Object.assign(records,{[dateStr]: recordData})
  await setStore({[RecordList_Key]:records});
}

/**
 * 获取指定日期下的记录
 */
export async function getRecord(date=new Date()){
  const key = recordDateFormatKey(date);
  const records =await getRecordList();
  return records?.[key];
}

/**
 * 获取所有记录，数据结构
 * { 
 *    [timeline]:{
 *        start: "",
 *        end: "",
 *        created: "", // 创建该数据时间
 *    }
 * }
 * 返回的是一个对象
 */
export async function getRecordList(){
  const _rds = await getStore([RecordList_Key]);
  return _rds?.[RecordList_Key] || {};
}

/**
 * 记录chrome 当天最早启动时间
 * 为工时开始
 */
export async function setTodayStartTime(){
  // 查看今天记录了没有
  const today =await getRecord();
  if(!today?.start){
    // 记录
    record({start: getCurDateTime()})
  }
}




