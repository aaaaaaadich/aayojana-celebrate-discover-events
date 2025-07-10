import EventPosterUpload from "./EventPosterUpload";

interface PosterUploadSectionProps {
  posterImageUrl?: string | null;
  onPosterUpload: (url: string | null) => void;
}

const PosterUploadSection = ({ posterImageUrl, onPosterUpload }: PosterUploadSectionProps) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Event Poster</h2>
        <p className="text-muted-foreground">
          Upload an eye-catching poster for your event. This will be displayed on event cards and the event details page.
        </p>
      </div>

      <EventPosterUpload
        currentImageUrl={posterImageUrl}
        onImageUpload={onPosterUpload}
      />
    </div>
  );
};

export default PosterUploadSection;