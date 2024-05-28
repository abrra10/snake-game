import React from "react";
import { StyleSheet, View } from "react-native";

const Head = (props) => {
    const x = props.position[0];
    const y = props.position[1];
    return (
        <View style={[styles.finger, { width: props.size, height: props.size, left: x * props.size, top: y * props.size }]} />
    );
};

const styles = StyleSheet.create({
    finger: {
        backgroundColor: '#FEBE10',
        position: "absolute"
    }
});

export { Head };
