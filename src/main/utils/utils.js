import uuidv4 from "uuid/v4"
import { Alert } from "react-native"
export function generateRandomId() {
  return uuidv4()
}

export const showAlert = () => {
  Alert.alert("Enter a value")
}

export function getRandomInt(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min)) + min
}
