import { useRouter } from 'expo-router';
import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { useCart } from './CartContext';

/* ================= TYPE ================= */

interface MenuItem {
  id: number;
  name: string;
  price: string;
  icon: string;
}

/* ================= MAIN ================= */

export default function HomeScreen() {
  const router = useRouter();
  const { cart, addToCart } = useCart();

  const handleBuy = (item: MenuItem) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: parseInt(
        item.price.replace('Rp', '').replace('k', '000')
      ),
      qty: 1,
      selected: true,
    });
  };

  const toCart = () => {
    router.push({
      pathname: '/cart',
      params: {
        data: JSON.stringify(cart),
      },
    });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>☕ Menu </Text>

      <TouchableOpacity
        style={styles.cartButton}
        onPress={toCart}
      >
        <Text style={styles.buttonText}>
          🛒 Detail Pesanan ({cart.length})
        </Text>
      </TouchableOpacity>

      <MenuSection
        title="Hot Coffee"
        data={coffeeList}
        onBuy={handleBuy}
      />

      <MenuSection
        title="Cold Blended"
        data={coldblendedList}
        onBuy={handleBuy}
      />

      <MenuSection
        title="Menu Makanan"
        data={foodList}
        onBuy={handleBuy}
      />
    </ScrollView>
  );
}

/* ================= MENU SECTION ================= */
interface MenuSectionProps {
  title: string;
  data: MenuItem[];
  onBuy: (item: MenuItem) => void;
}
const MenuSection = ({
  title,
  data,
  onBuy,
}: MenuSectionProps) => {
  return (
    <View style={{ marginBottom: 30 }}>
      
      {/* TITLE */}
      <Text style={styles.title}>{title}</Text>

      {/* HORIZONTAL SCROLL */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {data.map((item: MenuItem) => (
          <View key={item.id} style={styles.card}>
            
            {/* ICON */}
            <View style={styles.imageContainer}>
              <Text style={styles.icon}>{item.icon}</Text>
            </View>

            {/* INFO */}
            <View style={styles.infoContainer}>
              <Text style={styles.text}>{item.name}</Text>
              <Text style={styles.price}>{item.price}</Text>

              <TouchableOpacity
                style={styles.buyButton}
                onPress={() => onBuy(item)}
              >
                <Text style={styles.buyText}>Beli</Text>
              </TouchableOpacity>
            </View>

          </View>
        ))}
      </ScrollView>
    </View>
  );
};
/* ================= DATA ================= */

const coffeeList: MenuItem[] = [
  { id: 1, name: 'Espresso', price: 'Rp20k', icon: '☕' },
  { id: 2, name: 'Latte', price: 'Rp25k', icon: '☕' },
  { id: 3, name: 'Cappuccino', price: 'Rp28k', icon: '☕' },
  { id: 4, name: 'Americano', price: 'Rp22k', icon: '☕' },
];

const coldblendedList: MenuItem[] = [
  { id: 5, name: 'Caramel', price: 'Rp25k', icon: '🥤' },
  { id: 6, name: 'Hazelnut Mocha', price: 'Rp30k', icon: '🧋' },
  { id: 7, name: 'Matcha Cream', price: 'Rp20k', icon: '🍵' },
  { id: 8, name: 'Vanilla Bean', price: 'Rp25k', icon: '🥛' },
];

const foodList: MenuItem[] = [
  { id: 9, name: 'Croissant', price: 'Rp18k', icon: '🥐' },
  { id: 10, name: 'Donat', price: 'Rp15k', icon: '🍩' },
  { id: 11, name: 'Sandwich', price: 'Rp30k', icon: '🥪' },
  { id: 12, name: 'Burger', price: 'Rp35k', icon: '🍔' },
];

/* ================= STYLE ================= */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F1EC', // cream soft
    padding: 15,
  },

  /* HEADER */
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#6D4C41', // dark coffee
    marginBottom: 25,
    textAlign: 'center',
    marginTop: 10,
  },

  /* JUDUL SECTION */
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#8B5E3C', // coffee brown
    marginBottom: 15,
    marginLeft: 5,
  },

  /* CARD MENU */
  card: {
  width: 260,
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: '#FFFFFF',
  borderRadius: 22,
  padding: 15,
  marginRight: 15,

  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 3,
  },
  shadowOpacity: 0.1,
  shadowRadius: 5,

  elevation: 4,
},

  /* ICON */
  imageContainer: {
    width: 75,
    height: 75,
    borderRadius: 20,
    backgroundColor: '#EFE7DD',
    justifyContent: 'center',
    alignItems: 'center',
  },

  icon: {
    fontSize: 38,
  },

  /* INFO */
  infoContainer: {
    flex: 1,
    paddingLeft: 15,
  },

  text: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#5D4037',
  },

  price: {
    fontSize: 16,
    color: '#A1887F',
    marginTop: 6,
    marginBottom: 12,
  },

  /* BUTTON CART */
  cartButton: {
    backgroundColor: '#6D4C41',
    paddingVertical: 14,
    borderRadius: 18,
    marginBottom: 25,
    alignItems: 'center',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,

    elevation: 4,
  },

  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },

  /* BUTTON BELI */
  buyButton: {
    backgroundColor: '#C67C4E',
    paddingVertical: 10,
    paddingHorizontal: 22,
    borderRadius: 14,
    alignSelf: 'flex-start',
  },

  buyText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
});