import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';

// formik
import {Formik} from 'formik';

// icons
import {Octicons, Ionicons, Fontisto} from '@expo/vector-icons';

// API client
import axios from 'axios';

import {
    StyledContainer,
    InnerContainer,
    PageLogo,
    PageTitle,
    SubTitle,
    StyledFormArea,
    LeftIcon,
    StyledInputLabel,
    StyledTextInput,
    RightIcon,
    Colors,
    ButtonText,
    StyledButton,
    MsgBox,


} from './../components/styles';
import {View} from 'react-native';

// colors
const {brand, darkLight} = Colors; 

// Keyboard avoiding view
import KeyboardAvoidingWrapper from './../components/KeyboardAvoidingWrapper';

// Login page
const Login = ({navigation}) => {
    const [credentials, setCredentials] = useState({email: '', password: ''});

    const [hidePassword, setHidePassword] = useState(true);
    const [message, setMessage] = useState();
    const [messageType, setMessageType] = useState();

    // Function saves the email value in text
    const setEmail = text => {
        setCredentials(existingValues => ({
          // Retain the existing values
          ...existingValues,
          // update the firstName
          email: text,
        }))
      }

      // Function saves the Password value in text
      const setPassword = text => {
        setCredentials(existingValues => ({
          // Retain the existing values
          ...existingValues,
          // update the lastName
          password: text,
        }))
      }

    // Handle login axios api if the email is in the database: return true, else Error message 
    const handleLogin = async () => {

        try {
            const response = await axios.get('https://0330-184-162-117-220.ngrok.io/api/user/' + credentials.email);
            console.log(response.data);
            const employee = response.data;
            console.log("Employee", employee);
            if (employee == true) {
                navigation.navigate('Welcome');

            } else {
                handleMessage('Email address do not exist')
                setTimeout(function(){handleMessage('')} , 5000);
            }

        } catch (err) {
            console.warn("[handleLogin] Error:", err);
        }


    };
    
    // Error message display
    const handleMessage = (message, type = "FAILED") => {
        setMessage(message);
        setMessageType(type);
    } 

    return (
        <KeyboardAvoidingWrapper><StyledContainer>
           <StatusBar style="dark" />
           <InnerContainer>
                <PageLogo resizeMode="cover" source={require('./../assets/img/R2.png')} />
                <PageTitle>Mobile Application</PageTitle>
                <SubTitle>Please Login</SubTitle>

                <Formik
                    initialValues={{email: '', password: ''}}
                    onSubmit={(values, {setSubmitting}) => {
                        if (values.email == '' || values.password == '') {
                            handleMessage("Please fill all the fields");
                            setSubmitting(false);
                        } else {
                            handleLogin(setSubmitting);
                            
                        }
                    }}
                >{({handleChange, handleSubmit}) => (<StyledFormArea>
                    <MyTextInput
                        label="Email Address"
                        icon="mail"
                        placeholder="example@example.com"
                        placeholderTextColor={darkLight}

                        value={credentials.email}
                        onChangeText={setEmail}

                        onBlur={handleChange('email')}
                        keyboardType="email-address"
                    />

                    <MyTextInput
                        label="Password"
                        icon="lock"
                        placeholder="* * * * * *"
                        placeholderTextColor={darkLight}
                        onBlur={handleChange('password')}

                        value={credentials.password}
                        onChangeText={setPassword}

                        secureTextEntry={hidePassword}
                        isPassword={true}
                        hidePassword={hidePassword}
                        setHidePassword={setHidePassword}
                    />
                    <MsgBox type={messageType}>{message}</MsgBox>
                    <StyledButton onPress={handleSubmit}>
                        <ButtonText>
                            Login
                        </ButtonText>
                    </StyledButton>

                </StyledFormArea>)}

                </Formik>
           </InnerContainer>
        
         </StyledContainer>
        </KeyboardAvoidingWrapper>
    );
};

const MyTextInput = ({label, icon, isPassword, hidePassword, setHidePassword, ...props}) => {
    return (
        <View>
            <LeftIcon>
                <Octicons name={icon} size={30} color={brand} />
            </LeftIcon>
            <StyledInputLabel>{label}</StyledInputLabel>
            <StyledTextInput {...props} />
            {isPassword && (
                <RightIcon onPress={() => setHidePassword(!hidePassword)}>
                    <Ionicons name={hidePassword ? 'md-eye-off' : 'md-eye'} size={30} color={darkLight} />
                </RightIcon>
            )}
        </View>
    )

}

export default Login;