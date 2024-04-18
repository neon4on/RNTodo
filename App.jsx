import React, {useState, useEffect} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import TaskList from './components/TaskList';
import AddTaskForm from './components/AddTaskForm';
import AsyncStorage from '@react-native-async-storage/async-storage';

function App() {
  const [tasks, setTasks] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    loadTasks();
  }, []);

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  const addTask = task => {
    setTasks([...tasks, task]);
  };

  const deleteTask = index => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
  };

  const toggleTaskStatus = index => {
    const updatedTasks = [...tasks];
    const currentStatus = updatedTasks[index].status;
    let newStatus = '';

    if (currentStatus === 'Актуальный') {
      newStatus = 'В процессе';
    } else if (currentStatus === 'В процессе') {
      newStatus = 'Выполнен';
    } else if (currentStatus === 'Выполнен') {
      newStatus = 'Актуальный';
    }

    updatedTasks[index].status = newStatus;
    setTasks(updatedTasks);
  };

  const startEditingTask = task => {
    setIsEditing(true);
    setSelectedTask(task);
  };

  const saveEditedTask = editedTask => {
    const updatedTasks = tasks.map(task => {
      if (task === selectedTask) {
        return editedTask;
      }
      return task;
    });
    setTasks(updatedTasks);
    setIsEditing(false);
    setSelectedTask(null);
  };

  const saveTasks = async tasks => {
    try {
      await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
    } catch (error) {
      console.log('Ошибка при сохранении задач:', error);
    }
  };

  const loadTasks = async () => {
    try {
      const savedTasks = await AsyncStorage.getItem('tasks');
      if (savedTasks !== null) {
        setTasks(JSON.parse(savedTasks));
      }
    } catch (error) {
      console.log('Ошибка при загрузке задач:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <AddTaskForm
        addTask={addTask}
        isEditing={isEditing}
        selectedTask={selectedTask}
        saveEditedTask={saveEditedTask}
      />
      <TaskList
        tasks={tasks}
        deleteTask={deleteTask}
        toggleTaskStatus={toggleTaskStatus}
        startEditingTask={startEditingTask}
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
});

export default App;
