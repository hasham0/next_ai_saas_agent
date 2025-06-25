import { Metadata } from "next";
import SignUpView from "@/modules/auth/ui/views/sign-up-view";

export const metadata: Metadata = {
  title: "Sign Up",
};

type Props = {};

export default function SignUpPage({}: Props) {
  return <SignUpView />;
}
