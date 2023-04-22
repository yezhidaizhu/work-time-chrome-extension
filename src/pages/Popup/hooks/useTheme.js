import { theme } from 'antd';
import  { useMemo } from 'react';
import { useAppState } from '../store';

const useTheme = () => {
  const {app,setAppState} = useAppState();

  const toogleDarkTheme = (isDark=true)=>{
    const _theme = isDark ? "dark" : "light";
    setAppState({theme:_theme})
  }

  const isDark = useMemo(()=>{
    return app.theme === "dark";
  },[app.theme])

  const algorithm = useMemo(()=>{
    return isDark ? theme.darkAlgorithm : theme.defaultAlgorithm;
  },[isDark])

  return {algorithm,isDark,toogleDarkTheme};
}

export default useTheme;
