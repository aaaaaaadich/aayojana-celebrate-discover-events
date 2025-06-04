
import StatsCard from "../StatsCard";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const StatsSection = () => {
  const { elementRef: headerRef, isVisible: headerVisible } = useScrollAnimation({
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  const { elementRef: statsRef, isVisible: statsVisible } = useScrollAnimation({
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
  });

  return (
    <section className="py-16 bg-nepali-500 text-white">
      <div className="container mx-auto px-4">
        <div 
          ref={headerRef}
          className={`text-center mb-12 transition-all duration-1000 ease-out ${
            headerVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'
          }`}
        >
          <h2 className="text-3xl font-bold mb-4">Connecting Nepal's Event Community</h2>
          <p className="max-w-2xl mx-auto opacity-90">
            Since our launch, we've been bringing together event organizers and attendees across Nepal,
            creating memorable experiences and successful events.
          </p>
        </div>
        
        <div 
          ref={statsRef}
          className={`grid grid-cols-2 md:grid-cols-4 gap-6 transition-all duration-1000 ease-out delay-200 ${
            statsVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'
          }`}
        >
          <StatsCard value={1500} label="Events Hosted" suffix="+" />
          <StatsCard value={250} label="Organizers" suffix="+" />
          <StatsCard value={50000} label="Attendees" suffix="+" />
          <StatsCard value={12} label="Cities" />
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
