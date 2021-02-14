import React from 'react';
import { View, Text, Pressable } from 'react-native';

const Home = ({ navigation }) => {
    return (
        <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <Text style={{
                fontSize: 18,
                fontWeight: 'bold'
            }}>Bem vindo à Home :D</Text>
            <Pressable
                onPress={() => navigation.goBack()}
            >
                <Text style={{
                    fontSize: 18,
                    fontWeight: 'bold',
                    marginTop: 30,
                    color: '#6C63FF'
                }}>Voltar</Text>
            </Pressable>
        </View>
    );
}

export default Home;
