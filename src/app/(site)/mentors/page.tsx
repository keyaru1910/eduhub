import Image from "next/image";
import { Metadata } from "next";
import Link from "next/link";
import Breadcrumb from "@/app/components/Common/Breadcrumb";
import { getPublishedMentors } from "@/server/content/service";
import withBasePath from "@/utils/basePath";

export const metadata: Metadata = {
  title: "Mentor | Edu Hub",
  description:
    "Xem danh sách mentor đang đồng hành cùng học viên trên Edu Hub.",
};

export const dynamic = 'force-dynamic';

const hasMentorImage = (
  mentor: unknown,
): mentor is {
  image: string;
  name: string;
  slug: string;
  title: string;
  shortBio: string;
  yearsOfExperience: number;
  expertise: string[];
} =>
  typeof mentor === "object" &&
  mentor !== null &&
  "image" in mentor &&
  typeof mentor.image === "string";

const hasCardImage = (
  mentor: unknown,
): mentor is {
  imageSrc: string;
  imageAlt?: string;
} =>
  typeof mentor === "object" &&
  mentor !== null &&
  "imageSrc" in mentor &&
  typeof mentor.imageSrc === "string";

const MentorsPage = async () => {
  const mentors = await getPublishedMentors();
  const visibleMentors = mentors.slice(0, 10);
  const placeholderMentors = Array.from({
    length: Math.max(0, 10 - visibleMentors.length),
  }).map((_, index) => {
    const placeholderImages = [
      "/images/mentor/boy7.jpg",
      "/images/mentor/boy6.jpg",
      "/images/mentor/girl3.jpg",
      "/images/mentor/boy5.jpg",
    ];

    return {
      slug: `coming-soon-${index + 1}`,
      name: `Mentor đang cập nhật ${index + 1}`,
      title: "Thông tin sẽ được bổ sung sau",
      shortBio:
        "Vị trí này đang chờ cập nhật hồ sơ mentor mới để hoàn thiện danh sách hiển thị.",
      yearsOfExperience: 0,
      expertise: [] as string[],
      imageSrc: placeholderImages[index],
      imageAlt: `Ảnh mentor ${index + 7}`,
    };
  });
  const mentorList = [...visibleMentors, ...placeholderMentors];

  return (
    <>
      <Breadcrumb
        pageName="Mentor"
        pageDescription="Kết nối với đội ngũ mentor có kinh nghiệm thực chiến ở nhiều lĩnh vực."
      />
      <section className="pb-4">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="rounded-[28px] border border-primary/10 bg-white p-8 shadow-sm">
            <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                  Mentor matching
                </p>
                <h2 className="mt-3 text-4xl font-bold tracking-tight">
                  Tìm người đồng hành phù hợp với mục tiêu của bạn
                </h2>
                <p className="mt-4 max-w-2xl text-base leading-7 text-black/70">
                  Trang này tập trung hiển thị đầy đủ danh sách mentor theo dạng
                  dọc để người dùng dễ xem, dễ so sánh và dễ chọn người đồng
                  hành phù hợp trước khi đi tiếp sang khóa học hoặc liên hệ tư
                  vấn.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 lg:justify-end">
                <Link
                  href="/courses"
                  className="rounded-lg border border-primary px-5 py-3 font-medium text-primary transition duration-300 hover:bg-primary hover:text-white"
                >
                  Xem khóa học
                </Link>
                <Link
                  href="/contact"
                  className="rounded-lg border border-primary bg-primary px-5 py-3 font-medium text-white transition duration-300 hover:bg-transparent hover:text-primary"
                >
                  Liên hệ để được tư vấn
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="pb-20">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="space-y-5">
            {mentorList.map((mentor, index) => {
              const isRealMentor = hasMentorImage(mentor);
              const isPlaceholder = !isRealMentor;
              const mentorName =
                "name" in mentor && typeof mentor.name === "string"
                  ? mentor.name
                  : "mentor";
              const displayImage = isRealMentor
                ? mentor.image
                : hasCardImage(mentor)
                  ? mentor.imageSrc
                  : undefined;
              const displayImageAlt = isRealMentor
                ? `Ảnh mentor ${mentorName}`
                : hasCardImage(mentor)
                  ? mentor.imageAlt ?? `Ảnh mentor ${mentorName}`
                  : `Ảnh mentor ${mentorName}`;

              const content = (
                <div className="grid gap-6 rounded-[28px] border border-primary/10 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md md:grid-cols-[220px_minmax(0,1fr)]">
                  {displayImage ? (
                    <div className="overflow-hidden rounded-2xl bg-slate-100">
                      <Image
                        src={withBasePath(displayImage)}
                        alt={displayImageAlt}
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
                          {isPlaceholder
                            ? "Đang cập nhật"
                            : `${mentor.yearsOfExperience}+ năm kinh nghiệm`}
                        </div>
                      </div>
                      <p className="max-w-3xl text-base leading-7 text-black/70">
                        {mentor.shortBio}
                      </p>
                    </div>

                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                      <div className="flex flex-wrap gap-2">
                        {isPlaceholder ? (
                          <span className="rounded-full border border-dashed border-slate-300 px-3 py-2 text-sm text-slate-500">
                            Hồ sơ đang cập nhật
                          </span>
                        ) : (
                          mentor.expertise.slice(0, 4).map((item) => (
                            <span
                              key={item}
                              className="rounded-full bg-slate-100 px-3 py-2 text-sm text-slate-700"
                            >
                              {item}
                            </span>
                          ))
                        )}
                      </div>

                      {!isPlaceholder && (
                        <Link
                          href={`/mentors/${mentor.slug}`}
                          className="inline-flex w-fit rounded-lg border border-primary px-5 py-3 font-medium text-primary transition duration-300 hover:bg-primary hover:text-white"
                        >
                          Xem hồ sơ mentor
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              );

              if (isPlaceholder) {
                return <div key={mentor.slug}>{content}</div>;
              }

              return <div key={mentor.slug}>{content}</div>;
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default MentorsPage;
