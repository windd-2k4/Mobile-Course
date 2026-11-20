import React, { useState } from 'react';
import {
  Alert,
  FlatList,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import GearCard, { GearItem } from './components/GearCard';
import GearModal from './components/GearModal';

const initialGears: GearItem[] = [
  {
    id: 'g-1',
    name: 'Bàn phím cơ Không dây Keychron K2 Pro',
    brand: 'Keychron',
    price: 2450000,
    category: 'Bàn phím',
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=400&fit=crop',
    description: 'Switch Red êm ái, kết nối Bluetooth 5.1 đa thiết bị, keycap PBT Double-shot cao cấp.',
  },
  {
    id: 'g-2',
    name: 'Chuột Gaming Siêu Nhẹ Logitech G Pro X Superlight',
    brand: 'Logitech',
    price: 2890000,
    category: 'Chuột',
    image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=400&h=400&fit=crop',
    description: 'Trọng lượng dưới 63 gram, cảm biến HERO 25K chuẩn thi đấu eSports quốc tế.',
  },
  {
    id: 'g-3',
    name: 'Tai nghe Không dây Chống ồn Sony WH-1000XM5',
    brand: 'Sony',
    price: 6890000,
    category: 'Tai nghe',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
    description: 'Bộ xử lý chống ồn V1 chuyên dụng, thời lượng pin 30 giờ và âm thanh chuẩn Hi-Res Audio.',
  },
];

export default function App() {
  const [gears, setGears] = useState<GearItem[]>(initialGears);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingItem, setEditingItem] = useState<GearItem | null>(null);
  const [search, setSearch] = useState('');

  const handleOpenAdd = () => {
    setEditingItem(null);
    setModalVisible(true);
  };

  const handleOpenEdit = (item: GearItem) => {
    setEditingItem(item);
    setModalVisible(true);
  };

  const handleDelete = (id: string, name: string) => {
    Alert.alert('Xác nhận xóa', `Bạn có chắc muốn xóa "${name}"?`, [
      { text: 'Hủy', style: 'cancel' },
      {
        text: 'Xóa',
        style: 'destructive',
        onPress: () => {
          setGears((prev) => prev.filter((g) => g.id !== id));
          Alert.alert('Thành công', 'Đã xóa sản phẩm khỏi danh mục.');
        },
      },
    ]);
  };

  const handleSave = (gearData: Omit<GearItem, 'id'>, id?: string) => {
    if (id) {
      // Update
      setGears((prev) => prev.map((g) => (g.id === id ? { ...gearData, id } : g)));
      Alert.alert('Thành công', 'Đã cập nhật thông tin sản phẩm.');
    } else {
      // Create
      const newItem: GearItem = {
        ...gearData,
        id: `g-${Date.now()}`,
      };
      setGears((prev) => [newItem, ...prev]);
      Alert.alert('Thành công', 'Đã thêm sản phẩm mới.');
    }
    setModalVisible(false);
  };

  const filtered = gears.filter(
    (g) =>
      g.name.toLowerCase().includes(search.toLowerCase()) ||
      g.brand.toLowerCase().includes(search.toLowerCase()) ||
      g.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>GearZone Store (CRUD API)</Text>
          <Text style={styles.headerSub}>Quản lý phụ kiện &amp; linh kiện máy tính (Tuần 8)</Text>
        </View>
        <Pressable style={styles.addBtn} onPress={handleOpenAdd}>
          <Text style={styles.addBtnText}>+ THÊM</Text>
        </Pressable>
      </View>

      <View style={styles.searchBox}>
        <TextInput
          style={styles.searchInput}
          placeholder="Tìm theo tên, hãng hoặc phân loại..."
          value={search}
          onChangeText={setSearch}
        />
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <GearCard
            item={item}
            onEdit={() => handleOpenEdit(item)}
            onDelete={() => handleDelete(item.id, item.name)}
          />
        )}
      />

      <GearModal
        visible={modalVisible}
        initialData={editingItem}
        onClose={() => setModalVisible(false)}
        onSave={handleSave}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#0F172A', padding: 16 },
  headerTitle: { fontSize: 18, fontWeight: '800', color: '#FFFFFF' },
  headerSub: { fontSize: 12, color: '#94A3B8', marginTop: 2 },
  addBtn: { backgroundColor: '#2563EB', paddingVertical: 8, paddingHorizontal: 14, borderRadius: 8 },
  addBtnText: { color: '#FFFFFF', fontWeight: '800', fontSize: 12 },
  searchBox: { padding: 12, backgroundColor: '#FFFFFF', borderBottomWidth: 1, borderBottomColor: '#E2E8F0' },
  searchInput: { height: 40, borderWidth: 1, borderColor: '#CBD5E1', borderRadius: 8, paddingHorizontal: 12, fontSize: 13 },
  listContent: { padding: 14 },
});
