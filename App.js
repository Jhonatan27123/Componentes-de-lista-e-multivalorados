import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default function App() {
  const [item, setItem] = useState('');
  const [quantity, setQuantity] = useState('');
  const [shoppingList, setShoppingList] = useState([]);

  const addItem = () => {
    if (item && quantity) {
      const newItem = { id: Date.now().toString(), name: item, quantity: parseInt(quantity), completed: false };
      setShoppingList((prevList) => [newItem, ...prevList]);
      setItem('');
      setQuantity('');
    }
  };

  const toggleItemCompletion = (id) => {
    setShoppingList((prevList) =>
      prevList.map((listItem) =>
        listItem.id === id ? { ...listItem, completed: !listItem.completed } : listItem
      )
    );
  };

  const deleteItem = (id) => {
    setShoppingList((prevList) => prevList.filter((listItem) => listItem.id !== id));
  };

  const handleQuantityChange = (text) => {
    const numericText = text.replace(/[^0-9]/g, '');
    setQuantity(numericText);
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <TouchableOpacity onPress={() => toggleItemCompletion(item.id)}>
        <Text style={[styles.itemText, item.completed && styles.completed]}>
          {item.name} - {item.quantity}
        </Text>
      </TouchableOpacity>
      <Button title="Excluir" onPress={() => deleteItem(item.id)} />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Compras</Text>
      <TextInput
        style={styles.input}
        placeholder="Item"
        value={item}
        onChangeText={setItem}
      />
      <TextInput
        style={styles.input}
        placeholder="Quantidade"
        value={quantity}
        onChangeText={handleQuantityChange}
        keyboardType="numeric"
      />
      <Button title="Adicionar Item" onPress={addItem} />
      <FlatList
        data={shoppingList}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    width: width * 0.9, 
    alignSelf: 'center', 
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemText: {
    flex: 1,
    fontSize: 18,
  },
  completed: {
    textDecorationLine: 'line-through',
    color: 'gray',
  },
});
