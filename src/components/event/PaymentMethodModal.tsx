import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface PaymentMethodModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPaymentMethodSelect: (method: 'esewa' | 'khalti') => void;
}

export const PaymentMethodModal = ({ isOpen, onClose, onPaymentMethodSelect }: PaymentMethodModalProps) => {
  const [selectedMethod, setSelectedMethod] = useState<'esewa' | 'khalti' | null>(null);
  const [showQR, setShowQR] = useState(false);

  const handleMethodSelect = (method: 'esewa' | 'khalti') => {
    setSelectedMethod(method);
    setShowQR(true);
  };

  const handlePaymentComplete = () => {
    if (selectedMethod) {
      onPaymentMethodSelect(selectedMethod);
      setShowQR(false);
      setSelectedMethod(null);
      onClose();
    }
  };

  const resetModal = () => {
    setShowQR(false);
    setSelectedMethod(null);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Choose Payment Method</DialogTitle>
        </DialogHeader>

        {!showQR ? (
          <div className="space-y-4">
            <p className="text-muted-foreground text-center">
              Select your preferred payment method to feature your event
            </p>
            
            <div className="grid grid-cols-2 gap-4">
              <Card className="cursor-pointer hover:bg-accent transition-colors" onClick={() => handleMethodSelect('esewa')}>
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 mx-auto mb-3 bg-green-100 rounded-lg flex items-center justify-center">
                    <span className="text-green-600 font-bold text-lg">e</span>
                  </div>
                  <h3 className="font-semibold">eSewa</h3>
                  <p className="text-sm text-muted-foreground">Digital Wallet</p>
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:bg-accent transition-colors" onClick={() => handleMethodSelect('khalti')}>
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 mx-auto mb-3 bg-purple-100 rounded-lg flex items-center justify-center">
                    <span className="text-purple-600 font-bold text-lg">K</span>
                  </div>
                  <h3 className="font-semibold">Khalti</h3>
                  <p className="text-sm text-muted-foreground">Digital Payment</p>
                </CardContent>
              </Card>
            </div>
          </div>
        ) : (
          <div className="space-y-4 text-center">
            <h3 className="text-lg font-semibold">
              {selectedMethod === 'esewa' ? 'eSewa' : 'Khalti'} Payment
            </h3>
            
            <div className="bg-white p-4 rounded-lg border">
              <img 
                src={selectedMethod === 'esewa' 
                  ? '/lovable-uploads/d96cb2c7-9938-4ab5-b739-fbe2d7fe7519.png' 
                  : '/lovable-uploads/8b17bc99-4a57-4c86-ae4b-2821c2f195eb.png'
                }
                alt={`${selectedMethod} QR Code`}
                className="w-full max-w-64 mx-auto"
              />
            </div>
            
            <p className="text-sm text-muted-foreground">
              Scan the QR code with your {selectedMethod === 'esewa' ? 'eSewa' : 'Khalti'} app to complete payment
            </p>
            
            <div className="flex gap-2">
              <Button variant="outline" onClick={resetModal} className="flex-1">
                Change Method
              </Button>
              <Button onClick={handlePaymentComplete} className="flex-1">
                Payment Completed
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};