import PageTransition from "../PageTransition";
import AnimatedBackground from "./AnimatedBackground";

export default function AuthLayout({ children }) {
  return (
    <PageTransition>
      <section className="pastel-gradient relative min-h-[82vh] overflow-hidden py-12">
        <AnimatedBackground />
        <div className="container-soft relative z-10">{children}</div>
      </section>
    </PageTransition>
  );
}
