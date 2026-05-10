import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { contentService } from '@/server/services/content'
import { getAuthSession } from '@/server/auth/session'
import { enrollmentService } from '@/server/services/enrollment'
import withBasePath from '@/utils/basePath'
import { Icon } from '@iconify/react/dist/iconify.js'
import EnrollButton from './EnrollButton'

type CourseChapter = {
  title: string
  lessons: { title: string; duration: string }[]
}

type CourseDetailContent = {
  outcomes: string[]
  chapters: CourseChapter[]
  duration: string
}

const courseDetailContent: Record<string, CourseDetailContent> = {
  'nen-tang-html-css-javascript': {
    outcomes: [
      'Hiểu vai trò của HTML, CSS và JavaScript trong một website',
      'Tự dựng cấu trúc trang bằng các thẻ HTML semantic',
      'Thiết kế bố cục responsive bằng Flexbox và Grid',
      'Viết JavaScript cơ bản để xử lý tương tác trên giao diện',
      'Biết cách dùng DevTools để kiểm tra và sửa lỗi giao diện',
      'Tổ chức file frontend rõ ràng cho một dự án nhỏ',
      'Hoàn thiện landing page cá nhân từ đầu đến cuối',
      'Nắm nền tảng để học tiếp React hoặc frontend nâng cao',
    ],
    chapters: [
      {
        title: 'Nền tảng web',
        lessons: [
          { title: 'Website hoạt động như thế nào?', duration: '08:20' },
          { title: 'Cài đặt môi trường VS Code và trình duyệt', duration: '07:45' },
          { title: 'Cấu trúc dự án HTML, CSS, JavaScript', duration: '09:10' },
        ],
      },
      {
        title: 'HTML và CSS căn bản',
        lessons: [
          { title: 'HTML semantic và cấu trúc nội dung', duration: '12:30' },
          { title: 'Selector, box model và spacing', duration: '14:05' },
          { title: 'Flexbox, Grid và responsive layout', duration: '16:40' },
        ],
      },
      {
        title: 'JavaScript cho giao diện',
        lessons: [
          { title: 'Biến, hàm và thao tác DOM', duration: '13:15' },
          { title: 'Xử lý sự kiện form, menu và tab', duration: '15:20' },
          { title: 'Hoàn thiện landing page cuối khóa', duration: '18:35' },
        ],
      },
    ],
    duration: '01 giờ 55 phút',
  },
  'backend-voi-node-js': {
    outcomes: [
      'Hiểu cách backend xử lý request, response và business logic',
      'Xây REST API bằng Node.js và Express',
      'Thiết kế routing, middleware và controller rõ ràng',
      'Kết nối database và thao tác dữ liệu cơ bản',
      'Xử lý validation, lỗi và trạng thái HTTP đúng cách',
      'Tạo authentication đơn giản bằng token',
      'Biết cách cấu trúc dự án backend dễ mở rộng',
      'Triển khai API phục vụ cho web hoặc mobile app',
    ],
    chapters: [
      {
        title: 'Nhập môn backend',
        lessons: [
          { title: 'Vai trò của backend trong ứng dụng web', duration: '09:35' },
          { title: 'Khởi tạo dự án Node.js và Express', duration: '11:20' },
          { title: 'Routing, request và response', duration: '12:10' },
        ],
      },
      {
        title: 'Xây dựng REST API',
        lessons: [
          { title: 'Controller, service và repository', duration: '14:30' },
          { title: 'Validation dữ liệu đầu vào', duration: '10:45' },
          { title: 'Xử lý lỗi và mã trạng thái HTTP', duration: '12:25' },
        ],
      },
      {
        title: 'Database và bảo mật cơ bản',
        lessons: [
          { title: 'Kết nối database cho API', duration: '15:50' },
          { title: 'Đăng nhập và xác thực bằng token', duration: '16:05' },
          { title: 'Tổ chức và triển khai backend', duration: '13:40' },
        ],
      },
    ],
    duration: '01 giờ 56 phút',
  },
  'co-so-du-lieu-cho-web-app': {
    outcomes: [
      'Hiểu sự khác nhau giữa SQL và NoSQL trong web app',
      'Thiết kế bảng, quan hệ và index cho dữ liệu phổ biến',
      'Viết truy vấn CRUD và lọc dữ liệu theo nghiệp vụ',
      'Biết cách mô hình hóa user, course, order hoặc post',
      'Kết nối database với backend an toàn',
      'Nhận diện lỗi dữ liệu trùng lặp và thiếu ràng buộc',
      'Tối ưu truy vấn đơn giản bằng index và phân trang',
      'Chuẩn bị nền tảng để dùng PostgreSQL hoặc MongoDB trong dự án thật',
    ],
    chapters: [
      {
        title: 'Tư duy dữ liệu',
        lessons: [
          { title: 'Database giải quyết vấn đề gì?', duration: '08:55' },
          { title: 'SQL, NoSQL và cách chọn database', duration: '11:15' },
          { title: 'Entity, field, relation và constraint', duration: '13:05' },
        ],
      },
      {
        title: 'Thiết kế và truy vấn',
        lessons: [
          { title: 'CRUD, filter, sort và pagination', duration: '15:20' },
          { title: 'Quan hệ một-nhiều và nhiều-nhiều', duration: '14:35' },
          { title: 'Index và tối ưu truy vấn cơ bản', duration: '10:50' },
        ],
      },
      {
        title: 'Kết nối web app',
        lessons: [
          { title: 'Kết nối database từ Node.js', duration: '13:45' },
          { title: 'Migration, seed và dữ liệu mẫu', duration: '12:30' },
          { title: 'Thiết kế database cho dự án cuối khóa', duration: '16:10' },
        ],
      },
    ],
    duration: '01 giờ 56 phút',
  },
  'react-js-thuc-chien': {
    outcomes: [
      'Hiểu tư duy component-based trong React',
      'Xây giao diện bằng props, state và event handler',
      'Tổ chức component, page và hook rõ ràng',
      'Làm việc với form, list, loading và empty state',
      'Gọi API và quản lý dữ liệu hiển thị trên UI',
      'Biết cách tách component tái sử dụng',
      'Tối ưu trải nghiệm bằng conditional rendering',
      'Hoàn thiện một mini app React có dữ liệu thật',
    ],
    chapters: [
      {
        title: 'React căn bản',
        lessons: [
          { title: 'React giải quyết vấn đề gì?', duration: '08:40' },
          { title: 'JSX, component và props', duration: '13:30' },
          { title: 'State và xử lý sự kiện', duration: '14:05' },
        ],
      },
      {
        title: 'Xây UI có dữ liệu',
        lessons: [
          { title: 'Render danh sách và trạng thái rỗng', duration: '12:45' },
          { title: 'Form, validation và submit', duration: '15:10' },
          { title: 'Gọi API và xử lý loading', duration: '16:20' },
        ],
      },
      {
        title: 'Dự án thực chiến',
        lessons: [
          { title: 'Tổ chức folder và component', duration: '11:50' },
          { title: 'Xây dashboard mini bằng React', duration: '18:05' },
          { title: 'Review, refactor và hoàn thiện app', duration: '14:25' },
        ],
      },
    ],
    duration: '02 giờ 05 phút',
  },
  'react-native-tu-a-z': {
    outcomes: [
      'Hiểu cách React Native xây giao diện mobile đa nền tảng',
      'Dựng layout bằng View, Text, Image và StyleSheet',
      'Điều hướng giữa các màn hình trong ứng dụng',
      'Gọi API và hiển thị dữ liệu trên mobile',
      'Xử lý form, trạng thái loading và lỗi',
      'Biết các khác biệt quan trọng giữa web và mobile UI',
      'Tối ưu trải nghiệm nhập liệu và thao tác chạm',
      'Hoàn thiện app mobile nhỏ kết nối backend',
    ],
    chapters: [
      {
        title: 'Khởi đầu React Native',
        lessons: [
          { title: 'Thiết lập môi trường và Expo', duration: '10:20' },
          { title: 'Component cốt lõi trong React Native', duration: '12:40' },
          { title: 'StyleSheet và responsive mobile', duration: '13:25' },
        ],
      },
      {
        title: 'Luồng ứng dụng mobile',
        lessons: [
          { title: 'Navigation và tổ chức màn hình', duration: '15:15' },
          { title: 'Form đăng nhập và nhập liệu', duration: '14:10' },
          { title: 'Gọi API và render danh sách', duration: '16:05' },
        ],
      },
      {
        title: 'Hoàn thiện app',
        lessons: [
          { title: 'Lưu trạng thái và token cơ bản', duration: '13:35' },
          { title: 'Xử lý loading, empty và error state', duration: '11:50' },
          { title: 'Đóng gói bản demo cuối khóa', duration: '12:55' },
        ],
      },
    ],
    duration: '02 giờ',
  },
  'swift-co-ban': {
    outcomes: [
      'Nắm cú pháp Swift nền tảng cho người mới',
      'Hiểu biến, kiểu dữ liệu, hàm và control flow',
      'Làm quen với Xcode và cấu trúc dự án iOS',
      'Tạo giao diện iOS đơn giản bằng SwiftUI',
      'Quản lý state cơ bản trong màn hình ứng dụng',
      'Xử lý list, form và navigation',
      'Biết cách debug lỗi phổ biến trong Swift',
      'Xây mini app iOS đầu tiên có nhiều màn hình',
    ],
    chapters: [
      {
        title: 'Ngôn ngữ Swift',
        lessons: [
          { title: 'Cài đặt Xcode và tạo playground', duration: '09:10' },
          { title: 'Biến, kiểu dữ liệu và optional', duration: '14:25' },
          { title: 'Hàm, struct và control flow', duration: '15:05' },
        ],
      },
      {
        title: 'SwiftUI căn bản',
        lessons: [
          { title: 'View, modifier và layout', duration: '13:40' },
          { title: 'State, binding và form', duration: '14:30' },
          { title: 'List và navigation', duration: '12:55' },
        ],
      },
      {
        title: 'Mini app iOS',
        lessons: [
          { title: 'Tổ chức màn hình ứng dụng', duration: '11:45' },
          { title: 'Xử lý dữ liệu mẫu và tương tác', duration: '13:20' },
          { title: 'Debug và hoàn thiện sản phẩm', duration: '10:50' },
        ],
      },
    ],
    duration: '01 giờ 55 phút',
  },
  'flutter-thuc-hanh': {
    outcomes: [
      'Hiểu widget tree và cách Flutter dựng giao diện',
      'Sử dụng layout widget để tạo UI responsive',
      'Quản lý state cơ bản trong ứng dụng Flutter',
      'Điều hướng giữa các màn hình',
      'Gọi API và render dữ liệu từ backend',
      'Tổ chức component và theme cho app',
      'Biết cách xử lý form, loading và lỗi',
      'Hoàn thiện app Flutter demo chạy đa nền tảng',
    ],
    chapters: [
      {
        title: 'Làm quen Flutter',
        lessons: [
          { title: 'Cài đặt Flutter và tạo project', duration: '10:05' },
          { title: 'Widget tree, Stateless và Stateful', duration: '13:50' },
          { title: 'Layout với Row, Column và Stack', duration: '14:30' },
        ],
      },
      {
        title: 'Xây app có luồng',
        lessons: [
          { title: 'Theme, component và navigation', duration: '12:45' },
          { title: 'Form và quản lý state cơ bản', duration: '15:20' },
          { title: 'Kết nối API và hiển thị dữ liệu', duration: '16:10' },
        ],
      },
      {
        title: 'Dự án thực hành',
        lessons: [
          { title: 'Xây màn hình danh sách và chi tiết', duration: '14:15' },
          { title: 'Xử lý loading, empty và error', duration: '11:35' },
          { title: 'Hoàn thiện app cuối khóa', duration: '13:05' },
        ],
      },
    ],
    duration: '02 giờ 02 phút',
  },
  'thiet-ke-ui-cho-mobile': {
    outcomes: [
      'Hiểu nguyên tắc thiết kế giao diện mobile rõ ràng',
      'Xây hệ thống spacing, typography và màu sắc cho app',
      'Thiết kế component mobile dễ dùng và nhất quán',
      'Tối ưu trải nghiệm thao tác chạm và nhập liệu',
      'Biết cách thiết kế onboarding, form và danh sách',
      'Tạo prototype cơ bản để kiểm tra luồng sử dụng',
      'Chuẩn bị file handoff cho developer',
      'Hoàn thiện bộ màn hình mobile app có tính ứng dụng',
    ],
    chapters: [
      {
        title: 'Nền tảng UI mobile',
        lessons: [
          { title: 'Khác biệt giữa web UI và mobile UI', duration: '09:30' },
          { title: 'Layout, safe area và thao tác chạm', duration: '12:35' },
          { title: 'Typography và màu sắc cho màn hình nhỏ', duration: '11:40' },
        ],
      },
      {
        title: 'Component và luồng sử dụng',
        lessons: [
          { title: 'Button, input, card và bottom navigation', duration: '14:10' },
          { title: 'Thiết kế form và trạng thái lỗi', duration: '13:25' },
          { title: 'Prototype luồng onboarding và checkout', duration: '15:45' },
        ],
      },
      {
        title: 'Handoff và portfolio',
        lessons: [
          { title: 'Chuẩn bị design system mini', duration: '12:20' },
          { title: 'Handoff asset và annotation', duration: '10:55' },
          { title: 'Hoàn thiện case study mobile UI', duration: '16:30' },
        ],
      },
    ],
    duration: '01 giờ 57 phút',
  },
  'machine-learning-voi-tensorflow': {
    outcomes: [
      'Hiểu quy trình cơ bản của một bài toán machine learning',
      'Chuẩn bị dữ liệu để huấn luyện mô hình',
      'Xây mô hình đơn giản bằng TensorFlow/Keras',
      'Đánh giá kết quả bằng metric phù hợp',
      'Biết cách xử lý overfitting ở mức cơ bản',
      'Lưu và tải lại mô hình đã huấn luyện',
      'Áp dụng model cho bài toán phân loại hoặc dự đoán',
      'Có nền tảng để học sâu hơn về AI ứng dụng',
    ],
    chapters: [
      {
        title: 'Pipeline machine learning',
        lessons: [
          { title: 'Machine learning giải quyết bài toán nào?', duration: '10:40' },
          { title: 'Dataset, feature và label', duration: '12:15' },
          { title: 'Train, validation và test set', duration: '13:05' },
        ],
      },
      {
        title: 'TensorFlow căn bản',
        lessons: [
          { title: 'Tạo model đầu tiên với Keras', duration: '16:20' },
          { title: 'Loss function, optimizer và metric', duration: '14:55' },
          { title: 'Đánh giá và cải thiện model', duration: '15:35' },
        ],
      },
      {
        title: 'Ứng dụng mô hình',
        lessons: [
          { title: 'Lưu, tải và dùng model để dự đoán', duration: '12:50' },
          { title: 'Bài toán phân loại dữ liệu mẫu', duration: '18:15' },
          { title: 'Tổng kết hướng phát triển tiếp theo', duration: '09:45' },
        ],
      },
    ],
    duration: '02 giờ 04 phút',
  },
  'data-platform-tren-aws': {
    outcomes: [
      'Hiểu các thành phần chính của data platform trên AWS',
      'Biết cách lưu trữ dữ liệu bằng S3',
      'Nắm khái niệm data lake và data warehouse',
      'Làm quen với ETL và xử lý dữ liệu theo batch',
      'Hiểu vai trò của IAM trong bảo mật dữ liệu',
      'Biết cách chọn dịch vụ AWS phù hợp cho từng nhu cầu',
      'Thiết kế pipeline dữ liệu mức cơ bản',
      'Có nền tảng để triển khai bài toán dữ liệu trên cloud',
    ],
    chapters: [
      {
        title: 'Tổng quan data platform',
        lessons: [
          { title: 'Data platform gồm những gì?', duration: '09:25' },
          { title: 'S3, data lake và vùng lưu trữ dữ liệu', duration: '13:40' },
          { title: 'IAM và bảo mật truy cập dữ liệu', duration: '12:10' },
        ],
      },
      {
        title: 'Xử lý và phân tích dữ liệu',
        lessons: [
          { title: 'ETL, ELT và pipeline dữ liệu', duration: '14:50' },
          { title: 'Truy vấn dữ liệu với Athena', duration: '15:20' },
          { title: 'Kho dữ liệu và mô hình phân tích', duration: '13:15' },
        ],
      },
      {
        title: 'Thiết kế giải pháp AWS',
        lessons: [
          { title: 'Kết nối ingestion, storage và analytics', duration: '16:05' },
          { title: 'Giám sát chi phí và hiệu năng', duration: '11:35' },
          { title: 'Bản thiết kế data platform cuối khóa', duration: '14:45' },
        ],
      },
    ],
    duration: '02 giờ 01 phút',
  },
  'truc-quan-du-lieu-voi-bokeh': {
    outcomes: [
      'Hiểu cách kể chuyện bằng dữ liệu qua biểu đồ',
      'Tạo biểu đồ tương tác bằng Bokeh',
      'Làm sạch và chuẩn bị dữ liệu bằng Python',
      'Thiết kế dashboard đơn giản, dễ đọc',
      'Biết chọn loại biểu đồ phù hợp với câu hỏi dữ liệu',
      'Tùy chỉnh màu sắc, tooltip và filter',
      'Xuất dashboard để chia sẻ hoặc nhúng vào web',
      'Hoàn thiện một dashboard phân tích dữ liệu mẫu',
    ],
    chapters: [
      {
        title: 'Nền tảng visualization',
        lessons: [
          { title: 'Vai trò của trực quan dữ liệu', duration: '08:50' },
          { title: 'Chuẩn bị dữ liệu với Python', duration: '12:30' },
          { title: 'Chọn biểu đồ theo câu hỏi phân tích', duration: '11:45' },
        ],
      },
      {
        title: 'Bokeh thực hành',
        lessons: [
          { title: 'Tạo line, bar và scatter chart', duration: '15:10' },
          { title: 'Tooltip, legend và style biểu đồ', duration: '13:55' },
          { title: 'Filter và tương tác trong dashboard', duration: '16:25' },
        ],
      },
      {
        title: 'Dashboard cuối khóa',
        lessons: [
          { title: 'Bố cục dashboard với nhiều biểu đồ', duration: '14:20' },
          { title: 'Xuất file và nhúng dashboard', duration: '10:40' },
          { title: 'Hoàn thiện câu chuyện dữ liệu', duration: '15:05' },
        ],
      },
    ],
    duration: '01 giờ 59 phút',
  },
  'phan-tich-du-lieu-voi-scikit-learn': {
    outcomes: [
      'Hiểu quy trình phân tích dữ liệu bằng Python',
      'Làm sạch dữ liệu và xử lý missing value cơ bản',
      'Chia tập dữ liệu để huấn luyện và kiểm thử',
      'Sử dụng Scikit-learn cho bài toán regression và classification',
      'Đánh giá mô hình bằng metric phù hợp',
      'Biết cách chuẩn hóa dữ liệu và tạo pipeline',
      'Trình bày kết quả phân tích rõ ràng',
      'Hoàn thiện notebook phân tích dữ liệu đầu cuối',
    ],
    chapters: [
      {
        title: 'Chuẩn bị dữ liệu',
        lessons: [
          { title: 'Quy trình phân tích dữ liệu', duration: '09:15' },
          { title: 'Làm sạch dữ liệu với pandas', duration: '14:30' },
          { title: 'Feature, target và train-test split', duration: '12:40' },
        ],
      },
      {
        title: 'Mô hình Scikit-learn',
        lessons: [
          { title: 'Regression cho bài toán dự đoán', duration: '16:05' },
          { title: 'Classification và confusion matrix', duration: '15:50' },
          { title: 'Pipeline và preprocessing', duration: '14:15' },
        ],
      },
      {
        title: 'Đánh giá và báo cáo',
        lessons: [
          { title: 'Chọn metric theo mục tiêu phân tích', duration: '11:35' },
          { title: 'So sánh model và đọc kết quả', duration: '13:25' },
          { title: 'Hoàn thiện notebook cuối khóa', duration: '15:40' },
        ],
      },
    ],
    duration: '02 giờ 03 phút',
  },
  'ha-tang-cloud-co-ban': {
    outcomes: [
      'Hiểu các khái niệm compute, storage và network trên cloud',
      'Phân biệt IaaS, PaaS và SaaS',
      'Biết cách đọc mô hình hạ tầng ứng dụng đơn giản',
      'Nắm nguyên tắc bảo mật tài khoản và phân quyền',
      'Triển khai tài nguyên cloud ở mức nhập môn',
      'Theo dõi chi phí và tài nguyên đang sử dụng',
      'Hiểu cơ bản về scaling, backup và monitoring',
      'Có nền tảng để học triển khai ứng dụng trên cloud',
    ],
    chapters: [
      {
        title: 'Tổng quan cloud',
        lessons: [
          { title: 'Cloud computing là gì?', duration: '08:45' },
          { title: 'IaaS, PaaS, SaaS và shared responsibility', duration: '12:55' },
          { title: 'Region, availability zone và tài nguyên', duration: '10:35' },
        ],
      },
      {
        title: 'Tài nguyên hạ tầng',
        lessons: [
          { title: 'Compute, storage và network cơ bản', duration: '14:20' },
          { title: 'Security group, IAM và quyền truy cập', duration: '13:30' },
          { title: 'Backup, monitoring và cost alert', duration: '12:15' },
        ],
      },
      {
        title: 'Thiết kế hệ thống đơn giản',
        lessons: [
          { title: 'Mô hình hạ tầng cho web app', duration: '15:05' },
          { title: 'Scaling và tính sẵn sàng', duration: '11:40' },
          { title: 'Bài tập thiết kế cloud architecture', duration: '13:10' },
        ],
      },
    ],
    duration: '01 giờ 52 phút',
  },
  'dich-vu-cloud-cho-doanh-nghiep': {
    outcomes: [
      'Hiểu cách doanh nghiệp chọn và sử dụng dịch vụ cloud',
      'Nắm nhóm dịch vụ compute, database, storage và analytics',
      'Biết cách đánh giá nhu cầu vận hành ứng dụng',
      'Thiết kế mô hình cloud phù hợp cho đội ngũ nhỏ',
      'Hiểu chi phí, bảo mật và khả năng mở rộng',
      'Biết các tiêu chí khi chuyển hệ thống lên cloud',
      'Đọc được sơ đồ kiến trúc cloud doanh nghiệp cơ bản',
      'Chuẩn bị kế hoạch cloud adoption ở mức nhập môn',
    ],
    chapters: [
      {
        title: 'Cloud trong doanh nghiệp',
        lessons: [
          { title: 'Vì sao doanh nghiệp chuyển lên cloud?', duration: '09:20' },
          { title: 'Nhóm dịch vụ cloud phổ biến', duration: '12:45' },
          { title: 'Chi phí, bảo mật và vận hành', duration: '13:15' },
        ],
      },
      {
        title: 'Kiến trúc dịch vụ',
        lessons: [
          { title: 'Compute và container cho ứng dụng', duration: '14:35' },
          { title: 'Database managed service', duration: '13:50' },
          { title: 'Storage, CDN và backup', duration: '12:25' },
        ],
      },
      {
        title: 'Kế hoạch áp dụng cloud',
        lessons: [
          { title: 'Đánh giá hệ thống hiện tại', duration: '11:55' },
          { title: 'Thiết kế roadmap migration', duration: '14:10' },
          { title: 'Bài tập kiến trúc cloud doanh nghiệp', duration: '15:30' },
        ],
      },
    ],
    duration: '01 giờ 58 phút',
  },
  'trien-khai-ung-dung-voi-paas': {
    outcomes: [
      'Hiểu PaaS giúp triển khai ứng dụng nhanh hơn như thế nào',
      'Chuẩn bị biến môi trường, build command và runtime',
      'Triển khai web app lên nền tảng PaaS',
      'Kết nối database và dịch vụ bên ngoài',
      'Theo dõi log, lỗi deploy và trạng thái ứng dụng',
      'Thiết lập domain, HTTPS và cấu hình production cơ bản',
      'Biết cách rollback và cập nhật phiên bản',
      'Hoàn thiện quy trình deploy cho dự án web app',
    ],
    chapters: [
      {
        title: 'Chuẩn bị triển khai',
        lessons: [
          { title: 'PaaS là gì và phù hợp khi nào?', duration: '08:55' },
          { title: 'Build command, runtime và environment variables', duration: '13:25' },
          { title: 'Chuẩn bị repository để deploy', duration: '11:45' },
        ],
      },
      {
        title: 'Deploy ứng dụng',
        lessons: [
          { title: 'Triển khai frontend hoặc full-stack app', duration: '15:35' },
          { title: 'Kết nối database và secret', duration: '14:20' },
          { title: 'Đọc log và xử lý lỗi deploy', duration: '13:10' },
        ],
      },
      {
        title: 'Vận hành production',
        lessons: [
          { title: 'Domain, HTTPS và cấu hình production', duration: '12:50' },
          { title: 'Rollback và cập nhật phiên bản', duration: '10:45' },
          { title: 'Checklist deploy cuối khóa', duration: '14:05' },
        ],
      },
    ],
    duration: '01 giờ 55 phút',
  },
  'mo-hinh-san-pham-saas': {
    outcomes: [
      'Hiểu SaaS là gì và khác gì với phần mềm truyền thống',
      'Nắm các thành phần chính của một sản phẩm SaaS',
      'Biết cách thiết kế user, workspace, subscription và billing ở mức khái niệm',
      'Hiểu onboarding, retention và vòng đời khách hàng',
      'Đọc được mô hình kiến trúc SaaS cơ bản',
      'Nhận diện các chỉ số vận hành quan trọng',
      'Lập outline MVP cho một sản phẩm SaaS',
      'Có tư duy sản phẩm khi xây phần mềm dịch vụ',
    ],
    chapters: [
      {
        title: 'Tư duy SaaS',
        lessons: [
          { title: 'SaaS là gì và bán giá trị như thế nào?', duration: '09:40' },
          { title: 'MVP, onboarding và activation', duration: '12:20' },
          { title: 'Workspace, role và quyền truy cập', duration: '13:05' },
        ],
      },
      {
        title: 'Kiến trúc và vận hành',
        lessons: [
          { title: 'Multi-tenant và dữ liệu khách hàng', duration: '14:45' },
          { title: 'Subscription, billing và plan limit', duration: '13:55' },
          { title: 'Metric: MRR, churn và retention', duration: '12:30' },
        ],
      },
      {
        title: 'Thiết kế MVP SaaS',
        lessons: [
          { title: 'Chọn bài toán và phân khúc khách hàng', duration: '11:50' },
          { title: 'Phác thảo luồng sản phẩm cốt lõi', duration: '15:15' },
          { title: 'Hoàn thiện bản đề xuất SaaS cuối khóa', duration: '14:10' },
        ],
      },
    ],
    duration: '01 giờ 57 phút',
  },
}

