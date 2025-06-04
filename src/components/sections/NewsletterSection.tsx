
import NewsletterForm from "../NewsletterForm";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const NewsletterSection = () => {
  const { elementRef: sectionRef, isVisible: sectionVisible } = useScrollAnimation({
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div 
          ref={sectionRef}
          className={`max-w-3xl mx-auto text-center transition-all duration-1000 ease-out ${
            sectionVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'
          }`}
        >
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-muted-foreground mb-8">
            Subscribe to our newsletter to receive updates about upcoming events, 
            platform features, and special promotions.
          </p>
          <NewsletterForm />
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
