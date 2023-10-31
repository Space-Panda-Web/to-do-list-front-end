import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Trash from '../assets/trash-2.svg';
import Check from '../assets/check.svg';
import axios from 'axios';

const Task = (props) => {

  const [isDone, setIsDone] = useState(props.done);

  const handleEdit = (id) => {
    axios
      .put('http://10.0.0.6:3001/update/' + id)
      .then(result => {
        console.log(result);
        setIsDone(true); 
      })
      .catch(err => console.log(err));
  };

  const handleDelete = (id) => {
    axios
      .delete('http://10.0.0.6:3001/delete/' + id)
      .then(result => {
        console.log(result);
        // Call the callback function to update the list of tasks in the parent component.
        if (props.onTaskDeleted) {
          props.onTaskDeleted(id);
        }
      })
      .catch(err => console.log(err));
  };

  return (
    <View style={styles.item}>
      <View style={styles.itemLeft}>
        {isDone ? (
          <TouchableOpacity style={styles.circleCheck}>
            <Check style={styles.check} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => handleEdit(props.id)} style={styles.circle}>
          </TouchableOpacity>
        )}
        {isDone ? (
           <Text style={styles.labelCheck}>{props.task}</Text>
        ) : (
          <Text style={styles.label}>{props.task}</Text>
        )}
        <TouchableOpacity onPress={() => handleDelete(props.id)}>
          <Trash style={styles.trash}/>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#f8f9fa',
    borderColor: '#979dac',
    padding: 20,
    borderRadius: 15,
    margin: 5,
    marginLeft: 20,
    marginRight: 20,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
    borderWidth: 0.7
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  circle: {
    width: 21,
    height: 21,
    borderWidth: 0.3,
    borderRadius: 10,
    marginRight: 15,
    backgroundColor: '#f8f9fa'
  },
  label: {
    marginRight: 20
  },
  circleCheck: {
    width: 21,
    height: 21,
    borderRadius: 10,
    marginRight: 15,
    backgroundColor: '#bcfcac'
  },
  check: {
    marginTop: 2,
    marginLeft: 2
  },
  labelCheck: {
    marginRight: 30,
    color: '#adb5bd',
    textDecorationLine: 'line-through'
  },
});

export default Task;