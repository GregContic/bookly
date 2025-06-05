import HeroSection from "./pages/home/HeroSection";
import SignIn from "./sign-in/page";
import SignUp from "./sign-up/page";

export default function Home() {
  return (
    <>
      <HeroSection />
      <SignIn />
      <SignUp />
    </>
  );
}