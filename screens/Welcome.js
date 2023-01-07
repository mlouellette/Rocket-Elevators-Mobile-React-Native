import { StatusBar, } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, SafeAreaView, Platform } from 'react-native';
import { Surface, Title, TextInput } from 'react-native-paper';
import ModalView from './../src/components/ModalView';
import PostCardItem from './../src/components/PostCardItem';

import {
    ButtonText,
    StyledButton,
    Line,

} from './../components/styles';

// Url for the list of elevators
const url = 'https://0330-184-162-117-220.ngrok.io/api/Elevators/status'

const headers = {
'Content-Type': 'application/json',
'Accept': 'application/json',
};

const Welcome = ({navigation, setSubmitText}) => {

  const [data, setData] = useState([]);
  const [visible, setVisible] = useState(false);
  const [id, setID] = useState('');
  const [elevator_status, setElevator_status] = useState('');
  const [postId, setPostId] = useState(0);
  const [loading, setLoading] = useState(false);

  // Post fetch to display my elevators list
  const getPosts = async () => {
    setLoading(true)
    await fetch(url)
      .then((res) => res.json())
      .then((res) => {
        setData(res);
      })
      .catch(e => console.log(e))
    setLoading(false)
  }

  // PUT fetch to change the specific elevator id status to Active
  const editPost = (id, elevator_status) => {
    fetch('https://0330-184-162-117-220.ngrok.io/api/Elevators/' + id + '/status/' + "Active", {
      method: "PUT",
      headers,
      body: JSON.stringify({
        "elevator_status": elevator_status,
      
      })
    }).then((res) => { 
        res.json()
    })
      .then(resJson => {
        updatePost()
      }).catch(e => { console.log(e) })
  }

  // PUT fetch to change the specific elevator id status to Inactive
  const inactivePost = (id, elevator_status) => {
    fetch('https://0330-184-162-117-220.ngrok.io/api/Elevators/' + id + '/status/' + "Inactive", {
      method: "PUT",
      headers,
      body: JSON.stringify({
        "elevator_status": elevator_status,
      
      })
    }).then((res) => { 
        res.json()
    })
      .then(resJson => {
        updatePost()
      }).catch(e => { console.log(e) })
  }

// update the page when a new edit is made
  const updatePost = () => {
    getPosts()
    setVisible(false);
    setElevator_status('')
    setID('')
    setPostId(id)

  }

  // Change the visibility of elevators list
  const edit = (ele_id, elevator_status) => {
    setVisible(true)
    setPostId(ele_id)
    setElevator_status(elevator_status)

  }

  useEffect(() => {
    getPosts();
  }, [])

    return (
      // Main view of the home page
      <>
        <SafeAreaView style={styles.container}>
            <StatusBar style="auto" />
            <Surface style={styles.header}>
                <Title>Elevators</Title>

            </Surface>
            <FlatList
                data={data}
                keyExtractor={(item, index) => item.id + index.toString()}
                refreshing={loading}
                onRefresh={getPosts}
                
                renderItem={({ item }) => (
                <PostCardItem
                    title={item.id}
                    status={item.elevator_status}
                    onEdit={() => edit(item.id, item.elevator_status)}
                    onDelete={() => deletePost(item.id)}
                />
                )}
            />
            <ModalView
                // Elevator status screen pop-up 
                setElevator_status={setElevator_status}
                elevator_status={elevator_status}
                setLoading={setLoading}
                setData={setData}
                setSubmitText={setSubmitText}
                postId={postId}
                visible={visible}
                title="Elevator ID: "
                onDismiss={() => setVisible(false, setSubmitText = "Activate")}
                onSubmit={() => {
                
                // Calls the editPost function if the id goes inactive and calls back 
                // InactivePost to turn the status back to inactive to simulate operations
                if (elevator_status == "Inactive") {
                    editPost(postId, "Active");
                    setTimeout(function(){inactivePost(postId, "Inactive")} , 15000);

                    } 
                  }
                }

                cancelable
              >

            <TextInput 
              editable={false}
              label="Elevator Status"
              value={elevator_status}
              onChangeText={(text) => setElevator_status(text)}
              mode="outlined"
            />
            </ModalView>
            </SafeAreaView>
                 
            <Line /> 
            {/* Logout button */}
            <StyledButton onPress={() => navigation.navigate('Login')}>
              <ButtonText>Logout</ButtonText>
            </StyledButton>
     
      </>
    );
};

// Styling
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      justifyContent: 'center',
      
    },
    header: {
      marginTop: Platform.OS === 'android' ? 24 : 0,
      padding: 16,
      elevation: 2,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    button: {
      padding: 10,
      borderRadius: 20,
    
    },
    buttonText: {
      color: 'white'
    },
  });

export default Welcome;