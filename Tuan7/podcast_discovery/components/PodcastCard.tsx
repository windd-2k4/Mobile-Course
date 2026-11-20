import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

export interface Podcast {
  id: string;
  title: string;
  host: string;
  category: string;
  durationMinutes: number;
  listens: number;
  image: string;
  isBookmarked: boolean;
}

export default function PodcastCard({
  podcast,
  onToggleBookmark,
  onDelete,
}: {
  podcast: Podcast;
  onToggleBookmark: () => void;
  onDelete: () => void;
}) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: podcast.image }} style={styles.cover} />
      <View style={styles.info}>
        <View style={styles.topRow}>
          <Text style={styles.category}>{podcast.category.toUpperCase()}</Text>
          <Pressable onPress={onToggleBookmark}>
            <Text style={styles.bookmarkIcon}>{podcast.isBookmarked ? '⭐' : '☆'}</Text>
          </Pressable>
        </View>

        <Text style={styles.title} numberOfLines={2}>{podcast.title}</Text>
        <Text style={styles.host}>🎙️ {podcast.host}</Text>

        <View style={styles.bottomRow}>
          <Text style={styles.meta}>⏱️ {podcast.durationMinutes} phút • {podcast.listens.toLocaleString()} lượt nghe</Text>
          <Pressable onPress={onDelete} style={styles.deleteBtn}>
            <Text style={styles.deleteText}>Xóa</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { flexDirection: 'row', backgroundColor: '#FFFFFF', borderRadius: 14, padding: 12, marginBottom: 12, elevation: 2 },
  cover: { width: 85, height: 85, borderRadius: 10, marginRight: 12 },
  info: { flex: 1, justifyContent: 'space-between' },
  topRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  category: { fontSize: 10, fontWeight: '800', color: '#6366F1', letterSpacing: 1 },
  bookmarkIcon: { fontSize: 18 },
  title: { fontSize: 14, fontWeight: '700', color: '#0F172A', marginVertical: 3 },
  host: { fontSize: 12, color: '#64748B' },
  bottomRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 4 },
  meta: { fontSize: 11, color: '#94A3B8' },
  deleteBtn: { paddingHorizontal: 8, paddingVertical: 2, backgroundColor: '#FEE2E2', borderRadius: 4 },
  deleteText: { color: '#DC2626', fontSize: 11, fontWeight: '700' },
});
