import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";

interface CartItem {
  id: number;
  name: string;
  price: number;
  qty: number;
  selected?: boolean;
}

export default function Checkout() {
    const router = useRouter();
  const { data } = useLocalSearchParams();

  const cart: CartItem[] = data ? JSON.parse(data as string) : [];

  const [payment, setPayment] = useState("Cash");

  const [location, setLocation] = useState({
    latitude: -7.4248,
    longitude: 109.2396,
  });

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const shipping = 10000;
  const total = subtotal + shipping;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.header}>Checkout</Text>

        {/* METODE PEMBAYARAN */}
        <View style={styles.card}>
          <Text style={styles.title}>Metode Pembayaran</Text>

          {["Cash", "OVO", "Transfer Bank"].map((item) => (
            <TouchableOpacity
              key={item}
              style={styles.paymentRow}
              onPress={() => setPayment(item)}
            >
              <Text style={styles.radio}>
                {payment === item ? "🔘" : "⚪"}
              </Text>

              <Text style={styles.paymentText}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* ALAMAT */}
        <View style={styles.card}>
          <Text style={styles.title}>📍 Alamat Pengiriman</Text>

          <Text style={styles.name}>Kholifah</Text>

          <Text style={styles.phone}>📞 08123456789</Text>

          <Text style={styles.address}>
            Jl. Ahmad Yani No.10{"\n"}
            Purwokerto
          </Text>

          <MapView
            style={styles.map}
            region={{
              latitude: location.latitude,
              longitude: location.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
            onPress={(event) =>
              setLocation(event.nativeEvent.coordinate)
            }
          >
            <Marker
              coordinate={location}
              title="Alamat Pengiriman"
              description="Lokasi Tujuan"
            />
          </MapView>
        </View>

        {/* RINGKASAN PESANAN */}
        <View style={styles.card}>
          <Text style={styles.title}>Ringkasan Pesanan</Text>

          {cart.length === 0 ? (
            <Text>Tidak ada produk.</Text>
          ) : (
            cart.map((item) => (
              <View key={item.id} style={styles.product}>
                <View>
                  <Text style={styles.productName}>
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
            ))
          )}
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

          <View
            style={[
              styles.row,
              {
                marginTop: 10,
                borderTopWidth: 1,
                paddingTop: 10,
              },
            ]}
          >
            <Text style={styles.total}>Total</Text>

            <Text style={styles.total}>
              Rp{total.toLocaleString("id-ID")}
            </Text>
          </View>
        </View>
      </ScrollView>

      <TouchableOpacity
  style={styles.button}
  onPress={() =>
    router.push({
      pathname: "/(tabs)/order-finished",
      params: {
        data: JSON.stringify(
          cart.filter((item) => item.selected ?? true)
        ),
      },
    })
  }
>
  <Text style={styles.buttonText}>
    Buat Pesanan
  </Text>
</TouchableOpacity>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F1EC",
  },

  header: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
    color: "#6D4C41",
  },

  card: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 15,
    marginBottom: 15,
    padding: 18,
    borderRadius: 16,
    elevation: 3,
  },

  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#6D4C41",
    marginBottom: 12,
  },

  paymentRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },

  radio: {
    fontSize: 20,
  },

  paymentText: {
    marginLeft: 10,
    fontSize: 16,
  },

  name: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#5D4037",
  },

  phone: {
    marginTop: 5,
    fontSize: 15,
    color: "#666",
  },

  address: {
    marginTop: 10,
    fontSize: 15,
    color: "#555",
    lineHeight: 22,
  },

  map: {
    width: "100%",
    height: 220,
    borderRadius: 15,
    marginTop: 15,
  },

  product: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },

  productName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#5D4037",
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
  },

  total: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#6D4C41",
  },

  button: {
    margin: 15,
    backgroundColor: "#6D4C41",
    borderRadius: 15,
    paddingVertical: 16,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 18,
  },
});