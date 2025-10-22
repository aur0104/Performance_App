// useBackHandler.ts
import {useEffect} from 'react';
import {BackHandler} from 'react-native';

export function useBackHandler(handler: () => boolean) {
  useEffect(() => {
    const backAction = () => {
      return handler(); // must return true to prevent default back action
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [handler]);
}
