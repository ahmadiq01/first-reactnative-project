// hooks/useNotifications.ts
// Push / remote token APIs are disabled in Expo Go (SDK 53+). We lazy-load expo-notifications
// only outside Expo Go so the app runs in Expo Go; use a dev build for full notifications.
import { useState, useEffect, useCallback } from 'react';
import Constants, { ExecutionEnvironment } from 'expo-constants';
import { Platform } from 'react-native';

const isExpoGo =
  Constants.executionEnvironment === ExecutionEnvironment.StoreClient;

type NotificationsNS = typeof import('expo-notifications');

let notificationHandlerInstalled = false;

async function loadNotifications(): Promise<NotificationsNS | null> {
  if (isExpoGo) return null;
  return import('expo-notifications');
}

export function useNotifications() {
  const [expoPushToken, setExpoPushToken] = useState<string>('');
  const [permissionGranted, setPermissionGranted] = useState(false);

  useEffect(() => {
    if (isExpoGo) return;

    let subs: { remove: () => void }[] = [];
    let cancelled = false;

    void (async () => {
      const Notifications = await loadNotifications();
      if (!Notifications || cancelled) return;

      if (!notificationHandlerInstalled) {
        notificationHandlerInstalled = true;
        Notifications.setNotificationHandler({
          handleNotification: async () => ({
            shouldShowAlert: true,
            shouldShowBanner: true,
            shouldShowList: true,
            shouldPlaySound: false,
            shouldSetBadge: true,
          }),
        });
      }

      const token = await registerForPushNotifications(Notifications);
      if (!cancelled && token) setExpoPushToken(token);

      subs.push(Notifications.addNotificationReceivedListener(() => {}));
      subs.push(Notifications.addNotificationResponseReceivedListener(() => {}));
    })();

    return () => {
      cancelled = true;
      subs.forEach((s) => s.remove());
      subs = [];
    };
  }, []);

  async function registerForPushNotifications(
    Notifications: NotificationsNS
  ): Promise<string | undefined> {
    const Device = await import('expo-device');
    if (!Device.isDevice) return undefined;

    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      setPermissionGranted(false);
      return undefined;
    }

    setPermissionGranted(true);

    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
      });
    }

    const projectId = Constants.expoConfig?.extra?.eas?.projectId as string | undefined;
    if (!projectId) return undefined;

    const token = await Notifications.getExpoPushTokenAsync({ projectId });
    return token.data;
  }

  const scheduleMorningOrbit = useCallback(async (hour: number = 6, minute: number = 0) => {
    if (isExpoGo) return;
    const Notifications = await loadNotifications();
    if (!Notifications) return;

    await Notifications.cancelAllScheduledNotificationsAsync();

    const MESSAGES = [
      { title: 'Your daily orbit is ready ✦', body: 'Your personalized 5-minute morning brief is waiting.' },
      { title: 'The decision you\'ve been avoiding just got easier', body: 'New market data is in. Tap to see what changed.' },
      { title: 'Your freelance window is open this week', body: 'Your Coach has spotted 3 opportunities in your focus areas.' },
      { title: 'One insight that changes how you see today', body: 'Your orbit is ready. Takes 5 minutes. Worth it.' },
      { title: 'Gold is up 4% — does it change your plan?', body: 'Your Analyst bot has a take on today\'s market.' },
      { title: 'Your Coach has something to tell you', body: 'Based on your goals this week, here\'s what matters today.' },
      { title: 'Rise and decide ✦', body: 'The best decisions happen before 9am. Your orbit is ready.' },
    ];

    const msg = MESSAGES[new Date().getDay() % MESSAGES.length];

    await Notifications.scheduleNotificationAsync({
      content: {
        title: msg.title,
        body: msg.body,
        data: { screen: 'orbit' },
        sound: false,
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.DAILY,
        hour,
        minute,
      },
    });
  }, []);

  const scheduleStreakReminder = useCallback(async (streak: number) => {
    if (isExpoGo) return;
    if (streak === 0) return;
    const Notifications = await loadNotifications();
    if (!Notifications) return;

    await Notifications.scheduleNotificationAsync({
      content: {
        title: `One tap to protect your ${streak}-day streak 🔥`,
        body: 'Ends at midnight. 30 seconds to keep it alive.',
        data: { screen: 'home' },
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.DAILY,
        hour: 21,
        minute: 0,
      },
    });
  }, []);

  return {
    expoPushToken,
    permissionGranted,
    scheduleMorningOrbit,
    scheduleStreakReminder,
  };
}
