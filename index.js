import React, { useState, useRef, useEffect } from "react";
import { AppRegistry, StyleSheet, StatusBar, View, Alert, Button, TouchableOpacity, Text, ImageBackground } from "react-native";
import { GameEngine } from "react-native-game-engine";
import { Head } from "./components/head";
import { Food } from "./components/food";
import { Tail } from "./components/tail";
import { GameLoop } from "./Physics";
import Constants from './Constants';
import Icon from 'react-native-vector-icons/FontAwesome'; 

const SnakeApp = () => {
    const boardSize = Constants.GRID_SIZE * Constants.CELL_SIZE;
    const engineRef = useRef(null);
    const [running, setRunning] = useState(true);
    const [score, setScore] = useState(0);

    const randomBetween = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    const onEvent = (e) => {
        if (e.type === "game-over") {
            setRunning(false);
            Alert.alert("Game Over. Your score: " + score); 
        } else if (e.type === "food-eaten") {
            // Increment score when food is eaten
            setScore(prevScore => prevScore + 1);
        }
    }

    const reset = () => {
        engineRef.current.swap({
            head: { position: [0, 0], xspeed: 1, yspeed: 0, nextMove: 10, updateFrequency: 10, size: 20, renderer: <Head /> },
            food: { position: [randomBetween(0, Constants.GRID_SIZE - 1), randomBetween(0, Constants.GRID_SIZE - 1)], size: 20, renderer: <Food /> },
            tail: { size: 20, elements: [], renderer: <Tail /> }
        });
        setRunning(true);
        setScore(0);
    }

    return (
        <View style={styles.container}>
            <ImageBackground source={require('./images/bg2.jpg')} style={styles.background1}>
                <GameEngine
                    ref={engineRef}
                    style={[{ width: boardSize, height: boardSize, backgroundColor: '#9ACD32', flex: null }]}
                    systems={[GameLoop]}
                    entities={{
                        head: { position: [0, 0], xspeed: 1, yspeed: 0, nextMove: 10, updateFrequency: 10, size: 20, renderer: <Head /> },
                        food: { position: [randomBetween(0, Constants.GRID_SIZE - 1), randomBetween(0, Constants.GRID_SIZE - 1)], size: 20, renderer: <Food /> },
                        tail: { size: 20, elements: [], renderer: <Tail /> }
                    }}
                    running={running}
                    onEvent={onEvent}>

                    <StatusBar hidden={true} />
                </GameEngine>

                <View style={styles.scoreContainer}>
                    <Text style={[styles.scoreText, { color: 'black' }]}>Score: {score}</Text>
                </View>

                <View style={styles.buttonContainer}>
                    <Button title="New Game" onPress={reset} color="black" />
                </View>

                <View style={styles.controls}>
                    <View style={styles.controlRow}>
                        <TouchableOpacity onPress={() => { engineRef.current.dispatch({ type: "move-up" }) }}>
                            <Icon name="arrow-up" size={70} color="#FFC72C" />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.controlRow}>
                        <TouchableOpacity onPress={() => { engineRef.current.dispatch({ type: "move-left" }) }}>
                            <Icon name="arrow-left" size={70} color="#FFC72C" />
                        </TouchableOpacity>
                        <View style={[styles.control, { backgroundColor: null }]} />
                        <TouchableOpacity onPress={() => { engineRef.current.dispatch({ type: "move-right" }) }}>
                            <Icon name="arrow-right" size={70} color="#FFC72C" />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.controlRow}>
                        <TouchableOpacity onPress={() => { engineRef.current.dispatch({ type: "move-down" }) }}>
                            <Icon name="arrow-down" size={70} color="#FFC72C" />
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000',
        alignItems: 'center',
        justifyContent: 'center'
    },
    background1: {
        flex: 1,
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        alignItems: 'center',
        justifyContent: 'center',
    },
    background2: {
        flex: 1,
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        borderRadius: 10,
        padding: 10,
        marginBottom: 20,
    },
    controls: {
        width: 300,
        height: 300,
        flexDirection: 'column',
    },
    controlRow: {
        height: 100,
        width: 300,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    control: {
        width: 100,
        height: 100,
        backgroundColor: 'blue'
    },
    scoreText: {
        color: 'black',
        fontSize: 20,
        color: 'blue'
    },
    scoreContainer: {
        backgroundColor: '#CC0000',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'black',
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginVertical: 10,
    },
    buttonContainer: {
        backgroundColor: '#CC0000',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'black',
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginVertical: 10,
    }
});

AppRegistry.registerComponent("Snake", () => SnakeApp);

export default SnakeApp;
