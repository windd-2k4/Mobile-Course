import React, { useEffect, useState } from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { GearItem } from './GearCard';

export default function GearModal({
  visible,
  initialData,
  onClose,
  onSave,
}: {
  visible: boolean;
  initialData: GearItem | null;
  onClose: () => void;
  onSave: (gear: Omit<GearItem, 'id'>, id?: string) => void;
}) {
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState<'Bàn phím' | 'Chuột' | 'Tai nghe' | 'Màn hình'>('Bàn phím');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setBrand(initialData.brand);
      setPrice(initialData.price.toString());
      setCategory(initialData.category);
      setImage(initialData.image);
      setDescription(initialData.description);
    } else {
      setName('');
      setBrand('');
      setPrice('');
      setCategory('Bàn phím');
      setImage('https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=400&fit=crop');
      setDescription('');
    }
  }, [initialData, visible]);

  const handleSave = () => {
    if (!name.trim() || !price.trim()) return;
    onSave(
      {
        name,
        brand: brand || 'Generic',
        price: Number(price) || 0,
        category,
        image: image || 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=400&fit=crop',
        description,
      },
      initialData?.id
    );
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.dialog}>
          <Text style={styles.dialogTitle}>{initialData ? 'Chỉnh Sửa Phụ Kiện' : 'Thêm Phụ Kiện Mới'}</Text>
          <ScrollView style={styles.scroll}>
            <Text style={styles.label}>Tên sản phẩm (*):</Text>
            <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Ví dụ: Bàn phím cơ AKKO..." />

            <Text style={styles.label}>Hãng sản xuất:</Text>
            <TextInput style={styles.input} value={brand} onChangeText={setBrand} placeholder="Logitech, Razer, Corsair..." />

            <Text style={styles.label}>Giá bán (VNĐ) (*):</Text>
            <TextInput style={styles.input} value={price} onChangeText={setPrice} keyboardType="numeric" placeholder="1250000" />

            <Text style={styles.label}>Phân loại:</Text>
            <View style={styles.catRow}>
              {(['Bàn phím', 'Chuột', 'Tai nghe', 'Màn hình'] as const).map((c) => (
                <Pressable
                  key={c}
                  style={[styles.catChip, category === c && styles.catChipActive]}
                  onPress={() => setCategory(c)}
                >
                  <Text style={[styles.catText, category === c && styles.catTextActive]}>{c}</Text>
                </Pressable>
              ))}
            </View>

            <Text style={styles.label}>Mô tả chi tiết:</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={description}
              onChangeText={setDescription}
              multiline
              numberOfLines={3}
              placeholder="Ghi chú switch, kết nối không dây, thời lượng pin..."
            />
          </ScrollView>

          <View style={styles.btnRow}>
            <Pressable style={styles.cancelBtn} onPress={onClose}>
              <Text style={styles.cancelBtnText}>Hủy bỏ</Text>
            </Pressable>
            <Pressable style={styles.saveBtn} onPress={handleSave}>
              <Text style={styles.saveBtnText}>Lưu dữ liệu</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', padding: 20 },
  dialog: { backgroundColor: '#FFFFFF', borderRadius: 16, padding: 20, maxHeight: '85%' },
  dialogTitle: { fontSize: 18, fontWeight: '800', color: '#0F172A', marginBottom: 14 },
  scroll: { marginBottom: 14 },
  label: { fontSize: 12, fontWeight: '700', color: '#475569', marginTop: 10, marginBottom: 4 },
  input: { height: 42, borderWidth: 1, borderColor: '#CBD5E1', borderRadius: 8, paddingHorizontal: 12, fontSize: 13 },
  textArea: { height: 70, textAlignVertical: 'top', paddingTop: 8 },
  catRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginVertical: 4 },
  catChip: { paddingVertical: 6, paddingHorizontal: 10, borderRadius: 6, backgroundColor: '#F1F5F9' },
  catChipActive: { backgroundColor: '#2563EB' },
  catText: { fontSize: 11, color: '#475569', fontWeight: '600' },
  catTextActive: { color: '#FFFFFF' },
  btnRow: { flexDirection: 'row', gap: 10 },
  cancelBtn: { flex: 1, paddingVertical: 12, borderRadius: 8, backgroundColor: '#F1F5F9', alignItems: 'center' },
  cancelBtnText: { color: '#475569', fontWeight: '700', fontSize: 13 },
  saveBtn: { flex: 1, paddingVertical: 12, borderRadius: 8, backgroundColor: '#2563EB', alignItems: 'center' },
  saveBtnText: { color: '#FFFFFF', fontWeight: '800', fontSize: 13 },
});
