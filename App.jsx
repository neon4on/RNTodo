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
import DateTimePicker from '@react-native-community/datetimepicker';

function App() {
  const [taskText, setTaskText] = useState('');
  const [tasks, setTasks] = useState([]);
  const [taskDate, setTaskDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const addTask = () => {
    if (taskText.trim()) {
      setTasks([...tasks, {text: taskText.trim(), date: new Date(taskDate)}]);
      setTaskText('');
      setTaskDate(new Date());
    }
  };

  const deleteTask = index => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || taskDate;
    setShowDatePicker(false);
    setTaskDate(currentDate);
  };

  const renderTaskItem = ({item, index}) => (
    <View style={styles.taskItem}>
      <Text style={styles.taskText}>{item.text}</Text>
      <Text style={styles.taskDate}>
        {item.date ? item.date.toLocaleDateString() : ''}
      </Text>
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
        <TouchableOpacity onPress={() => setShowDatePicker(true)}>
          <Text style={styles.dateButton}>{taskDate.toLocaleDateString()}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.addButton} onPress={addTask}>
          <Text style={styles.addButtonText}>Добавить</Text>
        </TouchableOpacity>
      </View>
      {showDatePicker && (
        <DateTimePicker
          value={taskDate}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}
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
    alignItems: 'center',
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
  dateButton: {
    marginRight: 10,
    padding: 10,
    backgroundColor: 'lightgray',
    borderRadius: 5,
  },
  taskText: {
    color: 'black',
    fontSize: 16,
  },
  taskDate: {
    color: 'gray',
    fontSize: 14,
    marginTop: 5,
  },
  taskItem: {
    backgroundColor: 'lightskyblue',
    padding: 20,
    marginVertical: 8,
    borderRadius: 5,
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
    marginTop: 10,
  },
});

export default App;
