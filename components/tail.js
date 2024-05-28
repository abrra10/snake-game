import React from "react";
import { View } from "react-native";
import Constants from '../Constants';

const Tail = (props) => {
    const tailList = props.elements.map((el, idx) => (
        <View key={idx} style={{ width: props.size, height: props.size, position: 'absolute', left: el[0] * props.size, top: el[1] * props.size, backgroundColor: '#568203' }} />
    ));

    return (
        <View style={{ width: Constants.GRID_SIZE * props.size, height: Constants.GRID_SIZE * props.size }}>
            {tailList}
        </View>
    );
};



export { Tail };
