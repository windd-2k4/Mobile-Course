import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Pressable,
  RefreshControl,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import PodcastCard, { Podcast } from './components/PodcastCard';

const API_ENDPOINT = 'https://675841e260576a194d0fa3b8.mockapi.io/podcasts';

const FALLBACK_PODCASTS: Podcast[] = [
  {
    id: '1',
    title: 'Học Lập Trình Di Động Bắt Đầu Từ Đâu Trong Năm 2026?',
    host: 'TechTalk Vietnam',
    category: 'Công nghệ',
    durationMinutes: 42,
    listens: 18500,
    image: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=300&h=300&fit=crop',
    isBookmarked: true,
  },
  {
    id: '2',
    title: 'Xây Dựng Tư Duy Khởi Nghiệp Tinh Gọn Cho Kỹ Sư Công Nghệ',
    host: 'Founder Diary',
    category: 'Khởi nghiệp',
    durationMinutes: 55,
    listens: 12300,
    image: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=300&h=300&fit=crop',
    isBookmarked: false,
  },
  {
    id: '3',
    title: 'Quản Trị Năng Lượng Cá Nhân & Kỷ Luật Bản Thân',
    host: 'Mind & Life Podcast',
    category: 'Tâm lý',
    durationMinutes: 35,
    listens: 25400,
    image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=300&h=300&fit=crop',
    isBookmarked: true,
  },
  {
    id: '4',
    title: 'Luyện Phát Âm & Giao Tiếp Tiếng Anh Chuyên Ngành IT',
    host: 'English for Devs',
    category: 'Kỹ năng',
    durationMinutes: 28,
    listens: 9800,
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=300&h=300&fit=crop',
    isBookmarked: false,
  },
];

const CATEGORIES = ['Tất cả', 'Công nghệ', 'Khởi nghiệp', 'Tâm lý', 'Kỹ năng'];

export default function App() {
  const [podcasts, setPodcasts] = useState<Podcast[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedCat, setSelectedCat] = useState('Tất cả');

  const fetchPodcasts = async () => {
    try {
      const res = await fetch(API_ENDPOINT);
      if (!res.ok) throw new Error('API offline, loading local fallback data');
      const data = await res.json();
      setPodcasts(data);
    } catch {
      setPodcasts(FALLBACK_PODCASTS);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchPodcasts();
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchPodcasts();
  }, []);

  const handleToggleBookmark = (id: string) => {
    setPodcasts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, isBookmarked: !p.isBookmarked } : p))
    );
  };

  const handleDelete = (id: string, title: string) => {
    Alert.alert('Xác nhận xóa', `Bạn có chắc muốn xóa tập podcast "${title}"?`, [
      { text: 'Hủy', style: 'cancel' },
      {
        text: 'Xóa ngay',
        style: 'destructive',
        onPress: () => {
          setPodcasts((prev) => prev.filter((p) => p.id !== id));
          Alert.alert('Thành công', 'Đã xóa tập podcast khỏi thư viện.');
        },
      },
    ]);
  };

  const filtered = useMemo(() => {
    return podcasts.filter((p) => {
      const matchSearch =
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.host.toLowerCase().includes(search.toLowerCase());
      const matchCat = selectedCat === 'Tất cả' || p.category === selectedCat;
      return matchSearch && matchCat;
    });
  }, [podcasts, search, selectedCat]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>SoundWave Podcast</Text>
        <Text style={styles.headerSubtitle}>Tích hợp REST API &amp; MockAPI (Tuần 7)</Text>
      </View>

      <View style={styles.searchSection}>
        <TextInput
          style={styles.searchInput}
          placeholder="Tìm tên podcast hoặc host..."
          value={search}
          onChangeText={setSearch}
        />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.catScroll}>
          {CATEGORIES.map((cat) => (
            <Pressable
              key={cat}
              style={[styles.catChip, selectedCat === cat && styles.catChipActive]}
              onPress={() => setSelectedCat(cat)}
            >
              <Text style={[styles.catText, selectedCat === cat && styles.catTextActive]}>{cat}</Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      {loading ? (
        <View style={styles.centerBox}>
          <ActivityIndicator size="large" color="#6366F1" />
          <Text style={styles.loadingText}>Đang tải podcast từ máy chủ API...</Text>
        </View>
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#6366F1']} />}
          renderItem={({ item }) => (
            <PodcastCard
              podcast={item}
              onToggleBookmark={() => handleToggleBookmark(item.id)}
              onDelete={() => handleDelete(item.id, item.title)}
            />
          )}
          ListEmptyComponent={
            <View style={styles.emptyBox}>
              <Text style={styles.emptyIcon}>📻</Text>
              <Text style={styles.emptyText}>Không tìm thấy podcast nào phù hợp.</Text>
            </View>
          }
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  header: { padding: 16, backgroundColor: '#0F172A' },
  headerTitle: { fontSize: 20, fontWeight: '800', color: '#FFFFFF' },
  headerSubtitle: { fontSize: 12, color: '#94A3B8', marginTop: 2 },
  searchSection: { padding: 14, backgroundColor: '#FFFFFF', borderBottomWidth: 1, borderBottomColor: '#E2E8F0' },
  searchInput: { height: 42, borderWidth: 1, borderColor: '#CBD5E1', borderRadius: 10, paddingHorizontal: 12, fontSize: 13, marginBottom: 10 },
  catScroll: { flexDirection: 'row' },
  catChip: { paddingVertical: 6, paddingHorizontal: 14, backgroundColor: '#F1F5F9', borderRadius: 16, marginRight: 8 },
  catChipActive: { backgroundColor: '#6366F1' },
  catText: { fontSize: 12, color: '#475569', fontWeight: '600' },
  catTextActive: { color: '#FFFFFF' },
  listContent: { padding: 14 },
  centerBox: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  loadingText: { marginTop: 12, fontSize: 13, color: '#64748B' },
  emptyBox: { alignItems: 'center', marginTop: 50 },
  emptyIcon: { fontSize: 44, marginBottom: 8 },
  emptyText: { fontSize: 14, color: '#64748B' },
});
