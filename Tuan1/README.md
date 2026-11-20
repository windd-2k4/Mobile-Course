# Tuần 1: Lập trình TypeScript & React Native Nền tảng

## 🎯 Mục tiêu
- Ôn tập và áp dụng kiến thức TypeScript trong phát triển ứng dụng di động với React Native.
- Hiểu và triển khai các kỹ thuật: Props, Interfaces, Type Inference, Event Handling, Union Types, Generic Wrappers (HOC) và Compound Components.

## 📝 Danh sách 10 bài tập hoàn thành:
1. **MemberCard**: Xây dựng thẻ thành viên dùng `interface`, primitive types, Avatar và rating.
2. **HabitCounter**: Bộ đếm chuỗi ngày kỷ luật dùng `useState`, giới hạn biên và thông báo Alert.
3. **TaskManager**: Quản lý danh sách tác vụ với filter (Tất cả, Cần làm, Đã xong) và toggle trạng thái.
4. **CustomButton**: Nút bấm tái sử dụng với 4 biến thể giao diện (`primary`, `secondary`, `danger`, `outline`).
5. **LiveSearchInput**: Ô nhập tìm kiếm trực tiếp với bộ đếm ký tự và nút xóa nhanh.
6. **CollapsibleCard**: Component chứa dùng kỹ thuật `children: ReactNode` cho phép đóng/mở nội dung.
7. **PrioritySelector**: Chọn mức độ ưu tiên với Union Types (`'Thấp' | 'Trung bình' | 'Cao' | 'Khẩn cấp'`).
8. **StatusBadge**: Badge hiển thị trạng thái dùng `Record` mapping kiểu TypeScript.
9. **withDataLoading (HOC)**: High-Order Component generic bọc component để hiển thị ActivityIndicator.
10. **SegmentedControl**: Compound Component điều hướng tab dùng React Context API.

## 🚀 Cách chạy ứng dụng
```bash
cd task_tracker
npm install
npx expo start
```
Hoặc tải file `tuan1.zip` lên [Expo Snack](https://snack.expo.dev).
