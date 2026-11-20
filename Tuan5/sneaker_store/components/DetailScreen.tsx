import React, { useState } from 'react';
import { Alert, Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Sneaker } from '../data/sneakers';

export default function DetailScreen({ sneaker, onBack }: { sneaker: Sneaker; onBack: () => void }) {
  const [selectedSize, setSelectedSize] = useState<number>(sneaker.sizes[0] || 40);
  const [isFavorite, setIsFavorite] = useState(false);

  const discountPercent = Math.round(((sneaker.originalPrice - sneaker.price) / sneaker.originalPrice) * 100);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.imageBox}>
          <Image source={{ uri: sneaker.image }} style={styles.image} resizeMode="contain" />
          <Pressable style={styles.backBtn} onPress={onBack}>
            <Text style={styles.backText}>‹</Text>
          </Pressable>
          <Pressable style={styles.favBtn} onPress={() => setIsFavorite(!isFavorite)}>
            <Text style={styles.favText}>{isFavorite ? '❤️' : '🤍'}</Text>
          </Pressable>
        </View>

        <View style={styles.contentBox}>
          <View style={styles.badgeRow}>
            <Text style={styles.brandTag}>{sneaker.brand}</Text>
            <View style={styles.discountTag}>
              <Text style={styles.discountText}>TIẾT KIỆM {discountPercent}%</Text>
            </View>
          </View>

          <Text style={styles.title}>{sneaker.name}</Text>
          <View style={styles.priceRow}>
            <Text style={styles.price}>{sneaker.price.toLocaleString('vi-VN')} đ</Text>
            <Text style={styles.originalPrice}>{sneaker.originalPrice.toLocaleString('vi-VN')} đ</Text>
          </View>

          <Text style={styles.sectionTitle}>Mô tả sản phẩm:</Text>
          <Text style={styles.description}>{sneaker.description}</Text>

          <Text style={styles.sectionTitle}>Chọn kích thước (Size):</Text>
          <View style={styles.sizeRow}>
            {sneaker.sizes.map((s) => (
              <Pressable
                key={s}
                style={[styles.sizeBox, selectedSize === s && styles.sizeBoxActive]}
                onPress={() => setSelectedSize(s)}
              >
                <Text style={[styles.sizeText, selectedSize === s && styles.sizeTextActive]}>{s}</Text>
              </Pressable>
            ))}
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Pressable
          style={styles.addBtn}
          onPress={() => Alert.alert('Thành công', `Đã thêm ${sneaker.name} (Size ${selectedSize}) vào giỏ!`)}
        >
          <Text style={styles.addBtnText}>THÊM VÀO GIỎ HÀNG</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  scroll: { paddingBottom: 20 },
  imageBox: { height: 280, backgroundColor: '#F1F5F9', justifyContent: 'center', alignItems: 'center' },
  image: { width: '80%', height: 220 },
  backBtn: { position: 'absolute', top: 20, left: 16, width: 40, height: 40, borderRadius: 20, backgroundColor: '#FFFFFF', justifyContent: 'center', alignItems: 'center', elevation: 2 },
  backText: { fontSize: 24, fontWeight: '700', color: '#0F172A', marginTop: -2 },
  favBtn: { position: 'absolute', top: 20, right: 16, width: 40, height: 40, borderRadius: 20, backgroundColor: '#FFFFFF', justifyContent: 'center', alignItems: 'center', elevation: 2 },
  favText: { fontSize: 18 },
  contentBox: { padding: 20 },
  badgeRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  brandTag: { fontSize: 12, fontWeight: '800', color: '#E11D48', letterSpacing: 1 },
  discountTag: { backgroundColor: '#FEE2E2', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  discountText: { color: '#E11D48', fontSize: 11, fontWeight: '800' },
  title: { fontSize: 22, fontWeight: '900', color: '#0F172A', marginVertical: 8 },
  priceRow: { flexDirection: 'row', alignItems: 'baseline', gap: 10, marginBottom: 14 },
  price: { fontSize: 20, fontWeight: '800', color: '#E11D48' },
  originalPrice: { fontSize: 14, color: '#94A3B8', textDecorationLine: 'line-through' },
  sectionTitle: { fontSize: 14, fontWeight: '700', color: '#0F172A', marginTop: 12, marginBottom: 6 },
  description: { fontSize: 13, color: '#475569', lineHeight: 20 },
  sizeRow: { flexDirection: 'row', gap: 10, marginTop: 6 },
  sizeBox: { width: 48, height: 48, borderRadius: 12, borderWidth: 1, borderColor: '#CBD5E1', justifyContent: 'center', alignItems: 'center' },
  sizeBoxActive: { backgroundColor: '#0F172A', borderColor: '#0F172A' },
  sizeText: { fontSize: 14, fontWeight: '700', color: '#334155' },
  sizeTextActive: { color: '#FFFFFF' },
  footer: { padding: 16, borderTopWidth: 1, borderTopColor: '#F1F5F9' },
  addBtn: { backgroundColor: '#E11D48', paddingVertical: 14, borderRadius: 12, alignItems: 'center' },
  addBtnText: { color: '#FFFFFF', fontSize: 14, fontWeight: '800', letterSpacing: 1 },
});
