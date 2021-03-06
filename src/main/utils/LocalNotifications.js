import React from "react"
import { AsyncStorage } from "react-native"
import { Notifications, Permissions } from "expo"

// Key for notification flag in AsyncStorage
const NOTIFICATION_KEY = "UdaciCards::LocalNotification"

export function clearLocalNotification() {
  return AsyncStorage.removeItem(NOTIFICATION_KEY).then(
    Notifications.cancelAllScheduledNotificationsAsync
  )
}

function createNotification() {
  return {
    title: `Review your flashcards now!`,
    body: `Don't forget to take a quiz today to review any topic of your choice.`,
    ios: {
      sound: true
    },
    android: {
      sound: true,
      priority: "high",
      sticky: false,
      vibrate: true
    }
  }
}

export function setLocalNotification() {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then(data => {
      if (!data) {
        Permissions.askAsync(Permissions.NOTIFICATIONS).then(({ status }) => {
          if (status === "granted") {
            Notifications.cancelAllScheduledNotificationsAsync()
            console.log(status)
            // Schedule notification for next day at 20:00h
            let tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            tomorrow.setHours(20);
            tomorrow.setMinutes(0);

            console.log(`Notification must trigger on ${tomorrow}`)

            const scheduleSettings = {
              time: tomorrow,
              repeat: "day"
            }

            Notifications.scheduleLocalNotificationAsync(
              createNotification(),
              scheduleSettings
            )

            AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
          }
        })
      }
    })
}