const fallbackCourseDetailContent: CourseDetailContent = {
  outcomes: [
    'Nắm được kiến thức nền tảng của chủ đề khóa học',
    'Biết cách áp dụng kiến thức vào bài tập thực hành',
    'Hiểu quy trình làm việc trong một dự án thực tế',
    'Tự xây dựng sản phẩm hoặc bài demo cuối khóa',
    'Biết cách kiểm tra, sửa lỗi và cải thiện kết quả',
    'Có lộ trình rõ ràng để học tiếp các chủ đề nâng cao',
  ],
  chapters: [
    {
      title: 'Nhập môn',
      lessons: [
        { title: 'Tổng quan khóa học và mục tiêu đầu ra', duration: '08:00' },
        { title: 'Thiết lập môi trường học tập', duration: '10:00' },
      ],
    },
    {
      title: 'Thực hành cốt lõi',
      lessons: [
        { title: 'Kiến thức nền tảng cần nắm', duration: '15:00' },
        { title: 'Bài tập ứng dụng thực tế', duration: '18:00' },
      ],
    },
    {
      title: 'Dự án cuối khóa',
      lessons: [
        { title: 'Xây dựng sản phẩm demo', duration: '20:00' },
        { title: 'Review và hoàn thiện sản phẩm', duration: '14:00' },
      ],
    },
  ],
  duration: '01 giờ 25 phút',
}

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const course = await contentService.getCourseBySlug(slug)

  if (!course) {
    return { title: 'Không tìm thấy khóa học' }
  }

  return {
    title: `${course.title} | Edu Hub`,
    description: course.description,
  }
}

