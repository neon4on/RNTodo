import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  TextInput,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

function App() {
  const [taskText, setTaskText] = useState('');
  const [tasks, setTasks] = useState([]);

  const addTask = () => {
    if (taskText.trim()) {
      setTasks([...tasks, taskText.trim()]);
      setTaskText('');
    }
  };

  const deleteTask = index => {
    const newdTasks = [...tasks];
    newdTasks.splice(index, 1);
    setTasks(newTasks);
  };

  const renderTaskItem = ({item, index}) => (
    <View style={styles.taskItem}>
      <Text style={styles.taskText}>{item}</Text>
      <TouchableOpacity onPress={() => deleteTask(index)}>
        <Text style={styles.deleteButton}>Удалить</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Введите задачу"
          value={taskText}
          onChangeText={setTaskText}
        />
        <TouchableOpacity style={styles.addButton} onPress={addTask}>
          <Text style={styles.addButtonText}>Добавить</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={tasks}
        renderItem={renderTaskItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'lightcyan',
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginRight: 10,
    paddingHorizontal: 10,
    backgroundColor: 'white',
  },
  taskText: {
    color: 'black',
    fontSize: 16,
  },
  taskItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'lightskyblue',
    padding: 20,
    marginVertical: 8,
  },
  addButton: {
    backgroundColor: 'mediumaquamarine',
    padding: 10,
    borderRadius: 5,
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  deleteButton: {
    color: 'red',
  },
});

export default App;
