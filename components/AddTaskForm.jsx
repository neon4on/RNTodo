import React, {useState, useEffect} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

function AddTaskForm({addTask, isEditing, selectedTask, saveEditedTask}) {
  const [taskText, setTaskText] = useState('');
  const [taskDate, setTaskDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    if (isEditing && selectedTask) {
      setTaskText(selectedTask.text);
      setTaskDate(new Date(selectedTask.date));
    }
  }, [isEditing, selectedTask]);

  const handleSaveTask = () => {
    if (taskText.trim()) {
      if (isEditing) {
        const editedTask = {
          ...selectedTask,
          text: taskText.trim(),
          date: new Date(taskDate),
        };
        saveEditedTask(editedTask);
      } else {
        addTask({
          text: taskText.trim(),
          date: new Date(taskDate),
          status: 'Актуальный',
        });
      }
      setTaskText('');
      setTaskDate(new Date());
    }
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || taskDate;
    setShowDatePicker(false);
    setTaskDate(currentDate);
  };

  return (
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
      <TouchableOpacity style={styles.saveButton} onPress={handleSaveTask}>
        <Text style={styles.saveButtonText}>
          {isEditing ? 'Сохранить' : 'Добавить'}
        </Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={taskDate}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
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
  saveButton: {
    backgroundColor: 'mediumaquamarine',
    padding: 10,
    borderRadius: 5,
  },
  saveButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default AddTaskForm;
