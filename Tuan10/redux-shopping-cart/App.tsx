import React, { useState } from 'react';
import { Pressable, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import { store, useAppSelector } from './store/store';
import { selectCartTotalCount, selectCartTotalPrice } from './store/cartSlice';
import ProductList from './components/ProductList';
import CartModal from './components/CartModal';

function MainShop() {
  const [cartOpen, setCartOpen] = useState(false);
  const totalCount = useAppSelector(selectCartTotalCount);
  const totalPrice = useAppSelector(selectCartTotalPrice);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Redux Toolkit Store</Text>
        <Text style={styles.headerSub}>Quản lý State Giỏ Hàng Toàn Cục (Tuần 10)</Text>
      </View>

      <ProductList />

      {totalCount > 0 && (
        <Pressable style={styles.floatingBar} onPress={() => setCartOpen(true)}>
          <View style={styles.barLeft}>
            <View style={styles.badgeCircle}>
              <Text style={styles.badgeText}>{totalCount}</Text>
            </View>
            <Text style={styles.barText}>Xem Giỏ Hàng Redux</Text>
          </View>
          <Text style={styles.barTotal}>{totalPrice.toLocaleString('vi-VN')} đ ➔</Text>
        </Pressable>
      )}

      <CartModal visible={cartOpen} onClose={() => setCartOpen(false)} />
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <MainShop />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  header: { backgroundColor: '#0F172A', padding: 16 },
  headerTitle: { fontSize: 20, fontWeight: '800', color: '#FFFFFF' },
  headerSub: { fontSize: 12, color: '#94A3B8', marginTop: 2 },
  floatingBar: {
    position: 'absolute',
    bottom: 20,
    left: 16,
    right: 16,
    backgroundColor: '#6366F1',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 14,
    elevation: 6,
  },
  barLeft: { flexDirection: 'row', alignItems: 'center' },
  badgeCircle: { backgroundColor: '#FFFFFF', width: 24, height: 24, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginRight: 10 },
  badgeText: { color: '#6366F1', fontSize: 12, fontWeight: '800' },
  barText: { color: '#FFFFFF', fontSize: 13, fontWeight: '700' },
  barTotal: { color: '#FFFFFF', fontSize: 14, fontWeight: '900' },
});
