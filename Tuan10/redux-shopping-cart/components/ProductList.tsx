import React from 'react';
import { FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { Product, addItem } from '../store/cartSlice';
import { useAppDispatch } from '../store/store';

export const PRODUCTS: Product[] = [
  {
    id: 'p-1',
    name: 'Đồng Hồ Thông Minh Galaxy Watch 6',
    price: 4990000,
    category: 'Smartwatch',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop',
  },
  {
    id: 'p-2',
    name: 'Tai Nghe Chống Ồn AirPods Pro 2',
    price: 5690000,
    category: 'Audio',
    image: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=400&h=400&fit=crop',
  },
  {
    id: 'p-3',
    name: 'Loa Bluetooth Di Động Marshall Emberton II',
    price: 3890000,
    category: 'Speaker',
    image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=400&h=400&fit=crop',
  },
  {
    id: 'p-4',
    name: 'Kính Thực Tế Ảo Meta Quest 3',
    price: 13900000,
    category: 'VR Device',
    image: 'https://images.unsplash.com/photo-1622979135225-d2ba269bc1df?w=400&h=400&fit=crop',
  },
];

export default function ProductList() {
  const dispatch = useAppDispatch();

  return (
    <FlatList
      data={PRODUCTS}
      keyExtractor={(item) => item.id}
      numColumns={2}
      columnWrapperStyle={styles.colWrap}
      contentContainerStyle={styles.content}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <Image source={{ uri: item.image }} style={styles.image} resizeMode="contain" />
          <Text style={styles.cat}>{item.category}</Text>
          <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
          <Text style={styles.price}>{item.price.toLocaleString('vi-VN')} đ</Text>
          <Pressable style={styles.addBtn} onPress={() => dispatch(addItem(item))}>
            <Text style={styles.addBtnText}>+ Thêm Giỏ</Text>
          </Pressable>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  content: { padding: 14 },
  colWrap: { justifyContent: 'space-between' },
  card: { width: '48%', backgroundColor: '#FFFFFF', borderRadius: 14, padding: 12, marginBottom: 14, elevation: 2 },
  image: { width: '100%', height: 110, marginBottom: 6 },
  cat: { fontSize: 10, fontWeight: '700', color: '#6366F1' },
  name: { fontSize: 13, fontWeight: '700', color: '#0F172A', marginTop: 2 },
  price: { fontSize: 13, fontWeight: '800', color: '#DC2626', marginVertical: 6 },
  addBtn: { backgroundColor: '#6366F1', paddingVertical: 8, borderRadius: 8, alignItems: 'center' },
  addBtnText: { color: '#FFFFFF', fontSize: 11, fontWeight: '700' },
});
