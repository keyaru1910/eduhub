# BÁO CÁO CHI TIẾT DỰ ÁN MẢNG FRONTEND (GIAO DIỆN)

## 1. Tổng Quan Kiến Trúc Frontend

Hệ thống Frontend của dự án **Edu-Hub** được xây dựng dựa trên công nghệ cốt lõi là **Next.js 15 (App Router)** kết hợp với **React 19**, mang lại hiệu năng cao thông qua việc sử dụng **Server Components** kết hợp **Client Components**. 

- **Phương pháp tiếp cận:** Sử dụng `app` directory của Next.js để định tuyến (Routing). Toàn bộ dự án được phân chia logic rõ ràng giữa 2 phân hệ chính:
  - Phân hệ Public (Site): Trang chủ, tìm kiếm khóa học, không gian học tập.
  - Phân hệ Admin: Giao diện quản trị, xem danh sách khóa học, lead khách hàng.
- **Ngôn ngữ phát triển:** TypeScript (Strict Mode) giúp đảm bảo an toàn kiểu dữ liệu và hạn chế lỗi runtime.

---

## 2. Công Nghệ và Thư Viện Sử Dụng (Tech Stack)

Dựa trên cấu hình trong `package.json`, phần Frontend tích hợp các thư viện hiện đại nhất sau:

### 2.1. Framework và Thư viện lõi
- **Next.js (15.2.4):** Đảm nhận vai trò SSR (Server-Side Rendering), định tuyến (App Router, Server Actions).
- **React & React DOM (19.0.0):** Phiên bản mới nhất của React với hiệu năng cải thiện và hỗ trợ cấu trúc component tối ưu.
- **TypeScript:** Typed JavaScript để làm việc với các components, props và state an toàn.

### 2.2. Giao diện (UI) và Styling
- **Tailwind CSS v4 (`@tailwindcss/postcss`):** Thư viện utility-first css, cung cấp hệ thống class CSS mạnh mẽ giúp style nhanh chóng mà không phải viết nhiều mã CSS thủ công.
- **Headless UI (`@headlessui/react`):** Thư viện UI không phong cách hoàn toàn tương thích với Tailwind (thường dùng cho Dropdown, Modal, Dialog).
- **Iconify (`@iconify/react` & `@iconify/icons-ion`):** Quản lý và render SVG Icons nhẹ nhàng, nhanh chóng.
- **Next Themes (`next-themes`):** Xử lý giao diện Chế độ Tối/Sáng (Dark Mode / Light Mode).

### 2.3. Hiệu ứng và Tương tác (Animations & Interactions)
- **Framer Motion (`framer-motion`):** Quản lý hiệu ứng animation mượt mà cho các phần tử phức tạp.
- **AOS (Animate On Scroll) (`aos`):** Kích hoạt các hiệu ứng nhẹ khi cuộn trang (Fade in, Slide up).
- **React Slick (`react-slick` & `slick-carousel`):** Hỗ trợ tính năng Slider/Carousel (Dùng cho slider Cảm nhận học viên, Khóa học nổi bật, v.v).
- **React Hot Toast (`react-hot-toast`):** Hệ thống hiển thị thông báo (toast notifications) không chặn UI dành cho gửi Form thành công hoặc hiển thị lỗi.

### 2.4. Tiện ích và Định dạng (Utils)
- **Date-fns (`date-fns`):** Thư viện format và tính toán thời gian thân thiện (hiển thị thời gian đăng ký, bình luận...).
- **Markdown Renderer (`remark`, `remark-html`, `gray-matter`):** Dùng để parse các nội dung định dạng markdown/rich text ra mã HTML để hiển thị ở frontend (ví dụ: mô tả khoá học, chi tiết bài học).

---

## 3. Cấu Trúc Khối Giao Diện (Directory Structure)

Thư mục xử lý giao diện nằm toàn bộ trong `src/app/` với kiến trúc sau:

