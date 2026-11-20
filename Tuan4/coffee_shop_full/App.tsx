import React, { useState } from 'react';
import {
  Alert,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

// ============================================================
// AROMA COFFEE & BAKERY - FLEXBOX PART 2
// Bài 6: Floating Cart Button
// Bài 7: Home Screen hoàn chỉnh
// Bài 8: Drink Detail Screen (Chọn Size, Đường, Đá, Giá động)
// Bài 9: Bottom Tab Bar Mockup
// Bài 10: Cart & Checkout Screen (Tăng giảm số lượng, Tính tổng)
// ============================================================

export interface CartItem {
  id: string;
  name: string;
  size: 'S' | 'M' | 'L';
  sugar: '30%' | '50%' | '100%';
  price: number;
  quantity: number;
  image: string;
}

// BÀI 6 - FLOATING CART BUTTON
function FloatingCartBtn({ count, onPress }: { count: number; onPress: () => void }) {
  return (
    <Pressable style={styles.floatingBtn} onPress={onPress}>
      <Text style={styles.floatingIcon}>🛍️</Text>
      {count > 0 && (
        <View style={styles.floatingBadge}>
          <Text style={styles.floatingBadgeText}>{count}</Text>
        </View>
      )}
    </Pressable>
  );
}

// BÀI 8 - DRINK DETAIL SCREEN
function DrinkDetailScreen({ onBack, onAddToCart }: { onBack: () => void; onAddToCart: (item: CartItem) => void }) {
  const [size, setSize] = useState<'S' | 'M' | 'L'>('M');
  const [sugar, setSugar] = useState<'30%' | '50%' | '100%'>('50%');

  const basePrice = 45000;
  const sizeExtra = size === 'S' ? 0 : size === 'M' ? 6000 : 12000;
  const currentPrice = basePrice + sizeExtra;

  const handleAdd = () => {
    onAddToCart({
      id: Date.now().toString(),
      name: 'Cà phê Muối Cốm Huế',
      size,
      sugar,
      price: currentPrice,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400&h=400&fit=crop',
    });
    Alert.alert('Thành công', 'Đã thêm món vào giỏ hàng!');
  };

  return (
    <View style={styles.detailWrap}>
      <ScrollView contentContainerStyle={styles.detailScroll}>
        <View style={styles.detailImgBox}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=500&h=500&fit=crop' }}
            style={styles.detailHeroImg}
          />
          <Pressable style={styles.backBtn} onPress={onBack}>
            <Text style={styles.backBtnText}>‹ Quay lại</Text>
          </Pressable>
        </View>

        <View style={styles.detailBody}>
          <Text style={styles.detailName}>Cà phê Muối Cốm Huế</Text>
          <Text style={styles.detailDesc}>
            Sự kết hợp tinh tế giữa hạt cà phê Arabica Cầu Đất nguyên chất, lớp kem béo mặn bùi và hương thơm đặc trưng của hạt cốm non xứ Huế.
          </Text>

          <Text style={styles.optionTitle}>1. Chọn kích cỡ ly:</Text>
          <View style={styles.optionRow}>
            {(['S', 'M', 'L'] as const).map((s) => (
              <Pressable
                key={s}
                style={[styles.optionChip, size === s && styles.optionChipActive]}
                onPress={() => setSize(s)}
              >
                <Text style={[styles.optionText, size === s && styles.optionTextActive]}>
                  Size {s} ({s === 'S' ? '+0đ' : s === 'M' ? '+6k' : '+12k'})
                </Text>
              </Pressable>
            ))}
          </View>

          <Text style={styles.optionTitle}>2. Mức ngọt (Đường):</Text>
          <View style={styles.optionRow}>
            {(['30%', '50%', '100%'] as const).map((sg) => (
              <Pressable
                key={sg}
                style={[styles.optionChip, sugar === sg && styles.optionChipActive]}
                onPress={() => setSugar(sg)}
              >
                <Text style={[styles.optionText, sugar === sg && styles.optionTextActive]}>{sg} Đường</Text>
              </Pressable>
            ))}
          </View>
        </View>
      </ScrollView>

      <View style={styles.detailFooter}>
        <View>
          <Text style={styles.priceLabel}>Tổng cộng:</Text>
          <Text style={styles.detailPrice}>{currentPrice.toLocaleString('vi-VN')} đ</Text>
        </View>
        <Pressable style={styles.addCartBtn} onPress={handleAdd}>
          <Text style={styles.addCartBtnText}>+ Thêm vào giỏ</Text>
        </Pressable>
      </View>
    </View>
  );
}

// BÀI 9 - BOTTOM TAB BAR MOCKUP
function BottomTabBar({ activeTab, onChangeTab }: { activeTab: string; onChangeTab: (t: string) => void }) {
  const tabs = [
    { key: 'home', icon: '🏠', label: 'Trang chủ' },
    { key: 'menu', icon: '☕', label: 'Thực đơn' },
    { key: 'cart', icon: '🛒', label: 'Giỏ hàng' },
    { key: 'profile', icon: '👤', label: 'Tài khoản' },
  ];

  return (
    <View style={styles.bottomBar}>
      {tabs.map((t) => (
        <Pressable key={t.key} style={styles.barItem} onPress={() => onChangeTab(t.key)}>
          <Text style={styles.barIcon}>{t.icon}</Text>
          <Text style={[styles.barLabel, activeTab === t.key && styles.barLabelActive]}>{t.label}</Text>
        </Pressable>
      ))}
    </View>
  );
}

// BÀI 10 - CART & CHECKOUT SCREEN
function CartScreen({ items, onUpdateQty, onCheckout }: { items: CartItem[]; onUpdateQty: (id: string, delta: number) => void; onCheckout: () => void }) {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipFee = items.length > 0 ? 15000 : 0;
  const total = subtotal + shipFee;

  return (
    <View style={styles.cartContainer}>
      <Text style={styles.cartHeading}>Giỏ Hàng Của Bạn ({items.length} món)</Text>

      {items.length === 0 ? (
        <View style={styles.emptyCartBox}>
          <Text style={styles.emptyCartIcon}>☕</Text>
          <Text style={styles.emptyCartText}>Giỏ hàng đang trống.</Text>
        </View>
      ) : (
        <ScrollView style={styles.cartList}>
          {items.map((it) => (
            <View key={it.id} style={styles.cartItemCard}>
              <Image source={{ uri: it.image }} style={styles.cartItemImg} />
              <View style={styles.cartItemInfo}>
                <Text style={styles.cartItemName}>{it.name}</Text>
                <Text style={styles.cartItemDetail}>Size {it.size} | {it.sugar} đường</Text>
                <Text style={styles.cartItemPrice}>{it.price.toLocaleString('vi-VN')} đ</Text>
              </View>
              <View style={styles.stepper}>
                <Pressable style={styles.stepBtn} onPress={() => onUpdateQty(it.id, -1)}>
                  <Text style={styles.stepBtnText}>-</Text>
                </Pressable>
                <Text style={styles.stepQty}>{it.quantity}</Text>
                <Pressable style={styles.stepBtn} onPress={() => onUpdateQty(it.id, 1)}>
                  <Text style={styles.stepBtnText}>+</Text>
                </Pressable>
              </View>
            </View>
          ))}
        </ScrollView>
      )}

      {items.length > 0 && (
        <View style={styles.cartSummary}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Tiền món:</Text>
            <Text style={styles.summaryVal}>{subtotal.toLocaleString('vi-VN')} đ</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Phí giao hàng:</Text>
            <Text style={styles.summaryVal}>{shipFee.toLocaleString('vi-VN')} đ</Text>
          </View>
          <View style={[styles.summaryRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Thanh toán:</Text>
            <Text style={styles.totalVal}>{total.toLocaleString('vi-VN')} đ</Text>
          </View>
          <Pressable style={styles.checkoutBtn} onPress={onCheckout}>
            <Text style={styles.checkoutBtnText}>TIẾN HÀNH ĐẶT HÀNG</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}

// BÀI 7 - COMPLETE HOME SCREEN
function HomeScreenComponent({ onOpenDetail, onOpenCart, cartCount }: { onOpenDetail: () => void; onOpenCart: () => void; cartCount: number }) {
  return (
    <View style={styles.flexOne}>
      <ScrollView style={styles.flexOne} contentContainerStyle={{ padding: 16 }}>
        <View style={styles.homeHero}>
          <Text style={styles.heroPre}>Aroma Coffee &amp; Bakery</Text>
          <Text style={styles.heroMain}>Khởi đầu ngày mới với ly cà phê đậm vị</Text>
          <Pressable style={styles.heroBtn} onPress={onOpenDetail}>
            <Text style={styles.heroBtnText}>Xem món đặc sắc hôm nay ›</Text>
          </Pressable>
        </View>

        <Text style={styles.sectionTitle}>Món Bán Chạy Nhất</Text>
        <Pressable style={styles.featuredCard} onPress={onOpenDetail}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400&h=400&fit=crop' }}
            style={styles.featuredImg}
          />
          <View style={styles.featuredInfo}>
            <Text style={styles.featuredTitle}>Cà phê Muối Cốm Huế</Text>
            <Text style={styles.featuredSub}>Cà phê Cầu Đất, kem béo muối &amp; cốm</Text>
            <Text style={styles.featuredPrice}>45.000 đ</Text>
          </View>
        </Pressable>
      </ScrollView>
      <FloatingCartBtn count={cartCount} onPress={onOpenCart} />
    </View>
  );
}

// MAIN APP CONTAINER
export default function App() {
  const [currentScreen, setCurrentScreen] = useState<'home' | 'detail' | 'cart'>('home');
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 'demo-1',
      name: 'Caramel Macchiato Đá',
      size: 'M',
      sugar: '50%',
      price: 52000,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1485808191679-5f86510681a2?w=400&h=400&fit=crop',
    },
  ]);

  const handleAddToCart = (item: CartItem) => {
    setCartItems((prev) => [...prev, item]);
    setCurrentScreen('cart');
  };

  const handleUpdateQty = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((it) => (it.id === id ? { ...it, quantity: it.quantity + delta } : it))
        .filter((it) => it.quantity > 0)
    );
  };

  const handleCheckout = () => {
    Alert.alert('Đặt hàng thành công!', 'Cảm ơn bạn. Đơn hàng đang được Aroma chuẩn bị.');
    setCartItems([]);
    setCurrentScreen('home');
  };

  const totalCount = cartItems.reduce((sum, it) => sum + it.quantity, 0);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.topSelector}>
        <Pressable
          style={[styles.topSelectorBtn, currentScreen === 'home' && styles.topSelectorBtnActive]}
          onPress={() => setCurrentScreen('home')}
        >
          <Text style={[styles.topSelectorText, currentScreen === 'home' && styles.topSelectorTextActive]}>
            Bài 7: Home
          </Text>
        </Pressable>
        <Pressable
          style={[styles.topSelectorBtn, currentScreen === 'detail' && styles.topSelectorBtnActive]}
          onPress={() => setCurrentScreen('detail')}
        >
          <Text style={[styles.topSelectorText, currentScreen === 'detail' && styles.topSelectorTextActive]}>
            Bài 8: Detail
          </Text>
        </Pressable>
        <Pressable
          style={[styles.topSelectorBtn, currentScreen === 'cart' && styles.topSelectorBtnActive]}
          onPress={() => setCurrentScreen('cart')}
        >
          <Text style={[styles.topSelectorText, currentScreen === 'cart' && styles.topSelectorTextActive]}>
            Bài 10: Cart ({totalCount})
          </Text>
        </Pressable>
      </View>

      <View style={styles.flexOne}>
        {currentScreen === 'home' && (
          <HomeScreenComponent
            onOpenDetail={() => setCurrentScreen('detail')}
            onOpenCart={() => setCurrentScreen('cart')}
            cartCount={totalCount}
          />
        )}
        {currentScreen === 'detail' && (
          <DrinkDetailScreen onBack={() => setCurrentScreen('home')} onAddToCart={handleAddToCart} />
        )}
        {currentScreen === 'cart' && (
          <CartScreen items={cartItems} onUpdateQty={handleUpdateQty} onCheckout={handleCheckout} />
        )}
      </View>

      <BottomTabBar activeTab={currentScreen} onChangeTab={(tab) => {
        if (tab === 'home') setCurrentScreen('home');
        if (tab === 'cart') setCurrentScreen('cart');
        if (tab === 'menu') setCurrentScreen('detail');
      }} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FAF7F2' },
  flexOne: { flex: 1 },
  topSelector: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E8DFD8',
    padding: 6,
    gap: 6,
  },
  topSelectorBtn: { flex: 1, paddingVertical: 8, alignItems: 'center', borderRadius: 8 },
  topSelectorBtnActive: { backgroundColor: '#7F4F24' },
  topSelectorText: { fontSize: 12, color: '#583101', fontWeight: '600' },
  topSelectorTextActive: { color: '#FFFFFF' },
  floatingBtn: {
    position: 'absolute',
    bottom: 24,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#C86D3B',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  floatingIcon: { fontSize: 24 },
  floatingBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#E63946',
    borderRadius: 12,
    minWidth: 22,
    height: 22,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  floatingBadgeText: { color: '#FFFFFF', fontSize: 11, fontWeight: '800' },
  homeHero: {
    backgroundColor: '#2C1810',
    padding: 20,
    borderRadius: 16,
    marginBottom: 20,
  },
  heroPre: { color: '#D4A373', fontSize: 12, fontWeight: '700' },
  heroMain: { color: '#FFFFFF', fontSize: 20, fontWeight: '800', marginVertical: 8 },
  heroBtn: { backgroundColor: '#7F4F24', paddingVertical: 8, paddingHorizontal: 14, borderRadius: 8, alignSelf: 'flex-start' },
  heroBtnText: { color: '#FFFFFF', fontSize: 12, fontWeight: '700' },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: '#2C1810', marginBottom: 12 },
  featuredCard: { flexDirection: 'row', backgroundColor: '#FFFFFF', borderRadius: 14, padding: 12, elevation: 2 },
  featuredImg: { width: 90, height: 90, borderRadius: 12, marginRight: 12 },
  featuredInfo: { flex: 1, justifyContent: 'center' },
  featuredTitle: { fontSize: 15, fontWeight: '700', color: '#2C1810' },
  featuredSub: { fontSize: 12, color: '#8C7A6B', marginVertical: 4 },
  featuredPrice: { fontSize: 15, fontWeight: '800', color: '#B0411E' },
  detailWrap: { flex: 1, backgroundColor: '#FFFFFF' },
  detailScroll: { paddingBottom: 20 },
  detailImgBox: { position: 'relative' },
  detailHeroImg: { width: '100%', height: 260 },
  backBtn: { position: 'absolute', top: 16, left: 16, backgroundColor: 'rgba(255,255,255,0.9)', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
  backBtnText: { fontSize: 14, fontWeight: '700', color: '#2C1810' },
  detailBody: { padding: 16 },
  detailName: { fontSize: 22, fontWeight: '800', color: '#2C1810' },
  detailDesc: { fontSize: 13, color: '#665C54', lineHeight: 20, marginVertical: 10 },
  optionTitle: { fontSize: 14, fontWeight: '700', color: '#2C1810', marginTop: 14, marginBottom: 8 },
  optionRow: { flexDirection: 'row', gap: 10 },
  optionChip: { flex: 1, paddingVertical: 10, borderRadius: 10, borderWidth: 1, borderColor: '#D4C3B3', alignItems: 'center' },
  optionChipActive: { backgroundColor: '#7F4F24', borderColor: '#7F4F24' },
  optionText: { fontSize: 13, color: '#583101', fontWeight: '600' },
  optionTextActive: { color: '#FFFFFF' },
  detailFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#E8DFD8',
    backgroundColor: '#FFFFFF',
  },
  priceLabel: { fontSize: 12, color: '#8C7A6B' },
  detailPrice: { fontSize: 18, fontWeight: '800', color: '#B0411E' },
  addCartBtn: { backgroundColor: '#C86D3B', paddingVertical: 12, paddingHorizontal: 22, borderRadius: 12 },
  addCartBtnText: { color: '#FFFFFF', fontSize: 14, fontWeight: '700' },
  bottomBar: { flexDirection: 'row', height: 60, backgroundColor: '#FFFFFF', borderTopWidth: 1, borderTopColor: '#E8DFD8' },
  barItem: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  barIcon: { fontSize: 20 },
  barLabel: { fontSize: 11, color: '#8C7A6B', marginTop: 2 },
  barLabelActive: { color: '#7F4F24', fontWeight: '700' },
  cartContainer: { flex: 1, padding: 16 },
  cartHeading: { fontSize: 18, fontWeight: '800', color: '#2C1810', marginBottom: 14 },
  emptyCartBox: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyCartIcon: { fontSize: 48, marginBottom: 10 },
  emptyCartText: { fontSize: 14, color: '#8C7A6B' },
  cartList: { flex: 1 },
  cartItemCard: { flexDirection: 'row', backgroundColor: '#FFFFFF', padding: 12, borderRadius: 12, marginBottom: 10, alignItems: 'center', elevation: 1 },
  cartItemImg: { width: 64, height: 64, borderRadius: 8, marginRight: 12 },
  cartItemInfo: { flex: 1 },
  cartItemName: { fontSize: 14, fontWeight: '700', color: '#2C1810' },
  cartItemDetail: { fontSize: 11, color: '#8C7A6B', marginVertical: 2 },
  cartItemPrice: { fontSize: 13, fontWeight: '800', color: '#B0411E' },
  stepper: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FAF7F2', borderRadius: 8, padding: 4 },
  stepBtn: { width: 26, height: 26, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFFFFF', borderRadius: 6 },
  stepBtnText: { fontSize: 16, fontWeight: '700', color: '#2C1810' },
  stepQty: { marginHorizontal: 8, fontSize: 13, fontWeight: '700', color: '#2C1810' },
  cartSummary: { backgroundColor: '#FFFFFF', padding: 16, borderRadius: 16, elevation: 3 },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  summaryLabel: { fontSize: 13, color: '#665C54' },
  summaryVal: { fontSize: 13, fontWeight: '600', color: '#2C1810' },
  totalRow: { borderTopWidth: 1, borderTopColor: '#E8DFD8', paddingTop: 8, marginTop: 4 },
  totalLabel: { fontSize: 15, fontWeight: '800', color: '#2C1810' },
  totalVal: { fontSize: 18, fontWeight: '800', color: '#B0411E' },
  checkoutBtn: { backgroundColor: '#7F4F24', paddingVertical: 12, borderRadius: 12, alignItems: 'center', marginTop: 12 },
  checkoutBtnText: { color: '#FFFFFF', fontSize: 14, fontWeight: '800' },
});
