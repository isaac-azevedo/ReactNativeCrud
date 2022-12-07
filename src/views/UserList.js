import React, { useContext } from 'react';
import { View, FlatList, Alert, StyleSheet } from 'react-native';
import { ListItem, Button, Icon } from '@rneui/base';
import UsersContext from '../context/UsersContext'

export default props => {

  const { state, dispatch } = useContext(UsersContext)

  function confirmeUserDelete(user) {
    Alert.alert('Excluir Usuário', 'Deseja Excluir Usuário?', [
      {
        text: 'Sim',
        onPress(){
          dispatch({
            type: 'deleteUser',
            payload: user,
          })
        }
      },
      {text: 'Não'}
    ])
  }

  function getActions(user) {
    return (
      <>
        <Button 
          onPress={() => props.navigation.navigate('UserForm', user)}
          type="clear"
          icon={<Icon name="edit" size={25} color="orange" />}
        />

        <Button 
          onPress={() => confirmeUserDelete(user)}
          type="clear"
          icon={<Icon name="delete" size={25} color="red" />}
        />
      </>
    )
  }



  function getUserItem({ item: user }) {
    return (
      <ListItem 
        leftAvatar={{source: {uri: user.avatarUrl}}}
        key={user.id}
        title={user.name}
        subtitle={user.email}
        bottomDivider
        rightElement={getActions(user)}
        onPress={() => props.navigation.navigate('UserForm', user)}
      />
    )
  }

  //console.warn(Object.keys(props))
  return (
    <View>
        <FlatList 
          keyExtractor={ user => user.id.toString() }
          data={state.users}
          renderItem={getUserItem}
        />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    fontSize: 24,
    color: '#000',
  }
})