import React from "react";
import { StyleSheet, View } from "react-native";
import { Formik } from "formik";
import { Text } from "react-native-elements";
import { Button } from "react-native-elements/dist/buttons/Button";
import { Input } from "react-native-elements/dist/input/Input";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import uuid from "react-native-uuid";

const { getItem, setItem } = useAsyncStorage("todo3");

export default function NewScreen({ navigation }) {
  function newTask(values) {
    // this is the code to save task
    //console.log("Button Clicked");
    //console.log(values);
    // I have to store the data into some where
    // Step 1, Store it to local storage

    if (!values.title) {
      Toast.show({
        type: "error",
        text1: "Title is required.",
        position: "top",
      });
      return;
    }

    getItem()
      .then((todoJSON) => {
        let todo = todoJSON ? JSON.parse(todoJSON) : [];

        todo.push({
          id: uuid.v4(),
          title: values.title,
        });

        setItem(JSON.stringify(todo)).then(() => {
          navigation.goBack();
        });
      })
      .catch();

    Toast.show({
      type: "success",
      text1: "Item Saved",
      position: "top",
    });

    // Step 2, Notify user item has saved
  }

  return (
    <Formik
      initialValues={{
        title: "",
        //user: "",
      }}
      onSubmit={newTask}
    >
      {({ handleChange, handleSubmit, values }) => (
        <View style={styles.container}>
          <Text h4>New Todo item</Text>
          <Input
            onChangeText={handleChange("title")}
            placeholder="Example: Cook, Read, etc..."
            style={styles.input}
          />
          <Button title="add" style={styles.button} onPress={handleSubmit} />
        </View>
      )}
    </Formik>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    padding: 10,
  },
  button: {
    backgroundColor: "#228CDB",
  },
  input: {
    marginTop: 10,
  },
});
