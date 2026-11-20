import React, { createContext, useContext, useEffect, useState } from 'react';
import type { ComponentType, ReactNode } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

// ============================================================
// DATA & TYPES (Mô hình tin tức & tác giả công nghệ)
// ============================================================
export interface Article {
  id: number;
  title: string;
  body: string;
  userId: number;
}

export interface Author {
  id: number;
  name: string;
  email: string;
  bio: string;
  avatar: string;
  articlesCount: number;
}

export interface PaginatedResponse<T> {
  page: number;
  pageSize: number;
  total: number;
  items: T[];
}

// ============================================================
// BÀI 9 - NEWS FEED: fetch + async/await + FlatList
// ============================================================
function NewsFeedScreen() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=8');
      const data: Article[] = await res.json();
      setArticles(data);
    } catch (err) {
      Alert.alert('Lỗi tải dữ liệu', 'Không thể kết nối đến máy chủ bài viết.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  if (loading) {
    return (
      <View style={styles.centerBox}>
        <ActivityIndicator size="large" color="#2563EB" />
        <Text style={styles.loadingInfo}>Đang tải bản tin công nghệ mới nhất...</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={articles}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={styles.listContent}
      renderItem={({ item }) => (
        <View style={styles.articleCard}>
          <Text style={styles.articleTag}>BÀI VIẾT #{item.id}</Text>
          <Text style={styles.articleTitle}>{item.title}</Text>
          <Text style={styles.articleSnippet} numberOfLines={2}>{item.body}</Text>
        </View>
      )}
    />
  );
}

// ============================================================
// BÀI 10 - AUTHOR PROFILE: Author | null + Optional Chaining
// ============================================================
function AuthorProfileScreen() {
  const [author, setAuthor] = useState<Author | null>(null);

  const loadAuthor = () => {
    setAuthor({
      id: 88,
      name: 'Vũ Thị Minh Hạnh',
      email: 'hanh.vu@techpulse.vn',
      bio: 'Chuyên gia nghiên cứu Trí tuệ nhân tạo & Điện toán đám mây với hơn 8 năm kinh nghiệm.',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop',
      articlesCount: 42,
    });
  };

  return (
    <View style={styles.profileContainer}>
      {author ? (
        <View style={styles.profileCard}>
          <Image source={{ uri: author.avatar }} style={styles.profileAvatar} />
          <Text style={styles.profileName}>{author.name}</Text>
          <Text style={styles.profileEmail}>{author?.email}</Text>
          <Text style={styles.profileBio}>{author?.bio}</Text>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{author?.articlesCount}</Text>
            <Text style={styles.statLabel}>Bài viết đã xuất bản</Text>
          </View>
          <Pressable style={styles.resetBtn} onPress={() => setAuthor(null)}>
            <Text style={styles.resetBtnText}>Đăng xuất khỏi hồ sơ</Text>
          </Pressable>
        </View>
      ) : (
        <View style={styles.emptyCard}>
          <Text style={styles.emptyText}>Chưa có thông tin tác giả được tải.</Text>
          <Pressable style={styles.primaryBtn} onPress={loadAuthor}>
            <Text style={styles.primaryBtnText}>Tải hồ sơ tác giả mẫu</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}

// ============================================================
// BÀI 11 - REALTIME ARTICLE SEARCH: typed search filter
// ============================================================
const localArchive: Article[] = [
  { id: 101, userId: 1, title: 'Tổng quan kiến trúc React Native 2026', body: 'Khám phá kiến trúc New Architecture Fabric & TurboModules.' },
  { id: 102, userId: 1, title: 'Tối ưu hóa hiệu năng JavaScript với TypeScript 5', body: 'Các cú pháp mới giúp tăng tốc compile và type-check.' },
  { id: 103, userId: 2, title: 'Xây dựng API RESTful với Microservices', body: 'Hướng dẫn thiết kế API gateway và service mesh.' },
  { id: 104, userId: 3, title: 'Ứng dụng AI và LLM trên thiết bị di động', body: 'Chạy các mô hình nén trực tiếp bằng ONNX Runtime.' },
];

function SearchScreen() {
  const [keyword, setKeyword] = useState('');
  const results = localArchive.filter((a) =>
    a.title.toLowerCase().includes(keyword.toLowerCase()) ||
    a.body.toLowerCase().includes(keyword.toLowerCase())
  );

  return (
    <View style={styles.searchContainer}>
      <TextInput
        style={styles.searchBar}
        placeholder="Nhập từ khóa tìm bài viết (AI, React, API...)"
        value={keyword}
        onChangeText={setKeyword}
      />
      <Text style={styles.resultCount}>Tìm thấy {results.length} bài viết phù hợp:</Text>
      <FlatList
        data={results}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.resultItem}>
            <Text style={styles.resultTitle}>{item.title}</Text>
            <Text style={styles.resultBody}>{item.body}</Text>
          </View>
        )}
      />
    </View>
  );
}

// ============================================================
// BÀI 12 - API ERROR HANDLING: catch unknown + Type Guard
// ============================================================
interface CustomApiError {
  code: number;
  message: string;
}

function isCustomApiError(error: unknown): error is CustomApiError {
  return (
    typeof error === 'object' &&
    error !== null &&
    'code' in error &&
    'message' in error &&
    typeof (error as CustomApiError).message === 'string'
  );
}

function ErrorHandlingScreen() {
  const [statusLog, setStatusLog] = useState('Chưa có yêu cầu nào được gửi.');

  const triggerHandledError = async (fail: boolean) => {
    try {
      if (fail) {
        throw { code: 404, message: 'Tài nguyên bài viết không tồn tại trên máy chủ (HTTP 404).' };
      }
      setStatusLog('✅ Gọi API thành công: Dữ liệu hợp lệ!');
    } catch (err: unknown) {
      if (isCustomApiError(err)) {
        setStatusLog(`❌ Lỗi API [Mã: ${err.code}]: ${err.message}`);
      } else {
        setStatusLog('❌ Lỗi không xác định xảy ra.');
      }
    }
  };

  return (
    <View style={styles.errorBox}>
      <Text style={styles.errorTitle}>Thử nghiệm Xử lý Lỗi chuẩn TypeScript</Text>
      <Text style={styles.errorLog}>{statusLog}</Text>
      <View style={styles.buttonRow}>
        <Pressable style={[styles.actionBtn, styles.btnGreen]} onPress={() => triggerHandledError(false)}>
          <Text style={styles.actionBtnText}>API Thành công</Text>
        </Pressable>
        <Pressable style={[styles.actionBtn, styles.btnRed]} onPress={() => triggerHandledError(true)}>
          <Text style={styles.actionBtnText}>Kích hoạt Lỗi 404</Text>
        </Pressable>
      </View>
    </View>
  );
}

// ============================================================
// BÀI 13 - GENERIC FILTER: Tái sử dụng lọc mọi loại đối tượng
// ============================================================
function filterCollection<T>(items: T[], predicate: (item: T) => boolean): T[] {
  return items.filter(predicate);
}

function GenericFilterDemo() {
  const numbers = [12, 45, 68, 7, 23, 90, 31];
  const evenNumbers = filterCollection(numbers, (n) => n % 2 === 0);

  return (
    <View style={styles.genericBox}>
      <Text style={styles.genericTitle}>Minh họa hàm generic filterCollection&lt;T&gt;</Text>
      <Text style={styles.genericText}>Mảng gốc: [{numbers.join(', ')}]</Text>
      <Text style={styles.genericText}>Số chẵn được lọc: [{evenNumbers.join(', ')}]</Text>
    </View>
  );
}

// ============================================================
// BÀI 14 - PAGINATION: Generic Interface ApiResponse<T>
// ============================================================
function PaginationDemo() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 4;

  const pageData: PaginatedResponse<string> = {
    page: currentPage,
    pageSize: 3,
    total: 12,
    items: [
      `Bản tin Công nghệ số ${(currentPage - 1) * 3 + 1}`,
      `Bản tin Công nghệ số ${(currentPage - 1) * 3 + 2}`,
      `Bản tin Công nghệ số ${(currentPage - 1) * 3 + 3}`,
    ],
  };

  return (
    <View style={styles.paginationCard}>
      <Text style={styles.paginationTitle}>Phân trang dữ liệu (Trang {currentPage} / {totalPages})</Text>
      {pageData.items.map((item, idx) => (
        <View key={idx} style={styles.pItem}>
          <Text style={styles.pItemText}>📄 {item}</Text>
        </View>
      ))}
      <View style={styles.paginationControls}>
        <Pressable
          style={[styles.pageBtn, currentPage === 1 && styles.pageBtnDisabled]}
          disabled={currentPage === 1}
          onPress={() => setCurrentPage((p) => p - 1)}
        >
          <Text style={styles.pageBtnText}>‹ Trang trước</Text>
        </Pressable>
        <Pressable
          style={[styles.pageBtn, currentPage === totalPages && styles.pageBtnDisabled]}
          disabled={currentPage === totalPages}
          onPress={() => setCurrentPage((p) => p + 1)}
        >
          <Text style={styles.pageBtnText}>Trang sau ›</Text>
        </Pressable>
      </View>
    </View>
  );
}

