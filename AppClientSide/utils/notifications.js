import * as Notifications from 'expo-notifications';
export const requestNotificationPermissions = async () => {
    const { status } = await Notifications.requestPermissionsAsync();
    return status === 'granted';
};


export const scheduleNotification = async (title, body, timeInSeconds) => {
    await Notifications.scheduleNotificationAsync({
        content: {
            title,
            body,
            sound: true,
        },
        trigger: { seconds: timeInSeconds },
    });
};


export const cancelAllNotifications = async () => {
    await Notifications.cancelAllScheduledNotificationsAsync();
};
