import React from 'react';
import { Alert, Image, Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import {
  clearCart,
  decrementQuantity,
  incrementQuantity,
  removeItem,
  selectCartItems,
  selectCartTotalPrice,
} from '../store/cartSlice';
import { useAppDispatch, useAppSelector } from '../store/store';

export default function CartModal({ visible, onClose }: { visible: boolean; onClose: () => void }) {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectCartItems);
  const totalPrice = useAppSelector(selectCartTotalPrice);

  const handleCheckout = () => {
    Alert.alert('Đặt hàng thành công!', 'Redux Store đã ghi nhận đơn hàng. Cảm ơn bạn!', [
      {
        text: 'Hoàn tất',
        onPress: () => {
          dispatch(clearCart());
          onClose();
        },
      },
    ]);
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>Giỏ Hàng Redux ({items.length} món)</Text>
            <Pressable onPress={onClose}>
              <Text style={styles.closeBtn}>✕</Text>
            </Pressable>
          </View>

          {items.length === 0 ? (
            <View style={styles.emptyBox}>
              <Text style={styles.emptyIcon}>🛍️</Text>
              <Text style={styles.emptyText}>Giỏ hàng đang trống.</Text>
            </View>
          ) : (
            <ScrollView style={styles.itemList}>
              {items.map((it) => (
                <View key={it.id} style={styles.itemRow}>
                  <Image source={{ uri: it.image }} style={styles.itemImg} />
                  <View style={styles.itemInfo}>
                    <Text style={styles.itemName} numberOfLines={1}>{it.name}</Text>
                    <Text style={styles.itemPrice}>{it.price.toLocaleString('vi-VN')} đ</Text>
                  </View>
                  <View style={styles.stepper}>
                    <Pressable style={styles.stepBtn} onPress={() => dispatch(decrementQuantity(it.id))}>
                      <Text style={styles.stepText}>-</Text>
                    </Pressable>
                    <Text style={styles.stepQty}>{it.quantity}</Text>
                    <Pressable style={styles.stepBtn} onPress={() => dispatch(incrementQuantity(it.id))}>
                      <Text style={styles.stepText}>+</Text>
                    </Pressable>
                  </View>
                </View>
              ))}
            </ScrollView>
          )}

          {items.length > 0 && (
            <View style={styles.footer}>
              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>Tổng thanh toán:</Text>
                <Text style={styles.totalVal}>{totalPrice.toLocaleString('vi-VN')} đ</Text>
              </View>
              <Pressable style={styles.checkoutBtn} onPress={handleCheckout}>
                <Text style={styles.checkoutText}>TIẾN HÀNH THANH TOÁN (REDUX DISPATCH)</Text>
              </Pressable>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  container: { backgroundColor: '#FFFFFF', borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 16, maxHeight: '80%' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 },
  title: { fontSize: 18, fontWeight: '800', color: '#0F172A' },
  closeBtn: { fontSize: 20, color: '#64748B', padding: 4 },
  itemList: { maxHeight: 350 },
  itemRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#F1F5F9' },
  itemImg: { width: 50, height: 50, borderRadius: 8, marginRight: 10 },
  itemInfo: { flex: 1 },
  itemName: { fontSize: 13, fontWeight: '700', color: '#0F172A' },
  itemPrice: { fontSize: 12, fontWeight: '800', color: '#DC2626', marginTop: 2 },
  stepper: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F1F5F9', borderRadius: 6, padding: 2 },
  stepBtn: { width: 26, height: 26, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFFFFF', borderRadius: 4 },
  stepText: { fontSize: 15, fontWeight: '700' },
  stepQty: { marginHorizontal: 8, fontSize: 12, fontWeight: '800' },
  emptyBox: { alignItems: 'center', paddingVertical: 40 },
  emptyIcon: { fontSize: 40, marginBottom: 8 },
  emptyText: { fontSize: 13, color: '#64748B' },
  footer: { borderTopWidth: 1, borderTopColor: '#E2E8F0', paddingTop: 12, marginTop: 10 },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  totalLabel: { fontSize: 14, fontWeight: '700', color: '#0F172A' },
  totalVal: { fontSize: 18, fontWeight: '900', color: '#DC2626' },
  checkoutBtn: { backgroundColor: '#6366F1', paddingVertical: 12, borderRadius: 10, alignItems: 'center' },
  checkoutText: { color: '#FFFFFF', fontSize: 13, fontWeight: '800' },
});
