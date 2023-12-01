import React, { useState, useEffect } from "react";
import { View, TextInput, Text, Button, Alert } from "react-native";
import { Picker } from "@react-native-picker/picker";

const StaffDetailsScreen = ({ route, navigation }) => 
{
    const { staffMember } = route.params;
    const [departmentDictionary, setDepartmentDictionary] = useState({});
    [selectedDepartment, setSelectedDepartment] = useState("");

    const [newStaffID, setNewStaffID] = useState(staffMember.Id.toString());
    const [newFullName, setNewFullName] = useState(staffMember.Name);
    const [newPhoneNumber, setNewPhoneNumber] = useState(staffMember.Phone);
    const [newDepartment, setNewDepartment] = useState(
        staffMember.Department
    );
    const [newStreet, setNewStreet] = useState(
        staffMember.Address.Street
    );
    const [newZIPCode, setNewZIPCode] = useState(staffMember.Address.ZIP);
    const [newStateName, setNewStateName] = useState(staffMember.Address.State);
    const [newCountry, setNewCountry] = useState(
        staffMember.Address.Country
    );

    const setNavigationOptions = () => 
    {
      navigation.setOptions
      (
        {
          headerStyle: 
          {
              backgroundColor: "#941a1d",
          },
          headerTintColor: "#FFFFFF",
          headerTitle: "Staff Member Profile",
        }
      );
  };
  
  useEffect(() => 
  {
      setNavigationOptions();
      fetchDepartmentDictionary();
  }, 
  [
    navigation
  ]
  );

    const fetchDepartmentDictionary = async () => 
    {
        try 
        {
            const response = await fetch
            (
                "http://localhost/departments"
            );
            const data = await response.json();
            console.log("Departments received response: " + data.response);
            setDepartmentDictionary(data);

            const staffMemberDepartmentId = staffMember.Department.toString();
            console.log(
                "Setting department to: " + data[staffMemberDepartmentId]
            );
            setSelectedDepartment(data[staffMemberDepartmentId]);
            console.log("Set department to: " + selectedDepartment);
        } catch (error) 
        {
          console.error("Error fetching department dictionary:", error);
        }
    };

    const handleDelete = async () => 
    {
        Alert.alert(
            "Are you sure?",
            "Choosing DELETE will delete this staff member's profile!",
            [
                {
                    text: "CANCEL",
                    style: "cancel",
                },
                {
                    text: "DELETE",
                    onPress: async () => 
                    {
                        try 
                        {
                            const response = await fetch(
                                `http://localhost/staff/${staffMember.Id}`,
                                {
                                    method: "DELETE",
                                }
                            );

                            if (response.ok) 
                            {
                                Alert.alert(
                                    "All done!",
                                    "You've deleted this staff member's profile"
                                );
                                navigation.navigate("MainScreen");
                            } else 
                            {
                                Alert.alert
                                (
                                    "Uh-oh!",
                                    "Something went wrong!"
                                );
                            }
                        } 
                        catch (error) 
                        {
                          Alert.alert
                          (
                            "Uh-oh!",
                            "Something went wrong!"
                          );
                        }
                    },
                },
            ],
            { 
              cancelable: true 
            }
        );
    };

    const handleSaveChanges = async () => 
    {
        try 
        {
            const updatedStaffMember = 
            {
                Id: parseInt(newStaffID),
                Name: newFullName,
                Phone: newPhoneNumber,
                Department: parseInt(newDepartment),
                Address: 
                {
                    Street: newStreet,
                    ZIP: newZIPCode,
                    State: newStateName,
                    Country: newCountry,
                },
            };

            console.log(
                "The PUT request is being sent:",
                JSON.stringify(updatedStaffMember)
            );

            const response = await fetch(`http://localhost/staff/`, 
              {
                  method: "PUT",
                  headers: 
                  {
                      "Content-Type": "application/json",
                  },
                  body: JSON.stringify(updatedStaffMember),
              }
            );

            const textResponse = await response.text();

            if (response.ok) {
                const responseData = JSON.parse(textResponse);

                Alert.alert("All done!", "The changes were saved.");

                navigation.navigate("MainScreen");
            } else {
                Alert.alert("Uh-oh!", "There was a problem with saving the changes.");
            }
        } catch (error) {
            console.error("Error updating staff profile:", error);
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
            <Text
                style=
                {
                  { 
                    fontSize: 24, marginBottom: 20 
                  }
                }
            >{`${staffMember.Name}`}</Text>

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
                <Text>ID:</Text>
                <TextInput
                    value={newStaffID}
                    onChangeText={setNewStaffID}
                    style=
                    {
                      {
                        backgroundColor: "#D9D9D9",
                        marginBottom: 10,
                        borderRadius: 4,
                      }
                    }
                />
            </View>

            <View style=
            {
              { 
                width: "100%" 
              }
            }>
                <Text>Name:</Text>
                <TextInput
                    value={newFullName}
                    onChangeText={setNewFullName}
                    style=
                    {
                      {
                        backgroundColor: "#D9D9D9",
                        borderRadius: 4,
                        marginBottom: 10,
                      }
                    }
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
                        selectedValue={newDepartment.toString()}
                        onValueChange=
                        {(itemValue) =>
                            setNewDepartment(parseInt(itemValue))
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
                    value={newStreet}
                    onChangeText={setNewStreet}
                    style=
                    {
                      {
                        backgroundColor: "#D9D9D9",
                        borderRadius: 4,
                        marginBottom: 10,
                      }
                    }
                />
            </View>
            <View
                style=
                {
                  {
                    flexDirection: "row",
                    justifyContent: "space-between",
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
                        value={newZIPCode}
                        onChangeText={setNewZIPCode}
                        style=
                        {
                          {
                            backgroundColor: "#D9D9D9",
                            borderRadius: 4,
                            marginBottom: 10,
                          }
                        }
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
                          (itemValue) =>
                            setNewStateName(itemValue)
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
                    value={newCountry}
                    onChangeText={setNewCountry}
                    style=
                    {
                      {
                        backgroundColor: "#D9D9D9",
                        borderRadius: 4,
                        marginBottom: 10,
                      }
                    }
                />
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
                Phone Number
            </Text>

            <View style=
            {
              { 
                width: "100%" 
              }
            }>
                <Text>Phone:</Text>
                <TextInput
                    value={newPhoneNumber}
                    onChangeText={setNewPhoneNumber}
                    style=
                    {
                      {
                        backgroundColor: "#D9D9D9",
                        borderRadius: 4,
                        marginBottom: 10,
                      }
                    }
                />
            </View>

            <View
                style=
                {
                  {
                    flexDirection: "row",
                    justifyContent: "center",
                    width: "100%",
                  }
                }
            >
                <Button
                    title="Update"
                    color="#3b3b3b"
                    onPress={handleSaveChanges}
                />
                <Button title="Delete" color="#941a1d" onPress={handleDelete} />
            </View>
        </View>
    );
};

export default StaffDetailsScreen;