```text
src/
└── app/
    ├── (site)/            # Nơi chứa các màn hình khu vực public
    │   ├── page.tsx       # Trang chủ chính
    │   ├── courses/       # Trang danh sách khóa học và chi tiết
    │   ├── mentors/       # Trang đội ngũ mentor
    │   └── ...            # Liên hệ, Cảm nhận, v.v
    │
    ├── (admin)/           # Nơi chứa các màn hình khu vực Quản trị Admin
    │   └── admin/     
    │       ├── courses/   # Quản lý khóa học
    │       ├── lessons/   # Quản lý bài học
    │       └── dashboard  # Thống kê tổng quan
    │
    ├── components/        # Các UI Components được tái sử dụng (Reusuable UI)
    │   ├── ui/            # Buttons, Inputs, Cards...
    │   ├── layout/        # Header, Footer, Sidebar admin...
    │   └── shared/        # Các phần tử chia sẻ chung của website
    │
    ├── globals.css        # Cấu hình CSS toàn cục (Tailwind directives)
    └── layout.tsx         # File Root Layout định hình HTML của toàn bộ dự án
```

---

## 4. Các Tính Năng Frontend Nổi Bật

### 4.1. Phân hệ Người Dùng (Public Site)
- **Giao diện đa nền tảng (Responsive Design):** Website tương thích hoàn hảo trên các thiết bị Mobile, Tablet và Desktop nhờ hệ thống Grid/Flex của Tailwind CSS.
- **Trải nghiệm UX linh hoạt:**
  - Component Khóa học dạng Card (Card Layout) rất trực quan khi kèm theo label hiển thị "Giá", "Mức độ".
  - Trang chi tiết khóa học nhúng luồng hiển thị danh sách các chương mục gọn gàng (Accordion / List).
  - Không gian học tập (Lesson Mode) nhúng (embed) được Youtube Player trực tiếp giúp học viên tham gia học mượt mà.
- **Form Liên Hệ Động:** Sử dụng Server Actions kết hợp Client logic, validate đầu vào ở frontend và báo lỗi / thông báo thành công dưới dạng toast.

### 4.2. Phân hệ Quản Trị (Admin Panel)
- **Layout Tách Biệt:** Sử dụng layout riêng biệt cho admin với Navigation Sidebar bên trái để kiểm soát menu chức năng.
- **Form Nhập Liệu Thân Thiện:** Form điền nội dung được làm tối giản. Có ảnh xem trước (Image Preview) khi đặt URL ảnh.
- **Quản lý danh sách (List / Table):** Các item dữ liệu như Khóa học, Lead khách hàng được trình bày theo dạng thẻ ngang quản lý dễ dàng thay cho dạng text JSON thô cứng.

---

## 5. Đánh Giá Trải Nghiệm và Phong Cách (UI/UX)
- **Giao diện sáng (Light Theme Mode):** Tối ưu hóa cho sản phẩm mang tính giáo dục, đem đến cảm giác sạch sẽ và chuyên nghiệp.
- **Hiệu ứng thu hút:** Cuộn màn hình kích hoạt mượt mà hiệu ứng AOS. Khi lướt qua Hero Component hay danh sách Mentor, các item xuất hiện mềm mại giúp nội dung bớt nhàm chán.
- **Trải nghiệm Loading:** Quá trình chuyển trang (Routing) cực nhanh lợi dụng cơ chế Router Cache và Server Components của Next.js 15, tối ưu SEO vượt trội (Title Tags, Semantic HTML tự động sinh).

---

## 6. Điểm Cần Cải Thiện Trong Tương Lai
- Thay thế các ảnh ở các Link ngoài thành tải lên CND / Storage thông qua File Upload Component trực tiếp ở phần Admin.
- Tích hợp thêm các bộ đếm số liệu (Charts) dùng thư viện d3/recharts vào Dashboard để cải thiện cái nhìn của Admin Panel.
- Nếu ứng dụng bành trướng, có thể chuyển giao hệ thống Component bằng thư viện thiết kế như `shadcn/ui` để rút gọn mã nguồn tự viết hơn nữa.
