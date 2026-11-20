export interface EventItem {
  id: string;
  title: string;
  city: 'Hà Nội' | 'Đà Nẵng' | 'TP. Hồ Chí Minh' | 'Cần Thơ';
  venue: string;
  speaker: string;
  date: string;
  price: number;
  totalSeats: number;
  availableSeats: number;
  image: string;
  isBookmarked: boolean;
}

export const SAMPLE_EVENTS: EventItem[] = [
  {
    id: 'ev-1',
    title: 'Hội Thảo Công Nghệ Trí Tuệ Nhân Tạo AI Summit 2026',
    city: 'Hà Nội',
    venue: 'Trung tâm Hội nghị Quốc gia, Nam Từ Liêm',
    speaker: 'TS. Lê Hải Nam (Google Brain Alumni)',
    date: '28/11/2026',
    price: 350000,
    totalSeats: 200,
    availableSeats: 18,
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=400&fit=crop',
    isBookmarked: true,
  },
  {
    id: 'ev-2',
    title: 'Workshop Kiến Trúc Microservices & Cloud Native',
    city: 'Hà Nội',
    venue: 'Keangnam Landmark 72',
    speaker: 'KS. Vũ Thành Long (Principal Architect)',
    date: '05/12/2026',
    price: 250000,
    totalSeats: 80,
    availableSeats: 5,
    image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=400&h=400&fit=crop',
    isBookmarked: false,
  },
  {
    id: 'ev-3',
    title: 'Diễn Đàn Chuyển Đổi Số Miền Trung & Khởi Nghiệp Xanh',
    city: 'Đà Nẵng',
    venue: 'Cung Hội nghị Quốc tế Furama',
    speaker: 'Bà Nguyễn Bích Trâm (Giám đốc Quỹ Đầu tư V)',
    date: '12/12/2026',
    price: 0,
    totalSeats: 300,
    availableSeats: 120,
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=400&h=400&fit=crop',
    isBookmarked: false,
  },
  {
    id: 'ev-4',
    title: 'Mobile Developers Meetup: React Native 0.80+ Deep Dive',
    city: 'TP. Hồ Chí Minh',
    venue: 'Saigon Innovation Hub (Sihub), Quận 3',
    speaker: 'Đặng Minh Trí (Lead Mobile Engineer)',
    date: '02/12/2026',
    price: 150000,
    totalSeats: 150,
    availableSeats: 22,
    image: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=400&h=400&fit=crop',
    isBookmarked: true,
  },
  {
    id: 'ev-5',
    title: 'Ngày Hội Fintech & Blockchain Mekong Delta',
    city: 'Cần Thơ',
    venue: 'Đại học Cần Thơ, Khu II',
    speaker: 'ThS. Trần Quang Huy',
    date: '18/12/2026',
    price: 0,
    totalSeats: 120,
    availableSeats: 45,
    image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=400&h=400&fit=crop',
    isBookmarked: false,
  },
];

export function groupByCity(events: EventItem[]) {
  const map: { [city: string]: EventItem[] } = {};
  events.forEach((ev) => {
    if (!map[ev.city]) map[ev.city] = [];
    map[ev.city].push(ev);
  });
  return Object.keys(map).map((city) => ({
    title: city,
    data: map[city],
  }));
}

export function formatVND(amount: number) {
  if (amount === 0) return 'Miễn phí';
  return `${amount.toLocaleString('vi-VN')} đ`;
}
