import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Check, CreditCard } from "lucide-react";
import { PaymentMethodModal } from "./PaymentMethodModal";

interface FeaturePlanSectionProps {
  isFeatureSelected: boolean;
  onFeatureToggle: (checked: boolean) => void;
  paymentStatus: 'pending' | 'completed' | 'failed';
  onPaymentComplete: (method: 'esewa' | 'khalti') => void;
}

const FeaturePlanSection = ({ 
  isFeatureSelected, 
  onFeatureToggle, 
  paymentStatus,
  onPaymentComplete 
}: FeaturePlanSectionProps) => {
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const handleFeatureToggle = (checked: boolean) => {
    onFeatureToggle(checked);
    if (checked && paymentStatus === 'pending') {
      setShowPaymentModal(true);
    }
  };

  const handlePaymentMethodSelect = (method: 'esewa' | 'khalti') => {
    setShowPaymentModal(false);
    onPaymentComplete(method);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Event Plans</h2>
      
      <div className="grid md:grid-cols-2 gap-6">
        {/* Plan 1: Standard */}
        <Card className="relative">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Plan 1: Standard
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="font-semibold">Commission: 5% + NPR 50 per ticket sold</p>
              <p className="text-muted-foreground">Visibility: Listed publicly without priority</p>
              <p className="text-muted-foreground">Badge: No badge or promotional highlighting</p>
            </div>
            <Badge variant="secondary">Free Plan</Badge>
          </CardContent>
        </Card>

        {/* Plan 2: Premium */}
        <Card className={`relative border-2 ${isFeatureSelected ? 'border-primary' : 'border-muted'}`}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-500" />
              Plan 2: Premium
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="font-semibold">Commission: 10% + NPR 100 per ticket sold</p>
              <p className="text-muted-foreground">Visibility: Medium listing priority</p>
              <p className="text-muted-foreground">Badge: Premium "Featured" badge shown on event card</p>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="feature-event"
                checked={isFeatureSelected}
                onCheckedChange={handleFeatureToggle}
              />
              <label htmlFor="feature-event" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Do you want to feature the event?
              </label>
            </div>
            
            {isFeatureSelected && (
              <div className="space-y-3">
                <Badge className="bg-yellow-500 text-white">
                  <Star className="h-3 w-3 mr-1" />
                  Featured Plan Selected
                </Badge>
                
                {paymentStatus === 'pending' && (
                  <Button 
                    onClick={() => setShowPaymentModal(true)}
                    className="w-full"
                    variant="default"
                  >
                    <CreditCard className="h-4 w-4 mr-2" />
                    Choose Payment Method
                  </Button>
                )}
                
                {paymentStatus === 'completed' && (
                  <div className="flex items-center gap-2 text-green-600">
                    <Check className="h-4 w-4" />
                    <span className="text-sm font-medium">Payment Completed - Event will be featured!</span>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <PaymentMethodModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        onPaymentMethodSelect={handlePaymentMethodSelect}
      />
    </div>
  );
};

export default FeaturePlanSection;