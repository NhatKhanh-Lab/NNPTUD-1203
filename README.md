# Đồ án lập trình API quản lý User và Role

**Thông tin sinh viên:**
- **Họ và tên:** Võ Nhật Khánh
- **MSSV:** 2280601481

## Mô tả dự án
Dự án được xây dựng bằng Node.js (Express) và MongoDB (Mongoose), cung cấp các API để quản lý đối tượng `User` và `Role` theo các yêu cầu:

1. Thiết kế Schema (Object) đầy đủ các trường `username`, `password`, `email`, `fullName`, `avatarUrl`, `status`, `role` (tham chiếu đến Role), `loginCount`, `timestamp` cho User và `name`, `description`, `timestamp` cho Role.
2. Cung cấp đầy đủ các thao tác CRUD: Create, Read (Get All, Get by ID), Update, và Delete (Xóa mềm - Soft Delete).
3. API `/enable`: Truyền `email` và `username`, nếu đúng thông tin thì chuyển `status` của người dùng về `true`.
4. API `/disable`: Truyền `email` và `username`, nếu đúng thông tin thì chuyển `status` của người dùng về `false`.
5. API `/roles/:id/users`: Lấy danh sách toàn bộ người dùng thuộc một nhóm quyền (Role) nhất định.

## Hướng dẫn cài đặt & chạy ứng dụng
1. Cài đặt các gói phụ thuộc:
```bash
npm install
```
2. Khởi động server (Mặc định chạy trên cổng 3000):
```bash
npm start
```

## Dữ liệu mẫu (Seeder)
Để dễ dàng test API, có thể chạy file `seed.js` để tự động tạo một số Roles và Users cấu hình sẵn:
```bash
node seed.js
```
