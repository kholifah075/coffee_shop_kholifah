import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
    Alert,
    Image,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

interface CartItem {
  id: number;
  name: string;
  price: number;
  qty: number;
}

export default function OrderFinished() {
  const router = useRouter();
  const { data } = useLocalSearchParams();

  const cart: CartItem[] = data ? JSON.parse(data as string) : [];

  const [proofImage, setProofImage] = useState<string | null>(null);

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const shipping = 10000;
  const total = subtotal + shipping;

  const takePhoto = async () => {
    const permission =
      await ImagePicker.requestCameraPermissionsAsync();

    if (!permission.granted) {
      Alert.alert("Izin Kamera", "Izinkan akses kamera.");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      quality: 0.8,
    });

    if (!result.canceled) {
      setProofImage(result.assets[0].uri);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>

        {/* STATUS */}

        <View style={styles.success}>
          <Ionicons
            name="checkmark-circle"
            size={70}
            color="#4CAF50"
          />

          <Text style={styles.successTitle}>
            Pesanan Selesai
          </Text>

          <Text style={styles.successSub}>
            Terima kasih telah berbelanja.
          </Text>
        </View>

        {/* INFORMASI */}

        <View style={styles.card}>
          <Text style={styles.title}>
            Informasi Pesanan
          </Text>

          <View style={styles.row}>
            <Text>No Pesanan</Text>
            <Text>INV00001</Text>
          </View>

          <View style={styles.row}>
            <Text>Status</Text>
            <Text style={{color:"green"}}>
              Selesai
            </Text>
          </View>

          <View style={styles.row}>
            <Text>Pembayaran</Text>
            <Text>Cash</Text>
          </View>
        </View>

        {/* ALAMAT */}

        <View style={styles.card}>
          <Text style={styles.title}>
            Alamat Pengiriman
          </Text>

          <Text style={styles.bold}>
            Kholifah
          </Text>

          <Text>08123456789</Text>

          <Text>
            Jl. Ahmad Yani No.10{"\n"}
            Purwokerto
          </Text>
        </View>

        {/* PRODUK */}

        <View style={styles.card}>
          <Text style={styles.title}>
            Produk
          </Text>

          {cart.map((item) => (
            <View
              key={item.id}
              style={styles.product}
            >
              <View>
                <Text style={styles.bold}>
                  {item.name}
                </Text>

                <Text>
                  {item.qty} x Rp
                  {item.price.toLocaleString("id-ID")}
                </Text>
              </View>

              <Text>
                Rp
                {(item.qty * item.price).toLocaleString(
                  "id-ID"
                )}
              </Text>
            </View>
          ))}
        </View>

        {/* TOTAL */}

        <View style={styles.card}>
          <Text style={styles.title}>
            Rincian Pembayaran
          </Text>

          <View style={styles.row}>
            <Text>Subtotal</Text>
            <Text>
              Rp{subtotal.toLocaleString("id-ID")}
            </Text>
          </View>

          <View style={styles.row}>
            <Text>Ongkir</Text>
            <Text>
              Rp{shipping.toLocaleString("id-ID")}
            </Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.total}>
              Total
            </Text>

            <Text style={styles.total}>
              Rp{total.toLocaleString("id-ID")}
            </Text>
          </View>
        </View>

        {/* FOTO BUKTI */}

        <View style={styles.card}>
          <Text style={styles.title}>
            Bukti Penerimaan
          </Text>

          {proofImage ? (
            <Image
              source={{ uri: proofImage }}
              style={styles.image}
            />
          ) : (
            <View style={styles.empty}>
              <Ionicons
                name="camera-outline"
                size={45}
                color="#999"
              />

              <Text>
                Belum ada foto
              </Text>
            </View>
          )}

          <TouchableOpacity
            style={styles.cameraButton}
            onPress={takePhoto}
          >
            <Ionicons
              name="camera"
              color="#fff"
              size={20}
            />

            <Text style={styles.cameraText}>
              Ambil Bukti
            </Text>
          </TouchableOpacity>
        </View>

      </ScrollView>

      {/* FOOTER */}

      <TouchableOpacity
        style={styles.buyAgain}
        onPress={() => router.replace("/(tabs)/cart")}
      >
        <Text style={styles.buyText}>
          Beli Lagi
        </Text>
      </TouchableOpacity>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:"#F5F1EC"
  },

  success:{
    alignItems:"center",
    padding:25
  },

  successTitle:{
    fontSize:24,
    fontWeight:"bold",
    color:"#4CAF50",
    marginTop:10
  },

  successSub:{
    color:"#666",
    marginTop:5
  },

  card:{
    backgroundColor:"#fff",
    marginHorizontal:15,
    marginBottom:15,
    borderRadius:15,
    padding:18,
    elevation:3
  },

  title:{
    fontSize:18,
    fontWeight:"bold",
    color:"#6D4C41",
    marginBottom:15
  },

  row:{
    flexDirection:"row",
    justifyContent:"space-between",
    marginBottom:10
  },

  product:{
    flexDirection:"row",
    justifyContent:"space-between",
    marginBottom:15
  },

  bold:{
    fontWeight:"bold",
    fontSize:16
  },

  total:{
    fontWeight:"bold",
    fontSize:18,
    color:"#6D4C41"
  },

  empty:{
    height:180,
    justifyContent:"center",
    alignItems:"center",
    borderWidth:2,
    borderStyle:"dashed",
    borderColor:"#CCC",
    borderRadius:12
  },

  image:{
    width:"100%",
    height:220,
    borderRadius:12
  },

  cameraButton:{
    backgroundColor:"#6D4C41",
    padding:15,
    marginTop:15,
    borderRadius:12,
    flexDirection:"row",
    justifyContent:"center",
    alignItems:"center"
  },

  cameraText:{
    color:"#fff",
    fontWeight:"bold",
    marginLeft:8
  },

  buyAgain:{
    backgroundColor:"#6D4C41",
    margin:15,
    padding:18,
    borderRadius:15,
    alignItems:"center"
  },

  buyText:{
    color:"#fff",
    fontWeight:"bold",
    fontSize:18
  }
});