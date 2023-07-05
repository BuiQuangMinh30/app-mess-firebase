import {
  Firestore,
  collection,
  addDoc,
  orderBy,
  query,
  getDocs
} from "firebase/firestore";
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  FlatList,
  Button,
  useColorScheme,
  View,
} from "react-native";
import { auth, database,users } from "../firebase";
import { useState, useEffect } from "react";
import { firebase } from "@react-native-firebase/firestore";

const messages = [
  {
    id: "1",
    name: "John Doe",
    userImg: "https://placeimg.com/140/140/any",
    messageTime: "4 mins ago",
    messageText:
      "Using the services Firebase provide, a chat functionality can be built into your application.",
  },
  {
    id: "2",
    name: "Sarah Doe",
    userImg: "https://placeimg.com/140/140/any",
    messageTime: "2 hours ago",
    messageText:
      "Using the services Firebase provide, a chat functionality can be built into your application.",
  },
  {
    id: "3",
    name: "Josh Doe",
    userImg: "https://placeimg.com/140/140/any",
    messageTime: "1 hours ago",
    messageText:
      "Using the services Firebase provide, a chat functionality can be built into your application.",
  },
  {
    id: "4",
    name: "Abigail Doe",
    userImg: "https://placeimg.com/140/140/any",
    messageTime: "1 day ago",
    messageText:
      "Using the services Firebase provide, a chat functionality can be built into your application.",
  },
  {
    id: "5",
    name: "Christy Doe",
    userImg: "https://placeimg.com/140/140/any",
    messageTime: "2 days ago",
    messageText:
      "Using the services Firebase provide, a chat functionality can be built into your application.",
  },
];

export default function MessageScreen({ user, navigation }) {

  console.log('user', users);
  const [users, setUsers] = useState(null);
  // useEffect(() => {
  //   const getUsers = async () => {
  //     // const queryFB = await collection(database, "chats");
  //     // const usersData = queryFB.docs.map((doc)=>doc.data())
  //     // .filter((user)=> user._id !== auth.apiKey)
  //     const querySnapshot = await getDocs(collection(database, 'chats'));
  //      const usersData = querySnapshot.docs.map((doc) => doc.data())
  //      .filter((user)=> console.log('123', user.user._id))
  //     //  user.user._id != auth.currentUser.email
  //       console.log('users', usersData)
  //     setUsers(usersData);
  //   };

  //   getUsers();
  // }, []);
  useEffect (() => {
    const getUsers = async() => {
      try {
        const usersList = await firebase.auth().listUsers();
        const userData = usersList.users.map((userRecord) => ({
          uid: userRecord.uid,
          email: userRecord.email,
          displayName: userRecord.displayName,
          photoURL: userRecord.photoURL,
          isAnonymous: userRecord.isAnonymous,
        }))
      }catch(e){
        console.log('ẻ',e);
      }
    }
  })
  return (
    <SafeAreaView>
      <StatusBar />
      <View>
        <FlatList
          data={users}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => navigation.navigate("Chat", { name: item.name })}
            >
              <View style={styles.card}>
                <Image
                  style={styles.userImageST}
                  source={{ uri: "https://i.pravatar.cc/203" }}
                />
                <View style={styles.textArea}>
                  <Text style={styles.nameText}>{item.name}</Text>
                  <Text style={styles.msgContent}>{item.messageText}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  Contain: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  Container: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  card: {
    width: "100%",
    height: "auto",
    marginHorizontal: 4,
    marginVertical: 6,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "600",
  },
  imageContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  userImage: {
    paddingTop: 15,
    paddingBottom: 15,
  },
  userImageST: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  textArea: {
    flexDirection: "column",
    justifyContent: "center",
    padding: 5,
    paddingLeft: 10,
    width: 300,
    backgroundColor: "transparent",
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
  },
  userText: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  nameText: {
    fontSize: 14,
    fontWeight: "900",
    fontFamily: "Verdana",
  },
  msgTime: {
    textAlign: "right",
    fontSize: 11,
    marginTop: -20,
  },
  msgContent: {
    paddingTop: 5,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: "400",
  },
  highlight: {
    fontWeight: "700",
  },
});
