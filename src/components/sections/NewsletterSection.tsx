
import NewsletterForm from "../NewsletterForm";

const NewsletterSection = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
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
