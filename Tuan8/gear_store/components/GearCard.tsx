import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

export interface GearItem {
  id: string;
  name: string;
  brand: string;
  price: number;
  category: 'Bàn phím' | 'Chuột' | 'Tai nghe' | 'Màn hình';
  image: string;
  description: string;
}

export default function GearCard({
  item,
  onEdit,
  onDelete,
}: {
  item: GearItem;
  onEdit: () => void;
  onDelete: () => void;
}) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} resizeMode="contain" />
      <View style={styles.content}>
        <View style={styles.badgeRow}>
          <Text style={styles.categoryBadge}>{item.category}</Text>
          <Text style={styles.brandText}>{item.brand}</Text>
        </View>

        <Text style={styles.title} numberOfLines={1}>{item.name}</Text>
        <Text style={styles.price}>{item.price.toLocaleString('vi-VN')} đ</Text>
        <Text style={styles.desc} numberOfLines={2}>{item.description}</Text>

        <View style={styles.btnRow}>
          <Pressable style={[styles.actionBtn, styles.editBtn]} onPress={onEdit}>
            <Text style={styles.editBtnText}>✏️ Chỉnh sửa</Text>
          </Pressable>
          <Pressable style={[styles.actionBtn, styles.deleteBtn]} onPress={onDelete}>
            <Text style={styles.deleteBtnText}>🗑️ Xóa</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { flexDirection: 'row', backgroundColor: '#FFFFFF', borderRadius: 14, padding: 12, marginBottom: 12, elevation: 2 },
  image: { width: 90, height: 90, borderRadius: 10, marginRight: 12, backgroundColor: '#F8FAFC' },
  content: { flex: 1, justifyContent: 'space-between' },
  badgeRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  categoryBadge: { fontSize: 10, fontWeight: '800', color: '#2563EB', backgroundColor: '#DBEAFE', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 },
  brandText: { fontSize: 11, fontWeight: '700', color: '#64748B' },
  title: { fontSize: 14, fontWeight: '800', color: '#0F172A', marginTop: 2 },
  price: { fontSize: 14, fontWeight: '800', color: '#DC2626' },
  desc: { fontSize: 11, color: '#64748B', lineHeight: 16 },
  btnRow: { flexDirection: 'row', gap: 8, marginTop: 6 },
  actionBtn: { flex: 1, paddingVertical: 5, borderRadius: 6, alignItems: 'center' },
  editBtn: { backgroundColor: '#F1F5F9' },
  editBtnText: { color: '#0F172A', fontSize: 11, fontWeight: '700' },
  deleteBtn: { backgroundColor: '#FEE2E2' },
  deleteBtnText: { color: '#DC2626', fontSize: 11, fontWeight: '700' },
});
