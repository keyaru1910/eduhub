export default function Loading() {
    return (
        <div className="flex h-[60vh] w-full items-center justify-center">
            <div className="flex flex-col items-center gap-4">
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Đang tải...</p>
            </div>
        </div>
    );
}
