import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

function TaskItem({
  item,
  index,
  deleteTask,
  toggleTaskStatus,
  startEditingTask,
}) {
  let itemBackgroundColor = 'lightskyblue';

  if (item.status === 'Актуальный') {
    itemBackgroundColor = 'lightcoral';
  } else if (item.status === 'В процессе') {
    itemBackgroundColor = 'lightsalmon';
  } else if (item.status === 'Выполнен') {
    itemBackgroundColor = 'lightgreen';
  }

  return (
    <TouchableOpacity onPress={() => toggleTaskStatus(index)}>
      <View style={[styles.taskItem, {backgroundColor: itemBackgroundColor}]}>
        <Text style={styles.taskText}>{item.text}</Text>
        <Text style={styles.taskDate}>
          {item.date ? item.date.toLocaleDateString() : ''}
        </Text>
        <Text style={styles.taskStatus}>{item.status}</Text>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => deleteTask(index)}>
          <Text style={styles.deleteButtonText}>Удалить</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => startEditingTask(item)}>
          <Text style={styles.editButtonText}>Редактировать</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  taskText: {
    color: 'black',
    fontSize: 16,
  },
  taskDate: {
    color: 'gray',
    fontSize: 14,
    marginTop: 5,
  },
  taskStatus: {
    marginTop: 5,
    fontSize: 14,
    fontWeight: 'bold',
    color: 'black',
  },
  taskItem: {
    backgroundColor: 'lightskyblue',
    padding: 20,
    marginVertical: 8,
    borderRadius: 5,
  },
  deleteButton: {
    backgroundColor: 'darkred',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignSelf: 'flex-start',
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  editButton: {
    backgroundColor: 'lightblue',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignSelf: 'flex-start',
  },
  editButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default TaskItem;
