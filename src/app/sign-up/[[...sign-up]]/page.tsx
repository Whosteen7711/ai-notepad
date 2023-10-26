import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className=" flex items-center justify-center mt-60 ">
      <SignUp />
    </div>
  );
}
