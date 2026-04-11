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
      'Chuyen xay dung trai nghiem san pham so ro rang, de dung va co kha nang mo rong.',
    bio: 'Lee Sang-hyeok da dan dat nhieu du an thiet ke san pham cho startup va doanh nghiep cong nghe, tap trung vao research, information architecture va toi uu hanh vi nguoi dung. Anh dong hanh cung hoc vien trong viec xay dung tu duy UX thuc chien thay vi chi dung o cong cu.',
    experience: [
      '8 nam thiet ke UX cho san pham SaaS va nen tang giao duc.',
      'Dan dat workshop ve user journey, wireframe va usability testing.',
      'Mentor portfolio cho hoc vien chuyen nganh sang Product Design.',
    ],
    expertise: ['UX Research', 'Wireframing', 'Design Systems', 'Usability Testing'],
    yearsOfExperience: 8,
  },
  {
    slug: 'joo-ho-jin',
    name: 'Joo Ho-Jin',
    title: 'Giang vien Photoshop',
    image: '/images/mentor/boy2.jpg',
    shortBio:
      'Huan luyen nen tang thiet ke thi giac va xu ly hinh anh cho nguoi moi lan designer dang di lam.',
    bio: 'Joo Ho-Jin chuyen dao tao Photoshop theo huong ung dung vao cong viec thuc te: chinh sua hinh anh, dung key visual va toi uu asset cho marketing. Anh tap trung giup hoc vien hieu nguyen ly thi giac de lam chu cong cu nhanh hon.',
    experience: [
      '7 nam giang day Photoshop va thiet ke an pham so.',
      'Thuc hien nhieu du an branding, social media va quang cao truc tuyen.',
      'Xay dung giao trinh tu co ban den nang cao cho hoc vien trai nganh.',
    ],
    expertise: ['Photoshop', 'Visual Design', 'Image Retouching', 'Brand Assets'],
    yearsOfExperience: 7,
  },
  {
    slug: 'mr-cris',
    name: 'Mr. Cris',
    title: 'Chuyen gia SEO',
    image: '/images/mentor/boy3.jpg',
    shortBio:
      'Tap trung vao SEO content, technical SEO va xay chien luoc tang truong ben vung.',
    bio: 'Mr. Cris ho tro hoc vien hieu cach mot chien luoc SEO van hanh tu nghien cuu tu khoa, toi uu on-page den phan tich hieu qua bang du lieu. Phong cach huong dan cua anh thien ve thuc thi, bam sat muc tieu traffic va chuyen doi.',
    experience: [
      '9 nam trien khai SEO cho blog, website dich vu va ecommerce.',
      'Tu van chien luoc content cluster va toi uu cau truc website.',
      'Huong dan hoc vien doc Search Console va do luong hieu qua SEO.',
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
      'Thiet ke giao dien hien dai, uu tien tinh ro rang, toc do trien khai va kha nang handoff.',
    bio: 'Luka Doncic co kinh nghiem lam viec giua design va development nen dac biet chu trong kha nang trien khai thuc te cua UI. Anh huong dan hoc vien cach can bang giua tham my, tinh nhat quan va gioi han ky thuat cua san pham.',
    experience: [
      '6 nam thiet ke UI cho web app, dashboard va mobile app.',
      'Phoi hop chat voi developer de chuan hoa component va handoff.',
      'Mentor cac bai toan cai thien luong su dung va truc quan du lieu.',
    ],
    expertise: ['UI Design', 'Figma', 'Design Handoff', 'Product Thinking'],
    yearsOfExperience: 6,
  },
  {
    slug: 'cha-mu-hee',
    name: 'Cha Mu Hee',
    title: 'Web Development / Web Design',
    image: '/images/mentor/girl2.jpg',
    shortBio:
      'Ket hop tu duy thiet ke va lap trinh de giup hoc vien xay san pham web hoan chinh.',
    bio: 'Cha Mu Hee dong hanh voi hoc vien o ca hai huong thiet ke web va phat trien frontend. Cach day cua co uu tien san pham hoan chinh: bo cuc tot, responsive on dinh va code de mo rong khi du an tang do phuc tap.',
    experience: [
      '8 nam lam viec trong cac du an thiet ke va phat trien website.',
      'Huong dan hoc vien xay landing page, portfolio va website doanh nghiep.',
      'Co kinh nghiem review UI, HTML/CSS va quy trinh trien khai frontend.',
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
      'Dao tao cong cu Adobe theo huong bai ban, de ap dung vao thiet ke hoc tap va cong viec.',
    bio: 'Hong Hae In la mentor tap trung vao he sinh thai Adobe va quy trinh hoc co cau truc. Co giup hoc vien xay nen tang vung tu cong cu, bo cuc den cach hoan thien san pham cuoi cung phuc vu cong viec chuyen mon.',
    experience: [
      'Hon 10 nam giang day va huan luyen cong cu Adobe.',
      'Thiet ke lo trinh hoc rieng cho nguoi moi bat dau va nguoi nang cao.',
      'Dong hanh cung hoc vien trong cac du an portfolio va bai tap thuc te.',
    ],
    expertise: ['Adobe Suite', 'Creative Workflow', 'Portfolio Review', 'Visual Composition'],
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
      duration: '12 buoi hoc',
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
