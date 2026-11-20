import React, { createContext, useContext, useState } from 'react';
import type { ComponentType, ReactNode } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

// ============================================================
// DATA & TYPES (Mô hình dữ liệu mẫu - Quản lý công việc & thói quen)
// ============================================================

export interface Member {
  id: string;
  name: string;
  role: string;
  rating: number;
  isActive: boolean;
  avatar: string;
}

export interface TaskItem {
  id: string;
  title: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  completed: boolean;
}

export const sampleMember: Member = {
  id: 'm-101',
  name: 'Đặng Minh Trí',
  role: 'Mobile Lead Engineer',
  rating: 4.9,
  isActive: true,
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop',
};

// ============================================================
// BÀI 1 - MemberCard: interface, primitive types, Props
// ============================================================
export interface MemberCardProps {
  member: Member;
  onPressProfile?: () => void;
}

export function MemberCard({ member, onPressProfile }: MemberCardProps) {
  return (
    <Pressable style={styles.card} onPress={onPressProfile}>
      <Image source={{ uri: member.avatar }} style={styles.avatar} />
      <View style={styles.cardContent}>
        <View style={styles.rowCenter}>
          <Text style={styles.cardTitle}>{member.name}</Text>
          <View style={[styles.badgeDot, { backgroundColor: member.isActive ? '#10B981' : '#9CA3AF' }]} />
        </View>
        <Text style={styles.cardSub}>{member.role}</Text>
        <Text style={styles.ratingText}>⭐ {member.rating.toFixed(1)} / 5.0 Đánh giá</Text>
      </View>
    </Pressable>
  );
}

// ============================================================
// BÀI 2 - HabitCounter: useState, Type Inference, Boundary Check
// ============================================================
export function HabitCounter() {
  const [streak, setStreak] = useState<number>(5);

  const increment = () => {
    if (streak >= 30) {
      Alert.alert('Chúc mừng!', 'Bạn đã đạt mốc 30 ngày kỷ luật xuất sắc!');
      return;
    }
    setStreak((prev) => prev + 1);
  };

  const decrement = () => {
    setStreak((prev) => Math.max(0, prev - 1));
  };

  return (
    <View style={styles.counterBox}>
      <Text style={styles.counterLabel}>Chuỗi ngày kỷ luật (Streak):</Text>
      <Text style={styles.counterValue}>{streak} 🔥 ngày</Text>
      <View style={styles.buttonRow}>
        <Pressable style={[styles.btnAction, styles.btnDecrease]} onPress={decrement}>
          <Text style={styles.btnText}>- 1 Ngày</Text>
        </Pressable>
        <Pressable style={[styles.btnAction, styles.btnIncrease]} onPress={increment}>
          <Text style={styles.btnText}>+ 1 Ngày</Text>
        </Pressable>
      </View>
    </View>
  );
}

// ============================================================
// BÀI 3 - TaskManager: List mapping, filtering, object types
// ============================================================
const initialTasks: TaskItem[] = [
  { id: '1', title: 'Hoàn thiện giao diện React Native Tuần 1', priority: 'urgent', completed: true },
  { id: '2', title: 'Học cú pháp TypeScript Union Types & Generics', priority: 'high', completed: false },
  { id: '3', title: 'Ôn tập Flexbox và StyleSheet layout', priority: 'medium', completed: false },
  { id: '4', title: 'Tập thể dục 30 phút buổi sáng', priority: 'low', completed: true },
];

