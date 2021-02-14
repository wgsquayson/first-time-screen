import React, { useRef } from 'react';
import {
    Animated,
    View,
    StatusBar,
    Text,
    Image,
    Pressable,
    StyleSheet,
    Dimensions
} from 'react-native';

import firstImage from './images/firstImage.png';
import secondImage from './images/secondImage.png';
import thirdImage from './images/thirdImage.png';

const { width, height } = Dimensions.get('screen');

const COLOR = '#6C63FF';

const DOT_SIZE = 8;
const DOT_SPACING = 8;
const DOT_INDICATOR = DOT_SIZE + DOT_SPACING;

const FirstTimeScreen = ({ navigation }) => {
    const scrollX = useRef(new Animated.Value(0)).current;

    const screensContent = [
        {
            image: firstImage,
            text: "Essa é a primeira tela de primeiro acesso! Bem vindo!"
        },
        {
            image: secondImage,
            text: "Essa é a segunda tela de primeiro acesso! Quase lá!"
        },
        {
            image: thirdImage,
            text: "Essa é a terceira tela de primeiro acesso! Você chegou ao final! :) "
        }
    ]

    return (
        <>
            <StatusBar hidden />
            <View style={styles.container}>
                <Animated.FlatList
                    contentContainerStyle={styles.flatlist}
                    data={screensContent}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    bounces={false}
                    snapToInterval={width}
                    decelerationRate="fast"
                    onScroll={Animated.event(
                        [{
                            nativeEvent: {
                                contentOffset: {
                                    x: scrollX,
                                }
                            }
                        }],
                        { useNativeDriver: true }
                    )}
                    keyExtractor={(_, index) => index.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.itemContainer}>
                            <Image source={item.image} style={styles.image} />
                            <Text style={styles.text}>{item.text}</Text>
                        </View>
                    )}
                />
                <Pressable
                    style={styles.skip}
                    onPress={() => navigation.navigate('Home')}
                >
                    <Text style={styles.skipText}>Pular</Text>
                </Pressable>
                <View style={styles.pagination}>
                    {
                        screensContent.map((_, index) => (
                            <View
                                key={index.toString()}
                                style={[styles.dot]}
                            />
                        ))
                    }
                    <Animated.View
                        style={[styles.dotIndicator, {
                            transform: [{
                                translateX: Animated.divide(scrollX, width).interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [0, DOT_INDICATOR]
                                })
                            }]
                        }]}
                    />
                </View>
            </View>
        </>
    ); h
}

export default FirstTimeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    flatlist: {
        backgroundColor: '#FFF',
        height: '100%',
        minWidth: '100%',
    },
    itemContainer: {
        flexDirection: 'column',
        alignItems: 'center',

    },
    image: {
        width: width,
        height: height * .80,
        resizeMode: 'contain'
    },
    text: {
        color: COLOR,
        fontSize: 20,
        fontWeight: 'bold',
        maxWidth: width * .90,
        textAlign: 'center'
    },
    pagination: {
        position: 'absolute',
        bottom: 50,
        left: (width / 2) - (DOT_SIZE * 1.5),
        flexDirection: 'row'
    },
    dot: {
        width: DOT_SIZE,
        height: DOT_SIZE,
        borderRadius: DOT_SIZE,
        backgroundColor: COLOR,
        marginRight: DOT_SPACING
    },
    dotIndicator: {
        width: DOT_INDICATOR,
        height: DOT_INDICATOR,
        borderRadius: DOT_INDICATOR,
        borderWidth: 1,
        borderColor: COLOR,
        position: 'absolute',
        top: -DOT_SIZE / 2,
        left: -DOT_SIZE / 2
    },
    skip: {
        position: 'absolute',
        top: 70,
        right: 30,        
    },
    skipText: {
        color: COLOR,
        fontSize: 18,
        fontWeight: 'bold',
    }
});