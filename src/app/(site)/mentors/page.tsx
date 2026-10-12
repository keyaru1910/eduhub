import Image from "next/image";
import { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@iconify/react";
import Breadcrumb from "@/app/components/Common/Breadcrumb";
import { getPublishedMentors } from "@/server/content/service";
import withBasePath from "@/utils/basePath";

export const metadata: Metadata = {
  title: "Mentor | Edu Hub",
  description:
    "Xem danh sách mentor đang đồng hành cùng học viên trên Edu Hub.",
};

export const dynamic = 'force-dynamic';

const MentorsPage = async () => {
  const mentors = await getPublishedMentors();
  const featuredMentors = mentors.filter((m) => Boolean(m.image)).slice(0, 4);

  return (
    <>
      <Breadcrumb
        badge="Đội ngũ cố vấn"
        badgeIcon="solar:diploma-verified-bold-duotone"
        pageName="Mentor"
        pageDescription="Kết nối với đội ngũ chuyên gia giàu kinh nghiệm thực chiến từ các công ty công nghệ hàng đầu."
      />
      <section className="pt-2 pb-6">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="grid gap-6 lg:grid-cols-[1.3fr_0.9fr]">
            {/* Khối giới thiệu chính */}
            <div className="relative overflow-hidden rounded-[28px] border border-primary/20 bg-gradient-to-br from-cream/90 via-cream/60 to-orange/20 p-8 shadow-sm dark:border-white/10 dark:from-slate-900 dark:via-slate-900/90 dark:to-primary/10">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-primary/10 blur-2xl dark:bg-primary/20"
              />

              <div className="relative z-10">
                <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary dark:bg-primary/20">
                  <Icon icon="solar:star-circle-bold" className="text-sm text-primary" />
                  <span>Đội ngũ chuyên gia thực chiến</span>
                </div>

                <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl md:text-4xl dark:text-white">
                  Đồng hành 1-1 cùng các Tech Lead & Senior Engineers
                </h2>

                <p className="mt-3.5 max-w-2xl text-base leading-relaxed text-slate-700 dark:text-slate-300">
                  Không còn phải tự bơi trong biển kiến thức. Bạn sẽ được gỡ rối tư duy lập trình, review mã nguồn chuyên sâu và định hướng sự nghiệp rõ ràng từ những người đi trước.
                </p>

                {/* Các quyền lợi cố vấn */}
                <div className="mt-5 grid gap-2.5 sm:grid-cols-2">
                  <div className="flex items-center gap-2 text-sm font-medium text-slate-800 dark:text-slate-200">
                    <Icon icon="solar:check-circle-bold" className="shrink-0 text-base text-success" />
                    <span>Code review & gỡ rối lỗi trực tiếp</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm font-medium text-slate-800 dark:text-slate-200">
                    <Icon icon="solar:check-circle-bold" className="shrink-0 text-base text-success" />
                    <span>Luyện Mock Interview & tối ưu CV</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm font-medium text-slate-800 dark:text-slate-200">
                    <Icon icon="solar:check-circle-bold" className="shrink-0 text-base text-success" />
                    <span>Linh hoạt đặt lịch theo thời gian rảnh</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm font-medium text-slate-800 dark:text-slate-200">
                    <Icon icon="solar:check-circle-bold" className="shrink-0 text-base text-success" />
                    <span>Theo sát tiến độ đến khi có việc</span>
                  </div>
                </div>

                {/* Nút hành động */}
                <div className="mt-7 flex flex-wrap items-center gap-3">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 rounded-xl border border-primary bg-primary px-5 py-3 text-sm font-semibold text-white shadow-md shadow-primary/20 transition duration-300 hover:bg-transparent hover:text-primary dark:hover:bg-primary/10"
                  >
                    <span>Liên hệ để chọn mentor</span>
                    <Icon icon="solar:arrow-right-line-duotone" className="text-base" />
                  </Link>
                  <Link
                    href="/courses"
                    className="inline-flex items-center gap-2 rounded-xl border border-primary/30 bg-white/70 px-5 py-3 text-sm font-semibold text-primary transition duration-300 hover:border-primary hover:bg-primary hover:text-white dark:bg-slate-800 dark:text-white dark:hover:bg-primary"
                  >
                    <span>Xem khóa học phù hợp</span>
                    <Icon icon="solar:book-bookmark-line-duotone" className="text-base" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Thẻ bảo chứng chất lượng & Avatar stack */}
            <div className="flex flex-col justify-between rounded-[28px] border border-primary/15 bg-white p-7 shadow-xs dark:border-white/10 dark:bg-slate-900">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-primary">
                  Bảo chứng chất lượng
                </p>
                <h3 className="mt-1 text-xl font-bold text-slate-900 dark:text-white">
                  Đội ngũ được tuyển chọn khắt khe
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                  100% mentor đều trải qua thẩm định hồ sơ chuyên môn và có kinh nghiệm thực tế tại các công ty công nghệ lớn.
                </p>

                {/* Avatar Stack */}
                <div className="mt-5 flex items-center gap-3">
                  <div className="flex -space-x-3 overflow-hidden">
                    {featuredMentors.length > 0 ? (
                      featuredMentors.map((m, idx) => (
                        <div
                          key={idx}
                          className="relative h-11 w-11 overflow-hidden rounded-full border-2 border-white shadow-xs dark:border-slate-900"
                        >
                          <Image
                            src={withBasePath(m.image!)}
                            alt={m.name}
                            width={44}
                            height={44}
                            className="h-full w-full object-cover"
                          />
                        </div>
                      ))
                    ) : (
                      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/20 text-primary">
                        <Icon icon="solar:user-bold" className="text-xl" />
                      </div>
                    )}
                  </div>
                  <div>
                    <span className="block text-sm font-bold text-slate-900 dark:text-white">
                      {mentors.length > 0 ? `${mentors.length}+ Mentor đồng hành` : "Đội ngũ chuyên gia"}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      Sẵn sàng cố vấn 1-1
                    </span>
                  </div>
                </div>
              </div>

              {/* Các chỉ số thống kê */}
              <div className="mt-6 grid grid-cols-2 gap-3 border-t border-slate-100 pt-5 dark:border-white/10">
                <div className="rounded-xl bg-cream/70 p-3.5 dark:bg-slate-800">
                  <div className="flex items-center gap-1.5 text-primary">
                    <Icon icon="solar:star-bold" className="text-base text-amber-500" />
                    <span className="text-lg font-extrabold text-slate-900 dark:text-white">4.95/5</span>
                  </div>
                  <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">
                    Độ hài lòng buổi mentoring
                  </p>
                </div>
                <div className="rounded-xl bg-cream/70 p-3.5 dark:bg-slate-800">
                  <div className="flex items-center gap-1.5 text-primary">
                    <Icon icon="solar:diploma-bold" className="text-base text-primary" />
                    <span className="text-lg font-extrabold text-slate-900 dark:text-white">5+ Năm</span>
                  </div>
                  <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">
                    Kinh nghiệm thực chiến TB
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="pb-20">
        <div className="container mx-auto max-w-7xl px-4">
          {mentors.length === 0 ? (
            <div className="rounded-[28px] border border-dashed border-primary/25 bg-primary/5 p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                Mentor matching
              </p>
              <h3 className="mt-3 text-3xl font-bold tracking-tight text-slate-950">
                Danh sách mentor đang được cập nhật
              </h3>
              <p className="mt-4 max-w-2xl text-base leading-7 text-black/70">
                Bản demo hiện chưa có mentor nào ở trạng thái hiển thị. Bạn có
                thể thêm dữ liệu trong admin hoặc liên hệ để đội ngũ tư vấn theo
                nhu cầu học tập.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="rounded-lg border border-primary bg-primary px-5 py-3 font-medium text-white transition duration-300 hover:bg-transparent hover:text-primary"
                >
                  Gửi yêu cầu tư vấn
                </Link>
                <Link
                  href="/admin/mentors"
                  className="rounded-lg border border-primary px-5 py-3 font-medium text-primary transition duration-300 hover:bg-primary hover:text-white"
                >
                  Cập nhật mentor trong admin
                </Link>
              </div>
            </div>
          ) : (
            <div className="space-y-5">
              {mentors.map((mentor, index) => (
                <div
                  key={mentor.slug}
                  className="grid gap-6 rounded-[28px] border border-primary/10 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md md:grid-cols-[220px_minmax(0,1fr)]"
                >
                  {mentor.image ? (
                    <div className="overflow-hidden rounded-2xl bg-slate-100">
                      <Image
                        src={withBasePath(mentor.image)}
                        alt={`Ảnh mentor ${mentor.name}`}
                        width={440}
                        height={440}
                        className="h-[220px] w-full object-cover object-center"
                      />
                    </div>
                  ) : (
                    <div className="flex h-[220px] items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 text-center text-sm font-medium text-slate-500">
                      Ảnh mentor
                      <br />
                      sẽ cập nhật sau
                    </div>
                  )}
                  <div className="flex flex-col justify-between gap-4">
                    <div className="flex flex-col gap-3">
                      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                        <div>
                          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                            Mentor {String(index + 1).padStart(2, "0")}
                          </p>
                          <h3 className="mt-2 text-2xl font-bold text-slate-950">
                            {mentor.name}
                          </h3>
                          <p className="mt-1 text-base font-medium text-slate-600">
                            {mentor.title}
                          </p>
                        </div>
                        <div className="rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
                          {`${mentor.yearsOfExperience}+ năm kinh nghiệm`}
                        </div>
                      </div>
                      <p className="max-w-3xl text-base leading-7 text-black/70">
                        {mentor.shortBio}
                      </p>
                    </div>

                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                      <div className="flex flex-wrap gap-2">
                        {mentor.expertise.slice(0, 4).map((item) => (
                            <span
                              key={item}
                              className="rounded-full bg-slate-100 px-3 py-2 text-sm text-slate-700"
                            >
                              {item}
                            </span>
                          ))}
                      </div>

                      <Link
                        href={`/mentors/${mentor.slug}`}
                        className="inline-flex w-fit rounded-lg border border-primary px-5 py-3 font-medium text-primary transition duration-300 hover:bg-primary hover:text-white"
                      >
                        Xem hồ sơ mentor
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default MentorsPage;
