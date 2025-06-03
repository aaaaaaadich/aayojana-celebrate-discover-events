
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useStaggeredFormAnimation } from "@/hooks/useScrollAnimation";

const NewsletterForm = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { containerRef, isVisible } = useStaggeredFormAnimation(2);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic email validation
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Success!",
        description: "You've been subscribed to our newsletter.",
      });
      setEmail("");
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <form 
      ref={containerRef}
      onSubmit={handleSubmit} 
      className="w-full max-w-md mx-auto"
    >
      <div className="flex gap-2 flex-col sm:flex-row">
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={`flex-1 glassmorphism hover:glassmorphism-strong transition-all duration-500 animate-shimmer form-element-stagger ${isVisible ? 'animate' : ''}`}
          required
          disabled={isSubmitting}
        />
        <Button 
          type="submit" 
          className={`btn-premium text-white animate-shimmer form-element-stagger ${isVisible ? 'animate' : ''}`}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Subscribing..." : "Subscribe"}
        </Button>
      </div>
    </form>
  );
};

export default NewsletterForm;
