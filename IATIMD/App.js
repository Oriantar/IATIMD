import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Button, ScrollView, StyleSheet, Text, View } from 'react-native';
import axios from 'axios';
import Geolocation from 'react-native-geolocation-service';

export default function App() {
  const apiKey = "5b9ab3da472582e0607641ff35664d31";
  const apiUrl = "https://api.openweathermap.org/data/2.5/weather?lat=57&lon=-2.15&appid=" + apiKey;
  const [weather, setData] = useState([]);
  const [temp, setTemp] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios.get(apiUrl)
      .then((response) => {
        setData(response.data.weather[0].description);
        setTemp(response.data.main.temp);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data: ', error);
      });

  }, []);


      
  if(!loading){
    return (
      
      <View style={styles.container}>
        <View style={styles.header}>
          <Text>Dit is de header</Text>
        </View>
        <Text style={styles.text}>Open up App.js to start working on your app!</Text>
        <Text style={styles.text}> . {weather}</Text>
        <Text style={styles.text}> . {temp}</Text>
        <StatusBar style="auto" />
      </View>

    );}
  
  
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    flexDirection: ' column',
  },
  text: {
    color: '#fff',
  },
  header: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    height: 100,
  },
  footer: {
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 0.2,
  }
});
