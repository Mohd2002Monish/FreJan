import React, {useEffect, useState} from 'react';
import {View, Text, Modal, TextInput, StyleSheet} from 'react-native';
import {Button} from 'react-native-paper';
const Edit = ({fetchData, id}) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [roleNo, setRoleNo] = useState('');
  const [subject1, setSubject1] = useState('');
  const [subject2, setSubject2] = useState('');
  const [subject3, setSubject3] = useState('');
  const [totalMarks, setTotalMarks] = useState('');
  const fetchData2 = () => {
    fetch(`https://frejun.onrender.com/api/tables/${id}`)
      .then(response => response.json())
      .then(data => {
        setName(data.name);
        setEmail(data.email);
        setRoleNo(data.roll_number);
        setSubject1(data.subjects.Mathematics.toString());
        setSubject2(data.subjects.Science.toString());
        setSubject3(data.subjects.English.toString());
        setTotalMarks(data.total_marks.toString());
      })
      .catch(error => {
        console.error('Error:', error);
        // Handle error
      });
  };
  useEffect(() => {
    fetchData2();
  }, []);
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

    patchData(data);

    setName('');
    setEmail('');
    setRoleNo('');
    setSubject1('');
    setSubject2('');
    setSubject3('');
    setTotalMarks('');

    hideModal();
  };
  const patchData = data => {
    fetch(`https://frejun.onrender.com/api/tables/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => {
        if (response.ok) {
          console.log('Update successful');
          fetchData();
        } else {
          console.log('Update failed');
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return (
    <View>
      <Button onPress={showModal}>Edit</Button>
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

export default Edit;
