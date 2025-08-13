import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Upload, Check, Star, Clock, Crown } from "lucide-react";
import { TicketType } from "./TicketTypesSection";

interface TicketPurchaseModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  event: {
    id: string;
    title: string;
    price?: number | null;
    qr_code_image_url?: string | null;
  };
  ticketTypes: TicketType[];
}

interface AttendeeInfo {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
}

const TicketPurchaseModal = ({ open, onOpenChange, event, ticketTypes }: TicketPurchaseModalProps) => {
  const { toast } = useToast();
  const [selectedTicket, setSelectedTicket] = useState<TicketType | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [attendeeInfo, setAttendeeInfo] = useState<AttendeeInfo>({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
  });
  const [paymentProof, setPaymentProof] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [step, setStep] = useState<'select' | 'details' | 'payment'>('select');

  // Default ticket types if none provided
  const defaultTicketTypes: TicketType[] = [
    { id: 'early-bird', name: 'Early Bird', price: event.price ? Number(event.price) * 0.8 : 0, quantity: 50, description: 'Limited time discount for early bookings' },
    { id: 'general', name: 'General Admission', price: event.price ? Number(event.price) : 0, quantity: 100, description: 'Standard admission to the event' },
    { id: 'vip', name: 'VIP Pass', price: event.price ? Number(event.price) * 1.5 : 0, quantity: 25, description: 'Premium access with exclusive benefits' },
  ];

  const availableTickets = ticketTypes.length > 0 ? ticketTypes : defaultTicketTypes;
  const totalAmount = selectedTicket ? selectedTicket.price * quantity : 0;
  const isFree = totalAmount <= 0;

  const getTicketIcon = (ticketName: string) => {
    if (ticketName.toLowerCase().includes('early')) return <Clock className="w-4 h-4" />;
    if (ticketName.toLowerCase().includes('vip')) return <Crown className="w-4 h-4" />;
    return <Star className="w-4 h-4" />;
  };

  const handleAttendeeInfoChange = (field: keyof AttendeeInfo, value: string) => {
    setAttendeeInfo(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPaymentProof(file);
    }
  };

  const handlePurchase = async () => {
    if (!selectedTicket) return;

    setSubmitting(true);
    try {
      let paymentProofUrl = null;

      // Upload payment proof if provided and event is not free
      if (paymentProof && !isFree) {
        const fileExt = paymentProof.name.split('.').pop();
        const fileName = `${crypto.randomUUID()}.${fileExt}`;
        
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('payment-proofs')
          .upload(fileName, paymentProof);

        if (uploadError) {
          throw new Error('Failed to upload payment proof');
        }

        paymentProofUrl = uploadData.path;
      }

      // Get current user
      const { data: { user } } = await supabase.auth.getUser();

      // Insert ticket purchase record
      const { data: purchaseData, error: purchaseError } = await supabase
        .from('ticket_purchases')
        .insert({
          event_id: event.id,
          user_id: user?.id || null,
          ticket_type_id: selectedTicket.id,
          ticket_type_name: selectedTicket.name,
          ticket_price: selectedTicket.price,
          quantity: quantity,
          total_amount: totalAmount,
          first_name: attendeeInfo.firstName,
          last_name: attendeeInfo.lastName,
          email: attendeeInfo.email,
          phone_number: attendeeInfo.phoneNumber,
          payment_proof_url: paymentProofUrl,
          payment_status: isFree ? 'completed' : 'pending',
        })
        .select()
        .single();

      if (purchaseError) {
        throw new Error('Failed to save ticket purchase');
      }

      // Send confirmation email
      try {
        await supabase.functions.invoke('send-ticket-confirmation', {
          body: {
            eventTitle: event.title,
            attendeeName: `${attendeeInfo.firstName} ${attendeeInfo.lastName}`,
            attendeeEmail: attendeeInfo.email,
            ticketType: selectedTicket.name,
            totalAmount: totalAmount,
            purchaseId: purchaseData.id,
          },
        });
      } catch (emailError) {
        console.warn('Failed to send confirmation email:', emailError);
        // Don't throw error here as the purchase was successful
      }

      toast({
        title: "Ticket Purchased Successfully!",
        description: `You've successfully registered for ${event.title}. A confirmation email has been sent to ${attendeeInfo.email}.`,
      });

      onOpenChange(false);
      resetForm();
    } catch (error: any) {
      console.error('Purchase error:', error);
      toast({
        title: "Purchase Failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setSelectedTicket(null);
    setQuantity(1);
    setAttendeeInfo({ firstName: "", lastName: "", email: "", phoneNumber: "" });
    setPaymentProof(null);
    setStep('select');
  };

  const isFormValid = () => {
    return attendeeInfo.firstName && 
           attendeeInfo.lastName && 
           attendeeInfo.email && 
           attendeeInfo.phoneNumber &&
           (isFree || paymentProof);
  };

  return (
    <Dialog open={open} onOpenChange={(open) => {
      onOpenChange(open);
      if (!open) resetForm();
    }}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Purchase Tickets - {event.title}</DialogTitle>
          <DialogDescription>
            Select your ticket type and provide attendee information
          </DialogDescription>
        </DialogHeader>

        {step === 'select' && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Select Ticket Type</h3>
            <div className="grid gap-4">
              {availableTickets.map((ticket) => (
                <Card 
                  key={ticket.id} 
                  className={`cursor-pointer transition-all ${
                    selectedTicket?.id === ticket.id 
                      ? 'ring-2 ring-primary bg-primary/5' 
                      : 'hover:bg-accent'
                  }`}
                  onClick={() => setSelectedTicket(ticket)}
                >
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {getTicketIcon(ticket.name)}
                        <CardTitle className="text-lg">{ticket.name}</CardTitle>
                        {ticket.name.toLowerCase().includes('early') && (
                          <Badge variant="secondary">Limited Time</Badge>
                        )}
                        {ticket.name.toLowerCase().includes('vip') && (
                          <Badge variant="destructive">Premium</Badge>
                        )}
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold">
                          {ticket.price > 0 ? `NPR ${ticket.price.toLocaleString()}` : 'FREE'}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {ticket.quantity} available
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{ticket.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {selectedTicket && (
              <div className="space-y-4 p-4 bg-accent rounded-lg">
                <div className="flex items-center gap-4">
                  <Label htmlFor="quantity">Quantity:</Label>
                  <div className="flex items-center gap-2">
                    <Button 
                      type="button"
                      variant="outline" 
                      size="sm"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    >
                      -
                    </Button>
                    <Input
                      id="quantity"
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                      min="1"
                      max={selectedTicket.quantity}
                      className="w-20 text-center"
                    />
                    <Button 
                      type="button"
                      variant="outline" 
                      size="sm"
                      onClick={() => setQuantity(Math.min(selectedTicket.quantity, quantity + 1))}
                    >
                      +
                    </Button>
                  </div>
                </div>
                
                <Separator />
                
                <div className="flex justify-between items-center font-semibold">
                  <span>Total Amount:</span>
                  <span className="text-lg">
                    {totalAmount > 0 ? `NPR ${totalAmount.toLocaleString()}` : 'FREE'}
                  </span>
                </div>
                
                <Button onClick={() => setStep('details')} className="w-full">
                  Continue to Details
                </Button>
              </div>
            )}
          </div>
        )}

        {step === 'details' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Attendee Information</h3>
              <Button variant="outline" size="sm" onClick={() => setStep('select')}>
                Back
              </Button>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  value={attendeeInfo.firstName}
                  onChange={(e) => handleAttendeeInfoChange('firstName', e.target.value)}
                  placeholder="Enter first name"
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  value={attendeeInfo.lastName}
                  onChange={(e) => handleAttendeeInfoChange('lastName', e.target.value)}
                  placeholder="Enter last name"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                value={attendeeInfo.email}
                onChange={(e) => handleAttendeeInfoChange('email', e.target.value)}
                placeholder="Enter email address"
              />
            </div>
            
            <div>
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                type="tel"
                value={attendeeInfo.phoneNumber}
                onChange={(e) => handleAttendeeInfoChange('phoneNumber', e.target.value)}
                placeholder="Enter phone number"
              />
            </div>

            <div className="p-4 bg-accent rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">Selected Ticket:</span>
                <span>{selectedTicket?.name}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">Quantity:</span>
                <span>{quantity}</span>
              </div>
              <div className="flex justify-between items-center font-semibold">
                <span>Total Amount:</span>
                <span>{totalAmount > 0 ? `NPR ${totalAmount.toLocaleString()}` : 'FREE'}</span>
              </div>
            </div>

            <Button 
              onClick={() => setStep('payment')} 
              className="w-full"
              disabled={!attendeeInfo.firstName || !attendeeInfo.lastName || !attendeeInfo.email || !attendeeInfo.phoneNumber}
            >
              {isFree ? 'Complete Registration' : 'Continue to Payment'}
            </Button>
          </div>
        )}

        {step === 'payment' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">
                {isFree ? 'Complete Registration' : 'Payment Information'}
              </h3>
              <Button variant="outline" size="sm" onClick={() => setStep('details')}>
                Back
              </Button>
            </div>

            {!isFree && (
              <>
                <div className="p-4 bg-accent rounded-lg">
                  <h4 className="font-semibold mb-2">Payment Instructions</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Please make payment of NPR {totalAmount.toLocaleString()} using the QR code below, then upload proof of payment.
                  </p>
                  
                  {event.qr_code_image_url ? (
                    <div className="text-center">
                      <img
                        src={event.qr_code_image_url}
                        alt="Payment QR Code"
                        className="mx-auto h-auto max-h-60 w-full max-w-xs rounded border"
                      />
                      <p className="text-sm text-muted-foreground mt-2">
                        Scan to pay NPR {totalAmount.toLocaleString()}
                      </p>
                    </div>
                  ) : (
                    <div className="text-center p-8 border-2 border-dashed border-muted rounded-lg">
                      <p className="text-muted-foreground">
                        Payment QR code not available. Please contact the event organizer.
                      </p>
                    </div>
                  )}
                </div>

                <div>
                  <Label htmlFor="paymentProof">Upload Payment Proof *</Label>
                  <div className="mt-2">
                    <input
                      id="paymentProof"
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => document.getElementById('paymentProof')?.click()}
                      className="w-full"
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      {paymentProof ? paymentProof.name : 'Choose file'}
                    </Button>
                  </div>
                  {paymentProof && (
                    <div className="flex items-center gap-2 mt-2 text-sm text-green-600">
                      <Check className="w-4 h-4" />
                      Payment proof uploaded
                    </div>
                  )}
                </div>
              </>
            )}

            <div className="p-4 bg-accent rounded-lg">
              <h4 className="font-semibold mb-2">Order Summary</h4>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>Event:</span>
                  <span>{event.title}</span>
                </div>
                <div className="flex justify-between">
                  <span>Ticket Type:</span>
                  <span>{selectedTicket?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span>Quantity:</span>
                  <span>{quantity}</span>
                </div>
                <div className="flex justify-between">
                  <span>Attendee:</span>
                  <span>{attendeeInfo.firstName} {attendeeInfo.lastName}</span>
                </div>
                <div className="flex justify-between">
                  <span>Email:</span>
                  <span>{attendeeInfo.email}</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between font-semibold">
                  <span>Total Amount:</span>
                  <span>{totalAmount > 0 ? `NPR ${totalAmount.toLocaleString()}` : 'FREE'}</span>
                </div>
              </div>
            </div>

            <Button 
              onClick={handlePurchase} 
              className="w-full"
              disabled={submitting || !isFormValid()}
            >
              {submitting ? 'Processing...' : isFree ? 'Complete Registration' : 'Complete Purchase'}
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default TicketPurchaseModal;