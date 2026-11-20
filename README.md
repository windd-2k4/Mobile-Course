# 📱 Khoá Học Lập Trình Thiết Bị Di Động (10 Tuần) - React Native & TypeScript

Chào mừng bạn đến với kho lưu trữ mã nguồn 10 tuần thực hành môn **Lập trình Thiết bị Di động (Mobile Development)** sử dụng công nghệ **React Native (Expo)** và ngôn ngữ **TypeScript**.

Repository này được thiết kế theo cấu trúc bài giảng chuẩn đại học (10 tuần thực hành), cung cấp mã nguồn chất lượng cao, chia theo module rõ ràng, kèm đầy đủ tài liệu báo cáo `MinhChungTuan_X.docx` và file nén `.zip` sẵn sàng để nộp bài hoặc đưa lên [Expo Snack](https://snack.expo.dev).

---

## 📚 Tổng Quan Lộ Trình 10 Tuần Thực Hành

| Tuần | Chủ Đề Học Tập | Dự Án / Ứng Dụng Thực Hành | Kỹ Thuật Trọng Tâm | Tệp Báo Cáo & Nén |
|:---:|:---|:---|:---|:---:|
| **Tuần 1** | TypeScript & React Native Cơ Bản | **PulseTask** (Quản lý thói quen & tác vụ) | Props, Interfaces, useState, Union Types, HOC, Compound Components | `tuan1.zip`<br>`MinhChungTuan_1.docx` |
| **Tuần 2** | TypeScript Nâng Cao & REST API | **TechPulse News** (Đọc báo công nghệ) | `async/await`, `fetch`, Optional Chaining, Type Guards, Generic Filters, Pagination | `tuan2.zip`<br>`MinhChungTuan_2.docx` |
| **Tuần 3** | Flexbox & Giao Diện Phần 1 | **Aroma Coffee** (Quán cà phê & bánh ngọt) | `flexDirection`, `justifyContent`, Category Chips, 2-Column Grid, Absolute Badges | `tuan3.zip`<br>`MinhChungTuan_3.docx` |
| **Tuần 4** | Flexbox & Giao Diện Phần 2 | **Aroma Coffee Full** (Chi tiết món & Giỏ hàng) | Floating Cart Button, Drink Detail (Size/Đường/Đá), Price Calc, Cart Screen | `tuan4.zip`<br>`MinhChungTuan_4.docx` |
| **Tuần 5** | Điều Hướng Bằng State | **PulseKick Sneakers** (Cửa hàng giày thể thao) | State Router, Param Passing, Welcome Screen, Catalog & Detail Screen | `tuan5.zip`<br>`MinhChungTuan_5.docx` |
| **Tuần 6** | React Navigation Toàn Diện | **FreshBite Delivery** (Giao thức ăn nhanh) | `@react-navigation`: Native Stack, Bottom Tabs, Drawer Navigation, MockAPI Sample | `navigation.zip`<br>`MinhChungTuan_6.docx` |
| **Tuần 7** | Tích Hợp REST API | **SoundWave Podcasts** (Kênh podcast & sách nói) | MockAPI HTTP GET/DELETE, `ActivityIndicator`, `RefreshControl`, `useMemo` search | `podcasts.zip`<br>`MinhChungTuan_7.docx` |
| **Tuần 8** | Xây Dựng CRUD Hoàn Chỉnh | **GearZone Store** (Phụ kiện máy tính & gaming) | Đầy đủ 4 thao tác CRUD (Create - Read - Update - Delete), Modal Form, Optimistic Update | `gear_store.zip`<br>`MinhChungTuan_8.docx` |
| **Tuần 9** | Dữ Liệu Phức Tạp & SectionList | **EventMaster** (Đặt vé hội thảo công nghệ) | `SectionList` nhóm theo thành phố, `groupByCity`, format tiền tệ VND, quản lý chỗ trống | `events.zip`<br>`MinhChungTuan_9.docx` |
| **Tuần 10** | Quản Lý State Toàn Cục (Redux) | **ReduxCart Store** (Giỏ hàng thương mại điện tử) | Redux Toolkit (`configureStore`, `createSlice`), Typed Hooks (`useAppDispatch`, `useAppSelector`) | `redux-shopping-cart.zip`<br>`MinhChungTuan_10.docx` |

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

### 3. Nộp bài & Báo cáo Minh Chứng
Mỗi thư mục tuần đều có sẵn tệp:
- `README.md`: Giải thích chi tiết các bài tập và kỹ thuật áp dụng.
- `MinhChungTuan_X.docx`: Mẫu báo cáo thực hành Word chuẩn với thông tin sinh viên, danh sách bài tập đã làm và các vị trí để dán ảnh chụp màn hình máy thật/Snack làm minh chứng nộp cho Giảng viên.

---

## 📂 Chi Tiết Cấu Trúc Mã Nguồn

```text
Mobile-Course-React-Native/
├── .gitignore
├── README.md
├── Tuan1/
│   ├── MinhChungTuan_1.docx
│   ├── README.md
│   ├── tuan1.zip
│   └── task_tracker/ (App.tsx: 10 bài tập TypeScript cơ bản)
├── Tuan2/
│   ├── MinhChungTuan_2.docx
│   ├── README.md
│   ├── tuan2.zip
│   └── news_feed/ (App.tsx: 15 bài tập TypeScript nâng cao & REST API)
├── Tuan3/
│   ├── MinhChungTuan_3.docx
│   ├── README.md
│   ├── tuan3.zip
│   └── coffee_shop_layout/ (App.tsx: Layout Flexbox Part 1)
├── Tuan4/
│   ├── MinhChungTuan_4.docx
│   ├── README.md
│   ├── tuan4.zip
│   └── coffee_shop_full/ (App.tsx: Flexbox Part 2, Giỏ hàng & Chi tiết)
├── Tuan5/
│   ├── MinhChungTuan_5.docx
│   ├── README.md
│   ├── tuan5.zip
│   └── sneaker_store/ (Điều hướng State Router & Truyền đối tượng)
├── Tuan6/
│   ├── MinhChungTuan_6.docx
│   ├── README.md
│   ├── navigation.zip
│   └── FreshBite_Navigation_Exercises/
│       └── freshbite_navigation/ (Stack + Tab + Drawer Navigator)
├── Tuan7/
│   ├── MinhChungTuan_7.docx
│   ├── README.md
│   ├── podcasts.zip
│   └── podcast_discovery/ (Tích hợp REST MockAPI, Loading, Refresh)
├── Tuan8/
│   ├── MinhChungTuan_8.docx
│   ├── README.md
│   ├── gear_store.zip
│   └── gear_store/ (Ứng dụng CRUD hoàn chỉnh với Modal & Alert)
├── Tuan9/
│   ├── MinhChungTuan_9.docx
│   ├── README.md
│   ├── events.zip
│   └── event_booking/ (SectionList phân nhóm theo thành phố & Đặt vé)
└── Tuan10/
    ├── MinhChungTuan_10.docx
    ├── README.md
    ├── redux-shopping-cart.zip
    └── redux-shopping-cart/ (Redux Toolkit store, cartSlice, Provider)
```

---
*Chúc các bạn hoàn thành xuất sắc học phần Lập trình Thiết bị Di động!*
