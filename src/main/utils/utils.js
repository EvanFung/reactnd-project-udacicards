import uuidv4 from 'uuid/v4'
import { Alert } from "react-native";
export function generateRandomId() {
    return uuidv4();
}

export const showAlert = () => {
    Alert.alert('Enter a value');
}