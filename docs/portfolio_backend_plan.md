# Kế hoạch Phát Triển Backend & Vận Hành Hệ Thống EduHub (Portfolio-Ready)

Tài liệu này cung cấp lộ trình từng bước (Step-by-step Roadmap) để hoàn thiện Backend, tích hợp thanh toán tự động và triển khai hệ thống EduHub lên môi trường thực tế (Production/Live Demo) nhằm tối ưu giá trị cho hồ sơ Portfolio tuyển dụng.

---

## 1. Tổng quan Kiến trúc Hệ thống (System Architecture)

- **Frontend & Serverless API**: Next.js 15 (App Router, Server Actions, Route Handlers, Tailwind CSS).
- **Database Cloud**: PostgreSQL được host trên **Neon.tech** hoặc **Supabase** (kết nối qua Prisma ORM với PgBouncer connection pooling).
- **Authentication**: NextAuth với JWT / Credentials & Role-based Access Control (`STUDENT` / `ADMIN`).
- **Thanh toán trực tuyến (Sandbox)**: Tích hợp VNPAY Sandbox hoặc SePay VietQR webhook tự động kích hoạt khóa học (`Enrollment`).
- **Nền tảng Vận hành (Deployment)**: Vercel (Auto Deploy từ GitHub) + Cloud Database. Chi phí: **0 VNĐ / tháng**.

---

## 2. Chi tiết 5 Giai đoạn Triển khai

### Giai đoạn 1: Thiết kế Cơ sở Dữ liệu & Đơn hàng (Prisma Schema) - [x] HOÀN THÀNH
- [x] Bổ sung Model `Order` quản lý đơn hàng (`orderCode`, `amount`, `status: PENDING | PAID | CANCELLED | FAILED`, `paymentMethod`).
- [x] Bổ sung quan hệ giữa `User`, `Course`, `Order` và `Enrollment` (`orderId` unique trong `Enrollment`).
- [x] Tạo `src/types/backend.ts` với `OrderStatus`, `OrderInput`, `OrderListItem`, `OrderAdminItem`.
- [x] Tạo `src/server/repositories/orders.ts` (`orderRepository`) với các hàm CRUD, thống kê doanh thu và đếm đơn hàng.
- [x] Chạy đồng bộ cơ sở dữ liệu (`prisma db push`) lên Neon Cloud PostgreSQL.
- [x] Cập nhật script seed (`prisma/seed.mjs`) bổ sung tài khoản Student mẫu (`student@eduhub.local`) và đơn hàng mẫu.

### Giai đoạn 2: Tích hợp Cổng thanh toán Sandbox (VNPAY / VietQR)
- Xây dựng Server Action tạo đơn hàng và tạo link chuyển hướng thanh toán (Ký hash HMAC-SHA512).
- Xây dựng API Route nhận IPN/Webhook ngầm từ cổng thanh toán để cập nhật trạng thái đơn hàng.
- Xử lý nghiệp vụ tự động: Ngay khi thanh toán thành công -> Tự động thêm bản ghi vào bảng `Enrollment` để cấp quyền học cho học viên.
- Trang kết quả thanh toán `/checkout/result` hiển thị trạng thái giao dịch kèm nút "Vào học ngay".

### Giai đoạn 3: Màn hình Học viên & Admin Quản lý Đơn hàng
- **Học viên**: Trang `/my-courses` (các khóa học đã mua), trang xem bài học `/learn/[courseSlug]/[lessonSlug]`.
- **Admin**: Quản lý đơn hàng, doanh thu thực tế, danh sách học viên đăng ký.

### Giai đoạn 4: Triển khai Lên Mạng Thật (Live Demo trên Vercel & Neon)
- Tạo database PostgreSQL miễn phí trên Neon.tech.
- Đẩy source code lên GitHub.
- Liên kết GitHub với Vercel, cấu hình biến môi trường (`DATABASE_URL`, `NEXTAUTH_SECRET`, `NEXTAUTH_URL`, v.v.).
- Chạy `prisma migrate deploy` và seed dữ liệu mẫu lên Production database.

### Giai đoạn 5: Đóng gói Cho CV & Portfolio
- Viết README chuẩn quốc tế: Có Badge công nghệ, sơ đồ kiến trúc, link Live Demo, tài khoản Admin/Student dùng thử.
- Ghi điểm CV với các từ khóa: *Server Actions, Prisma ORM, Idempotent Payment Webhook, PostgreSQL Connection Pooling, Clean Architecture*.
