# 📱 Khoá Học Lập Trình Thiết Bị Di Động (10 Tuần) - React Native & TypeScript

Chào mừng bạn đến với kho lưu trữ mã nguồn 10 tuần thực hành môn **Lập trình Thiết bị Di động (Mobile Development)** sử dụng công nghệ **React Native (Expo)** và ngôn ngữ **TypeScript**.


---

## 📚 Tổng Quan Lộ Trình 10 Tuần Thực Hành

| Tuần | Chủ Đề Học Tập | Dự Án / Ứng Dụng Thực Hành | Kỹ Thuật Trọng Tâm | Tệp Báo Cáo & Nén |
|:---:|:---|:---|:---|:---:|

---

## 🛠️ Công Nghệ & Thư Viện Sử Dụng

- **Framework**: [React Native](https://reactnative.dev/) (v0.74+) / [Expo SDK](https://expo.dev/) (v51+)
- **Ngôn ngữ**: [TypeScript](https://www.typescriptlang.org/) (Strict Mode)
- **Điều hướng**: `@react-navigation/native`, `@react-navigation/native-stack`, `@react-navigation/bottom-tabs`, `@react-navigation/drawer`
- **Quản lý State toàn cục**: `@reduxjs/toolkit`, `react-redux`
- **Giao tiếp API**: Fetch API / RESTful MockAPI
- **Biểu tượng & Giao diện**: `@expo/vector-icons`, `react-native-safe-area-context`

---

## 🚀 Hướng Dẫn Chạy & Cài Đặt

### 1. Chạy trên máy tính cá nhân (Local Machine)
Yêu cầu đã cài đặt **Node.js** (>= 18) và thiết bị di động cài ứng dụng **Expo Go**.

```bash
# Bước 1: Di chuyển vào thư mục của tuần cần chạy (ví dụ Tuần 1)
cd Tuan1/task_tracker

# Bước 2: Cài đặt thư viện phụ thuộc
npm install

# Bước 3: Khởi động Expo Development Server
npx expo start
```
- Quét mã QR hiển thị trên Terminal bằng camera điện thoại (iOS) hoặc ứng dụng **Expo Go** (Android).
- Nhấn `w` để mở trực tiếp trên trình duyệt Web.

### 2. Chạy trên Expo Snack (Không cần cài đặt)
Mỗi tuần đều có sẵn tệp nén `.zip` (ví dụ: `Tuan1/tuan1.zip`, `Tuan6/navigation.zip`, `Tuan10/redux-shopping-cart.zip`):
1. Truy cập [https://snack.expo.dev](https://snack.expo.dev).
2. Kéo thả các tệp mã nguồn (`App.tsx`, `components/`, `package.json`,...) hoặc chọn Import project.
3. Xem kết quả hiển thị trực tiếp ngay trên trình duyệt mà không cần cài đặt môi trường.

## 📂 Chi Tiết Cấu Trúc Mã Nguồn

```text
Mobile-Course-React-Native/
├── .gitignore
├── README.md
├── Tuan1/
│   ├── README.md
│   ├── tuan1.zip
│   └── task_tracker/ (App.tsx: 10 bài tập TypeScript cơ bản)
├── Tuan2/
│   ├── README.md
│   ├── tuan2.zip
│   └── news_feed/ (App.tsx: 15 bài tập TypeScript nâng cao & REST API)
├── Tuan3/
│   ├── README.md
│   ├── tuan3.zip
│   └── coffee_shop_layout/ (App.tsx: Layout Flexbox Part 1)
├── Tuan4/
│   ├── README.md
│   ├── tuan4.zip
│   └── coffee_shop_full/ (App.tsx: Flexbox Part 2, Giỏ hàng & Chi tiết)
├── Tuan5/
│   ├── README.md
│   ├── tuan5.zip
│   └── sneaker_store/ (Điều hướng State Router & Truyền đối tượng)
├── Tuan6/
│   ├── README.md
│   ├── navigation.zip
│   └── FreshBite_Navigation_Exercises/
│       └── freshbite_navigation/ (Stack + Tab + Drawer Navigator)
├── Tuan7/
│   ├── README.md
│   ├── podcasts.zip
│   └── podcast_discovery/ (Tích hợp REST MockAPI, Loading, Refresh)
├── Tuan8/
│   ├── README.md
│   ├── gear_store.zip
│   └── gear_store/ (Ứng dụng CRUD hoàn chỉnh với Modal & Alert)
├── Tuan9/
│   ├── README.md
│   ├── events.zip
│   └── event_booking/ (SectionList phân nhóm theo thành phố & Đặt vé)
└── Tuan10/
    ├── README.md
    ├── redux-shopping-cart.zip
    └── redux-shopping-cart/ (Redux Toolkit store, cartSlice, Provider)
```

---
*Chúc các bạn hoàn thành xuất sắc học phần Lập trình Thiết bị Di động!*