export const dynamic = 'force-dynamic'

const CourseDetailPage = async ({ params }: Props) => {
  const { slug } = await params
  const course = await contentService.getCourseBySlug(slug)

  if (!course) {
    notFound()
  }

  const session = await getAuthSession()
  let isEnrolled = false
  if (session?.user) {
    isEnrolled = await enrollmentService.checkEnrollment(session.user.id, course.id)
  }

  const lessons = await contentService.getLessonsByCourse(course.id)
  const configuredContent = courseDetailContent[course.slug] ?? fallbackCourseDetailContent
  const courseChapters =
    lessons.length > 0
      ? [
          {
            title: 'Nội dung bài học',
            lessons: lessons.map((lesson, index) => ({
              title: lesson.title,
              duration: `Bài ${index + 1}`,
            })),
          },
        ]
      : configuredContent.chapters
  const lessonCount = courseChapters.reduce((total, chapter) => total + chapter.lessons.length, 0)
  
  const allCourses = await contentService.getPublishedCourses()
  const realRelatedCourses = allCourses.filter(c => c.id !== course.id).slice(0, 4)

  return (
    <>
      <section className='pt-24 pb-12 bg-cream dark:bg-slate-900'>
        <div className='container mx-auto max-w-7xl px-4'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
            <div>
              <span className='mb-4 inline-block rounded-full bg-primary/10 px-4 py-2 font-semibold text-primary dark:bg-primary/20'>
                {course.category}
              </span>
              <h1 className='mb-6 text-4xl font-bold leading-tight text-slate-900 dark:text-white sm:text-5xl'>
                {course.title}
              </h1>
              <p className='mb-8 text-lg text-slate-600 dark:text-slate-300'>
                {course.description}
              </p>
              
              <div className='flex flex-wrap gap-6 mb-8'>
                <div className='flex items-center gap-2 text-slate-700 dark:text-slate-300'>
                  <Icon icon='solar:clock-circle-line-duotone' className='text-2xl text-primary' />
                  <span className='font-medium'>{course.duration}</span>
                </div>
                <div className='flex items-center gap-2 text-slate-700 dark:text-slate-300'>
                  <Icon icon='solar:chart-line-duotone' className='text-2xl text-primary' />
                  <span className='font-medium'>{course.level}</span>
                </div>
                <div className='flex items-center gap-2 text-slate-700 dark:text-slate-300'>
                  <Icon icon='solar:card-line-duotone' className='text-2xl text-primary' />
                  <span className='font-medium text-success'>{new Intl.NumberFormat('vi-VN').format(course.price)} đ</span>
                </div>
              </div>

              {isEnrolled ? (
                <Link
                  href={`/courses/${course.slug}/lessons`}
                  className='inline-block rounded-lg bg-success px-8 py-4 text-center font-bold text-white transition hover:bg-opacity-90'>
                  Tiếp tục học
                </Link>
              ) : (
                <EnrollButton courseSlug={course.slug} isLoggedIn={!!session?.user} />
              )}
            </div>
            
            <div className='relative h-[400px] w-full overflow-hidden rounded-2xl shadow-xl'>
              <Image
                src={withBasePath(course.image)}
                alt={course.title}
                fill
                className='object-cover'
                priority
              />
            </div>
          </div>
        </div>
      </section>

      <section className='py-16'>
        <div className='container mx-auto max-w-5xl px-4'>
          
          {/* Bạn sẽ học được gì */}
          <div className='mb-16'>
            <h2 className='mb-6 text-2xl font-bold text-slate-900 dark:text-white'>Bạn sẽ học được gì?</h2>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8'>
              {configuredContent.outcomes.map((item, index) => (
                <div key={index} className='flex items-start gap-3'>
                  <Icon icon='solar:check-read-bold' className='text-success text-xl mt-0.5 shrink-0' />
                  <span className='text-slate-700 dark:text-slate-300'>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Nội dung khóa học */}
          <div className='mb-16'>
            <div className='flex flex-wrap items-end justify-between gap-4 mb-6'>
              <div>
                <h2 className='text-2xl font-bold text-slate-900 dark:text-white'>Nội dung khóa học</h2>
                <p className='text-sm text-slate-500 mt-2 font-medium'>
                  <span className='font-semibold'>{courseChapters.length}</span> chương • <span className='font-semibold'>{lessonCount}</span> bài học • <span className='font-semibold'>{configuredContent.duration}</span>
                </p>
              </div>
              <button className='text-primary font-medium text-sm hover:underline'>Mở rộng tất cả</button>
            </div>
            
            <div className='flex flex-col gap-3'>
              {courseChapters.map((chapter, i) => (
                <details key={i} className='group overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-white/10 dark:bg-slate-900'>
                  <summary className='flex cursor-pointer items-center justify-between bg-slate-50/50 p-4 font-semibold text-slate-900 transition-colors hover:bg-slate-100 dark:bg-slate-800/30 dark:text-white dark:hover:bg-slate-800/80 list-none [&::-webkit-details-marker]:hidden'>
                    <div className='flex items-center gap-3'>
                      <Icon icon='solar:add-square-bold-duotone' className='text-2xl text-primary group-open:hidden' />
                      <Icon icon='solar:minus-square-bold-duotone' className='text-2xl text-primary hidden group-open:block' />
                      <span className='text-lg'>{i + 1}. {chapter.title}</span>
                    </div>
                    <span className='text-sm font-normal text-slate-500'>{chapter.lessons.length} bài học</span>
                  </summary>
                  <div className='divide-y divide-slate-100 bg-white dark:divide-white/5 dark:bg-slate-900'>
                    {chapter.lessons.map((lesson, j) => (
                      <div key={j} className='flex items-center justify-between p-4 pl-12 transition hover:bg-slate-50 dark:hover:bg-slate-800/50'>
                        <div className='flex items-center gap-3'>
                          <Icon icon='solar:play-circle-bold-duotone' className='text-xl text-primary/70' />
                          <span className='text-slate-700 dark:text-slate-300'>{i + 1}.{j + 1} {lesson.title}</span>
                        </div>
                        <span className='text-sm font-medium text-slate-500'>{lesson.duration}</span>
                      </div>
                    ))}
                  </div>
                </details>
              ))}
            </div>
          </div>

          {/* Khóa học liên quan */}
          <div className='pt-12 border-t border-slate-200 dark:border-white/10'>
            <h2 className='mb-8 text-2xl font-bold text-slate-900 dark:text-white'>Khóa học liên quan</h2>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
              {realRelatedCourses.map((rc) => (
                <Link key={rc.id} href={`/courses/${rc.slug}`} className='group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg dark:border-white/10 dark:bg-slate-900'>
                  <div className='relative h-[160px] w-full overflow-hidden border-b border-slate-100 dark:border-white/5'>
                    <Image
                      src={withBasePath(rc.image)}
                      alt={rc.title}
                      fill
                      className='object-cover transition-transform duration-500 group-hover:scale-105'
                    />
                  </div>
                  <div className='grid flex-1 grid-rows-[2.75rem_3.5rem_auto] gap-4 p-5'>
                    <div className='flex items-start justify-between gap-2 overflow-hidden'>
                      <p className='text-sm text-slate-600 dark:text-slate-400 font-medium truncate flex-1'>
                        {rc.category}
                      </p>
                      <div className='shrink-0 rounded-md border border-[#65a30d] px-2 py-1 text-xs font-bold text-[#65a30d] dark:border-[#84cc16] dark:text-[#84cc16] bg-[#65a30d]/5 dark:bg-[#84cc16]/10 leading-5'>
                        {rc.price > 0 ? `${new Intl.NumberFormat('vi-VN').format(rc.price)} đ` : 'Miễn phí'}
                      </div>
                    </div>
                    <h4 className='line-clamp-2 min-h-[3.5rem] font-bold leading-7 text-slate-900 transition group-hover:text-primary dark:text-white'>
                      {rc.title}
                    </h4>

                    <div className='mt-auto flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-600 dark:border-white/10 dark:bg-slate-800/50 dark:text-slate-400'>
                      <span className='font-medium'>{rc.duration || '12 buổi học'}</span>
                      <div className='flex items-center gap-3'>
                        <div className='flex items-center gap-1'>
                          <Icon icon='solar:user-circle-bold' className='text-[#f59e0b] text-base' />
                          <span className='font-medium'>120</span>
                        </div>
                        <div className='flex items-center gap-1'>
                          <Icon icon='solar:star-bold' className='text-[#f59e0b] text-base' />
                          <span className='font-medium'>4.5</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

        </div>
      </section>
    </>
  )
}

export default CourseDetailPage
