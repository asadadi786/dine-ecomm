import Wrapper from "@/components/Wrapper";
import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <Wrapper>
      <div className="flex justify-center items-center w-full">
        <SignIn afterSignInUrl={"/"} />
      </div>
    </Wrapper>
  );
}
