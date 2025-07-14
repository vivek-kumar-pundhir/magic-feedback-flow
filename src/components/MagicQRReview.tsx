import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const MagicQRReview = () => {
  const [showThankYou, setShowThankYou] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState<string>('');
  const { toast } = useToast();

  // Replace with your actual Google Review link
  const googleReviewLink = "[replace_with_your_google_review_link]";
  
  // Replace with your actual webhook URL
  const webhookUrl = "[replace_with_your_webhook_URL]";

  const handleGoodClick = () => {
    // Redirect to Google Reviews
    window.open(googleReviewLink, '_blank');
  };

  const handleBadOrWorstClick = async (feedback: 'bad' | 'worst') => {
    setSelectedFeedback(feedback);
    setShowThankYou(true);

    // Send feedback to webhook
    try {
      await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'no-cors',
        body: JSON.stringify({
          feedback,
          timestamp: new Date().toISOString(),
          source: 'magic_qr_review'
        }),
      });
    } catch (error) {
      console.error('Error sending feedback:', error);
    }
  };

  const resetForm = () => {
    setShowThankYou(false);
    setSelectedFeedback('');
  };

  if (showThankYou) {
    return (
      <div className="min-h-screen bg-gradient-bg flex items-center justify-center p-4">
        <Card className="w-full max-w-md mx-auto bg-card/80 backdrop-blur-sm border-0 shadow-soft">
          <div className="p-8 text-center">
            <div className="mb-6">
              <div className="w-16 h-16 bg-gradient-good rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">✨</span>
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-2">
                Thank you for your feedback!
              </h2>
              <p className="text-muted-foreground">
                Your input helps us improve our service.
              </p>
            </div>
            
            <Button 
              onClick={resetForm}
              className="w-full bg-gradient-good hover:bg-gradient-good/90 text-good-foreground transition-all duration-300 transform hover:scale-105 shadow-soft hover:shadow-hover"
            >
              Leave Another Review
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-bg flex items-center justify-center p-4">
      <Card className="w-full max-w-lg mx-auto bg-card/80 backdrop-blur-sm border-0 shadow-soft">
        <div className="p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-good rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl">💭</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              How was your experience?
            </h1>
            <p className="text-muted-foreground text-lg">
              Your feedback matters to us
            </p>
          </div>

          {/* Review Buttons */}
          <div className="space-y-4">
            <Button
              onClick={handleGoodClick}
              className="w-full h-16 bg-gradient-good hover:bg-gradient-good/90 text-good-foreground text-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-soft hover:shadow-hover rounded-xl"
            >
              <span className="mr-3 text-2xl">🟢</span>
              Good
            </Button>

            <Button
              onClick={() => handleBadOrWorstClick('bad')}
              className="w-full h-16 bg-gradient-bad hover:bg-gradient-bad/90 text-bad-foreground text-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-soft hover:shadow-hover rounded-xl"
            >
              <span className="mr-3 text-2xl">🟡</span>
              Bad
            </Button>

            <Button
              onClick={() => handleBadOrWorstClick('worst')}
              className="w-full h-16 bg-gradient-worst hover:bg-gradient-worst/90 text-worst-foreground text-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-soft hover:shadow-hover rounded-xl"
            >
              <span className="mr-3 text-2xl">🔴</span>
              Worst
            </Button>
          </div>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground">
              Powered by Magic QR Reviews
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default MagicQRReview;