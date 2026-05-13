import { deleteToken, getToken } from '@/config/storage';
import useAuthGuard from '@/config/useAuthGuard';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

/* ================= TYPE ================= */
interface CartItem {
  id: number;
  name: string;
  price: number;
  qty: number;
  selected: boolean;
}

/* ================= DATA AWAL ================= */
const initialCart: CartItem[] = [

];

/* ================= MAIN ================= */
export default function CartScreen() {
  const router = useRouter();
  const { data } = useLocalSearchParams();
  const [cart, setCart] = useState<CartItem[]>(data ? JSON.parse(data as string) : initialCart);

  useEffect(() => {
    if (!data) {
      const loadCart = async () => {
        const items = (await getToken('item')) ?? '[]';
        setCart(JSON.parse(items));
      };

      loadCart();
    }
  }, []);

  const loading = useAuthGuard();
  if (loading) return null; 
 

  /* ================= ACTION ================= */

  const toggleSelect = (id: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, selected: !item.selected } : item
      )
    );
  };

  const changeQty = (id: number, type: 'plus' | 'minus') => {
    setCart((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          if (type === 'plus') return { ...item, qty: item.qty + 1 };
          if (type === 'minus' && item.qty > 1)
            return { ...item, qty: item.qty - 1 };
        }
        return item;
      })
    );
  };

  const total = cart
    .filter((item) => item.selected)
    .reduce((sum, item) => sum + item.price * item.qty, 0);
    
const Logout=()=>{
  deleteToken('accessToken')
  router.replace('/')
}
  /* ================= UI ================= */

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>🛒 Detail Pesanan </Text>
      <TouchableOpacity
  style={styles.logoutButton}
  onPress={() => Logout()}
>
  <Text style={styles.logoutText}>Logout</Text>
</TouchableOpacity>

      <ScrollView
        showsVerticalScrollIndicator={true}
        persistentScrollbar={true}
      >
        {cart.map((item) => (
          <View key={item.id} style={styles.card}>
            {/* checkbox */}
            <TouchableOpacity onPress={() => toggleSelect(item.id)}>
              <Text style={styles.checkbox}>
                {item.selected ? '☑️' : '⬜'}
              </Text>
            </TouchableOpacity>

            {/* info */}
            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.price}>Rp{item.price}</Text>
            </View>

            {/* qty */}
            <View style={styles.qtyContainer}>
              <TouchableOpacity
                onPress={() => changeQty(item.id, 'minus')}
              >
                <Text style={styles.qtyBtn}>-</Text>
              </TouchableOpacity>

              <Text style={styles.qty}>{item.qty}</Text>

              <TouchableOpacity
                onPress={() => changeQty(item.id, 'plus')}
              >
                <Text style={styles.qtyBtn}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* footer */}
      <View style={styles.footer}>
        <Text style={styles.total}>Total: Rp{total}</Text>

        <TouchableOpacity style={styles.checkout}>
          <Text style={{ color: '#fff', fontWeight: 'bold' }}>
            Checkout
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

/* ================= STYLE ================= */
const styles = StyleSheet.create({
  /* CONTAINER */
  container: {
    flex: 1,
    backgroundColor: '#F5F1EC',
  },

  /* HEADER */
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    paddingTop: 20,
    paddingBottom: 10,
    textAlign: 'center',
    color: '#6D4C41',
  },

  /* CARD ITEM */
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 15,
    marginVertical: 8,
    padding: 18,
    borderRadius: 22,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.12,
    shadowRadius: 4,

    elevation: 4,
  },

  /* CHECKBOX */
  checkbox: {
    fontSize: 24,
    marginRight: 15,
  },

  /* NAMA PRODUK */
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#5D4037',
  },

  /* HARGA */
  price: {
    color: '#B67C58',
    marginTop: 6,
    fontSize: 15,
    fontWeight: '600',
  },

  /* QTY */
  qtyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFE7DD',
    borderRadius: 15,
    paddingHorizontal: 8,
    paddingVertical: 5,
  },

  /* BUTTON +/- */
  qtyBtn: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#6D4C41',
    paddingHorizontal: 12,
  },

  /* ANGKA QTY */
  qty: {
    marginHorizontal: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#5D4037',
  },

  /* FOOTER */
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    paddingVertical: 18,
    paddingHorizontal: 20,

    backgroundColor: '#FFFFFF',

    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 5,

    elevation: 10,
  },

  /* TOTAL */
  total: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#5D4037',
  },

  /* BUTTON CHECKOUT */
  checkout: {
    backgroundColor: '#6D4C41',
    paddingHorizontal: 28,
    paddingVertical: 14,
    borderRadius: 18,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,

    elevation: 4,
  },
  /* BUTTON LOGOUT */
logoutButton: {
  alignSelf: 'flex-end',
  marginRight: 20,
  marginBottom: 10,

  backgroundColor: '#8D6E63',
  paddingVertical: 10,
  paddingHorizontal: 18,
  borderRadius: 14,

  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.15,
  shadowRadius: 3,

  elevation: 3,
},

logoutText: {
  color: '#fff',
  fontSize: 15,
  fontWeight: 'bold',
},
});