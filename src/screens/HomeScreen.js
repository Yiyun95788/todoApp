import React, { useEffect, useState } from "react";
import { Text, View, FlatList, StyleSheet } from "react-native";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { Card } from "react-native-elements";

export default function HomeScreen({ navigation }) {
  const { getItem } = useAsyncStorage("todo3");
  // State
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  function getTodoList() {
    getItem().then((todoJSON) => {
      const todo = todoJSON ? JSON.parse(todoJSON) : [];
      setItems(todo);
      setLoading(false);
    });
  }

  function renderCard({ item }) {
    return (
      <Card>
        <Card.Title>{item.title}</Card.Title>
      </Card>
    );
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", getTodoList);
    return unsubscribe;
  }, []);

  return (
    <View>
      <FlatList
        refreshing={loading}
        onRefresh={getTodoList}
        data={items}
        renderItem={renderCard}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}
