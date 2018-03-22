import React from 'react';
import { View,Text, TouchableOpacity } from "react-native";

export default function TouchableButton ({children, onPress, style={}, ...props}) {
    return (
        <TouchableOpacity onPress={onPress} {...props}>
            <Text style={[style]}>{children}</Text>
        </TouchableOpacity>
    )
}