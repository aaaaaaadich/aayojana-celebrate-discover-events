
import StatsCard from "../StatsCard";

const StatsSection = () => {
  return (
    <section className="py-16 bg-nepali-500 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Connecting Nepal's Event Community</h2>
          <p className="max-w-2xl mx-auto opacity-90">
            Since our launch, we've been bringing together event organizers and attendees across Nepal,
            creating memorable experiences and successful events.
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
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
