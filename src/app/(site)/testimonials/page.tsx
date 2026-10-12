import { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@iconify/react";
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
        badge="Cộng đồng học viên"
        badgeIcon="solar:chat-square-like-bold-duotone"
        pageName="Cảm nhận"
        pageDescription="Lắng nghe chia sẻ chân thực từ các học viên đã học tập và phát triển sự nghiệp cùng Edu Hub."
      />
      <section className="pt-2 pb-6">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
            {/* Khối Trust Signals nổi bật */}
            <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-primary via-[#b96937] to-[#8d471b] p-8 text-white shadow-md">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full bg-white/10 blur-2xl"
              />

              <div className="relative z-10">
                <div className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white backdrop-blur-md">
                  <Icon icon="solar:star-bold" className="text-sm text-amber-300" />
                  <span>Trải nghiệm thực tế của học viên</span>
                </div>

                <h2 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
                  Bước đệm vững chắc cho hành trình bứt phá sự nghiệp
                </h2>

                <p className="mt-3.5 max-w-2xl text-base leading-relaxed text-white/90">
                  Hơn 94% học viên Edu Hub đã hoàn thành mục tiêu chuyển ngành, thăng tiến và tự tin làm việc tại các doanh nghiệp công nghệ hàng đầu.
                </p>

                {/* Các con số biết nói */}
                <div className="mt-6 grid grid-cols-3 gap-3 border-t border-white/20 pt-5">
                  <div>
                    <div className="flex items-center gap-1 text-amber-300">
                      <Icon icon="solar:star-bold" className="text-base" />
                      <span className="text-2xl font-extrabold text-white">4.9/5</span>
                    </div>
                    <p className="mt-1 text-xs text-white/80">Từ 500+ đánh giá</p>
                  </div>
                  <div>
                    <span className="text-2xl font-extrabold text-white">94%</span>
                    <p className="mt-1 text-xs text-white/80">Đạt mục tiêu học</p>
                  </div>
                  <div>
                    <span className="text-2xl font-extrabold text-white">100%</span>
                    <p className="mt-1 text-xs text-white/80">Có đồ án thực tế</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Cột thẻ giá trị & nút điều hướng */}
            <div className="flex flex-col justify-between gap-4">
              <div className="grid gap-3.5 sm:grid-cols-2">
                <div className="rounded-2xl border border-primary/15 bg-white p-5 shadow-xs dark:border-white/10 dark:bg-slate-900">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary dark:bg-primary/20">
                    <Icon icon="solar:chat-round-check-bold-duotone" className="text-2xl" />
                  </div>
                  <h3 className="mt-3 text-base font-bold text-slate-900 dark:text-white">
                    Đánh giá khách quan
                  </h3>
                  <p className="mt-1 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                    Cảm nhận thực từ sinh viên, người đi làm và chuyển ngành qua từng khóa học.
                  </p>
                </div>

                <div className="rounded-2xl border border-primary/15 bg-white p-5 shadow-xs dark:border-white/10 dark:bg-slate-900">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary dark:bg-primary/20">
                    <Icon icon="solar:routing-2-bold-duotone" className="text-2xl" />
                  </div>
                  <h3 className="mt-3 text-base font-bold text-slate-900 dark:text-white">
                    Hiệu quả ứng dụng
                  </h3>
                  <p className="mt-1 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                    Nắm chắc kỹ năng, sẵn sàng ứng tuyển vào các công ty công nghệ thực tế.
                  </p>
                </div>
              </div>

              {/* 2 nút hành động CTA */}
              <div className="grid gap-3 sm:grid-cols-2">
                <Link
                  href="/courses"
                  className="flex items-center justify-center gap-2 rounded-xl border border-primary/30 bg-white/70 p-4 text-sm font-semibold text-primary transition duration-300 hover:border-primary hover:bg-primary hover:text-white dark:bg-slate-800 dark:text-white dark:hover:bg-primary"
                >
                  <Icon icon="solar:book-bookmark-line-duotone" className="text-lg" />
                  <span>Khám phá khóa học</span>
                </Link>

                <Link
                  href="/contact"
                  className="flex items-center justify-center gap-2 rounded-xl border border-primary bg-primary p-4 text-sm font-semibold text-white shadow-md shadow-primary/20 transition duration-300 hover:bg-transparent hover:text-primary dark:hover:bg-primary/10"
                >
                  <span>Gửi yêu cầu tư vấn</span>
                  <Icon icon="solar:arrow-right-line-duotone" className="text-lg" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      {testimonials.length === 0 ? (
        <section className="pb-20">
          <div className="container mx-auto max-w-7xl px-4">
            <div className="rounded-[28px] border border-dashed border-primary/25 bg-primary/5 p-8">
              <h3 className="text-3xl font-bold tracking-tight text-slate-950">
                Chưa có cảm nhận nào để hiển thị
              </h3>
              <p className="mt-4 max-w-2xl text-base leading-7 text-black/70">
                Hãy bổ sung ít nhất một vài phản hồi trong admin để tăng độ tin
                cậy cho bản demo và giúp người xem có thêm căn cứ ra quyết định.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/admin/testimonials"
                  className="rounded-lg border border-primary bg-primary px-5 py-3 font-medium text-white transition duration-300 hover:bg-transparent hover:text-primary"
                >
                  Cập nhật cảm nhận trong admin
                </Link>
                <Link
                  href="/contact"
                  className="rounded-lg border border-primary px-5 py-3 font-medium text-primary transition duration-300 hover:bg-primary hover:text-white"
                >
                  Đi tới trang liên hệ
                </Link>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <Testimonial
          items={testimonials.map((testimonial) => ({
            profession: testimonial.role,
            name: testimonial.name,
            imgSrc: testimonial.avatar,
            starimg: "/images/testimonial/stars.png",
            detail: testimonial.content,
          }))}
        />
      )}
    </>
  );
};

export default TestimonialsPage;
