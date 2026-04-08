import SignUp from "@/app/components/Auth/SignUp";
import Breadcrumb from "@/app/components/Common/Breadcrumb";
import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Đăng ký | Si Educational",
};

const SignupPage = () => {
  return (
    <>
      <Breadcrumb pageName="Trang đăng ký" />

      <SignUp />
    </>
  );
};

export default SignupPage;
