import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { saveToken } from '@/config/storage';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';

export default function Login(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const listUser = [
        {
            username: 'admin',
            password: 'admin',
            token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NiIsImtpZCI6IjBjMjE1ZmJkOWY5NzIzYzRkMTZmY2I2ZjQzZGQzYTM5In0.eyJ1c2VybmFtZSI6ImFkbWluIn0.f_AYRXgtib70vZivxqSgWdbq0iiRrZ8P9xPhgWQwXi1s_ceLBTgNA0S5u1mtjBQxAcpE8Eusb8RFmteS0piYvQ"
        }
    ];

    const toggleShowPassword = () => { 
      setShowPassword(!showPassword); 
    }; 
  
    const loginAction = async () => {
        const getUser = listUser.find(user => user.username === username && user.password === password);
        if(getUser){
            setIsLoading(true);
            setTimeout(() => {
                setIsLoading(false);
                saveToken('accessToken', getUser.token);
                router.replace('/cart');
            }, 1000);
        }
    }
    useEffect(() => {
    }, []);
  
    return (
      <SafeAreaView style={style.container}>
        <Text style={style.title}>LOGIN</Text>
        <TextInput
          onChangeText={setUsername}
          placeholder='Username'
          value={username}
          style={style.textInput}
        />
        <View style={style.viewPassword}>
          <TextInput
            onChangeText={setPassword}
            placeholder='Password'
            secureTextEntry={!showPassword}
            value={password}
            style={style.textInputPassword}
          />
          <MaterialCommunityIcons 
              name={showPassword ? 'eye-off' : 'eye'} 
              size={24} 
              color="#aaa"
              style={style.iconTextInput} 
              onPress={toggleShowPassword} 
          /> 

        </View>
        {!isLoading ? (
        <TouchableOpacity
          onPress={loginAction}
          style={style.button}>
          <Text style={{color:'#ffffff'}}>Sign In</Text>
        </TouchableOpacity>
        ) : <Text>Loading</Text>}
        <TouchableOpacity
          onPress={() => router.replace('/home')}
          style={style.button}>
          <Text style={{color:'#ffffff'}}>Kembali</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );

}
const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5F1EC',
    },

    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },

    textInput: {
        height: 50,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        width: '90%',
        borderRadius: 7,
    },

    textInputPassword: {
        width: '90%',
    },

    viewPassword: {
        width: '90%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start', // RN ga ada 'left'
        borderWidth: 1,
        borderRadius: 7,
        padding: 6,
    },

    button: {
        alignItems: 'center',
        marginTop: 30,
        backgroundColor: '#8B5E3C',
        padding: 10,
        width: '90%',
        borderRadius: 7,
    },

    logo: {
        height: 80,
        width: '90%',
        marginBottom: 50,
        resizeMode: 'contain',
    },

    iconTextInput: {
        marginLeft: 0,
    },
});