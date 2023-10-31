import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, SafeAreaView, FlatList, TextInput } from 'react-native';
import Plus from './assets/plus.svg'
import Task from './components/Task';
import axios from 'axios';

export default function App() {

  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [todo, setTodo] = useState([]);

  const handlePress = () => {
    axios
      .post('http://10.0.0.6:3001/add', { task: task })
      .then((result) => {
        console.log(result);
        setTask('');  
        fetchUpdatedData();
      })
      .catch((err) => console.log(err));
  };

  const fetchUpdatedData = () => {
    axios
      .get('http://10.0.0.6:3001/get')
      .then((result) => {
        setTodo(result.data);
        const sortedTasks = result.data.sort((a, b) => (a.done ? 1 : -1));
        setTasks(sortedTasks);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchUpdatedData();
  }, []);

  const handleTaskDeleted = (deletedTaskId) => {
    const updatedTasks = tasks.filter(task => task._id !== deletedTaskId);
    setTasks(updatedTasks);
  };

  return (
    <View style={[
      styles.container0,
      {
        flexDirection: 'column'
      }
    ]}>
      <View style={styles.container1}>
          <View style={styles.back}>
            <TextInput
              style={styles.input}
              value={task}
              placeholder="Add item"
              onChangeText={(text) => setTask(text)}
            />
            <TouchableOpacity onPress={handlePress} style={styles.circle}>
              <Plus style={styles.plus} width={30} height={30}/>
            </TouchableOpacity>
          </View >
      </View>
      <View style={styles.container2}>
        <SafeAreaView>
          <Text style={styles.todo}>TO DO</Text>
          <FlatList
            data={tasks}
            renderItem={({item}) => <Task task={item.task} id={item._id} done={item.done}  onTaskDeleted={handleTaskDeleted}/>}
            keyExtractor={item => item._id}
            contentContainerStyle={{ paddingBottom: 50 }}
          />
        </SafeAreaView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container0: {
    flex: 1
  },
  container1: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    borderBottomWidth: 0.5,
    borderBottomColor: '#979dac',
    maxHeight: '20%'
  },
  container2: {
    flex: 2,
    backgroundColor: '#f8f9fa',
  },
  back: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#e9ecef',
    padding: 10,
    marginTop: 60,
    margin: 20,
    borderRadius: 50,
  },
  add: {
    color: '#343a40',
    marginLeft: 15,
    fontSize: 18
  },
  circle: {
    width: 40,
    height: 40,
    backgroundColor: '#028090',
    borderRadius: 50,
  },
  plus: {
    marginTop: 5,
    marginLeft: 5
  },
  todo: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#343a40',
    marginTop: 14,
    marginLeft: 40,
    marginBottom: 14
  },
  input: {
    marginLeft: 20,
    fontSize: 15,
  }
});
