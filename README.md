# Edu Hub

Edu Hub là dự án bán khóa học  xây bằng Next.js 15, Prisma và NextAuth. Ứng dụng mô phỏng một nền tảng giới thiệu khóa học, mentor và thu lead tư vấn qua form public, đồng thời có khu vực admin để quản lý nội dung và theo dõi liên hệ.

## Tính năng chính

- Trang public gồm: trang chủ, khóa học, mentor, cảm nhận, liên hệ và các màn auth cơ bản.
- Khu vực admin quản lý khóa học, mentor, cảm nhận và contact submissions.
- Dữ liệu public đọc từ database; khi thiếu `DATABASE_URL` trong môi trường dev, hệ thống fallback sang dữ liệu tĩnh để dễ trình diễn.
- Seed sẵn dữ liệu demo và tài khoản admin để chạy lại nhanh.

## Luồng demo đề xuất

1. Vào trang chủ để xem khóa học, mentor và cảm nhận nổi bật.
2. Mở trang `Khóa học` hoặc `Mentor` để xem nội dung chi tiết.
3. Gửi form ở trang `Liên hệ`.
4. Đăng nhập admin và kiểm tra lead mới trong `Lead liên hệ`.
5. Cập nhật trạng thái lead để hoàn thành luồng end-to-end.

## Công nghệ sử dụng

- Next.js 15 App Router
- React 19
- Prisma + PostgreSQL
- NextAuth credentials
- Tailwind CSS 4

## Cài đặt và chạy local

1. Cài dependencies

```bash
npm install
```

2. Tạo file môi trường từ mẫu

```bash
cp .env.example .env
```

3. Tạo Prisma client, migrate và seed dữ liệu

```bash
npx prisma generate
npx prisma migrate dev --name init
npm run prisma:seed
```

4. Chạy development server

```bash
npm run dev
```

5. Build kiểm tra trước khi demo 

```bash
npm run build
```

## Biến môi trường

- `DATABASE_URL`: chuỗi kết nối PostgreSQL.
- `NEXTAUTH_SECRET`: secret dùng cho phiên đăng nhập.
- `NEXTAUTH_URL`: URL local hoặc URL deploy.
- `APP_BASE_URL`: base URL dùng trong email reset password.
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM`: cấu hình SMTP.
- `SEED_ADMIN_EMAIL`, `SEED_ADMIN_PASSWORD`: tài khoản admin tạo ra khi seed.

## Lưu ý cho giảng viên hoặc người chấm

- Nếu chưa cấu hình `DATABASE_URL`, trang public vẫn có thể chạy bằng dữ liệu fallback trong môi trường development.
- Các chức năng ghi dữ liệu như signup, contact form, admin CRUD và reset password cần database để hoạt động đầy đủ.
- Nếu chưa cấu hình SMTP, luồng quên mật khẩu vẫn chạy tới bước tạo link nhưng email thực tế sẽ không được gửi.