export function TaskManager() {
  const [tasks, setTasks] = useState<TaskItem[]>(initialTasks);
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all');

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const filteredTasks = tasks.filter((t) => {
    if (filter === 'pending') return !t.completed;
    if (filter === 'completed') return t.completed;
    return true;
  });

  return (
    <View style={styles.taskContainer}>
      <View style={styles.filterRow}>
        {(['all', 'pending', 'completed'] as const).map((mode) => (
          <Pressable
            key={mode}
            style={[styles.filterChip, filter === mode && styles.filterChipActive]}
            onPress={() => setFilter(mode)}
          >
            <Text style={[styles.filterChipText, filter === mode && styles.filterChipTextActive]}>
              {mode === 'all' ? 'Tất cả' : mode === 'pending' ? 'Cần làm' : 'Đã xong'}
            </Text>
          </Pressable>
        ))}
      </View>

      {filteredTasks.map((t) => (
        <Pressable key={t.id} style={styles.taskItem} onPress={() => toggleTask(t.id)}>
          <Text style={styles.taskIcon}>{t.completed ? '✅' : '⭕'}</Text>
          <Text style={[styles.taskText, t.completed && styles.taskCompletedText]}>
            {t.title}
          </Text>
          <Text style={[styles.priorityTag, styles[`priority_${t.priority}` as keyof typeof styles]]}>
            {t.priority.toUpperCase()}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}

// ============================================================
// BÀI 4 - CustomButton: optional props, variant styles, callbacks
// ============================================================
export interface CustomButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'danger' | 'outline';
  disabled?: boolean;
}

export function CustomButton({ title, onPress, variant = 'primary', disabled = false }: CustomButtonProps) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.customBtn,
        styles[`btnVariant_${variant}` as keyof typeof styles],
        disabled && styles.btnDisabled,
        pressed && !disabled && styles.btnPressed,
      ]}
      disabled={disabled}
      onPress={onPress}
    >
      <Text style={[styles.customBtnText, variant === 'outline' && styles.btnTextOutline]}>
        {title}
      </Text>
    </Pressable>
  );
}

// ============================================================
// BÀI 5 - LiveSearchInput: TextInput, typed string event, live clear
// ============================================================
export function LiveSearchInput() {
  const [query, setQuery] = useState('');

  return (
    <View style={styles.searchBox}>
      <TextInput
        style={styles.searchInput}
        placeholder="Tìm kiếm tác vụ hoặc ghi chú..."
        placeholderTextColor="#9CA3AF"
        value={query}
        onChangeText={setQuery}
      />
      {query.length > 0 && (
        <Pressable onPress={() => setQuery('')} style={styles.clearBtn}>
          <Text style={styles.clearBtnText}>✕</Text>
        </Pressable>
      )}
      <Text style={styles.searchFeedback}>
        Đang nhập ({query.length} ký tự): <Text style={styles.highlightText}>{query || '(chưa có)'}</Text>
      </Text>
    </View>
  );
}

// ============================================================
// BÀI 6 - CollapsibleCard: ReactNode, children composition
// ============================================================
export interface CollapsibleCardProps {
  title: string;
  children: ReactNode;
  initExpanded?: boolean;
}

export function CollapsibleCard({ title, children, initExpanded = true }: CollapsibleCardProps) {
  const [expanded, setExpanded] = useState(initExpanded);

  return (
    <View style={styles.collapsibleWrap}>
      <Pressable style={styles.collapsibleHeader} onPress={() => setExpanded(!expanded)}>
        <Text style={styles.collapsibleTitle}>{title}</Text>
        <Text style={styles.collapsibleArrow}>{expanded ? '▲ Thu gọn' : '▼ Mở rộng'}</Text>
      </Pressable>
      {expanded && <View style={styles.collapsibleBody}>{children}</View>}
    </View>
  );
}

// ============================================================
// BÀI 7 - PrioritySelector: Union Types
// ============================================================
export type PriorityLevel = 'Thấp' | 'Trung bình' | 'Cao' | 'Khẩn cấp';

