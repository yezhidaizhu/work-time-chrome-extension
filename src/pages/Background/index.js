import {
  recordInstallMsg,
  recordTodayWorkDuration,
  setTodayStartTime,
} from '../Popup/utils/func';

const CalcWorkDurationTime = 'CalcWorkDurationTime'; // 累计工作时长

// chrome 启动时
chrome.runtime.onStartup.addListener(() => {
  setTodayStartTime();
  setTimeout(() => {
    recordTodayWorkDuration();
  }, 200);
  console.log('onStartup', new Date().toLocaleTimeString());
});

// chrome 安装时
chrome.runtime.onInstalled.addListener(() => {
  recordInstallMsg();
  setTodayStartTime();

  setTimeout(() => {
    recordTodayWorkDuration();
  }, 200);
  console.log('onInstalled', new Date().toLocaleTimeString());
});

chrome.alarms.clearAll();

setTimeout(() => {
  chrome.alarms.create(CalcWorkDurationTime, { periodInMinutes: 1 });

  chrome.alarms.onAlarm.addListener((alarms) => {
    if (alarms.name === CalcWorkDurationTime) {
      recordTodayWorkDuration();
    }
  });
});
