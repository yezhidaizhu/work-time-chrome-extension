import { getCurDateTime } from "./helper";
import { getRecord, record, setStore } from "./store";

/**
 * 记录安装信息
 */
export function recordInstallMsg(){
  setStore({install:getCurDateTime()}); // 安装时间
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
    record({start: new Date()})
  }
}


/**
 * 刷新今天开始时间
 */
export function resetStart(){
  record({start:new Date()})
}
