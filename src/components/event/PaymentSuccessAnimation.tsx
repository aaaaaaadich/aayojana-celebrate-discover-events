import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Sparkles, PartyPopper } from "lucide-react";

interface PaymentSuccessAnimationProps {
  isVisible: boolean;
  onComplete: () => void;
}

export const PaymentSuccessAnimation = ({ isVisible, onComplete }: PaymentSuccessAnimationProps) => {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setShowConfetti(true);
      const timer = setTimeout(() => {
        setShowConfetti(false);
        onComplete();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onComplete]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <Card className="relative overflow-hidden max-w-md mx-4">
        <CardContent className="p-8 text-center space-y-6">
          {/* Animated stars */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <Star className={`h-16 w-16 text-yellow-500 ${showConfetti ? 'animate-spin' : ''}`} />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Sparkles className={`h-8 w-8 text-yellow-400 ${showConfetti ? 'animate-pulse' : ''} transform translate-x-8 -translate-y-4`} />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Sparkles className={`h-6 w-6 text-yellow-300 ${showConfetti ? 'animate-bounce' : ''} transform -translate-x-8 translate-y-6`} />
            </div>
            <div className="h-16 w-16 mx-auto"></div>
          </div>

          {/* Success message */}
          <div className="space-y-2">
            <div className="flex items-center justify-center gap-2">
              <PartyPopper className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold text-primary">Congratulations!</h2>
              <PartyPopper className="h-6 w-6 text-primary" />
            </div>
            <p className="text-lg font-semibold">Your event is now featured!</p>
            <p className="text-muted-foreground">
              Your event will be displayed with a premium "Featured" badge and receive priority visibility.
            </p>
          </div>

          {/* Animated badge preview */}
          <div className={`inline-flex items-center gap-1 bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-medium ${showConfetti ? 'animate-pulse' : ''}`}>
            <Star className="h-4 w-4" />
            Featured
          </div>

          {/* Floating particles animation */}
          {showConfetti && (
            <>
              <div className="absolute top-0 left-0 w-2 h-2 bg-yellow-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="absolute top-0 right-0 w-1.5 h-1.5 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></div>
              <div className="absolute bottom-0 left-0 w-1 h-1 bg-yellow-300 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
              <div className="absolute bottom-0 right-0 w-2 h-2 bg-yellow-500 rounded-full animate-bounce" style={{ animationDelay: '0.7s' }}></div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};