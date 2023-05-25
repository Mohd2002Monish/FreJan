import React, {useState} from 'react';
import {View, Text, Modal, TextInput, StyleSheet} from 'react-native';
import {Button} from 'react-native-paper';
const MyComponent = ({fetchData}) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [roleNo, setRoleNo] = useState('');
  const [subject1, setSubject1] = useState('');
  const [subject2, setSubject2] = useState('');
  const [subject3, setSubject3] = useState('');
  const [totalMarks, setTotalMarks] = useState('');

  const showModal = () => {
    setModalVisible(true);
  };

  const hideModal = () => {
    setModalVisible(false);
  };

  const handleSubmit = () => {
    const data = {
      name: name,
      roll_number: roleNo,
      grade: '10th',
      email: email,
      subjects: {
        Mathematics: subject1 * 1,
        Science: subject2 * 1,
        English: subject3 * 1,
      },
      total_marks: totalMarks * 1,
    };

    if (!data.name == '' && !data.email == '') {
      postData(data);
    }

    setName('');
    setEmail('');
    setRoleNo('');
    setSubject1('');
    setSubject2('');
    setSubject3('');
    setTotalMarks('');

    hideModal();
  };
  const postData = data => {
    fetch('https://frejun.onrender.com/api/tables', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(responseData => {
        console.log('Response:', responseData);
        fetchData();
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return (
    <View>
      <Button onPress={showModal}>Add New</Button>
      <View style={styles.container}>
        <Modal
          visible={isModalVisible}
          animationType="slide"
          transparent={true}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Enter Details</Text>

              <TextInput
                style={styles.input}
                placeholder="Name"
                value={name}
                onChangeText={text => setName(text)}
              />

              <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={text => setEmail(text)}
              />

              <TextInput
                style={styles.input}
                placeholder="Role No"
                value={roleNo}
                onChangeText={text => setRoleNo(text)}
              />

              <TextInput
                style={styles.input}
                placeholder="Maths"
                value={subject1}
                onChangeText={text => setSubject1(text)}
              />

              <TextInput
                style={styles.input}
                placeholder="English"
                value={subject2}
                onChangeText={text => setSubject2(text)}
              />

              <TextInput
                style={styles.input}
                placeholder="Science"
                value={subject3}
                onChangeText={text => setSubject3(text)}
              />

              <TextInput
                style={styles.input}
                placeholder="Total Marks (out of 300)"
                value={totalMarks}
                onChangeText={text => setTotalMarks(text)}
                keyboardType="numeric"
              />

              <Button onPress={handleSubmit}>Submit</Button>
              <Button onPress={hideModal}>Cancel</Button>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 8,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  button: {
    marginBottom: 100,
  },
});

export default MyComponent;
