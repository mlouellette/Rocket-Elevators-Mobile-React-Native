
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Title } from "react-native-paper";
import React, { useEffect, useState } from 'react';

const ModalView = ({setLoading, setData, postId, title, onSubmit, cancelable, visible = false, onDismiss}) => {
    const buttonStyle = {
        borderRadius: 10,
        padding: 10,
        elevation: 1,
        paddingHorizontal: 20,
        marginTop: 50,
        backgroundColor: '#f44',
        marginLeft: 10


    }

    const modalViews = {
        margin: 30,
        display: "flex",
        borderRadius: 15,
        padding: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    }

    


    // Url for the list of elevators
    const url = 'https://0330-184-162-117-220.ngrok.io/api/Elevators/status'

    const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    };


  // Post fetch to display my elevators list
  const getPosts = async () => {
    
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

    }
    
    useEffect(() => {
        getPosts();
      
        
    }, [])
    
    // Styling conditions 
    const [submitText, setSubmitText] = useState("Activate")
    
    modalViews['backgroundColor'] = submitText === "Activate" ? '#d9534f' : '#5cb85c' 
    buttonStyle['backgroundColor'] = submitText === "Activate" ? '#5cb85c' : '#d9534f'
    // buttonStyle['display'] = submitText === "Activate" ? 'flex' : 'none'

    // Fetch api calling function under conditions Active/Inactive
    const pressing = () => {
        submitText === "Activate" ? editPost(postId, "Activate") : inactivePost(postId, "Inactive")
        submitText === "Activate" ? setSubmitText("Inactive") : setSubmitText("Activate")
        setTimeout(function(){submitText === "Inactive" ? setSubmitText("Activate") : setSubmitText("Activate")}, 10000)
     
    }
    
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onDismiss={onDismiss}
        >
            <View style={styles.centeredView}>
                <View style={modalViews}>
                    <Title style={styles.modalText}>{title}{postId}</Title>
                    <View>
                       <Text style={styles.modalText}>Status: {submitText === "Activate" ? "Inactive" : "Active"}</Text>
                    </View>
                    <View style={{ alignSelf: 'flex-end', alignItems: 'center',flexDirection: 'row', }}>
                        {cancelable && (<TouchableOpacity
                            style={{ ...styles.button, backgroundColor: 'white' }}
                            onPress={onDismiss}>
                            <Text style={[styles.textStyle, { color: "black" }]}>Back</Text>
                        </TouchableOpacity>)}

                        {onSubmit && (<TouchableOpacity
                            style={buttonStyle}
                            onPress={pressing}>
                            <Text style={styles.textStyle}>{submitText}</Text>
                        </TouchableOpacity>)}
                    </View>
                </View>
            </View>
        </Modal>
    );
};

// Default styling for ModalView
const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: 'rgba(0,0,0,0.6)'
    },
    modalView: {
        margin: 30,
        backgroundColor: "white",
        borderRadius: 15,
        padding: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 10,
        padding: 10,
        elevation: 1,
        paddingHorizontal: 20,
        marginTop: 50,
        backgroundColor: '#f44',
        marginLeft: 10,
        
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
        
    },
    modalText: {
        color: "white",
        marginBottom: 8,
    }
});

export default ModalView
