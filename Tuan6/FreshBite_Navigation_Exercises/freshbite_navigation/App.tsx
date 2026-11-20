import 'react-native-gesture-handler';
import React, { useState } from 'react';
import {
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import type { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';

// ============================================================
// DATA MẪU MÓN ĂN GOURMET
// ============================================================
export interface FoodItem {
  id: string;
  name: string;
  restaurant: string;
  price: number;
  rating: number;
  image: string;
  description: string;
}

const sampleFoods: FoodItem[] = [
  {
    id: '1',
    name: 'Burger Bò Wagyu Phô Mai Truffle',
    restaurant: 'FreshBite Gourmet House',
    price: 145000,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=400&fit=crop',
    description: 'Thịt bò Wagyu thượng hạng nướng than hoa, sốt nấm Truffle đen và phô mai Cheddar béo ngậy.',
  },
  {
    id: '2',
    name: 'Pizza Hải Sản Phô Mai Kéo Sợi',
    restaurant: 'Bella Napoli Kitchen',
    price: 195000,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=400&fit=crop',
    description: 'Tôm mực tươi Phú Quốc kết hợp cùng phô mai Mozzarella Ý nhập khẩu nướng củi giòn thơm.',
  },
  {
    id: '3',
    name: 'Mì Ý Sốt Bò Bằm Bolognaise Cổ Điển',
    restaurant: 'Pasta Fresca Bistro',
    price: 115000,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=400&h=400&fit=crop',
    description: 'Sợi mì tươi làm thủ công ninh nhừ cùng thịt bò băm nhỏ và phô mai Parmesan bào mịn.',
  },
];

// ============================================================
// 1. BÀI 1 + 2: FOOD SELECTION STACK (PARAM PASSING & RETURN)
// ============================================================
export type FoodStackParamList = {
  FoodList: { confirmedOrder?: string } | undefined;
  FoodDetail: { food: FoodItem };
  FoodConfirm: { food: FoodItem; extraOption: string };
};

const FoodStack = createNativeStackNavigator<FoodStackParamList>();

function FoodListScreen({ route, navigation }: NativeStackScreenProps<FoodStackParamList, 'FoodList'>) {
  const confirmed = route.params?.confirmedOrder;

  return (
    <View style={styles.screen}>
      <Text style={styles.screenHint}>Bài 1 &amp; 2: Chạm vào món ăn để cấu hình phần ăn và nhận phản hồi param.</Text>
      {confirmed && (
        <View style={styles.confirmedAlert}>
          <Text style={styles.confirmedAlertText}>🎉 {confirmed}</Text>
        </View>
      )}

      <FlatList
        data={sampleFoods}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable
            style={styles.foodRowCard}
            onPress={() => navigation.navigate('FoodDetail', { food: item })}
          >
            <Image source={{ uri: item.image }} style={styles.foodRowImg} />
            <View style={styles.foodRowInfo}>
              <Text style={styles.foodRowName}>{item.name}</Text>
              <Text style={styles.foodRowRest}>{item.restaurant}</Text>
              <Text style={styles.foodRowPrice}>{item.price.toLocaleString('vi-VN')} đ</Text>
            </View>
          </Pressable>
        )}
      />
    </View>
  );
}

function FoodDetailScreen({ route, navigation }: NativeStackScreenProps<FoodStackParamList, 'FoodDetail'>) {
  const { food } = route.params;
  const [extra, setExtra] = useState<'Tiêu chuẩn' | 'Thêm Phô Mai (+15k)' | 'Combo Nước Ngọt (+20k)'>('Tiêu chuẩn');

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.detailScroll}>
      <Image source={{ uri: food.image }} style={styles.detailHero} />
      <Text style={styles.detailTitle}>{food.name}</Text>
      <Text style={styles.detailRest}>{food.restaurant}</Text>
      <Text style={styles.detailPrice}>{food.price.toLocaleString('vi-VN')} đ</Text>
      <Text style={styles.detailDesc}>{food.description}</Text>

      <Text style={styles.optionHeading}>Tùy chọn suất ăn:</Text>
      {(['Tiêu chuẩn', 'Thêm Phô Mai (+15k)', 'Combo Nước Ngọt (+20k)'] as const).map((opt) => (
        <Pressable
          key={opt}
          style={[styles.radioItem, extra === opt && styles.radioItemActive]}
          onPress={() => setExtra(opt)}
        >
          <Text style={styles.radioDot}>{extra === opt ? '🔘' : '⚪'}</Text>
          <Text style={[styles.radioLabel, extra === opt && styles.radioLabelActive]}>{opt}</Text>
        </Pressable>
      ))}

      <Pressable
        style={styles.primaryBtn}
        onPress={() => navigation.navigate('FoodConfirm', { food, extraOption: extra })}
      >
        <Text style={styles.primaryBtnText}>XEM XÁC NHẬN ĐƠN HÀNG ➔</Text>
      </Pressable>
    </ScrollView>
  );
}

