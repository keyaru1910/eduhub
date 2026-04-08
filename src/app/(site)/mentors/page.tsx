import { Metadata } from "next";
import Link from "next/link";
import Breadcrumb from "@/app/components/Common/Breadcrumb";
import Mentor from "@/app/components/Home/Mentor";

export const metadata: Metadata = {
  title: "Mentor | Edu Hub",
  description:
    "Xem danh sách mentor đang đồng hành cùng học viên trên Edu Hub.",
};

const MentorsPage = () => {
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
                  Trang này được tách riêng để người dùng xem mentor rõ hơn,
                  không bị loang boi các section khác trên landing page. ạn có
                  thể di tiếp sang khóa học hoặc để lại thông tin liên hệ.
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
      <Mentor />
    </>
  );
};

export default MentorsPage;
