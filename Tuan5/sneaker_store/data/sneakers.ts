export interface Sneaker {
  id: string;
  name: string;
  brand: 'Nike' | 'Adidas' | 'Puma' | 'Jordan';
  category: 'Running' | 'Basketball' | 'Lifestyle';
  price: number;
  originalPrice: number;
  image: string;
  description: string;
  sizes: number[];
}

export const SNEAKERS: Sneaker[] = [
  {
    id: 'sn-1',
    name: 'Air Zoom Pegasus Turbo',
    brand: 'Nike',
    category: 'Running',
    price: 3200000,
    originalPrice: 4000000,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop',
    description: 'Đôi giày chạy bộ hiệu năng cao với đệm bọt ZoomX siêu nhẹ, hoàn trả năng lượng tối đa trên từng bước chạy.',
    sizes: [40, 41, 42, 43],
  },
  {
    id: 'sn-2',
    name: 'Ultraboost Light 2026',
    brand: 'Adidas',
    category: 'Running',
    price: 3600000,
    originalPrice: 4500000,
    image: 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=500&h=500&fit=crop',
    description: 'Công nghệ đế Boost nhẹ hơn 30%, kết hợp thân dệt Primeknit+ ôm sát vừa vặn và bảo vệ môi trường.',
    sizes: [39, 40, 41, 42],
  },
  {
    id: 'sn-3',
    name: 'Air Jordan 1 High OG',
    brand: 'Jordan',
    category: 'Basketball',
    price: 4800000,
    originalPrice: 5500000,
    image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=500&h=500&fit=crop',
    description: 'Huyền thoại bóng rổ đường phố với chất liệu da cao cấp, phối màu kinh điển mang tính biểu tượng văn hóa sneaker.',
    sizes: [41, 42, 43, 44],
  },
  {
    id: 'sn-4',
    name: 'Puma Nitro Elite Carbon',
    brand: 'Puma',
    category: 'Running',
    price: 2900000,
    originalPrice: 3800000,
    image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=500&h=500&fit=crop',
    description: 'Trang bị đĩa đệm carbon INNOPLATE tạo lực đẩy phản hồi mạnh mẽ cho các cự ly chạy marathon đường trường.',
    sizes: [40, 41, 42],
  },
];
