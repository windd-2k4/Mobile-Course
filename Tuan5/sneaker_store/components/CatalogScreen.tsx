import React, { useState } from 'react';
import { FlatList, Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { SNEAKERS, Sneaker } from '../data/sneakers';

const CATEGORIES = ['Tất cả', 'Running', 'Basketball'] as const;

export default function CatalogScreen({ onSelect }: { onSelect: (s: Sneaker) => void }) {
  const [activeCat, setActiveCat] = useState<(typeof CATEGORIES)[number]>('Tất cả');
  const [likes, setLikes] = useState<Record<string, boolean>>({});

  const filtered = activeCat === 'Tất cả' ? SNEAKERS : SNEAKERS.filter((s) => s.category === activeCat);

  const toggleHeart = (id: string) => {
    setLikes((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Bộ Sưu Tập Giày Hot</Text>

      <View style={styles.categoryRow}>
        {CATEGORIES.map((c) => (
          <Pressable
            key={c}
            style={[styles.catBtn, activeCat === c && styles.catBtnActive]}
            onPress={() => setActiveCat(c)}
          >
            <Text style={[styles.catBtnText, activeCat === c && styles.catBtnTextActive]}>{c}</Text>
          </Pressable>
        ))}
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.columnWrap}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <Pressable style={styles.card} onPress={() => onSelect(item)}>
            <Pressable style={styles.heartBtn} onPress={() => toggleHeart(item.id)}>
              <Text style={styles.heartText}>{likes[item.id] ? '❤️' : '🤍'}</Text>
            </Pressable>
            <Image source={{ uri: item.image }} style={styles.cardImg} resizeMode="contain" />
            <Text style={styles.cardBrand}>{item.brand}</Text>
            <Text style={styles.cardTitle} numberOfLines={1}>{item.name}</Text>
            <Text style={styles.cardPrice}>{item.price.toLocaleString('vi-VN')} đ</Text>
            <Text style={styles.cardOldPrice}>{item.originalPrice.toLocaleString('vi-VN')} đ</Text>
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC', padding: 16 },
  heading: { fontSize: 22, fontWeight: '900', color: '#0F172A', marginBottom: 14 },
  categoryRow: { flexDirection: 'row', gap: 8, marginBottom: 16 },
  catBtn: { paddingVertical: 8, paddingHorizontal: 16, backgroundColor: '#E2E8F0', borderRadius: 10 },
  catBtnActive: { backgroundColor: '#E11D48' },
  catBtnText: { fontSize: 13, fontWeight: '700', color: '#475569' },
  catBtnTextActive: { color: '#FFFFFF' },
  columnWrap: { justifyContent: 'space-between' },
  listContent: { paddingBottom: 20 },
  card: { width: '48%', backgroundColor: '#FFFFFF', borderRadius: 16, padding: 12, marginBottom: 14, elevation: 2 },
  heartBtn: { position: 'absolute', top: 10, right: 10, zIndex: 2 },
  heartText: { fontSize: 16 },
  cardImg: { width: '100%', height: 120, marginVertical: 6 },
  cardBrand: { fontSize: 11, fontWeight: '800', color: '#E11D48' },
  cardTitle: { fontSize: 14, fontWeight: '700', color: '#0F172A' },
  cardPrice: { fontSize: 14, fontWeight: '800', color: '#0F172A', marginTop: 4 },
  cardOldPrice: { fontSize: 11, color: '#94A3B8', textDecorationLine: 'line-through' },
});
