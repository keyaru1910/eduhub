import Signin from "@/app/components/Auth/SignIn";
import Breadcrumb from "@/app/components/Common/Breadcrumb";
import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Đăng nhập | Si Educational",
};

const SigninPage = () => {
  return (
    <>
      <Breadcrumb pageName="Trang đăng nhập" />

      <Signin />
    </>
  );
};

export default SigninPage;
