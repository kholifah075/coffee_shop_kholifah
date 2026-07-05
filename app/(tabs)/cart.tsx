import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import {
  deleteToken,
  getToken,
  saveToken,
} from "@/config/storage";

import useAuthGuard from "@/config/useAuthGuard";

interface CartItem {
  id: number;
  name: string;
  price: number;
  qty: number;
  selected: boolean;
}

const initialCart: CartItem[] = [];

export default function CartScreen() {
  const router = useRouter();
  const { data } = useLocalSearchParams();

  const [cart, setCart] = useState<CartItem[]>(
    data ? JSON.parse(data as string) : initialCart
  );

  const loading = useAuthGuard();

  useEffect(() => {
    if (!data) {
      loadCart();
    }
  }, []);

  const loadCart = async () => {
    const items = (await getToken("item")) ?? "[]";
    setCart(JSON.parse(items));
  };

  if (loading) return null;

  const toggleSelect = async (id: number) => {
    const updated = cart.map((item) =>
      item.id === id
        ? { ...item, selected: !item.selected }
        : item
    );

    setCart(updated);
    await saveToken("item", JSON.stringify(updated));
  };

  const changeQty = async (
    id: number,
    type: "plus" | "minus"
  ) => {
    const updated = cart.map((item) => {
      if (item.id === id) {
        if (type === "plus") {
          return {
            ...item,
            qty: item.qty + 1,
          };
        }

        if (type === "minus" && item.qty > 1) {
          return {
            ...item,
            qty: item.qty - 1,
          };
        }
      }

      return item;
    });

    setCart(updated);
    await saveToken("item", JSON.stringify(updated));
  };

  const selectedItems = cart.filter(
    (item) => item.selected
  );

  const total = selectedItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const logout = async () => {
    await deleteToken("accessToken");
    router.replace("/");
  };

  return (
    <SafeAreaView style={styles.container}>

      {/* HEADER */}

      <View style={styles.headerContainer}>

        <TouchableOpacity
          onPress={() => router.back()}
        >
          <Text style={styles.backButton}>
            ←
          </Text>
        </TouchableOpacity>

        <Text style={styles.header}>
          Keranjang
        </Text>

        <TouchableOpacity
          style={styles.logoutButton}
          onPress={logout}
        >
          <Text style={styles.logoutText}>
            Logout
          </Text>
        </TouchableOpacity>

      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
      >

        {cart.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              Keranjang masih kosong
            </Text>
          </View>
        ) : (
          cart.map((item) => (
            <View
              key={item.id}
              style={styles.card}
            >

              <TouchableOpacity
                onPress={() =>
                  toggleSelect(item.id)
                }
              >
                <Text style={styles.checkbox}>
                  {item.selected
                    ? "☑️"
                    : "⬜"}
                </Text>
              </TouchableOpacity>

              <View style={styles.infoContainer}>

                <Text style={styles.name}>
                  {item.name}
                </Text>

                <Text style={styles.price}>
                  Rp{" "}
                  {item.price.toLocaleString(
                    "id-ID"
                  )}
                </Text>

              </View>

              <View style={styles.qtyContainer}>

                <TouchableOpacity
                  onPress={() =>
                    changeQty(
                      item.id,
                      "minus"
                    )
                  }
                >
                  <Text style={styles.qtyBtn}>
                    −
                  </Text>
                </TouchableOpacity>

                <Text style={styles.qty}>
                  {item.qty}
                </Text>

                <TouchableOpacity
                  onPress={() =>
                    changeQty(
                      item.id,
                      "plus"
                    )
                  }
                >
                  <Text style={styles.qtyBtn}>
                    +
                  </Text>
                </TouchableOpacity>

              </View>

            </View>
          ))
        )}

      </ScrollView>
            {/* ================= FOOTER ================= */}

      <View style={styles.footer}>

        <View>

          <Text style={styles.selectedText}>
            Dipilih : {selectedItems.length} Produk
          </Text>

          <Text style={styles.total}>
            Rp {total.toLocaleString("id-ID")}
          </Text>

        </View>

        <TouchableOpacity
          style={[
            styles.checkout,
            selectedItems.length === 0 &&
              styles.checkoutDisabled,
          ]}
          disabled={selectedItems.length === 0}
          onPress={() => {
            if (selectedItems.length === 0) {
              Alert.alert(
                "Peringatan",
                "Pilih minimal satu produk."
              );
              return;
            }

            router.push({
              pathname: "/(tabs)/checkout",
              params: {
                data: JSON.stringify(selectedItems),
              },
            });
          }}
        >
          <Text style={styles.checkoutText}>
            Checkout
          </Text>
        </TouchableOpacity>

      </View>

    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  /* ================= CONTAINER ================= */

  container: {
    flex: 1,
    backgroundColor: "#F5F1EC",
  },

  /* ================= HEADER ================= */

  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 15,
    backgroundColor: "#FFFFFF",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 4,

    elevation: 4,
  },

  backButton: {
    fontSize: 28,
    color: "#6D4C41",
    fontWeight: "bold",
  },

  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#6D4C41",
  },

  logoutButton: {
    backgroundColor: "#8D6E63",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 12,
  },

  logoutText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 14,
  },

  /* ================= EMPTY ================= */

  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 120,
  },

  emptyText: {
    fontSize: 18,
    color: "#888",
    fontWeight: "500",
  },

  /* ================= CARD ================= */

  card: {
    flexDirection: "row",
    alignItems: "center",

    backgroundColor: "#FFFFFF",

    marginHorizontal: 15,
    marginTop: 12,

    padding: 18,

    borderRadius: 18,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 4,

    elevation: 3,
  },

  checkbox: {
    fontSize: 24,
    marginRight: 15,
  },

  infoContainer: {
    flex: 1,
  },

  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#5D4037",
  },

  price: {
    marginTop: 5,
    fontSize: 15,
    color: "#A66A43",
    fontWeight: "600",
  },

  /* ================= QTY ================= */

  qtyContainer: {
    flexDirection: "row",
    alignItems: "center",

    backgroundColor: "#EFE7DD",

    borderRadius: 14,

    paddingHorizontal: 10,
    paddingVertical: 6,
  },

  qtyBtn: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#6D4C41",

    width: 28,
    textAlign: "center",
  },

  qty: {
    marginHorizontal: 12,

    fontSize: 16,
    fontWeight: "bold",

    color: "#5D4037",
  },

  /* ================= FOOTER ================= */

  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    paddingHorizontal: 20,
    paddingVertical: 18,

    backgroundColor: "#FFFFFF",

    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 5,

    elevation: 8,
  },

  selectedText: {
    fontSize: 14,
    color: "#777",
    marginBottom: 4,
  },

  total: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#5D4037",
  },

  /* ================= CHECKOUT ================= */

  checkout: {
    backgroundColor: "#6D4C41",

    paddingHorizontal: 28,
    paddingVertical: 15,

    borderRadius: 18,

    justifyContent: "center",
    alignItems: "center",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.18,
    shadowRadius: 4,

    elevation: 5,
  },

  checkoutDisabled: {
    backgroundColor: "#C7C7C7",
  },

  checkoutText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
  },
});