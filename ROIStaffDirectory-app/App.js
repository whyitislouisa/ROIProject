  import { Button, StatusBar, FlatList, Pressable, Text, View, ToastAndroid, Dimensions } from 'react-native';
  import * as Font from 'expo-font';
  import React, { useState, useEffect } from 'react';
  import { NavigationContainer } from '@react-navigation/native';
  import { createStackNavigator } from '@react-navigation/stack';
  import * as ScreenOrientation from 'expo-screen-orientation';
  
  import StaffMemberProfleView from './StaffMemberProfileView';
  import CreateStaffProfileView from './CreateStaffProfileView';
  import SettingsMenuView from './SettingsMenuView';

  const uri = 'http://192.168.1.115:3000/staff';

  const Stack = createStackNavigator();

  export default function App() 
  {
    const {width, height} = Dimensions.get('window');

    const [trebuchetComplete, isTrebuchetComplete] = useState(false);
    const [staffMembersDictionary, updateStaffMemberDictionary] = useState([]);

    const loadFont = async () => 
    {
      await Font.loadAsync(
        {
        Trebuchet: require('./assets/fonts/Trebuchet.ttf'),
        }
      ).then(
        () => 
        {
          isTrebuchetComplete(true);
        }
      ).catch(
        (error) => 
      {
        console.error('Error loading font:', error);
      });
    };
    

    function handleOrientationAndLoadFont() 
    {
      let isitATablet = width > 600;
    
      if (isitATablet) 
      {
        ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
      }
    
      loadFont();
      startUpStaffMembersList();
    }
    
    useEffect(handleOrientationAndLoadFont, []);

    if (!trebuchetComplete || staffMembersDictionary.length === 0) 
    {
      return null;
    }

    async function startUpStaffMembersList() 
    {
      try 
      {
        const response = await fetch(uri);
        const data = await response.json();
        console.log('Fetched staff members:', data);
        updateStaffMemberDictionary(data);
      } 
      catch (error) 
      {
        console.error('There was a problem with fetching the staff members:', error);
      }
    }

    return (
      <NavigationContainer>
        <StatusBar backgroundColor="#D9D9D9" barStyle="dark-content" />
        <Stack.Navigator initialRouteName="MainScreen">
          <Stack.Screen
            name="MainScreen"
            component={MainScreen}
            options={({ navigation }) => 
            (
              {
              title: 'Staff Members',
              headerStyle: 
              {
                backgroundColor: '#941a1d',
              },
              headerTintColor: '#FFFFFF',
              headerRight: () => 
              (
                <Button
                  onPress=
                  {
                    () => navigation.navigate('SettingsMenuView')
                  }
                  title="Settings"
                  color="#3b3b3b"
                />
              ),
            }
            )
          }
            initialParams=
            {
              {
                staffMembers: staffMembersDictionary, setStaffMembers: updateStaffMemberDictionary 
              }
            }
          />
          <Stack.Screen name="CreateStaffProfileView" component=
          {
            CreateStaffProfileView
          } 
          options=
          {
            { 
              title: 'Create Staff Member' 
            }
          } />
          <Stack.Screen name="SettingsMenuView" component=
          {
            SettingsMenuView
          } 
          options=
          {
            { 
              headerShown: true, 
              title: '',
            }
          } />
          <Stack.Screen name="StaffMemberProfileView" component=
          {
            StaffMemberProfleView
          } 
          options=
          {
            { 
              title: 'Staff Details' 
            }
          } />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

  const MainScreen = 
  (
    { 
      navigation, route 
    }
  ) => 
  {
    const { staffMembers, setStaffMembers } = route.params;
    const [departmentDictionary, setDepartmentDictionary] = useState({});

    async function fetchStaffMembers() 
    {
      try 
      {
        const response = await fetch(uri);
        const data = await response.json();
        console.log('Fetched staff members:', data);
        updateStaffMemberDictionary(data);
      } 
      catch (error) 
      {
        console.error('There was a problem with fetching the staff members:', error);
      }
    }

    useEffect(() => {
      setStaffMembers(staffMembers);
      fetchDepartmentDictionary();
    }, [staffMembers]);


    const fetchDepartmentDictionary = async () => 
    {
      try 
      {
        const response = await fetch('http://192.168.1.115:3000/departments');
        const data = await response.json();
        setDepartmentDictionary(data);
      } 
      catch (error) 
      {
        console.error('Error fetching department dictionary:', error);
      }
    };

    const renderItem = ({ item }) => 
    (
      <Pressable onPress={() => handleStaffMemberPress(item)}>
        <View style={styles.itemContainer}>
          <Text style={styles.itemText}>{item.Name}</Text>
          <Text style={styles.subtitle}>{getDepartmentName(item.Department)}</Text>
        </View>
      </Pressable>
    );

  const getDepartmentName = (departmentId) => 
  {
    return departmentDictionary[departmentId] || 'Unknown Department';
  };

    const handleStaffMemberPress = (staffMember) => 
    {
      console.log('Pressed:', staffMember);
      navigation.navigate('StaffMemberProfileView', { staffMember });
    };

    return (
      <View style={styles.container}>
        <FlatList
          data={staffMembers}
          keyExtractor={(item) => (item.Id ? item.Id.toString() : Math.random().toString())}
          renderItem={renderItem}
        />

        <View style={styles.addButtonContainer}>
          <Pressable 
          onPress=
          {
            () => navigation.navigate('CreateStaffProfileView')
          }>
            <Text style={styles.addButton}>Add New Staff Member</Text>
          </Pressable>
        </View>
      </View>
    );
  };


  const styles = 
  {
    container: 
    {
      flex: 1,
      backgroundColor: '#D9D9D9',
    },
    header: 
    {
      backgroundColor: '#d9d9d9',
      paddingTop: 40,
      alignItems: 'center',
      justifyContent: 'center',
    },
    headerText: 
    {
      fontFamily: 'Trebuchet',
      fontSize: 20,
    },
    content: 
    {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    itemContainer: 
    {
      backgroundColor: '#ededed',
      padding: 10,
      width: '100%',
      alignSelf: 'stretch',
    },
    itemText: 
    {
      fontFamily: 'Trebuchet',
      fontSize: 16,
      textAlign: 'left',
      marginLeft: 5,
    },
    addButtonContainer: 
    {
      position: 'absolute',
      bottom: 20,
      alignSelf: 'center',
    },
    addButton: 
    {
      fontFamily: 'Trebuchet',
      fontSize: 16,
      textAlign: 'center',
      backgroundColor: '#941a1d',
      color: '#ffffff',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
    },
    subtitle: 
    {
      fontFamily: 'Trebuchet', 
      fontSize: 14,
      color: '#666666',
      marginLeft: 18, // Increase the margin to push the department text further right
    },
  };

