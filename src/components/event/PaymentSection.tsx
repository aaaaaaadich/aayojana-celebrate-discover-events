
import { QRCodeUpload } from "./QRCodeUpload";

interface PaymentSectionProps {
  qrCodeImageUrl?: string | null;
  onQRCodeUpload: (url: string | null) => void;
}

const PaymentSection = ({ qrCodeImageUrl, onQRCodeUpload }: PaymentSectionProps) => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Payment Information</h2>
      <QRCodeUpload
        onImageUpload={onQRCodeUpload}
        currentImage={qrCodeImageUrl}
      />
    </div>
  );
};

export default PaymentSection;
