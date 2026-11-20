# Tuần 2: TypeScript Nâng Cao, Bất Đồng Bộ & Tích Hợp REST API

## 🎯 Mục tiêu
- Lập trình bất đồng bộ với `async/await` và gọi API thực tế.
- Quản lý kiểu dữ liệu nâng cao: `Optional Chaining`, `Type Guards`, `Generic Functions & Interfaces`.
- Tối ưu hóa danh sách với `FlatList`, `RefreshControl` và phân trang.

## 📝 Danh sách bài tập:
- **Bài 9**: News Feed từ JSONPlaceholder API với `fetch`, `async/await`, `FlatList`.
- **Bài 10**: Hồ sơ tác giả với kiểu dữ liệu `Author | null` và Optional Chaining `author?.bio`.
- **Bài 11**: Tìm kiếm bài viết theo thời gian thực với TypeScript filtering.
- **Bài 12**: Bắt lỗi API chuyên sâu với `try/catch(err: unknown)` và Type Guard `isCustomApiError`.
- **Bài 13**: Hàm Generic `filterCollection<T>` tái sử dụng cho mọi danh sách dữ liệu.
- **Bài 14**: Phân trang danh sách với Generic Interface `PaginatedResponse<T>`.
- **Bài 15**: Kéo để làm mới dữ liệu với `RefreshControl` quản lý độc lập 2 trạng thái loading & refreshing.

## 🚀 Cách chạy ứng dụng
```bash
cd news_feed
npm install
npx expo start
```
