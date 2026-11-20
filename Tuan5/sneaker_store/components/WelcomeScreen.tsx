import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

export default function WelcomeScreen({ onStart }: { onStart: () => void }) {
  return (
    <View style={styles.container}>
      <View style={styles.headerBox}>
        <Text style={styles.brandBadge}>PULSEKICK ATHLETICS</Text>
        <Text style={styles.mainTitle}>Elevate Your Speed &amp; Style</Text>
        <Text style={styles.subTitle}>
          Cửa hàng giày thể thao &amp; chạy bộ chính hãng hàng đầu dành cho các vận động viên và tín đồ thời trang.
        </Text>
      </View>

      <View style={styles.imgWrap}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=600&h=600&fit=crop' }}
          style={styles.heroImg}
          resizeMode="contain"
        />
      </View>

      <Pressable style={styles.startBtn} onPress={onStart}>
        <Text style={styles.startBtnText}>KHÁM PHÁ BỘ SƯU TẬP ➔</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#090D16', padding: 24, justifyContent: 'space-between' },
  headerBox: { marginTop: 20 },
  brandBadge: { color: '#E11D48', fontWeight: '800', letterSpacing: 2, fontSize: 12 },
  mainTitle: { color: '#FFFFFF', fontSize: 32, fontWeight: '900', marginTop: 10, lineHeight: 38 },
  subTitle: { color: '#94A3B8', fontSize: 14, marginTop: 10, lineHeight: 22 },
  imgWrap: { alignItems: 'center', justifyContent: 'center', marginVertical: 20 },
  heroImg: { width: 320, height: 260 },
  startBtn: { backgroundColor: '#E11D48', paddingVertical: 16, borderRadius: 14, alignItems: 'center', marginBottom: 20 },
  startBtnText: { color: '#FFFFFF', fontSize: 15, fontWeight: '800', letterSpacing: 1 },
});
