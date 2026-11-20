import React from 'react';
import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

// =============================================
// DATA MẪU - AROMA COFFEE & BAKERY
// =============================================
export interface Beverage {
  id: string;
  name: string;
  category: string;
  price: number;
  rating: number;
  image: string;
  discountBadge?: string;
  isPopular?: boolean;
}

export const beverages: Beverage[] = [
  {
    id: '1',
    name: 'Cà phê Muối Cốm Huế',
    category: 'Cà phê đặc sản',
    price: 45000,
    rating: 4.9,
    discountBadge: 'GIẢM 20%',
    isPopular: true,
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400&h=400&fit=crop',
  },
  {
    id: '2',
    name: 'Caramel Macchiato Đá',
    category: 'Cà phê pha máy',
    price: 52000,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1485808191679-5f86510681a2?w=400&h=400&fit=crop',
  },
  {
    id: '3',
    name: 'Trà Đào Cam Sả Thảo Mộc',
    category: 'Trà trái cây',
    price: 48000,
    rating: 4.7,
    discountBadge: 'HOT',
    image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=400&fit=crop',
  },
  {
    id: '4',
    name: 'Bánh Croissant Bơ Pháp',
    category: 'Bánh ngọt Bakery',
    price: 35000,
    rating: 4.9,
    isPopular: true,
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&h=400&fit=crop',
  },
];

// =============================================
// BÀI 1: HEADER QUÁN CÀ PHÊ (FLEXBOX ROW + JUSTIFY CONTENT)
// =============================================
function CoffeeHeader() {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.headerLeft}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop' }}
          style={styles.headerAvatar}
        />
        <View>
          <Text style={styles.greetingText}>Xin chào, Minh Trí 👋</Text>
          <Text style={styles.brandTitle}>Aroma Coffee &amp; Bakery</Text>
        </View>
      </View>
      <View style={styles.headerRight}>
        <Pressable style={styles.iconCircle}>
          <Text style={styles.iconSymbol}>🔔</Text>
          <View style={styles.notifDot} />
        </Pressable>
      </View>
    </View>
  );
}