export function PrioritySelector() {
  const [selected, setSelected] = useState<PriorityLevel>('Cao');
  const levels: PriorityLevel[] = ['Thấp', 'Trung bình', 'Cao', 'Khẩn cấp'];

  return (
    <View style={styles.priorityBox}>
      <Text style={styles.fieldLabel}>Mức độ ưu tiên hiện tại: <Text style={styles.boldText}>{selected}</Text></Text>
      <View style={styles.priorityRow}>
        {levels.map((level) => (
          <Pressable
            key={level}
            style={[styles.priorityChip, selected === level && styles.priorityChipSelected]}
            onPress={() => setSelected(level)}
          >
            <Text style={[styles.priorityChipText, selected === level && styles.priorityChipTextActive]}>
              {level}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

// ============================================================
// BÀI 8 - StatusBadge: Record Mapping & Variant Props
// ============================================================
export type ProjectStatus = 'draft' | 'in_progress' | 'review' | 'completed';

const statusConfig: Record<ProjectStatus, { label: string; bg: string; text: string }> = {
  draft: { label: 'Bản thảo', bg: '#F3F4F6', text: '#4B5563' },
  in_progress: { label: 'Đang thực hiện', bg: '#DBEAFE', text: '#1D4ED8' },
  review: { label: 'Đang duyệt', bg: '#FEF3C7', text: '#D97706' },
  completed: { label: 'Hoàn thành', bg: '#D1FAE5', text: '#059669' },
};

export function StatusBadge({ status }: { status: ProjectStatus }) {
  const config = statusConfig[status];
  return (
    <View style={[styles.statusBadge, { backgroundColor: config.bg }]}>
      <Text style={[styles.statusBadgeText, { color: config.text }]}>{config.label}</Text>
    </View>
  );
}

// ============================================================
// BÀI 9 - HOC (Higher-Order Component): withDataLoading
// ============================================================
export interface WithLoadingProps {
  isLoading: boolean;
}

export function withDataLoading<P extends object>(WrappedComponent: ComponentType<P>) {
  return function ComponentWithLoading(props: P & WithLoadingProps) {
    const { isLoading, ...rest } = props;
    if (isLoading) {
      return (
        <View style={styles.loadingBox}>
          <ActivityIndicator size="small" color="#2563EB" />
          <Text style={styles.loadingText}>Đang đồng bộ dữ liệu...</Text>
        </View>
      );
    }
    return <WrappedComponent {...(rest as P)} />;
  };
}

const SimplePreview = ({ text }: { text: string }) => (
  <View style={styles.previewBox}>
    <Text style={styles.previewText}>📦 Nội dung tải thành công: {text}</Text>
  </View>
);
const PreviewWithLoading = withDataLoading(SimplePreview);

// ============================================================
// BÀI 10 - Compound Component: SegmentedControl
// ============================================================
interface SegmentContextType {
  value: string;
  onChange: (val: string) => void;
}
const SegmentContext = createContext<SegmentContextType | null>(null);

function SegmentRoot({ value, onChange, children }: { value: string; onChange: (v: string) => void; children: ReactNode }) {
  return (
    <SegmentContext.Provider value={{ value, onChange }}>
      <View style={styles.segmentRoot}>{children}</View>
    </SegmentContext.Provider>
  );
}

function SegmentItem({ value, label }: { value: string; label: string }) {
  const ctx = useContext(SegmentContext);
  if (!ctx) return null;
  const isActive = ctx.value === value;

  return (
    <Pressable
      style={[styles.segmentItem, isActive && styles.segmentItemActive]}
      onPress={() => ctx.onChange(value)}
    >
      <Text style={[styles.segmentText, isActive && styles.segmentTextActive]}>{label}</Text>
    </Pressable>
  );
}

export const SegmentedControl = {
  Root: SegmentRoot,
  Item: SegmentItem,
};

// ============================================================
// MAIN APP COMPONENT
// ============================================================
export default function App() {
  const [segValue, setSegValue] = useState('daily');
  const [loadingDemo, setLoadingDemo] = useState(false);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Tuần 1: TypeScript &amp; React Native</Text>
        <Text style={styles.headerSubtitle}>10 Bài thực hành kiến thức nền tảng di động</Text>
      </View>

      <Text style={styles.sectionHeader}>Bài 1: MemberCard (Props &amp; Interface)</Text>
      <MemberCard member={sampleMember} onPressProfile={() => Alert.alert('Thông tin', sampleMember.name)} />

      <Text style={styles.sectionHeader}>Bài 2: HabitCounter (useState &amp; Boundary)</Text>
      <HabitCounter />

      <Text style={styles.sectionHeader}>Bài 3: TaskManager (List, Filter, Map)</Text>
      <TaskManager />

      <Text style={styles.sectionHeader}>Bài 4: CustomButton (Variants &amp; Callback)</Text>
      <View style={styles.btnRowWrap}>
        <CustomButton title="Primary Action" variant="primary" onPress={() => Alert.alert('Click', 'Primary')} />
        <CustomButton title="Secondary" variant="secondary" onPress={() => Alert.alert('Click', 'Secondary')} />
        <CustomButton title="Danger" variant="danger" onPress={() => Alert.alert('Click', 'Danger')} />
        <CustomButton title="Outline" variant="outline" onPress={() => Alert.alert('Click', 'Outline')} />
      </View>

      <Text style={styles.sectionHeader}>Bài 5: LiveSearchInput (TextInput &amp; State)</Text>
      <LiveSearchInput />

      <Text style={styles.sectionHeader}>Bài 6: CollapsibleCard (Children Composition)</Text>
      <CollapsibleCard title="Ghi chú kiến thức TypeScript">
        <Text style={styles.noteParagraph}>
          • Interface dùng để định nghĩa hình dạng (shape) của Object.{"\n"}
          • Union Types giới hạn các giá trị được chấp nhận.{"\n"}
          • Generics cho phép xây dựng component tái sử dụng cao.
        </Text>
      </CollapsibleCard>

      <Text style={styles.sectionHeader}>Bài 7: PrioritySelector (Union Types)</Text>
      <PrioritySelector />

      <Text style={styles.sectionHeader}>Bài 8: StatusBadge (Record &amp; Variants)</Text>
      <View style={styles.badgeRow}>
        <StatusBadge status="draft" />
        <StatusBadge status="in_progress" />
        <StatusBadge status="review" />
        <StatusBadge status="completed" />
      </View>

      <Text style={styles.sectionHeader}>Bài 9: HOC withDataLoading</Text>
      <CustomButton
        title={loadingDemo ? "Dừng mô phỏng tải" : "Mô phỏng tải dữ liệu (Loading)"}
        variant="outline"
        onPress={() => setLoadingDemo(!loadingDemo)}
      />
      <PreviewWithLoading isLoading={loadingDemo} text="Dữ liệu danh sách dự án 2026" />

      <Text style={styles.sectionHeader}>Bài 10: Compound Component (SegmentedControl)</Text>
      <SegmentedControl.Root value={segValue} onChange={setSegValue}>
        <SegmentedControl.Item value="daily" label="Theo ngày" />
        <SegmentedControl.Item value="weekly" label="Theo tuần" />
        <SegmentedControl.Item value="monthly" label="Theo tháng" />
      </SegmentedControl.Root>
      <Text style={styles.selectedSegText}>Chế độ đã chọn: {segValue.toUpperCase()}</Text>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

// ============================================================
// STYLESHEET
// ============================================================
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  content: { padding: 16 },
  header: {
    backgroundColor: '#1E293B',
    padding: 20,
    borderRadius: 16,
    marginBottom: 20,
  },
  headerTitle: { fontSize: 20, fontWeight: '700', color: '#F8FAFC' },
  headerSubtitle: { fontSize: 13, color: '#94A3B8', marginTop: 4 },
  sectionHeader: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
    marginTop: 20,
    marginBottom: 8,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  avatar: { width: 56, height: 56, borderRadius: 28, marginRight: 14 },
  cardContent: { flex: 1 },
  rowCenter: { flexDirection: 'row', alignItems: 'center' },
  cardTitle: { fontSize: 16, fontWeight: '700', color: '#1E293B', marginRight: 8 },
  badgeDot: { width: 8, height: 8, borderRadius: 4 },
  cardSub: { fontSize: 13, color: '#64748B', marginTop: 2 },
  ratingText: { fontSize: 12, color: '#F59E0B', fontWeight: '600', marginTop: 4 },
  counterBox: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 2,
  },
  counterLabel: { fontSize: 14, color: '#64748B' },
  counterValue: { fontSize: 28, fontWeight: '800', color: '#EF4444', marginVertical: 8 },
  buttonRow: { flexDirection: 'row', gap: 12 },
  btnAction: { paddingVertical: 8, paddingHorizontal: 16, borderRadius: 8 },
  btnDecrease: { backgroundColor: '#F1F5F9' },
  btnIncrease: { backgroundColor: '#3B82F6' },
  btnText: { color: '#0F172A', fontWeight: '600', fontSize: 14 },
  taskContainer: { backgroundColor: '#FFFFFF', padding: 14, borderRadius: 12, elevation: 2 },
  filterRow: { flexDirection: 'row', gap: 8, marginBottom: 12 },
  filterChip: { paddingVertical: 6, paddingHorizontal: 12, borderRadius: 20, backgroundColor: '#F1F5F9' },
  filterChipActive: { backgroundColor: '#2563EB' },
  filterChipText: { fontSize: 12, color: '#64748B', fontWeight: '600' },
  filterChipTextActive: { color: '#FFFFFF' },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  taskIcon: { fontSize: 18, marginRight: 10 },
  taskText: { flex: 1, fontSize: 14, color: '#1E293B' },
  taskCompletedText: { textDecorationLine: 'line-through', color: '#94A3B8' },
  priorityTag: { fontSize: 10, fontWeight: '700', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 },
  priority_low: { backgroundColor: '#E2E8F0', color: '#475569' },
  priority_medium: { backgroundColor: '#FEF3C7', color: '#D97706' },
  priority_high: { backgroundColor: '#FEE2E2', color: '#DC2626' },
  priority_urgent: { backgroundColor: '#7F1D1D', color: '#FFFFFF' },
  customBtn: { paddingVertical: 12, paddingHorizontal: 16, borderRadius: 8, alignItems: 'center' },
  btnVariant_primary: { backgroundColor: '#2563EB' },
  btnVariant_secondary: { backgroundColor: '#475569' },
  btnVariant_danger: { backgroundColor: '#EF4444' },
  btnVariant_outline: { backgroundColor: 'transparent', borderWidth: 1, borderColor: '#2563EB' },
  btnDisabled: { opacity: 0.5 },
  btnPressed: { opacity: 0.8 },
  customBtnText: { color: '#FFFFFF', fontWeight: '600', fontSize: 14 },
  btnTextOutline: { color: '#2563EB' },
  btnRowWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  searchBox: { backgroundColor: '#FFFFFF', padding: 14, borderRadius: 12, elevation: 2 },
  searchInput: { height: 44, borderWidth: 1, borderColor: '#E2E8F0', borderRadius: 8, paddingHorizontal: 12, fontSize: 14 },
  clearBtn: { position: 'absolute', right: 24, top: 24 },
  clearBtnText: { fontSize: 14, color: '#94A3B8' },
  searchFeedback: { marginTop: 8, fontSize: 12, color: '#64748B' },
  highlightText: { color: '#2563EB', fontWeight: '700' },
  collapsibleWrap: { backgroundColor: '#FFFFFF', borderRadius: 12, overflow: 'hidden', elevation: 2 },
  collapsibleHeader: { flexDirection: 'row', justifyContent: 'space-between', padding: 14, backgroundColor: '#F8FAFC' },
  collapsibleTitle: { fontSize: 14, fontWeight: '700', color: '#1E293B' },
  collapsibleArrow: { fontSize: 12, color: '#64748B' },
  collapsibleBody: { padding: 14 },
  noteParagraph: { fontSize: 13, color: '#334155', lineHeight: 20 },
  priorityBox: { backgroundColor: '#FFFFFF', padding: 14, borderRadius: 12, elevation: 2 },
  fieldLabel: { fontSize: 13, color: '#475569', marginBottom: 8 },
  boldText: { fontWeight: '700', color: '#0F172A' },
  priorityRow: { flexDirection: 'row', gap: 8 },
  priorityChip: { paddingVertical: 6, paddingHorizontal: 12, borderRadius: 8, backgroundColor: '#F1F5F9' },
  priorityChipSelected: { backgroundColor: '#DC2626' },
  priorityChipText: { fontSize: 12, color: '#475569', fontWeight: '600' },
  priorityChipTextActive: { color: '#FFFFFF' },
  badgeRow: { flexDirection: 'row', gap: 8, flexWrap: 'wrap' },
  statusBadge: { paddingVertical: 4, paddingHorizontal: 10, borderRadius: 16 },
  statusBadgeText: { fontSize: 12, fontWeight: '600' },
  loadingBox: { padding: 16, alignItems: 'center', backgroundColor: '#FFFFFF', borderRadius: 12, marginTop: 8 },
  loadingText: { marginTop: 6, fontSize: 13, color: '#64748B' },
  previewBox: { padding: 14, backgroundColor: '#ECFDF5', borderRadius: 8, marginTop: 8 },
  previewText: { fontSize: 13, color: '#065F46', fontWeight: '600' },
  segmentRoot: { flexDirection: 'row', backgroundColor: '#E2E8F0', borderRadius: 10, padding: 4 },
  segmentItem: { flex: 1, paddingVertical: 8, alignItems: 'center', borderRadius: 8 },
  segmentItemActive: { backgroundColor: '#FFFFFF', shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 4, elevation: 1 },
  segmentText: { fontSize: 13, color: '#64748B', fontWeight: '600' },
  segmentTextActive: { color: '#0F172A', fontWeight: '700' },
  selectedSegText: { marginTop: 8, fontSize: 12, color: '#64748B', textAlign: 'center' },
});
