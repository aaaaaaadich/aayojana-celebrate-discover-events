
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useEventAttendance } from "@/hooks/useEventAttendance";

interface BuyTicketsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  event: {
    id: string;
    title: string;
    price?: number | null;
    qr_code_image_url?: string | null;
  };
}

const BuyTicketsModal = ({ open, onOpenChange, event }: BuyTicketsModalProps) => {
  const { toast } = useToast();
  const { registerForEvent } = useEventAttendance();
  const [submitting, setSubmitting] = useState(false);

  const handleRegister = async () => {
    setSubmitting(true);
    const { error } = await registerForEvent(event.id);
    if (error) {
      toast({ title: "Could not register", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Registered", description: "You're registered for this event." });
      onOpenChange(false);
    }
    setSubmitting(false);
  };

  const hasQR = Boolean(event.qr_code_image_url);
  const isFree = !event.price || Number(event.price) <= 0;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{isFree ? "Register for Free" : "Pay via Organizer's QR"}</DialogTitle>
          <DialogDescription>
            {isFree
              ? "This is a free event. Click Register to confirm your seat."
              : "Scan the QR below with your preferred wallet, pay the exact amount, then click I Paid / Register."}
          </DialogDescription>
        </DialogHeader>

        {!isFree && (
          <div className="space-y-3">
            <div className="rounded-lg border bg-card p-3">
              {hasQR ? (
                <img
                  src={event.qr_code_image_url as string}
                  alt={`Organizer payment QR for ${event.title}`}
                  className="mx-auto h-auto max-h-80 w-full max-w-xs rounded"
                  loading="lazy"
                  decoding="async"
                />
              ) : (
                <div className="text-sm text-muted-foreground">
                  The organizer hasn't provided a payment QR yet. Please contact the organizer for payment details.
                </div>
              )}
            </div>
            <div className="text-sm text-muted-foreground text-center">
              Amount: NPR {Number(event.price ?? 0).toLocaleString()}
            </div>
            {hasQR && (
              <div className="text-center">
                <a
                  href={event.qr_code_image_url as string}
                  target="_blank"
                  rel="noreferrer"
                  className="text-primary underline underline-offset-4"
                >
                  Open QR in new tab
                </a>
              </div>
            )}
          </div>
        )}

        <div className="mt-4 grid grid-cols-2 gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleRegister} disabled={submitting || (!isFree && !hasQR)}>
            {isFree ? "Register" : submitting ? "Processing..." : "I Paid / Register"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BuyTicketsModal;