function FoodConfirmScreen({ route, navigation }: NativeStackScreenProps<FoodStackParamList, 'FoodConfirm'>) {
  const { food, extraOption } = route.params;

  const handleFinish = () => {
    navigation.navigate('FoodList', {
      confirmedOrder: `Đã xác nhận đặt: ${food.name} (${extraOption})`,
    });
  };

  return (
    <View style={[styles.screen, styles.centerBox]}>
      <Text style={styles.confirmIcon}>✅</Text>
      <Text style={styles.confirmTitle}>Xác Nhận Suất Ăn</Text>
      <Text style={styles.confirmItem}>{food.name}</Text>
      <Text style={styles.confirmOption}>Tùy chọn: {extraOption}</Text>
      <Text style={styles.confirmPrice}>Đơn giá: {food.price.toLocaleString('vi-VN')} đ</Text>

      <Pressable style={styles.primaryBtn} onPress={handleFinish}>
        <Text style={styles.primaryBtnText}>GỬI KẾT QUẢ VỀ MÀN HÌNH CHÍNH</Text>
      </Pressable>
    </View>
  );
}

function FoodStackNavigator() {
  return (
    <FoodStack.Navigator>
      <FoodStack.Screen name="FoodList" component={FoodListScreen} options={{ title: 'Danh Thực Đơn' }} />
      <FoodStack.Screen name="FoodDetail" component={FoodDetailScreen} options={{ title: 'Chi Tiết Món' }} />
      <FoodStack.Screen name="FoodConfirm" component={FoodConfirmScreen} options={{ title: 'Xác Nhận Đơn' }} />
    </FoodStack.Navigator>
  );
}

// ============================================================
// 2. BÀI 3: BASIC BOTTOM TAB NAVIGATION
// ============================================================
export type MainTabParamList = {
  HomeTab: undefined;
  SearchTab: undefined;
  ProfileTab: undefined;
};

const MainTab = createBottomTabNavigator<MainTabParamList>();

function HomeTabScreen() {
  return (
    <View style={[styles.screen, styles.centerBox]}>
      <Text style={styles.tabIcon}>🏠</Text>
      <Text style={styles.tabTitle}>Trang Chủ FreshBite</Text>
      <Text style={styles.tabSub}>Khám phá 50+ nhà hàng đối tác và ưu đãi độc quyền.</Text>
    </View>
  );
}

function SearchTabScreen() {
  const [q, setQ] = useState('');
  return (
    <View style={styles.screen}>
      <TextInput
        style={styles.searchInput}
        placeholder="Tìm kiếm burger, pizza, mì ý..."
        value={q}
        onChangeText={setQ}
      />
      <Text style={styles.screenHint}>Bài 3: Nhập từ khóa để lọc các món ăn ngon.</Text>
    </View>
  );
}

