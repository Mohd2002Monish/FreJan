import React, {useState, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, DataTable} from 'react-native-paper';
import MyComponent from './AddStudent';
import Edit from './EditStudent';

const MyTable = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch('https://frejun.onrender.com/api/tables')
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error(error));
  };
  const handleDelete = id => {
    fetch(`https://frejun.onrender.com/api/tables/${id}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (response.ok) {
          console.log('Deletion successful');
          fetchData();
        } else {
          console.log('Deletion failed');
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };
  const handleSortAcc = () => {
    const newData = [...data];
    newData.sort((a, b) => {
     return a.total_marks - b.total_marks;
    });
    setData(newData);
  };
  const handleSortDec = () => {
    const newData = [...data];
    newData.sort((a, b) => {
      return b.total_marks - a.total_marks;
    });
    console.log(newData);
    setData(newData);
  };
  return (
    <View>
      <View style={{flexDirection: 'row'}}>
        <Button onPress={handleSortDec} style={{flex: 1}}>
          Highest Marks
        </Button>
        <Button onPress={handleSortAcc} style={{flex: 2}}>
          Lowest Marks
        </Button>
      </View>
      <DataTable style={styles.container}>
        <DataTable.Header style={styles.tableHeader}>
          <DataTable.Title>Roll No.</DataTable.Title>
          <DataTable.Title>Name</DataTable.Title>
          <DataTable.Title>Total</DataTable.Title>
          <DataTable.Title>Delete</DataTable.Title>
          <DataTable.Title>Edit</DataTable.Title>
        </DataTable.Header>

        {data.map(el => {
          return (
            <DataTable.Row key={el.roll_number}>
              <DataTable.Cell>{el.roll_number}</DataTable.Cell>
              <DataTable.Cell>{el.name}</DataTable.Cell>
              <DataTable.Cell>{el.total_marks}</DataTable.Cell>

              {/* <DataTable.Cell><Button onPress={()=>handleEdit(el._id)}>Edit</Button></DataTable.Cell> */}
              <DataTable.Cell>
                <Button onPress={() => handleDelete(el.email)}>Delete</Button>
              </DataTable.Cell>
              <DataTable.Cell>
                <Edit fetchData={fetchData} id={el._id} />
              </DataTable.Cell>
            </DataTable.Row>
          );
        })}
      </DataTable>
      <MyComponent fetchData={fetchData} />
    </View>
  );
};

export default MyTable;

const styles = StyleSheet.create({
  container: {
    padding: 5,
  },
  vBox: {
    flex: 1,
    // flexDirection: 'row',
  },
  tableHeader: {
    backgroundColor: '#DCDCDC',
  },
});
