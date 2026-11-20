import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { EventItem, formatVND } from '../assets/eventData';

export default function EventItemCard({
  item,
  onBook,
  onToggleBookmark,
}: {
  item: EventItem;
  onBook: () => void;
  onToggleBookmark: () => void;
}) {
  const isAlmostFull = item.availableSeats <= 10;

  return (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.body}>
        <View style={styles.topRow}>
          <Text style={styles.dateText}>📅 {item.date}</Text>
          <Pressable onPress={onToggleBookmark}>
            <Text style={styles.starIcon}>{item.isBookmarked ? '⭐' : '☆'}</Text>
          </Pressable>
        </View>

        <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
        <Text style={styles.speaker}>🎤 {item.speaker}</Text>
        <Text style={styles.venue} numberOfLines={1}>📍 {item.venue}</Text>

        <View style={styles.bottomRow}>
          <View>
            <Text style={styles.price}>{formatVND(item.price)}</Text>
            <Text style={[styles.seats, isAlmostFull && styles.seatsUrgent]}>
              {item.availableSeats > 0 ? `Còn ${item.availableSeats} chỗ trống` : 'Hết vé'}
            </Text>
          </View>

          <Pressable
            style={[styles.bookBtn, item.availableSeats === 0 && styles.bookBtnDisabled]}
            disabled={item.availableSeats === 0}
            onPress={onBook}
          >
            <Text style={styles.bookBtnText}>ĐẶT VÉ</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: '#FFFFFF', borderRadius: 14, marginBottom: 14, overflow: 'hidden', elevation: 2 },
  image: { width: '100%', height: 140 },
  body: { padding: 14 },
  topRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  dateText: { fontSize: 11, fontWeight: '700', color: '#2563EB' },
  starIcon: { fontSize: 18 },
  title: { fontSize: 15, fontWeight: '800', color: '#0F172A', lineHeight: 20 },
  speaker: { fontSize: 12, color: '#475569', marginTop: 4 },
  venue: { fontSize: 11, color: '#64748B', marginTop: 2 },
  bottomRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 12, borderTopWidth: 1, borderTopColor: '#F1F5F9', paddingTop: 8 },
  price: { fontSize: 15, fontWeight: '800', color: '#DC2626' },
  seats: { fontSize: 11, color: '#059669', fontWeight: '600' },
  seatsUrgent: { color: '#D97706', fontWeight: '700' },
  bookBtn: { backgroundColor: '#2563EB', paddingVertical: 8, paddingHorizontal: 16, borderRadius: 8 },
  bookBtnDisabled: { backgroundColor: '#94A3B8' },
  bookBtnText: { color: '#FFFFFF', fontSize: 12, fontWeight: '800' },
});
