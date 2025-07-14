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
      <div className="min-h-screen bg-gradient-bg flex items-center justify-center p-4 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-good rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/3 right-1/3 w-24 h-24 bg-gradient-bad rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <Card className="w-full max-w-md mx-auto bg-card/90 backdrop-blur-md border-0 shadow-soft relative animate-in slide-in-from-bottom-4 duration-500">
          <div className="p-8 text-center">
            <div className="mb-8">
              <div className="relative mx-auto mb-6">
                <div className="w-20 h-20 bg-gradient-good rounded-full flex items-center justify-center mx-auto shadow-soft animate-in zoom-in-50 duration-700 delay-200">
                  <span className="text-3xl animate-bounce">✨</span>
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-good rounded-full opacity-60 animate-ping"></div>
              </div>
              <h2 className="text-3xl font-bold text-foreground mb-3 animate-in fade-in-0 slide-in-from-bottom-3 duration-600 delay-300">
                Thank you for your feedback!
              </h2>
              <p className="text-muted-foreground text-lg animate-in fade-in-0 slide-in-from-bottom-3 duration-600 delay-500">
                Your input helps us improve our service.
              </p>
            </div>
            
            <Button 
              onClick={resetForm}
              className="w-full h-14 bg-gradient-good hover:bg-gradient-good/90 text-good-foreground text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-soft hover:shadow-hover rounded-xl animate-in fade-in-0 slide-in-from-bottom-3 duration-600 delay-700"
            >
              <span className="mr-2">🔄</span>
              Leave Another Review
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-bg flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-40 h-40 bg-gradient-good rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/3 w-32 h-32 bg-gradient-bad rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 right-1/4 w-24 h-24 bg-gradient-worst rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>
      
      <Card className="w-full max-w-lg mx-auto bg-card/90 backdrop-blur-md border-0 shadow-soft relative animate-in fade-in-0 slide-in-from-bottom-4 duration-700">
        <div className="p-8">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="relative mx-auto mb-6">
              <div className="w-24 h-24 bg-gradient-good rounded-full flex items-center justify-center mx-auto shadow-soft animate-in zoom-in-50 duration-700 delay-200">
                <span className="text-4xl animate-bounce">💭</span>
              </div>
              <div className="absolute -top-1 -right-1 w-8 h-8 bg-gradient-good rounded-full opacity-40 animate-ping"></div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 animate-in fade-in-0 slide-in-from-bottom-3 duration-600 delay-300">
              How was your experience?
            </h1>
            <p className="text-muted-foreground text-xl animate-in fade-in-0 slide-in-from-bottom-3 duration-600 delay-500">
              Your feedback matters to us
            </p>
          </div>

          {/* Review Buttons */}
          <div className="space-y-5">
            <Button
              onClick={handleGoodClick}
              className="group w-full h-18 bg-gradient-good hover:bg-gradient-good/90 text-good-foreground text-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-soft hover:shadow-hover rounded-xl animate-in fade-in-0 slide-in-from-left-4 duration-600 delay-700 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12"></div>
              <span className="mr-3 text-2xl group-hover:scale-110 transition-transform duration-200">🟢</span>
              Good
            </Button>

            <Button
              onClick={() => handleBadOrWorstClick('bad')}
              className="group w-full h-18 bg-gradient-bad hover:bg-gradient-bad/90 text-bad-foreground text-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-soft hover:shadow-hover rounded-xl animate-in fade-in-0 slide-in-from-left-4 duration-600 delay-800 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12"></div>
              <span className="mr-3 text-2xl group-hover:scale-110 transition-transform duration-200">🟡</span>
              Bad
            </Button>

            <Button
              onClick={() => handleBadOrWorstClick('worst')}
              className="group w-full h-18 bg-gradient-worst hover:bg-gradient-worst/90 text-worst-foreground text-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-soft hover:shadow-hover rounded-xl animate-in fade-in-0 slide-in-from-left-4 duration-600 delay-900 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12"></div>
              <span className="mr-3 text-2xl group-hover:scale-110 transition-transform duration-200">🔴</span>
              Worst
            </Button>
          </div>

          {/* Footer */}
          <div className="mt-10 text-center animate-in fade-in-0 slide-in-from-bottom-3 duration-600 delay-1000">
            <p className="text-sm text-muted-foreground/80">
              Powered by Magic QR Reviews
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default MagicQRReview;