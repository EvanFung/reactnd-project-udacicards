import React from 'react';
import { View,Text, TouchableOpacity } from "react-native";

export default function TouchableButton ({children, onPress, style={}, ...props}) {
    return (
        <TouchableOpacity onPress={onPress} {...props}>
            <Text style={[styles.button, style]}>{children}</Text>
        </TouchableOpacity>
    )
}