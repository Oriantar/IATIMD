import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Button, ScrollView, StyleSheet, Text, View, Image } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import * as Location from 'expo-location';


export default function Weather() {
  const apiKey = "5b9ab3da472582e0607641ff35664d31";
  const source = axios.CancelToken.source();
  const [weather, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [weatherStatus, setWeatherStatus] = useState([null]);
  useEffect(() => {
    getLocation();

    return () => {
      source.cancel('Component unmounted');
    };

  }, []);

  const getLocation = async () => {

    try {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        console.error('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});

      await new Promise(resolve => setTimeout(resolve, 1000));

      var apiUrl = "https://api.openweathermap.org/data/2.5/weather?lat=" + location.coords.latitude + "&lon=" + location.coords.longitude + "&appid=" + apiKey + "&units=metric";

      axios.get(apiUrl, { cancelToken: source.token })
        .then((response) => {
          setData(response.data);
          setLoading(false);
          WeatherStatus();
        })
        .catch((error) => {
          if (axios.isCancel(error)) {
            console.log('Request cancelled', error.message);
          } else {
            console.error('Error fetching data: ', error);
          }
        });
    } catch (error) {
      console.error('Error fetching location', error);
    }
  };

  const WeatherStatus = () => {
    if (weather.weather[0].main.includes('Rain')) {
      setWeatherStatus('Het regent');
    }
    if (weather.main.temp < 10) {
      setWeatherStatus("Het is te koud");
    } else if (weather.main.temp > 10 && weather.main.temp < 20) {
      setWeatherStatus("Het is niet aangeraden, maar te doen");
    } else {
      setWeatherStatus("Het is goed weer voor een teras");
    }
  }

  const navigation = useNavigation();
  if(loading) return (<Text>Loading...</Text>);
  else{
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text>Dit is de header</Text>
      </View>
  
      {weather.weather && weather.weather.length > 0 && weather.main && (
        <>
          <Image
            style={{ width: 200, height: 200 }}
            source={{
              uri: 'http://openweathermap.org/img/w/' + weather.weather[0].icon + '.png',
            }}
          />
          <Text style={styles.text}>{weather.weather[0].main}</Text>
          <Text style={styles.text}>{weather.weather[0].description}</Text>
          <Text style={styles.text}> stad: {weather.name}</Text>
          <Text style={styles.text}> {weather.main.temp} C</Text>
          <Text style={styles.text}> {weatherStatus}</Text>
        </>
      )}
  
      <StatusBar style="auto" />
      <Button
        title="Home"
        onPress={() => navigation.navigate('Home')}
      />
    </View>
  );

}
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    flexDirection: ' column',
  },
  text: {
    color: '#fff',
    fontSize: 25,
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
