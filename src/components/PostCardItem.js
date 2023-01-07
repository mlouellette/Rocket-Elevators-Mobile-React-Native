import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { Card } from 'react-native-paper';
import { Feather } from '@expo/vector-icons';

const Button = ({ onPress, style, icon }) => (
  <TouchableOpacity style={style} onPress={onPress}>
    <Feather name={icon} size={24} />
  </TouchableOpacity>
)

// Post cards styling
export default function PostCardItem({ title, status, onEdit}) {
    const itemStyle = {
        padding: 16,
        margin: 16,
        elevation: 4,
        borderRadius: 8,
        backgroundColor: '#d9534f'
    }

  return (
    <Card style={itemStyle}>
      <View style={styles.rowView}>
        <View>
          <Text style={styles.title}>ID: {title}</Text>
          <Text style={{color:"white"}}>Status: {status}</Text>
        </View>
        <View style={styles.rowView}>
          <Button
            setSubmitText
            onPress={onEdit}
            icon="edit"
            style={{ marginHorizontal: 16 }} 
            />
         
        </View>
      </View>
    </Card>
  )
}

// Post card styling
const styles = StyleSheet.create({
  rowView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    
    
  },
  item: {
    padding: 16,
    margin: 16,
    elevation: 4,
    borderRadius: 8,
    
  },
  title: {
    fontSize: 18,
    color: 'white'
  },
})