function ProfileTabScreen() {
  return (
    <View style={[styles.screen, styles.centerBox]}>
      <Image
        source={{ uri: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop' }}
        style={styles.userAvatar}
      />
      <Text style={styles.userName}>Đặng Minh Trí</Text>
      <Text style={styles.userRole}>Khách hàng Vàng (Gold Member)</Text>
      <Text style={styles.tabSub}>12 đơn hàng đã hoàn thành trong tháng.</Text>
    </View>
  );
}

function MainTabNavigator() {
  return (
    <MainTab.Navigator screenOptions={{ headerShown: false }}>
      <MainTab.Screen name="HomeTab" component={HomeTabScreen} options={{ tabBarLabel: 'Trang chủ', tabBarIcon: () => <Text>🏠</Text> }} />
      <MainTab.Screen name="SearchTab" component={SearchTabScreen} options={{ tabBarLabel: 'Tìm kiếm', tabBarIcon: () => <Text>🔍</Text> }} />
      <MainTab.Screen name="ProfileTab" component={ProfileTabScreen} options={{ tabBarLabel: 'Hồ sơ', tabBarIcon: () => <Text>👤</Text> }} />
    </MainTab.Navigator>
  );
}

// ============================================================
// 3. BÀI 5: DRAWER NAVIGATION (SIDE MENU + SETTINGS)
// ============================================================
export type RootDrawerParamList = {
  FoodOrderStack: NavigatorScreenParams<FoodStackParamList>;
  TabsOverview: NavigatorScreenParams<MainTabParamList>;
  Settings: undefined;
};

const Drawer = createDrawerNavigator<RootDrawerParamList>();

function SettingsScreen() {
  const [darkMode, setDarkMode] = useState(false);
  const [notif, setNotif] = useState(true);

  return (
    <View style={styles.screen}>
      <Text style={styles.settingsTitle}>Bài 5: Cài Đặt Hệ Thống</Text>
      <View style={styles.settingRow}>
        <Text style={styles.settingLabel}>Chế độ giao diện tối (Dark Mode)</Text>
        <Switch value={darkMode} onValueChange={setDarkMode} trackColor={{ true: '#E11D48' }} />
      </View>
      <View style={styles.settingRow}>
        <Text style={styles.settingLabel}>Nhận thông báo ưu đãi giờ vàng</Text>
        <Switch value={notif} onValueChange={setNotif} trackColor={{ true: '#E11D48' }} />
      </View>
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="FoodOrderStack">
        <Drawer.Screen
          name="FoodOrderStack"
          component={FoodStackNavigator}
          options={{ title: 'Bài 1-2: Đặt Món (Stack)' }}
        />
        <Drawer.Screen
          name="TabsOverview"
          component={MainTabNavigator}
          options={{ title: 'Bài 3: Điều Hướng Tabs' }}
        />
        <Drawer.Screen
          name="Settings"
          component={SettingsScreen}
          options={{ title: 'Bài 5: Cài Đặt (Drawer)' }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#F8FAFC', padding: 16 },
  screenHint: { fontSize: 13, color: '#64748B', marginBottom: 12 },
  confirmedAlert: { backgroundColor: '#D1FAE5', padding: 12, borderRadius: 10, marginBottom: 12 },
  confirmedAlertText: { color: '#065F46', fontWeight: '700', fontSize: 13 },
  foodRowCard: { flexDirection: 'row', backgroundColor: '#FFFFFF', borderRadius: 14, padding: 12, marginBottom: 10, elevation: 1 },
  foodRowImg: { width: 75, height: 75, borderRadius: 10, marginRight: 12 },
  foodRowInfo: { flex: 1, justifyContent: 'center' },
  foodRowName: { fontSize: 15, fontWeight: '700', color: '#0F172A' },
  foodRowRest: { fontSize: 12, color: '#64748B', marginVertical: 3 },
  foodRowPrice: { fontSize: 14, fontWeight: '800', color: '#E11D48' },
  detailScroll: { paddingBottom: 30 },
  detailHero: { width: '100%', height: 220, borderRadius: 14, marginBottom: 14 },
  detailTitle: { fontSize: 20, fontWeight: '800', color: '#0F172A' },
  detailRest: { fontSize: 13, color: '#64748B', marginTop: 4 },
  detailPrice: { fontSize: 18, fontWeight: '800', color: '#E11D48', marginVertical: 8 },
  detailDesc: { fontSize: 13, color: '#334155', lineHeight: 20, marginBottom: 16 },
  optionHeading: { fontSize: 14, fontWeight: '700', color: '#0F172A', marginBottom: 8 },
  radioItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF', padding: 12, borderRadius: 10, marginBottom: 8 },
  radioItemActive: { borderWidth: 1, borderColor: '#E11D48' },
  radioDot: { fontSize: 16, marginRight: 10 },
  radioLabel: { fontSize: 13, color: '#334155' },
  radioLabelActive: { fontWeight: '700', color: '#E11D48' },
  primaryBtn: { backgroundColor: '#E11D48', paddingVertical: 14, borderRadius: 12, alignItems: 'center', marginTop: 16 },
  primaryBtnText: { color: '#FFFFFF', fontWeight: '800', fontSize: 13 },
  centerBox: { justifyContent: 'center', alignItems: 'center' },
  confirmIcon: { fontSize: 48, marginBottom: 12 },
  confirmTitle: { fontSize: 22, fontWeight: '800', color: '#0F172A' },
  confirmItem: { fontSize: 16, fontWeight: '700', color: '#E11D48', marginTop: 8 },
  confirmOption: { fontSize: 13, color: '#64748B', marginVertical: 4 },
  confirmPrice: { fontSize: 15, fontWeight: '800', color: '#0F172A', marginBottom: 16 },
  tabIcon: { fontSize: 44, marginBottom: 10 },
  tabTitle: { fontSize: 20, fontWeight: '800', color: '#0F172A' },
  tabSub: { fontSize: 13, color: '#64748B', marginTop: 6, textAlign: 'center' },
  searchInput: { height: 46, backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#CBD5E1', borderRadius: 12, paddingHorizontal: 14, fontSize: 14, marginBottom: 12 },
  userAvatar: { width: 90, height: 90, borderRadius: 45, marginBottom: 12 },
  userName: { fontSize: 18, fontWeight: '800', color: '#0F172A' },
  userRole: { fontSize: 13, color: '#D97706', fontWeight: '700', marginTop: 2 },
  settingsTitle: { fontSize: 18, fontWeight: '800', color: '#0F172A', marginBottom: 16 },
  settingRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#FFFFFF', padding: 16, borderRadius: 12, marginBottom: 10 },
  settingLabel: { fontSize: 14, color: '#0F172A', fontWeight: '600' },
});
