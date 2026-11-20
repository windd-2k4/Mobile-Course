# Tuần 5: Quản Lý State Màn Hình & Truyền Tham Số (PulseKick Sneakers)

## 🎯 Mục tiêu
- Xây dựng kiến trúc điều hướng màn hình cơ bản bằng State Router trong React Native.
- Truyền đối tượng dữ liệu phức tạp (`Sneaker`) từ Catalog sang Màn hình Chi tiết.
- Tổ chức mã nguồn component phân tách theo thư mục chuẩn `components/` và `data/`.

## 📝 Các màn hình:
1. **WelcomeScreen**: Giới thiệu thương hiệu thể thao, slogan và nút "Bắt đầu khám phá".
2. **CatalogScreen**: Phân loại sản phẩm theo tab ("Tất cả", "Running", "Basketball"), lưới 2 cột và nút thả tim yêu thích.
3. **DetailScreen**: Xem chi tiết giày, chọn size (39..44), tính phần trăm giảm giá tự động và nút thêm vào giỏ hàng.

## 🚀 Cách chạy ứng dụng
```bash
cd sneaker_store
npm install
npx expo start
```
