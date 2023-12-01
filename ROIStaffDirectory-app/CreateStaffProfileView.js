import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, Button, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const CreateStaffProfileView = ({ navigation }) => {
  const [departmentDictionary, setDepartmentDictionary] = useState({});
  const [selectedDepartment, setSelectedDepartment] = useState(0);
  const [newFullName, setNewFullName] = useState('');
  const [newPhoneNumber, setNewPhoneNumber] = useState('');
  const [newStreet, setNewStreet] = useState('');
  const [newZIPCode, setNewZIPCode] = useState('');
  const [newStateName, setNewStateName] = useState('NSW');
  const [newCountry, setNewCountry] = useState('Australia');

  useEffect(() => 
  {
    fetchDepartmentDictionary();
    navigation.setOptions
    (
      {
        headerStyle: 
        {
          backgroundColor: '#941a1d',
        },
        headerTintColor: '#FFFFFF', 
      }
    );
  }, []);

  const fetchDepartmentDictionary = async () => 
  {
    try 
    {
      const response = await fetch('http://localhost/departments');
      const data = await response.json();
      setDepartmentDictionary(data);

      const firstDepartmentId = Object.keys(data)[0];
      setSelectedDepartment(data[firstDepartmentId]);
    } 
    catch (error) 
    {
    }
  };

  const handleAddStaffMember = async () => 
  {
    const newStaffMember = {
      Name: newFullName,
      Phone: newPhoneNumber,
      Department: parseInt(selectedDepartment),
      Address: 
      {
        Street: newStreet,
        ZIP: newZIPCode,
        State: newStateName,
        Country: newCountry,
      },
    };
        
    if (
    !newFullName || !newPhoneNumber || !newStreet || !newZIPCode || !newCountry ||
    newFullName.trim() === '' ||
    newPhoneNumber.trim() === '' ||
    newStreet.trim() === '' ||
    newZIPCode.trim() === '' ||
    newCountry.trim() === ''
    ) 
    {
      Alert.alert('Uh-oh...', "Please fill in all of the staff member's details.");
      return; 
    }

    try 
    {
      const response = await fetch('http://localhost/staff/', 
      {
        method: 'POST',
        headers: 
        {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newStaffMember),
      });

      if (response.ok) 
      {
        // Handle success scenario
        Alert.alert('Success', 'Staff member created successfully!');
      } 
      else 
      {
        // Handle failure scenario
        Alert.alert('Error', 'Failed to create staff member.');
      }
    } 
    catch (error) 
    {
      Alert.alert('Error', 'Failed to create staff member.');
    }
  };

  
  return (
      <View
          style=
          {
            {
              flex: 1,
              alignItems: "flex-start",
              justifyContent: "center",
              paddingHorizontal: 20,
              backgroundColor: "#D9D9D9",
            }
          }
      >
          <Text style=
          {
            { 
              fontSize: 24, marginBottom: 20 
            }
          }>
              Add Staff Member
          </Text>

          <Text
              style=
              {
                {
                  fontSize: 18,
                  marginBottom: 10,
                  alignSelf: "flex-start",
                }
              }
          >
              Personal Details
          </Text>

          <View style=
          {
            { 
              width: "100%" 
            }
          }>
              <Text>Name:</Text>
              <TextInput
                  placeholder="Enter name..."
                  style=
                  {
                    {
                      backgroundColor: "#D9D9D9",
                      marginBottom: 10,
                      borderRadius: 4,
                    }
                  }
                  onChangeText={setNewFullName}
              />
          </View>

          <View style=
          {
            { 
              width: "100%" 
            }
          }>
              <Text>Dept:</Text>
              {Object.keys(departmentDictionary).length > 0 ? (
                  <Picker
                      selectedValue={selectedDepartment}
                      onValueChange=
                      {
                        (itemValue) => setSelectedDepartment(itemValue)
                      }
                      style=
                      {
                        { 
                          marginBottom: 10 
                        }
                      }
                  >
                      {Object.entries(departmentDictionary).map(
                          ([id, departmentName]) => (
                              <Picker.Item
                                  label={departmentName}
                                  value={id}
                                  key={id}
                              />
                          )
                      )
                      }
                  </Picker>
              ) : (
                  <Text>Loading departments...</Text>
              )
              }
          </View>

          <Text
              style=
              {
                {
                  fontSize: 18,
                  marginBottom: 10,
                  alignSelf: "flex-start",
                }
              }
          >
              Address
          </Text>

          <View style=
          {
            { 
              width: "100%" 
            }
          }>
              <Text>Street:</Text>
              <TextInput
                  placeholder="Enter street..."
                  style=
                  {
                    {
                      backgroundColor: "#D9D9D9",
                      borderRadius: 4,
                      marginBottom: 10,
                    }
                  }
                  onChangeText={setNewStreet}
              />
          </View>

          <View
              style=
              {
                {
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: "100%",
                }
              }
          >
              <View style=
              {
                { 
                  width: "48%" 
                }
              }>
                  <Text>ZIP:</Text>
                  <TextInput
                      placeholder="Enter ZIP..."
                      style=
                      {
                        {
                          backgroundColor: "#D9D9D9",
                          borderRadius: 4,
                          marginBottom: 10,
                        }
                      }
                      onChangeText={setNewZIPCode}
                  />
              </View>

              <View style=
              {
                { 
                  width: "48%" 
                }
              }>
                  <Text>State:</Text>
                  <Picker
                      selectedValue={newStateName}
                      onValueChange=
                      {
                        (itemValue) => setNewStateName(itemValue)
                      }
                      style=
                      {
                        { 
                          marginBottom: 10 
                        }
                      }
                  >
                      <Picker.Item label="NSW" value="NSW" />
                      <Picker.Item label="ACT" value="ACT" />
                      <Picker.Item label="VIC" value="VIC" />
                      <Picker.Item label="QLD" value="QLD" />
                      <Picker.Item label="WA" value="WA" />
                      <Picker.Item label="SA" value="SA" />
                      <Picker.Item label="TAS" value="TAS" />
                      <Picker.Item label="NA" value="NA" />
                  </Picker>
              </View>
          </View>

          <View style=
          {
            { 
              width: "100%" 
            }
          }>
              <Text>Country:</Text>
              <TextInput
                  value='Australia'
                  placeholder="Enter country..."
                  style=
                  {
                    {
                      backgroundColor: "#D9D9D9",
                      borderRadius: 4,
                      marginBottom: 10,
                    }
                  }
                  onChangeText={setNewCountry}
              />
          </View>
          <View style=
          {
            { 
              width: "100%" 
            }
          }>
              <Text>Phone:</Text>
              <TextInput
                  placeholder="Enter phone number..."
                  style=
                  {
                    {
                      backgroundColor: "#D9D9D9",
                      borderRadius: 4,
                      marginBottom: 10,
                    }
                  }
                  onChangeText={setNewPhoneNumber}
              />
          </View>

          <View
              style=
              {
                {
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#D9D9D9",
                }
              }
          >
              <Button
                  title="Add Staff Member"
                  color="#3b3b3b"
                  onPress={handleAddStaffMember}
              />
          </View>
      </View>
  );
};

export default CreateStaffProfileView;
