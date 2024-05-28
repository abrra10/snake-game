import React from "react";
import { StyleSheet, View } from "react-native";

const Food = (props) => {
    const x = props.position[0];
    const y = props.position[1];
    const diameter = props.size; // diameter of the circle

    return (
        <View style={[styles.food, { left: x * diameter, top: y * diameter, width: diameter, height: diameter }]} />
    );
};

const styles = StyleSheet.create({
    food: {
        backgroundColor: '#CC0000',
        position: "absolute",
        borderRadius: 9999, 
    }
});

export { Food };
