import Nav from "@/components/nav";
import Background from "@/components/background";
import WaitlistBox from "@/components/waitlist-box";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="flex items-center justify-center w-full h-screen relative">
      <Background />
      <div className="w-full h-full max-w-5xl relative z-10 flex flex-col">
        <Nav />
        <WaitlistBox />
        <Footer />
      </div>
    </div>
  );
}