// =============================================
// BÀI 2: PROMOTION BANNER (GRADIENT STYLE + CTA)
// =============================================
function PromoBanner() {
  return (
    <View style={styles.bannerBox}>
      <View style={styles.bannerInfo}>
        <View style={styles.bannerTag}>
          <Text style={styles.bannerTagText}>ƯU ĐÃI ĐẶC BIỆT</Text>
        </View>
        <Text style={styles.bannerTitle}>Giảm 30% Thức Uống Mới</Text>
        <Text style={styles.bannerSubtitle}>Áp dụng cho mọi đơn đặt trước 10:00 sáng</Text>
        <Pressable style={styles.bannerCta}>
          <Text style={styles.bannerCtaText}>Đặt hàng ngay</Text>
        </Pressable>
      </View>
      <Image
        source={{ uri: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?w=300&h=300&fit=crop' }}
        style={styles.bannerImage}
      />
    </View>
  );
}

// =============================================
// BÀI 3: CATEGORY CHIPS (FLEXROW + WRAP + GAP)
// =============================================
const categories = ['Tất cả', 'Cà phê pha máy', 'Trà trái cây', 'Đá xay Freeze', 'Bánh tươi'];

function CategoryChips() {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
      {categories.map((cat, idx) => (
        <Pressable key={idx} style={[styles.catChip, idx === 0 && styles.catChipActive]}>
          <Text style={[styles.catChipText, idx === 0 && styles.catChipTextActive]}>{cat}</Text>
        </Pressable>
      ))}
    </ScrollView>
  );
}

// =============================================
// BÀI 4: BEVERAGE LIST CARD (ROW LAYOUT - ẢNH TRÁI, CHỮ PHẢI)
// =============================================
function BeverageRowCard({ item }: { item: Beverage }) {
  return (
    <View style={styles.rowCard}>
      <Image source={{ uri: item.image }} style={styles.rowCardImg} />
      <View style={styles.rowCardContent}>
        <Text style={styles.rowCardCategory}>{item.category}</Text>
        <Text style={styles.rowCardTitle}>{item.name}</Text>
        <Text style={styles.rowCardRating}>⭐ {item.rating.toFixed(1)} (120+ lượt mua)</Text>
        <View style={styles.priceRow}>
          <Text style={styles.rowCardPrice}>{item.price.toLocaleString('vi-VN')} đ</Text>
          <Pressable style={styles.addMiniBtn}>
            <Text style={styles.addMiniBtnText}>+ Thêm</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

// =============================================
// BÀI 5: BEVERAGE 2-COLUMN GRID (WIDTH 48% + BADGE OVERLAY)
// =============================================
function BeverageGridCard({ item }: { item: Beverage }) {
  return (
    <View style={styles.gridCard}>
      <View style={styles.gridImgWrap}>
        <Image source={{ uri: item.image }} style={styles.gridImg} />
        {item.discountBadge && (
          <View style={styles.discountBadge}>
            <Text style={styles.discountBadgeText}>{item.discountBadge}</Text>
          </View>
        )}
      </View>
      <View style={styles.gridInfo}>
        <Text style={styles.gridTitle} numberOfLines={1}>{item.name}</Text>
        <Text style={styles.gridCategory}>{item.category}</Text>
        <View style={styles.gridBottomRow}>
          <Text style={styles.gridPrice}>{item.price.toLocaleString('vi-VN')} đ</Text>
          <Pressable style={styles.gridAddBtn}>
            <Text style={styles.gridAddBtnText}>+</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

function BeverageGrid() {
  return (
    <View style={styles.gridContainer}>
      {beverages.map((item) => (
        <BeverageGridCard key={item.id} item={item} />
      ))}
    </View>
  );
}

// =============================================
// MAIN APP COMPONENT
// =============================================
export default function App() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
        <Text style={styles.sectionHeading}>Bài 1: Coffee Header (Flexbox Row)</Text>
        <CoffeeHeader />

        <Text style={styles.sectionHeading}>Bài 2: Promotion Hero Banner</Text>
        <PromoBanner />

        <Text style={styles.sectionHeading}>Bài 3: Category Chips (Flex Wrap / Scroll)</Text>
        <CategoryChips />

        <Text style={styles.sectionHeading}>Bài 4: Beverage List Card (Row Flex: 1)</Text>
        <BeverageRowCard item={beverages[0]} />
        <BeverageRowCard item={beverages[1]} />

        <Text style={styles.sectionHeading}>Bài 5: 2-Column Beverage Grid (Absolute Badge)</Text>
        <BeverageGrid />

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

// =============================================
// STYLESHEET
// =============================================
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FAF7F2' },
  container: { flex: 1 },
  scrollContent: { padding: 16 },
  sectionHeading: {
    fontSize: 15,
    fontWeight: '700',
    color: '#4A3319',
    marginTop: 18,
    marginBottom: 8,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 14,
    borderRadius: 16,
    elevation: 2,
  },
  headerLeft: { flexDirection: 'row', alignItems: 'center' },
  headerAvatar: { width: 44, height: 44, borderRadius: 22, marginRight: 12 },
  greetingText: { fontSize: 12, color: '#8C7A6B' },
  brandTitle: { fontSize: 16, fontWeight: '700', color: '#2C1810' },
  headerRight: { flexDirection: 'row' },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F5EFE6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconSymbol: { fontSize: 18 },
  notifDot: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#E63946',
  },
  bannerBox: {
    flexDirection: 'row',
    backgroundColor: '#2C1810',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    overflow: 'hidden',
  },
  bannerInfo: { flex: 1, paddingRight: 10 },
  bannerTag: {
    backgroundColor: '#D4A373',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    marginBottom: 6,
  },
  bannerTagText: { color: '#2C1810', fontSize: 10, fontWeight: '800' },
  bannerTitle: { fontSize: 16, fontWeight: '700', color: '#FFFFFF', marginBottom: 4 },
  bannerSubtitle: { fontSize: 11, color: '#D4C3B3', marginBottom: 10 },
  bannerCta: {
    backgroundColor: '#C86D3B',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  bannerCtaText: { color: '#FFFFFF', fontSize: 12, fontWeight: '700' },
  bannerImage: { width: 85, height: 85, borderRadius: 12 },
  categoryScroll: { marginVertical: 4 },
  catChip: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#E8DFD8',
  },
  catChipActive: { backgroundColor: '#7F4F24', borderColor: '#7F4F24' },
  catChipText: { fontSize: 13, color: '#583101', fontWeight: '600' },
  catChipTextActive: { color: '#FFFFFF' },
  rowCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 10,
    marginBottom: 10,
    elevation: 2,
  },
  rowCardImg: { width: 80, height: 80, borderRadius: 10, marginRight: 12 },
  rowCardContent: { flex: 1, justifyContent: 'space-between' },
  rowCardCategory: { fontSize: 11, color: '#A0816C', textTransform: 'uppercase' },
  rowCardTitle: { fontSize: 15, fontWeight: '700', color: '#2C1810' },
  rowCardRating: { fontSize: 11, color: '#7F4F24' },
  priceRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  rowCardPrice: { fontSize: 14, fontWeight: '800', color: '#B0411E' },
  addMiniBtn: { backgroundColor: '#7F4F24', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 6 },
  addMiniBtnText: { color: '#FFFFFF', fontSize: 12, fontWeight: '600' },
  gridContainer: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  gridCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    marginBottom: 14,
    overflow: 'hidden',
    elevation: 2,
  },
  gridImgWrap: { position: 'relative' },
  gridImg: { width: '100%', height: 130 },
  discountBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: '#E63946',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  discountBadgeText: { color: '#FFFFFF', fontSize: 10, fontWeight: '800' },
  gridInfo: { padding: 10 },
  gridTitle: { fontSize: 14, fontWeight: '700', color: '#2C1810' },
  gridCategory: { fontSize: 11, color: '#A0816C', marginVertical: 2 },
  gridBottomRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 6 },
  gridPrice: { fontSize: 13, fontWeight: '800', color: '#B0411E' },
  gridAddBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#7F4F24',
    justifyContent: 'center',
    alignItems: 'center',
  },
  gridAddBtnText: { color: '#FFFFFF', fontSize: 16, fontWeight: '700', lineHeight: 18 },
});
