import { atom, useRecoilState } from 'recoil';

const appState = atom({
  key: 'appState', // unique ID (with respect to other atoms/selectors)
  default: {
    theme: "light"
  }, // default value (aka initial value)
});


export function useAppState(){
  const [app, setApp] = useRecoilState(appState);

  const setAppState = (payload={})=>{
    setApp({
      ...app,
      ...payload
    })
  }

  return {app, setAppState}
}
