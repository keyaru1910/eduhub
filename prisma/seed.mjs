import { PrismaClient, UserRole } from '@prisma/client'
import { scryptSync, randomBytes } from 'node:crypto'
import data from '../public/data/data.json' with { type: 'json' }

const prisma = new PrismaClient()

const hashPassword = (password) => {
  const salt = randomBytes(16).toString('hex')
  const derived = scryptSync(password, salt, 64).toString('hex')
  return `${salt}:${derived}`
}

const mentors = [
  {
    slug: 'lee-sang-hyeok',
    name: 'Lee Sang-hyeok',
    title: 'Senior UX Designer',
    image: '/images/mentor/boy1.jpg',
    shortBio:
      'Chuyên xây dựng trải nghiệm sản phẩm số rõ ràng, dễ dùng và có khả năng mở rộng.',
    bio: 'Lee Sang-hyeok đã dẫn dắt nhiều dự án thiết kế sản phẩm cho startup và doanh nghiệp công nghệ, tập trung vào research, information architecture và tối ưu hành vi người dùng. Anh đồng hành cùng học viên trong việc xây dựng tư duy UX thực chiến thay vì chỉ dừng ở công cụ.',
    experience: [
      '8 năm thiết kế UX cho sản phẩm SaaS và nền tảng giáo dục.',
      'Dẫn dắt workshop về user journey, wireframe và usability testing.',
      'Mentor portfolio cho học viên chuyển ngành sang Product Design.',
    ],
    expertise: ['UX Research', 'Wireframing', 'Design Systems', 'Usability Testing'],
    yearsOfExperience: 8,
  },
  {
    slug: 'joo-ho-jin',
    name: 'Joo Ho-Jin',
    title: 'Giảng viên Photoshop',
    image: '/images/mentor/boy2.jpg',
    shortBio:
      'Huấn luyện nền tảng thiết kế thị giác và xử lý hình ảnh cho người mới lẫn designer đang đi làm.',
    bio: 'Joo Ho-Jin chuyên đào tạo Photoshop theo hướng ứng dụng vào công việc thực tế: chỉnh sửa hình ảnh, dựng key visual và tối ưu asset cho marketing. Anh tập trung giúp học viên hiểu nguyên lý thị giác để làm chủ công cụ nhanh hơn.',
    experience: [
      '7 năm giảng dạy Photoshop và thiết kế ấn phẩm số.',
      'Thực hiện nhiều dự án branding, social media và quảng cáo trực tuyến.',
      'Xây dựng giáo trình từ cơ bản đến nâng cao cho học viên trái ngành.',
    ],
    expertise: ['Photoshop', 'Visual Design', 'Image Retouching', 'Brand Assets'],
    yearsOfExperience: 7,
  },
  {
    slug: 'mr-cris',
    name: 'Mr. Cris',
    title: 'Chuyên gia SEO',
    image: '/images/mentor/boy3.jpg',
    shortBio:
      'Tập trung vào SEO content, technical SEO và xây chiến lược tăng trưởng bền vững.',
    bio: 'Mr. Cris hỗ trợ học viên hiểu cách một chiến lược SEO vận hành từ nghiên cứu từ khóa, tối ưu on-page đến phân tích hiệu quả bằng dữ liệu. Phong cách hướng dẫn của anh thiên về thực thi, bám sát mục tiêu traffic và chuyển đổi.',
    experience: [
      '9 năm triển khai SEO cho blog, website dịch vụ và ecommerce.',
      'Tư vấn chiến lược content cluster và tối ưu cấu trúc website.',
      'Hướng dẫn học viên đọc Search Console và đo lường hiệu quả SEO.',
    ],
    expertise: ['Technical SEO', 'Keyword Research', 'Content Strategy', 'Analytics'],
    yearsOfExperience: 9,
  },
  {
    slug: 'luka-doncic',
    name: 'Luka Doncic',
    title: 'UI/UX Designer',
    image: '/images/mentor/boy4.jpg',
    shortBio:
      'Thiết kế giao diện hiện đại, ưu tiên tính rõ ràng, tốc độ triển khai và khả năng handoff.',
    bio: 'Luka Doncic có kinh nghiệm làm việc giữa design và development nên đặc biệt chú trọng khả năng triển khai thực tế của UI. Anh hướng dẫn học viên cách cân bằng giữa thẩm mỹ, tính nhất quán và giới hạn kỹ thuật của sản phẩm.',
    experience: [
      '6 năm thiết kế UI cho web app, dashboard và mobile app.',
      'Phối hợp chặt với developer để chuẩn hóa component và handoff.',
      'Mentor các bài toán cải thiện luồng sử dụng và trực quan dữ liệu.',
    ],
    expertise: ['UI Design', 'Figma', 'Design Handoff', 'Product Thinking'],
    yearsOfExperience: 6,
  },
  {
    slug: 'cha-mu-hee',
    name: 'Cha Mu Hee',
    title: 'Web Development',
    image: '/images/mentor/girl2.jpg',
    shortBio:
      'Kết hợp tư duy thiết kế và lập trình để giúp học viên xây sản phẩm web hoàn chỉnh.',
    bio: 'Cha Mu Hee đồng hành với học viên ở cả hai hướng thiết kế web và phát triển frontend. Cách dạy của cô ưu tiên sản phẩm hoàn chỉnh: bố cục tốt, responsive ổn định và code dễ mở rộng khi dự án tăng độ phức tạp.',
    experience: [
      '8 năm làm việc trong các dự án thiết kế và phát triển website.',
      'Hướng dẫn học viên xây landing page, portfolio và website doanh nghiệp.',
      'Có kinh nghiệm review UI, HTML/CSS và quy trình triển khai frontend.',
    ],
    expertise: ['Responsive Design', 'Frontend Basics', 'Landing Pages', 'Web Planning'],
    yearsOfExperience: 8,
  },
  {
    slug: 'hong-hae-in',
    name: 'Hong Hae In',
    title: 'Adobe Certified Instructor',
    image: '/images/mentor/girl1.jpg',
    shortBio:
      'Đào tạo công cụ Adobe theo hướng bài bản, dễ áp dụng vào thiết kế học tập và công việc.',
    bio: 'Hong Hae In là mentor tập trung vào hệ sinh thái Adobe và quy trình học có cấu trúc. Cô giúp học viên xây nền tảng vững từ công cụ, bố cục đến cách hoàn thiện sản phẩm cuối cùng phục vụ công việc chuyên môn.',
    experience: [
      'Hơn 10 năm giảng dạy và huấn luyện công cụ Adobe.',
      'Thiết kế lộ trình học riêng cho người mới bắt đầu và người nâng cao.',
      'Đồng hành cùng học viên trong các dự án portfolio và bài tập thực tế.',
    ],
    expertise: ['Adobe Suite', 'Creative Workflow', 'Portfolio Review', 'Visual Composition'],
    yearsOfExperience: 10,
  },
  {
    slug: 'mr-karim',
    name: 'Mr Karim',
    title: 'Creative Art Director',
    image: '/images/mentor/boy7.jpg',
    shortBio:
      'Định hướng phong cách nghệ thuật độc đáo, kết hợp xu hướng hiện đại và bản sắc thương hiệu.',
    bio: 'Mr Karim tập trung dẫn dắt tư duy art direction theo hướng vừa có tính thẩm mỹ mạnh, vừa giữ được DNA thương hiệu trong từng sản phẩm sáng tạo. Anh đồng hành cùng học viên trong việc xây concept, hệ thống hình ảnh và ngôn ngữ thị giác phù hợp với từng bối cảnh truyền thông.',
    experience: [
      'Hơn 5 năm định hướng phong cách nghệ thuật cho nhiều dự án truyền thông và thương hiệu.',
      'Xây dựng concept hình ảnh kết hợp xu hướng hiện đại với bản sắc thương hiệu riêng.',
      'Mentor học viên về art direction, typography và cách phát triển visual nhất quán.',
    ],
    expertise: ['Art Direction', 'Illustration', 'Typography', 'Branding'],
    yearsOfExperience: 5,
  },
  {
    slug: 'mr-leo',
    name: 'Mr Leo',
    title: 'Mobile App Developer',
    image: '/images/mentor/boy6.jpg',
    shortBio:
      'Tập trung vào phát triển ứng dụng di động đa nền tảng với trải nghiệm người dùng tối ưu.',
    bio: 'Mr Leo chuyên xây dựng ứng dụng mobile đa nền tảng với ưu tiên cao cho hiệu năng, khả năng mở rộng và trải nghiệm người dùng liền mạch. Anh hướng dẫn học viên cách tổ chức kiến trúc ứng dụng, kết nối backend và tối ưu quy trình phát triển từ prototype tới production.',
    experience: [
      'Hơn 6 năm phát triển ứng dụng di động bằng Flutter và React Native.',
      'Thiết kế kiến trúc mobile app có khả năng mở rộng và dễ bảo trì.',
      'Triển khai các tính năng realtime, authentication và tích hợp Firebase cho sản phẩm thực tế.',
    ],
    expertise: ['Flutter', 'Firebase', 'Dart', 'Mobile Architecture'],
    yearsOfExperience: 6,
  },
  {
    slug: 'kanna-seto',
    name: 'Kanna Seto',
    title: 'Digital Marketing Specialist',
    image: '/images/mentor/girl3.jpg',
    shortBio:
      'Chuyên gia lên chiến dịch quảng cáo đa kênh và tối ưu chuyển đổi cho doanh nghiệp e-commerce.',
    bio: 'Kanna Seto tập trung vào việc lập kế hoạch và vận hành các chiến dịch digital marketing đa kênh cho doanh nghiệp thương mại điện tử. Cô hỗ trợ học viên hiểu cách theo dõi dữ liệu, tối ưu chi phí quảng cáo và cải thiện tỉ lệ chuyển đổi dựa trên hành vi người dùng.',
    experience: [
      'Hơn 7 năm triển khai quảng cáo đa kênh cho doanh nghiệp e-commerce.',
      'Xây dựng chiến lược marketing kết hợp Facebook Ads, Google Ads và data tracking.',
      'Tư vấn tối ưu funnel chuyển đổi và đo lường hiệu quả chiến dịch bằng dữ liệu.',
    ],
    expertise: ['Facebook Ads', 'Google Ads', 'Data Tracking', 'Marketing Strategy'],
    yearsOfExperience: 7,
  },
  {
    slug: 'chef-curry',
    name: 'Chef Curry',
    title: 'Back-end Architect',
    image: '/images/mentor/boy5.jpg',
    shortBio:
      'Xây dựng hệ thống server vững chắc, quản trị cơ sở dữ liệu lớn và đảm bảo tính bảo mật cao.',
    bio: 'Chef Curry đồng hành cùng học viên ở các bài toán backend từ thiết kế API, tổ chức business logic đến tối ưu hệ thống cơ sở dữ liệu ở quy mô lớn. Cách hướng dẫn của anh ưu tiên tư duy hệ thống, khả năng mở rộng và những quyết định kiến trúc có thể vận hành ổn định trong thực tế.',
    experience: [
      'Hơn 10 năm xây dựng hệ thống backend cho ứng dụng có lượng dữ liệu lớn.',
      'Thiết kế kiến trúc server bảo mật, ổn định và dễ mở rộng theo tăng trưởng sản phẩm.',
      'Mentor về Node.js, Python, PostgreSQL và system design cho dự án thực chiến.',
    ],
    expertise: ['Node.js', 'Python', 'PostgreSQL', 'System Design'],
    yearsOfExperience: 10,
  },
]

