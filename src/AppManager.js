import React, {useEffect, useRef, useState} from 'react';
import {Linking} from 'react-native';

import Storage from './Storage';
import EventManager from './EventsManager';

import appsFlyer from 'react-native-appsflyer';
import ReactNativeIdfaAaid from '@sparkfabrik/react-native-idfa-aaid';
import AppleAdsAttributionInstance from '@vladikstyle/react-native-apple-ads-attribution';
import {requestTrackingPermission} from 'react-native-tracking-transparency';
import {OneSignal} from 'react-native-onesignal';
import * as Device from 'react-native-device-info';
import Params from './Params';

import AppManagerStack from './AppManagerStack';
import LoaderRoot from './LoaderRoot';
import {NavigationContainer} from '@react-navigation/native';
import {Main} from './components/Main/main-screen';
import {AddFishMain} from './components/AddFish/add-fish-main';
import {ScreenOneAddPlaces} from './components/PlacesPage/screens/screen-one-add-places';
import {FishScreen} from './components/FishScreen/fish-screen';
import {ScreenOneAddRecipes} from './components/FishPage/RecipesFromMyFishes/screens-add-recipes/screen-one-add-recipes';
import {DetailsFollowed} from './components/FishPage/MostFollowed/details-followed';
import {EditProfile} from './components/Profile/edit-profile';
import {DetailsFish} from './components/AddFish/screens/screen-three-componets/DetailFish/details-fish-screen';
import {UserProvider} from './user/Provider/UserProvider';
import {createStackNavigator} from '@react-navigation/stack';

function GameRoot() {
  const Stack = createStackNavigator();
  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Main" component={Main} />
          <Stack.Screen name="AddFish" component={AddFishMain} />
          <Stack.Screen name="AddPlaces" component={ScreenOneAddPlaces} />
          <Stack.Screen name="Fish" component={FishScreen} />
          <Stack.Screen name="AddRecipes" component={ScreenOneAddRecipes} />
          <Stack.Screen name="DetailsFollowed" component={DetailsFollowed} />
          <Stack.Screen name="EditProfile" component={EditProfile} />
          <Stack.Screen name="FishDetails" component={DetailsFish} />
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
}

