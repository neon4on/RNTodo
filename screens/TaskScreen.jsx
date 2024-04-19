import React, {useState, useEffect} from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import TaskList from '../components/TaskList';
import AddTaskForm from '../components/AddTaskForm';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RegistrationScreen from './RegistrationScreen';
import TabBar from '../components/TabBar';

function TaskScreen() {
  const [tasks, setTasks] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [activeTab, setActiveTab] = useState('tasks');

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
    <View style={styles.container}>
      <TabBar activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === 'tasks' ? (
        <>
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
        </>
      ) : (
        <RegistrationScreen />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'lightcyan',
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'gray',
  },
  activeTab: {
    borderBottomColor: 'blue',
  },
  tabText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default TaskScreen;
