import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
  Image,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import api from '../services/api';
import logo from '../assets/logo.png';
import like from '../assets/like.png';
import dislike from '../assets/dislike.png';

export default function Main({ navigation }) {
  const loggedid = '5d4a53ca047aa73150fb7cd0'; //navigation.getParam('user');
  const likeOrDislike = 'likes'; // navigation.getParam('page');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function loadLikesDislikes() {
      const response = await api.get(`/user/${likeOrDislike}`, {
        headers: { loggedid },
      });
      setUsers(response.data);
    }
    loadLikesDislikes();
  }, [likeOrDislike, loggedid]);

  async function handleRemoveLikeDislike(id) {
    console.log('uuu', `/user/${id}/${likeOrDislike}`);
    const response = await api.delete(`/user/${id}/${likeOrDislike}`, {
      headers: { loggedid },
    });
    setUsers(users.filter(_user => _user._id !== id));
  }
  function renderItem({ item: user }) {
    return (
      <View key={user._id} style={[styles.card]}>
        <Image
          style={styles.avatar}
          source={{
            uri: user.photo,
          }}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleRemoveLikeDislike(user._id)}
        >
          <Image source={dislike} />
        </TouchableOpacity>
        <View style={styles.footer}>
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.bio} numberOfLines={3}>
            {user.username}
          </Text>
        </View>
      </View>
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity>
        <Image style={styles.logo} source={logo} />
      </TouchableOpacity>
      <Image
        style={styles.logo}
        source={likeOrDislike === 'likes' ? like : dislike}
        width={35}
        height={31}
      />
      {users.length === 0 ? (
        <Text style={styles.empty}>Nada aqui :(</Text>
      ) : (
        <FlatList
          style={{ alignSelf: 'stretch' }}
          data={users}
          numColumns={3}
          renderItem={(item, index) => renderItem(item)}
          keyExtractor={item => item._id}
        />
      )}
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logo: {
    marginTop: 30,
  },
  empty: {
    alignSelf: 'center',
    color: '#999',
    fontSize: 24,
    fontWeight: 'bold',
  },
  cardsContainer: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'center',
    maxHeight: 500,
  },
  card: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    margin: 5,
    overflow: 'hidden',
  },
  avatar: {
    flex: 1,
    height: 150,
  },
  footer: {
    backgroundColor: '#FFF',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  bio: {
    fontSize: 14,
    color: '#999',
    marginTop: 5,
    lineHeight: 18,
  },
  buttonsContainer: {
    flexDirection: 'row',
    marginBottom: 30,
  },
  button: {
    position: 'absolute',
    width: 34,
    height: 34,
    top: 5,
    right: 5,
    borderRadius: 17,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 2,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
});
