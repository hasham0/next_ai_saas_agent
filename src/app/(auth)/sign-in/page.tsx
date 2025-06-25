import { Metadata } from "next";
import SignInView from "@/modules/auth/ui/views/sign-in-view";

export const metadata: Metadata = {
  title: "Sign In",
};

type Props = {};
export default function SignInPage({}: Props) {
  return <SignInView />;
}
