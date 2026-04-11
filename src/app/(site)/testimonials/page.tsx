import { Metadata } from "next";
import Link from "next/link";
import Breadcrumb from "@/app/components/Common/Breadcrumb";
import Testimonial from "@/app/components/Home/Testimonial";
import { getPublishedTestimonials } from "@/server/content/service";

export const metadata: Metadata = {
  title: "Cảm nhận học viên | Edu Hub",
  description:
    "Những chia sẻ từ học viên sau khi tham gia các khóa học và chương trình mentor.",
};

export const dynamic = 'force-dynamic';

const TestimonialsPage = async () => {
  const testimonials = await getPublishedTestimonials();

  return (
    <>
      <Breadcrumb
        pageName="Cảm nhận"
        pageDescription="Xem đánh giá và trải nghiệm thực tế từ học viên đã tham gia chương trình."
      />
      <section className="pb-4">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="rounded-[28px] bg-primary p-8 text-white">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/70">
                Trust signals
              </p>
              <h2 className="mt-3 text-4xl font-bold tracking-tight text-white">
                Phản hồi thực tế giúp trang web đáng tin cậy hơn
              </h2>
              <p className="mt-4 text-base leading-7 text-white/80">
                Khi tách thành trang riêng, mục Cảm nhận có thể trở thành điểm
                hỗ trợ ra quyết định cho người dùng trước khi họ đăng ký hoặc
                liên hệ.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-primary/10 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-slate-900 dark:shadow-black/20">
                <p className="text-lg font-semibold text-black dark:text-white">
                  Học viên mới
                </p>
                <p className="mt-2 text-sm leading-6 text-black/70 dark:text-slate-300">
                  Đọc trải nghiệm để biết khóa học và mentor phù hợp với mục
                  tiêu nào.
                </p>
              </div>
              <div className="rounded-2xl border border-primary/10 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-slate-900 dark:shadow-black/20">
                <p className="text-lg font-semibold text-black dark:text-white">
                  CTA tiep theo
                </p>
                <p className="mt-2 text-sm leading-6 text-black/70 dark:text-slate-300">
                  Sau khi đọc đánh giá, người dùng nên có đường đi tiếp sang
                  khóa học hoặc đăng ký.
                </p>
              </div>
              <Link
                href="/courses"
                className="rounded-2xl border border-primary p-6 font-semibold text-primary transition duration-300 hover:bg-primary hover:text-white"
              >
                Đi tới trang khóa học
              </Link>
              <Link
                href="/register"
                className="rounded-2xl border border-primary bg-primary p-6 font-semibold text-white transition duration-300 hover:bg-transparent hover:text-primary"
              >
                Đi tới trang đăng ký
              </Link>
            </div>
          </div>
        </div>
      </section>
      <Testimonial
        items={testimonials.map((testimonial) => ({
          profession: testimonial.role,
          name: testimonial.name,
          imgSrc: testimonial.avatar,
          starimg: "/images/testimonial/stars.png",
          detail: testimonial.content,
        }))}
      />
    </>
  );
};

export default TestimonialsPage;