export default function AppManager() {
  const viewLoader = <LoaderRoot />;
  const viewGame = <GameRoot />;
  const appManagerStack = link => <AppManagerStack dataLoad={link} />;

  const [isLoadingScreen, setLoadingScreen] = useState(true);
  const [isGameOpen, setGameOpen] = useState(true);

  const userID = useRef(null);
  const adID = useRef('00000000-0000-0000-0000-000000000000');
  const appsID = useRef(null);
  const subsRef = useRef(null);
  const onesignalID = useRef(null);
  const deviceID = useRef(null);
  const isPushAccess = useRef(false);
  const dataLoad = useRef(null);

  // генеруємо унікальний ID користувача
  async function getUserID() {
    const val = await Storage.get('userID');
    if (val) {
      userID.current = val; // додаємо збережений userID
    } else {
      // генеруємо новий userID якщо нема збереженого
      let result = '';
      for (let i = 0; i < 7; i++) {
        result += Math.floor(Math.random() * 10);
      }
      await Storage.save('userID', result); // зберігаємо userID
      userID.current = result;
    }
  }

  // робимо запит на відстеження
  async function getAdID() {
    await requestTrackingPermission(); // робимо запит на відстеження
    ReactNativeIdfaAaid.getAdvertisingInfoAndCheckAuthorization(true).then(
      // обробляємо клік в алерт
      res => {
        if (res) {
          adID.current = res.id;
        } // отримуємо advertising id
        initAppManager();
      },
    );
  }

  // перевірка на відкриття webview
  async function checkInitAppManagerView() {
    EventManager.sendEvent(EventManager.eventList.firstOpen);
    if ((await fetch(Params.bodyLin)).status === 200) {
      await initOnesignal();
    } else {
      loadGame();
    } // якщо це не коректне гео запускаємо гру
  }

  // ініціалізація OneSignal
  async function initOnesignal() {
    await OneSignal.Notifications.canRequestPermission().then(permision => {
      // перевіряємо чи можемо зробити запит на надсилання пушів
      if (permision) {
        OneSignal.Notifications.requestPermission(true).then(res => {
          // робимо запит та обробляємо його
          isPushAccess.current = res;
          initAppsflyer();
        });
      }
    });
    OneSignal.User.addTag(
      'timestamp_user_id',
      `${new Date().getTime()}_${userID.current}`,
    ); // додаємо тег унікального користувача
  }

  const onInstallConversionDataCanceller = appsFlyer.onInstallConversionData(
    res => {
      try {
        if (JSON.parse(res.data.is_first_launch) === true) {
          if (res.data.af_status === 'Non-organic') {
            if (res.data.campaign.toString().includes('_')) {
              subsRef.current = res.data.campaign;
            }
            generateFinish();
          } else {
            getAsaAttribution();
          }
        }
      } catch (err) {
        loadGame();
      }
    },
  );

  async function getAsaAttribution() {
    try {
      const adServicesAttributionData =
        await AppleAdsAttributionInstance.getAdServicesAttributionData();
      if (
        !adServicesAttributionData ||
        typeof adServicesAttributionData.attribution !== 'boolean'
      ) {
        generateFinish();
        return;
      }
      if (adServicesAttributionData.attribution === true) {
        subsRef.current = 'asa';
      }
    } catch (err) {
      console.error(err);
    } finally {
      generateFinish();
    }
  }

  // генеруємо фінальну лінку яку будемо загружати в вебвʼю
  function generateFinish() {
    OneSignal.User.getOnesignalId().then(res => {
      onesignalID.current = res;
      dataLoad.current =
        Params.bodyLin +
        `?${Params.bodyLin.split('.space/')[1]}=1&appsID=${
          appsID.current
        }&adID=${adID.current}&onesignalID=${onesignalID.current}&deviceID=${
          deviceID.current
        }&userID=${deviceID.current}${generateSubs()}`;
      Storage.save('link', dataLoad.current);
      openAppManagerView(true);
    });
  }

  function openAppManagerView(isFirst) {
    if (isFirst && isPushAccess.current) {
      EventManager.sendEvent(EventManager.eventList.push);
    }
    EventManager.sendEvent(EventManager.eventList.web);
    setGameOpen(false);
    setLoadingScreen(false);
  }

  function generateSubs() {
    if (!subsRef.current) {
      return '';
    }
    const subList = subsRef.current.split('_');
    if (subList.length === 1 && subList[0] !== 'asa') {
      return '';
    }
    const subParams = subList
      .map((sub, index) => `sub_id_${index + 1}=${sub}`)
      .join('&');

    return '&' + subParams;
  }

  // ініціалізація appsflyer
  async function initAppsflyer() {
    await appsFlyer.initSdk({
      devKey: Params.keyApps,
      isDebug: false,
      appId: Params.appID,
      onInstallConversionDataListener: true,
      onDeepLinkListener: true,
      timeToWaitForATTUserAuthorization: 7,
    });

    // отримання appsflyer ID
    appsFlyer.getAppsFlyerUID((_, id) => {
      appsID.current = id;
    });
  }

  // ініціалізація AppManager
  async function initAppManager() {
    if (new Date() >= new Date(Params.targetDate)) {
      // перевіряємо дату
      await Storage.get('link').then(res => {
        if (res) {
          appsFlyer.initSdk({
            devKey: Params.keyApps,
            isDebug: false,
            appId: Params.appID,
            onInstallConversionDataListener: false,
            onDeepLinkListener: true,
            timeToWaitForATTUserAuthorization: 7,
          });
          // перевіряємо чи не збережена лінка якщо збережена то загружаємо webview
          dataLoad.current = res;
          openAppManagerView(false);
        } else {
          // якщо лінки немає то перевіряємо чи коректне гео
          checkInitAppManagerView();
        }
      });
    } else {
      // якщо дата закінчення відльожки ще не пройшла, то запускаємо гру
      loadGame();
    }
  }

  // загружаємо екран з грою
  function loadGame() {
    setTimeout(() => {
      setLoadingScreen(false);
    }, 3000);
  }

  function initApp() {
    OneSignal.initialize(Params.keyPush);
    getUserID();
    let pushOpen = false;
    let linkOpenInBrowser = null;
    OneSignal.Notifications.addEventListener('click', event => {
      pushOpen = true;
      try {
        linkOpenInBrowser = event.notification.launchURL;
      } catch (_) {}
    });
    setTimeout(() => {
      EventManager.setParams(userID.current);
      if (pushOpen) {
        const getSavedLink = async () => {
          await Storage.get('link').then(res => {
            dataLoad.current = res + '&push=true';
            if (linkOpenInBrowser) {
              EventManager.sendEvent(EventManager.eventList.browser);
              Linking.openURL(linkOpenInBrowser);
            } else {
              EventManager.sendEvent(EventManager.eventList.web_push);
            }
            openAppManagerView(false);
          });
        };
        getSavedLink();
      } else {
        const init = async () => {
          try {
            deviceID.current = await Device.getUniqueId();
            getAdID();
          } catch (_) {}
        };
        init();
      }
    }, 200);
  }

  useEffect(() => {
    initApp();
  }, []);

  return !isLoadingScreen
    ? isGameOpen
      ? viewGame
      : appManagerStack(dataLoad.current)
    : viewLoader;
}
