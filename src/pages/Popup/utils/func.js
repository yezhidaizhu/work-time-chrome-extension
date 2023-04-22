import dayjs from "dayjs";
import { getCurDateTime } from "./helper";
import { getRecord, getUserSetting, record, setStore } from "./store";
import isBeteween from 'dayjs/plugin/isBetween';
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);
dayjs.extend(isBeteween);
const formatTimeStr = "HH:mm:ss"
const df = dateStr =>dayjs(dateStr,formatTimeStr);
const dff = dateStr =>dayjs(dateStr,formatTimeStr).format(formatTimeStr);

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
    record({start: dayjs().format(formatTimeStr)})
  }
}


/**
 * 刷新今天开始时间
 */
export function resetStart(){
  record({start:new Date()})
}

/**
 * 记录今天累计工作时间
 * 规则：从工作开始时间计算起，到给定时间
 */
export async function recordTodayWorkDuration(){
  const todayRecord = await getRecord();
  const setting = await getUserSetting();

  const startTime = todayRecord?.start;
  console.log(todayRecord);
  if(!startTime){
    return;
  }

  const long = calcDurationTime({
    startTime: startTime,
    restTimeArr: setting?.workRestArr,
  });

  record({
    duration: long || 0,
  })
}


/**
 * 暴力计算下班时间，一分钟一分钟的加
 */
export function calcLeaveTime({
  workLong=0, // 上班需要多长，单位为分钟
  startTime="", // 上班时间
  restTimeArr=[] // 中间需要休息的时间段，休息时间段可以有多个 [[],[]]
}){
  let step = -1; // 步骤
  let long = 0; // 记录有效时长
  let curTime = dayjs(startTime).subtract(1,"minutes");
  
  while(long < workLong){
    step++;
    curTime = curTime.add(1,"minutes");

    // 当前计算的时间是否在休息的时间内
    if(timeIsInRest({curTime,restTimeArr})){
      continue;
    }
    long++;
  }

  return dayjs(startTime).add(step,"minutes");
}

/**
 * 计算给定的时间是否在休息时间段内
 */
export function timeIsInRest({
  curTime="",
  restTimeArr=[]
}){
  for (let i = 0; i < restTimeArr?.length; i++) {
    const curRestArr = restTimeArr[i]; // 当前时间段
    
    if(dff(curTime)===dff(curRestArr[0])){
      return true;
    }
    if(dff(curTime)===dff(curRestArr[1])){
      return true;
    }

    if(df(curTime).isBetween(df(curRestArr[0]),df(curRestArr[1]),'[]')){
      return true;
    }
  }

  return false;
}

/**
 * 计算累计工作时间
 */
function calcDurationTime({
  startTime="",
  curTime=dayjs(),
  restTimeArr=[], // 休息时间段
}){
  let long = 0;// 有效时间
  const _curTime = df(curTime);
  let _startTime = df(startTime);
  while(!_startTime.isAfter(_curTime)){
    // 防止死循环
    if(long>1440){
      console.error("max 死循环了",_curTime,_startTime);
      return 0;
    }
    if(timeIsInRest({_startTime,restTimeArr})){
      console.log(true);
      _startTime = _startTime.add(1,"minutes");
      continue;
    }
    _startTime = _startTime.add(1,"minutes");
    long++;
  }
  return long;
}

