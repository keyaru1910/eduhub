import Image from "next/image";
import Link from "next/link";
import withBasePath from '@/utils/basePath'

const Logo: React.FC = () => {
    return (
        <Link href="/">
            <Image
                src={withBasePath('/images/logo/brand-favicon.ico')}
                alt="logo"
                width={48}
                height={48}
                style={{ width: "auto", height: "auto" }}
                quality={100}
                unoptimized
            />
        </Link>
    );
};

export default Logo;
