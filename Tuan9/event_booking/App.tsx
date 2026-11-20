import React, { useCallback, useMemo, useState } from 'react';
import {
  Alert,
  RefreshControl,
  SafeAreaView,
  SectionList,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { EventItem, SAMPLE_EVENTS, groupByCity } from './assets/eventData';
import EventItemCard from './components/EventItemCard';

export default function App() {
  const [events, setEvents] = useState<EventItem[]>(SAMPLE_EVENTS);
  const [search, setSearch] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setEvents(SAMPLE_EVENTS);
      setRefreshing(false);
    }, 1000);
  }, []);

  const handleBookTicket = (event: EventItem) => {
    Alert.alert(
      'Xác nhận đặt vé',
      `Đăng ký tham dự: ${event.title}\nĐịa điểm: ${event.venue}\nGiá vé: ${event.price === 0 ? 'Miễn phí' : event.price.toLocaleString('vi-VN') + ' đ'}`,
      [
        { text: 'Hủy', style: 'cancel' },
        {
          text: 'Xác nhận',
          onPress: () => {
            setEvents((prev) =>
              prev.map((e) =>
                e.id === event.id ? { ...e, availableSeats: Math.max(0, e.availableSeats - 1) } : e
              )
            );
            Alert.alert('Thành công', 'Chúc mừng bạn đã đặt chỗ thành công!');
          },
        },
      ]
    );
  };

  const handleToggleBookmark = (id: string) => {
    setEvents((prev) =>
      prev.map((e) => (e.id === id ? { ...e, isBookmarked: !e.isBookmarked } : e))
    );
  };

  const filtered = useMemo(() => {
    return events.filter(
      (e) =>
        e.title.toLowerCase().includes(search.toLowerCase()) ||
        e.speaker.toLowerCase().includes(search.toLowerCase()) ||
        e.city.toLowerCase().includes(search.toLowerCase())
    );
  }, [events, search]);

  const sections = useMemo(() => groupByCity(filtered), [filtered]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>EventMaster Workshops</Text>
        <Text style={styles.headerSub}>Tổ chức dữ liệu &amp; SectionList Nhóm Theo Thành Phố (Tuần 9)</Text>
      </View>

      <View style={styles.searchBox}>
        <TextInput
          style={styles.searchInput}
          placeholder="Tìm hội thảo, diễn giả hoặc địa điểm..."
          value={search}
          onChangeText={setSearch}
        />
      </View>

      <SectionList
        sections={sections}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#2563EB']} />}
        renderSectionHeader={({ section: { title } }) => (
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionHeaderText}>📍 KHU VỰC: {title.toUpperCase()}</Text>
          </View>
        )}
        renderItem={({ item }) => (
          <EventItemCard
            item={item}
            onBook={() => handleBookTicket(item)}
            onToggleBookmark={() => handleToggleBookmark(item.id)}
          />
        )}
        ListEmptyComponent={
          <View style={styles.emptyBox}>
            <Text style={styles.emptyIcon}>🎫</Text>
            <Text style={styles.emptyText}>Không tìm thấy sự kiện nào.</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  header: { backgroundColor: '#0F172A', padding: 16 },
  headerTitle: { fontSize: 20, fontWeight: '800', color: '#FFFFFF' },
  headerSub: { fontSize: 12, color: '#94A3B8', marginTop: 2 },
  searchBox: { padding: 12, backgroundColor: '#FFFFFF', borderBottomWidth: 1, borderBottomColor: '#E2E8F0' },
  searchInput: { height: 42, borderWidth: 1, borderColor: '#CBD5E1', borderRadius: 10, paddingHorizontal: 12, fontSize: 13 },
  listContent: { padding: 14 },
  sectionHeader: { backgroundColor: '#E2E8F0', paddingVertical: 6, paddingHorizontal: 12, borderRadius: 8, marginVertical: 8 },
  sectionHeaderText: { fontSize: 12, fontWeight: '800', color: '#1E293B', letterSpacing: 1 },
  emptyBox: { alignItems: 'center', marginTop: 50 },
  emptyIcon: { fontSize: 44, marginBottom: 8 },
  emptyText: { fontSize: 14, color: '#64748B' },
});
