import React, { useState, useContext } from 'react'
import { View, Text, TextInput, StyleSheet, Button } from 'react-native';
import UsersContext from '../context/UsersContext';

export default ({route, navigation}) => {
  const [user, setUser] = useState(route.params ? route.params : {})
  const { dispatch } = useContext(UsersContext)
  return (
    <View style={styles.form}>
          <Text>Name</Text>
          <TextInput 
            style={styles.input}
            onChangeText={name => setUser({...user, name })}
            placeholder="Digite seu nome"
            value={user.name}
          />

          <Text>Email</Text>
          <TextInput 
            style={styles.input}
            onChangeText={email => setUser({...user, email })}
            placeholder="Digite seu email"
            value={user.email}
          />

          <Text>URL do Avatar</Text>
          <TextInput 
            style={styles.input}
            onChangeText={avatarUrl => setUser({...user, avatarUrl })}
            placeholder="Digite a URL do Avatar"
            value={user.avatarUrl}
          />

          <Button 
            title="Salvar"
            onPress={() => {
              dispatch({
                type: user.id ? 'updateUser' : 'createUser',
                payload: user,
              })
              navigation.goBack()
            }}
          />

    </View>
  )
}

const styles = StyleSheet.create({
  form: {
    padding: 12,
  },
  input: {
    height: 40,
    borderColor: 'red',
    borderWidth: 1,
    marginBottom: 10,
    color: 'red'
  }
})