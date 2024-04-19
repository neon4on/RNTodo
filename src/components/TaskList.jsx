import React, {useState} from 'react';
import {View, FlatList, TouchableOpacity, Text, StyleSheet} from 'react-native';
import TaskItem from './TaskItem';

function TaskList({tasks, deleteTask, toggleTaskStatus, startEditingTask}) {
  const [filterType, setFilterType] = useState('Все');

  const changeFilterType = type => {
    setFilterType(type);
  };

  const filteredTasks = tasks.filter(
    task => filterType === 'Все' || task.status === filterType,
  );

  return (
    <View>
      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[
            styles.filterButton,
            filterType === 'Все' && styles.activeFilterButton,
          ]}
          onPress={() => changeFilterType('Все')}>
          <Text style={styles.filterButtonText}>Все</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.filterButton,
            filterType === 'Актуальный' && styles.activeFilterButton,
          ]}
          onPress={() => changeFilterType('Актуальный')}>
          <Text style={styles.filterButtonText}>Актуальный</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.filterButton,
            filterType === 'В процессе' && styles.activeFilterButton,
          ]}
          onPress={() => changeFilterType('В процессе')}>
          <Text style={styles.filterButtonText}>В процессе</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.filterButton,
            filterType === 'Выполнен' && styles.activeFilterButton,
          ]}
          onPress={() => changeFilterType('Выполнен')}>
          <Text style={styles.filterButtonText}>Выполнен</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={filteredTasks}
        renderItem={({item, index}) => (
          <TaskItem
            item={item}
            index={index}
            deleteTask={deleteTask}
            toggleTaskStatus={toggleTaskStatus}
            startEditingTask={startEditingTask}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  filterButton: {
    backgroundColor: 'lightgray',
    padding: 10,
    borderRadius: 5,
  },
  activeFilterButton: {
    backgroundColor: 'gray',
  },
  filterButtonText: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default TaskList;
