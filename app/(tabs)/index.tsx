import { useRouter } from 'expo-router';
import React from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function Dashboard() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      
      {/* TOP SHAPE */}
      <View style={styles.topShape} />

      <View style={styles.content}>

        {/* TITLE */}
        <Text style={styles.title}>COFFEE</Text>
        <Text style={styles.title}>SHOP</Text>

        {/* SUBTITLE */}
        <Text style={styles.subtitle}>
          Top offers for top coffee lovers like you.
        </Text>

        {/* IMAGE */}
        <Image
          source={{
            uri: 'https://cdn-icons-png.flaticon.com/512/924/924514.png',
          }}
          style={styles.image}
        />

       {/* BUTTON */}
<TouchableOpacity
  style={styles.orderButton}
  onPress={() => router.push('/home')}
>
  <Text style={styles.orderText}>ORDER NOW</Text>
</TouchableOpacity>

{/* CREDIT */}
<Text style={styles.credit}>
  kholifah (411253006)
</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F1EC',
  },

  topShape: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 220,
    height: 180,
    backgroundColor: '#a36f4d',
    borderBottomLeftRadius: 120,
  },

  content: {
    flex: 1,
    paddingHorizontal: 30,
    paddingTop: 80,
  },

  title: {
    fontSize: 50,
    fontWeight: 'bold',
    color: '#8f5427',
    lineHeight: 55,
  },

  subtitle: {
    marginTop: 20,
    fontSize: 18,
    color: '#9C6B4A',
    width: '85%',
  },

  discountBox: {
    marginTop: 30,
    borderWidth: 2,
    borderColor: '#6D4C41',
    borderRadius: 50,
    width: 190,
    paddingVertical: 12,
    alignItems: 'center',
  },

  discountText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#6D4C41',
  },

  image: {
    width: 280,
    height: 280,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: 30,
    marginBottom: 50,
  },

  orderButton: {
    backgroundColor: '#5D4037',
    paddingVertical: 16,
    borderRadius: 40,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 50,
  },

  orderText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  credit: {
  textAlign: 'center',
  marginTop: 18,
  fontSize: 14,
  color: '#8f5427',
  fontStyle: 'italic',
},
});