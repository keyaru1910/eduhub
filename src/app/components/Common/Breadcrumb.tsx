import Link from "next/link";
import { Icon } from "@iconify/react";
import { BreadcrumbProps } from "../../types/breadcrumb";

/**
 * Component hiển thị thanh điều hướng (Breadcrumb) và tiêu đề trang cao cấp
 * Có hiệu ứng aura gradient nền và badge nhận diện.
 */
const Breadcrumb: React.FC<BreadcrumbProps> = ({
  pageName,
  pageDescription,
  badge,
  badgeIcon = "solar:sparkles-bold-duotone",
}) => {
  return (
    <div className="relative z-10 overflow-hidden pb-12 pt-[120px] md:pt-[130px] lg:pt-[150px] bg-gradient-to-b from-cream/40 via-white to-transparent dark:from-slate-900/60 dark:via-slate-950 dark:to-slate-950">
      {/* Hiệu ứng đốm sáng Aura mờ ảo ở giữa phía trên */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 h-72 w-[520px] sm:w-[720px] rounded-full bg-primary/15 blur-[90px] dark:bg-primary/20"
      />

      {/* Đường viền dưới mềm mại chuyển màu */}
      <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-primary/20 to-transparent dark:via-primary/30" />

      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          {/* Badge nhận diện chuyên mục nếu có */}
          {badge ? (
            <div className="inline-flex items-center gap-1.5 rounded-full border border-primary/25 bg-primary/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-primary shadow-xs dark:border-primary/30 dark:bg-primary/15">
              <Icon icon={badgeIcon} className="text-sm" />
              <span>{badge}</span>
            </div>
          ) : null}

          {/* Tiêu đề trang chính */}
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl md:text-5xl dark:text-white">
            {pageName}
          </h1>

          {/* Mô tả trang */}
          {pageDescription ? (
            <p className="mt-3 text-base sm:text-lg leading-relaxed text-slate-600 dark:text-slate-300">
              {pageDescription}
            </p>
          ) : null}

          {/* Thanh breadcrumb pill gọn gàng */}
          <nav
            aria-label="Breadcrumb"
            className="mt-5 inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/80 px-4 py-1.5 text-xs sm:text-sm font-medium text-slate-600 shadow-xs backdrop-blur-md dark:border-white/10 dark:bg-slate-900/80 dark:text-slate-300"
          >
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-slate-600 transition-colors hover:text-primary dark:text-slate-300 dark:hover:text-primary"
            >
              <Icon icon="solar:home-2-bold-duotone" className="text-base text-primary" />
              <span>Trang chủ</span>
            </Link>

            <Icon
              icon="solar:alt-arrow-right-linear"
              className="text-xs text-slate-400 dark:text-slate-500"
            />

            <span className="font-semibold text-primary">{pageName}</span>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Breadcrumb;