// ============================================================
// BÀI 15 - PULL TO REFRESH: Độc lập refreshing & loading
// ============================================================
function PullToRefreshDemo() {
  const [refreshing, setRefreshing] = useState(false);
  const [lastRefreshed, setLastRefreshed] = useState('Chưa làm mới');

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setLastRefreshed(new Date().toLocaleTimeString('vi-VN'));
      setRefreshing(false);
    }, 1500);
  };

  return (
    <ScrollView
      style={styles.refreshArea}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#2563EB']} />}
    >
      <View style={styles.refreshCard}>
        <Text style={styles.refreshHint}>👇 Kéo màn hình xuống để thử nghiệm Pull-to-Refresh</Text>
        <Text style={styles.refreshTime}>Lần cập nhật cuối: {lastRefreshed}</Text>
      </View>
    </ScrollView>
  );
}

// ============================================================
// MAIN APP TUAN 2
// ============================================================
export default function App() {
  const [activeTab, setActiveTab] = useState<'feed' | 'profile' | 'search' | 'error' | 'filter' | 'page' | 'refresh'>('feed');

  const tabs = [
    { key: 'feed', label: 'B9: News' },
    { key: 'profile', label: 'B10: Profile' },
    { key: 'search', label: 'B11: Search' },
    { key: 'error', label: 'B12: Error' },
    { key: 'filter', label: 'B13: Filter' },
    { key: 'page', label: 'B14: Page' },
    { key: 'refresh', label: 'B15: Refresh' },
  ] as const;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Tuần 2: Advanced TypeScript &amp; REST API</Text>
        <Text style={styles.headerSub}>Ứng dụng TechPulse News</Text>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabBar}>
        {tabs.map((t) => (
          <Pressable
            key={t.key}
            style={[styles.tabItem, activeTab === t.key && styles.tabItemActive]}
            onPress={() => setActiveTab(t.key)}
          >
            <Text style={[styles.tabLabel, activeTab === t.key && styles.tabLabelActive]}>
              {t.label}
            </Text>
          </Pressable>
        ))}
      </ScrollView>

      <View style={styles.body}>
        {activeTab === 'feed' && <NewsFeedScreen />}
        {activeTab === 'profile' && <AuthorProfileScreen />}
        {activeTab === 'search' && <SearchScreen />}
        {activeTab === 'error' && <ErrorHandlingScreen />}
        {activeTab === 'filter' && <GenericFilterDemo />}
        {activeTab === 'page' && <PaginationDemo />}
        {activeTab === 'refresh' && <PullToRefreshDemo />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  header: { padding: 16, backgroundColor: '#0F172A' },
  headerTitle: { fontSize: 18, fontWeight: '700', color: '#FFFFFF' },
  headerSub: { fontSize: 13, color: '#94A3B8', marginTop: 2 },
  tabBar: { backgroundColor: '#1E293B', maxHeight: 52, paddingHorizontal: 10 },
  tabItem: { paddingVertical: 12, paddingHorizontal: 14, marginRight: 6 },
  tabItemActive: { borderBottomWidth: 3, borderBottomColor: '#38BDF8' },
  tabLabel: { fontSize: 13, color: '#94A3B8', fontWeight: '600' },
  tabLabelActive: { color: '#FFFFFF', fontWeight: '700' },
  body: { flex: 1, padding: 14 },
  centerBox: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  loadingInfo: { marginTop: 12, fontSize: 14, color: '#64748B' },
  listContent: { paddingBottom: 20 },
  articleCard: { backgroundColor: '#FFFFFF', padding: 14, borderRadius: 12, marginBottom: 10, elevation: 1 },
  articleTag: { fontSize: 11, fontWeight: '700', color: '#2563EB', marginBottom: 4 },
  articleTitle: { fontSize: 15, fontWeight: '700', color: '#1E293B', textTransform: 'capitalize' },
  articleSnippet: { fontSize: 13, color: '#64748B', marginTop: 6, lineHeight: 18 },
  profileContainer: { padding: 10 },
  profileCard: { backgroundColor: '#FFFFFF', padding: 20, borderRadius: 16, alignItems: 'center', elevation: 2 },
  profileAvatar: { width: 80, height: 80, borderRadius: 40, marginBottom: 12 },
  profileName: { fontSize: 18, fontWeight: '700', color: '#0F172A' },
  profileEmail: { fontSize: 13, color: '#2563EB', marginTop: 2 },
  profileBio: { fontSize: 13, color: '#475569', textAlign: 'center', marginVertical: 12, lineHeight: 18 },
  statBox: { backgroundColor: '#F1F5F9', paddingVertical: 8, paddingHorizontal: 20, borderRadius: 10, alignItems: 'center', marginVertical: 10 },
  statNumber: { fontSize: 20, fontWeight: '800', color: '#0F172A' },
  statLabel: { fontSize: 12, color: '#64748B' },
  resetBtn: { marginTop: 10, padding: 10 },
  resetBtnText: { color: '#EF4444', fontSize: 13, fontWeight: '600' },
  emptyCard: { backgroundColor: '#FFFFFF', padding: 24, borderRadius: 12, alignItems: 'center' },
  emptyText: { fontSize: 14, color: '#64748B', marginBottom: 12 },
  primaryBtn: { backgroundColor: '#2563EB', paddingVertical: 10, paddingHorizontal: 18, borderRadius: 8 },
  primaryBtnText: { color: '#FFFFFF', fontWeight: '600', fontSize: 14 },
  searchContainer: { flex: 1 },
  searchBar: { height: 44, backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#CBD5E1', borderRadius: 10, paddingHorizontal: 14, fontSize: 14, marginBottom: 10 },
  resultCount: { fontSize: 12, color: '#64748B', marginBottom: 8, fontWeight: '600' },
  resultItem: { backgroundColor: '#FFFFFF', padding: 12, borderRadius: 8, marginBottom: 8 },
  resultTitle: { fontSize: 14, fontWeight: '700', color: '#0F172A' },
  resultBody: { fontSize: 12, color: '#475569', marginTop: 4 },
  errorBox: { backgroundColor: '#FFFFFF', padding: 16, borderRadius: 12, elevation: 1 },
  errorTitle: { fontSize: 15, fontWeight: '700', color: '#0F172A', marginBottom: 8 },
  errorLog: { backgroundColor: '#F8FAFC', padding: 12, borderRadius: 8, fontSize: 13, color: '#334155', minHeight: 60, marginBottom: 14 },
  buttonRow: { flexDirection: 'row', gap: 10 },
  actionBtn: { flex: 1, paddingVertical: 10, borderRadius: 8, alignItems: 'center' },
  btnGreen: { backgroundColor: '#10B981' },
  btnRed: { backgroundColor: '#EF4444' },
  actionBtnText: { color: '#FFFFFF', fontWeight: '600', fontSize: 13 },
  genericBox: { backgroundColor: '#FFFFFF', padding: 16, borderRadius: 12 },
  genericTitle: { fontSize: 15, fontWeight: '700', color: '#0F172A', marginBottom: 8 },
  genericText: { fontSize: 13, color: '#475569', marginVertical: 4 },
  paginationCard: { backgroundColor: '#FFFFFF', padding: 16, borderRadius: 12 },
  paginationTitle: { fontSize: 15, fontWeight: '700', color: '#0F172A', marginBottom: 12 },
  pItem: { paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#F1F5F9' },
  pItemText: { fontSize: 14, color: '#1E293B' },
  paginationControls: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 16 },
  pageBtn: { paddingVertical: 8, paddingHorizontal: 14, backgroundColor: '#2563EB', borderRadius: 8 },
  pageBtnDisabled: { backgroundColor: '#CBD5E1' },
  pageBtnText: { color: '#FFFFFF', fontSize: 13, fontWeight: '600' },
  refreshArea: { flex: 1 },
  refreshCard: { backgroundColor: '#FFFFFF', padding: 30, borderRadius: 12, alignItems: 'center', marginTop: 20 },
  refreshHint: { fontSize: 14, color: '#2563EB', fontWeight: '600' },
  refreshTime: { fontSize: 12, color: '#64748B', marginTop: 10 },
});
