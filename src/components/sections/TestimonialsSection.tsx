
const TestimonialsSection = () => {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">What Our Users Say</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Hear from event organizers and attendees who have experienced the Aayojana platform.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-background p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full bg-saffron-100 flex items-center justify-center mr-4">
                <span className="text-saffron-500 font-bold text-xl">S</span>
              </div>
              <div>
                <h4 className="font-bold">Sunil Sharma</h4>
                <p className="text-sm text-muted-foreground">Event Organizer</p>
              </div>
            </div>
            <p className="italic">
              "Aayojana transformed how we manage our yearly cultural festival. The ticket scanning feature saved us hours 
              at the entrance, and the analytics helped us understand our audience better."
            </p>
          </div>
          
          <div className="bg-background p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full bg-saffron-100 flex items-center justify-center mr-4">
                <span className="text-saffron-500 font-bold text-xl">A</span>
              </div>
              <div>
                <h4 className="font-bold">Anita Gurung</h4>
                <p className="text-sm text-muted-foreground">Regular Attendee</p>
              </div>
            </div>
            <p className="italic">
              "I love how easy it is to find interesting events in Kathmandu with Aayojana. The location-based discovery 
              has introduced me to amazing local experiences I wouldn't have found otherwise."
            </p>
          </div>
          
          <div className="bg-background p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full bg-saffron-100 flex items-center justify-center mr-4">
                <span className="text-saffron-500 font-bold text-xl">R</span>
              </div>
              <div>
                <h4 className="font-bold">Rajesh Thapa</h4>
                <p className="text-sm text-muted-foreground">Tech Conference Organizer</p>
              </div>
            </div>
            <p className="italic">
              "The budget tracking and task management tools have made organizing our annual developer conference so much 
              more efficient. We've saved time and reduced stress using Aayojana."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