const levelByCategory = {
  webdevelopment: 'Intermediate',
  mobiledevelopment: 'Intermediate',
  datascience: 'Advanced',
  cloudcomputing: 'Intermediate',
}

const main = async () => {
  const adminPassword = process.env.SEED_ADMIN_PASSWORD || 'Admin@123456'

  await prisma.contactSubmission.deleteMany()
  await prisma.passwordResetToken.deleteMany()
  await prisma.testimonial.deleteMany()
  await prisma.mentor.deleteMany()
  await prisma.course.deleteMany()
  await prisma.user.deleteMany()

  await prisma.user.create({
    data: {
      name: 'Edu Hub Admin',
      email: process.env.SEED_ADMIN_EMAIL || 'admin@eduhub.local',
      passwordHash: hashPassword(adminPassword),
      role: UserRole.ADMIN,
    },
  })

  await prisma.course.createMany({
    data: data.CourseDetailData.map((course) => ({
      title: course.course,
      slug: course.course.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      description: course.profession,
      image: course.imageSrc,
      price: Number(course.price),
      level: levelByCategory[course.category] || 'Beginner',
      duration: '12 buổi học',
      category: course.category,
      published: true,
    })),
  })

  await prisma.mentor.createMany({
    data: mentors.map((mentor) => ({
      name: mentor.name,
      slug: mentor.slug,
      title: mentor.title,
      bio: mentor.bio,
      shortBio: mentor.shortBio,
      image: mentor.image,
      expertise: mentor.expertise,
      experience: mentor.experience,
      yearsOfExperience: mentor.yearsOfExperience,
      published: true,
    })),
  })

  await prisma.testimonial.createMany({
    data: data.TestimonialData.map((item) => ({
      name: item.name,
      role: item.profession,
      avatar: item.imgSrc,
      content: item.detail,
      rating: 5,
      published: true,
    })),
  })

  console.log('Seed completed')
  console.log(`Admin: ${process.env.SEED_ADMIN_EMAIL || 'admin@eduhub.local'}`)
  console.log(`Password: ${adminPassword}`)
}

main()
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
