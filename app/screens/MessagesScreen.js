import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Searchbar } from "react-native-paper";

const Messages = [
  {
    id: "1",
    groupChat: true,
    chatName: "General",
    userName: "Jenny Doe",
    // userImg: require('../assets/users/user-3.jpg'),
    messageTime: "4 mins ago",
    messageText:
      "Hey there, this is my test for a post of my social app in React Native.",
  },
  {
    id: "2",
    groupChat: true,
    chatName: "Mechanical Support",
    userName: "John Doe",
    // userImg: require('../assets/users/user-1.jpg'),
    messageTime: "2 hours ago",
    messageText:
      "Hey there, this is my test for a post of my social app in React Native.",
  },
  {
    id: "3",
    groupChat: true,
    chatName: "Delivery",
    userName: "Ken William",
    // userImg: require('../assets/users/user-4.jpg'),
    messageTime: "1 hours ago",
    messageText:
      "Hey there, this is my test for a post of my social app in React Native.",
  },
  {
    id: "4",
    groupChat: false,
    userName: "Selina Paul",
    // userImg: require('../assets/users/user-6.jpg'),
    messageTime: "1 day ago",
    messageText:
      "Hey there, this is my test for a post of my social app in React Native.",
  },
  {
    id: "5",
    groupChat: false,
    userName: "Christy Alex",
    // userImg: require('../assets/users/user-7.jpg'),
    messageTime: "2 days ago",
    messageText:
      "Hey there, this is my test for a post of my social app in React Native.",
  },
  {
    id: "6",
    groupChat: false,
    userName: "Jenny Doe",
    // userImg: require('../assets/users/user-3.jpg'),
    messageTime: "3 days ago",
    messageText:
      "Hey there, this is my test for a post of my social app in React Native.",
  },
  {
    id: "7",
    groupChat: false,
    userName: "John Doe",
    // userImg: require('../assets/users/user-1.jpg'),
    messageTime: "2 hours ago",
    messageText:
      "Hey there, this is my test for a post of my social app in React Native.",
  },
  {
    id: "8",
    groupChat: false,
    userName: "Ken William",
    // userImg: require('../assets/users/user-4.jpg'),
    messageTime: "1 hours ago",
    messageText:
      "Hey there, this is my test for a post of my social app in React Native.",
  },
  {
    id: "9",
    groupChat: false,
    userName: "Selina Paul",
    // userImg: require('../assets/users/user-6.jpg'),
    messageTime: "1 day ago",
    messageText:
      "Hey there, this is my test for a post of my social app in React Native.",
  },
  {
    id: "10",
    groupChat: false,
    userName: "Christy Alex",
    // userImg: require('../assets/users/user-7.jpg'),
    messageTime: "2 days ago",
    messageText:
      "Hey there, this is my test for a post of my social app in React Native.",
  },
];

const MessagesScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = React.useState("");

  const onChangeSearch = (query) => setSearchQuery(query);
  return (
    <View style={styles.container}>
      <Searchbar
        style={styles.searchBar}
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
      />
      <FlatList
        data={Messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              navigation.navigate("Chat", { userName: item.userName })
            }
          >
            <View style={styles.userInfo}>
              <View style={styles.textSection}>
                <View style={styles.messageInfo}>
                  {item.groupChat ? (
                    <Text style={styles.userName}>{item.chatName}</Text>
                  ) : (
                    <Text style={styles.userName}>{item.userName}</Text>
                  )}
                  <Text style={styles.lastMessageTime}>{item.messageTime}</Text>
                </View>

                {item.groupChat ? (
                  <Text style={styles.lastMessageContent} numberOfLines={2}>
                    {item.userName}: {item.messageText}
                  </Text>
                ) : (
                  <Text style={styles.lastMessageContent} numberOfLines={2}>
                    {item.messageText}
                  </Text>
                )}
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default MessagesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  searchBar: {
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
  },
  card: {
    width: "100%",
  },
  userInfo: {
    flex: 1,
    // paddingLeft: 20,
    // paddingRight: 20,
    width: "100%",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  textSection: {
    flexDirection: "column",
    justifyContent: "center",
    padding: 20,
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
  },
  messageInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  userName: {
    fontWeight: "bold",
    fontSize: 16,
  },
  lastMessageTime: {
    color: "#666",
    fontSize: 12,
  },
  lastMessageContent: {
    fontSize: 14,
    color: "#333333",
  },
});
