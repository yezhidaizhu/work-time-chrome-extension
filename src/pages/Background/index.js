import { recordInstallMsg, setTodayStartTime } from "../Popup/utils/func";

// chrome 启动时
chrome.runtime.onStartup.addListener(()=>{
  setTodayStartTime()
  console.log("onStartup",new Date().toLocaleTimeString());
})

// chrome 安装时
chrome.runtime.onInstalled.addListener(()=>{
  recordInstallMsg()
  console.log("onInstalled",new Date().toLocaleTimeString());
})






