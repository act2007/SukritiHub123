
import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { ScanFace, Camera, Check, X, AlertTriangle } from 'lucide-react';
import { Visitor } from '@/lib/types';

interface VerificationResult {
  visitor: Visitor | null;
  matchScore: number;
  verified: boolean;
  message: string;
}

export function DomesticHelpVerification() {
  const [isCapturing, setIsCapturing] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<VerificationResult | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { toast } = useToast();
  
  // Mock registered domestic helps for demonstration
  const registeredHelpers: Visitor[] = [
    {
      id: '1',
      name: 'Lakshmi Devi',
      purpose: 'Daily household work',
      hostUnit: 'A-101',
      hostName: 'Rajesh Sharma',
      expectedArrival: '2023-05-15T10:30:00',
      status: 'approved',
      visitorType: 'domestic',
      qrCode: 'somecode1',
    },
    {
      id: '2',
      name: 'Ravi Kumar',
      purpose: 'Cleaning and cooking',
      hostUnit: 'B-203',
      hostName: 'Priya Mehta',
      expectedArrival: '2023-05-16T09:00:00',
      status: 'approved',
      visitorType: 'domestic',
      qrCode: 'somecode2',
    },
    {
      id: '3',
      name: 'Sunita Rao',
      purpose: 'Child care',
      hostUnit: 'C-302',
      hostName: 'Vikram Desai',
      expectedArrival: '2023-05-17T08:30:00',
      status: 'approved',
      visitorType: 'domestic',
      qrCode: 'somecode3',
    },
  ];

  const startCamera = async () => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      toast({
        title: "Camera Error",
        description: "Camera not supported on this device or browser",
        variant: "destructive"
      });
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: "user" },
        audio: false 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsCapturing(true);
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
      toast({
        title: "Camera Error",
        description: "Could not access the camera. Please check permissions.",
        variant: "destructive"
      });
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      const tracks = stream.getTracks();
      
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
      setIsCapturing(false);
    }
  };

  const captureImage = () => {
    if (!videoRef.current) return;
    
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      const imageDataUrl = canvas.toDataURL('image/jpeg');
      setCapturedImage(imageDataUrl);
      stopCamera();
      verifyImage(imageDataUrl);
    }
  };

  const verifyImage = (imageDataUrl: string) => {
    setLoading(true);
    
    // Simulating facial recognition verification process
    setTimeout(() => {
      // For demo purpose, randomly match with one of the registered helpers or not match
      const randomMatch = Math.random() > 0.3;
      
      if (randomMatch) {
        const randomHelper = registeredHelpers[Math.floor(Math.random() * registeredHelpers.length)];
        const matchScore = Math.floor(Math.random() * 20) + 80; // Random score between 80-99
        
        setResult({
          visitor: randomHelper,
          matchScore: matchScore,
          verified: matchScore >= 85,
          message: matchScore >= 85 
            ? "Identity verified successfully" 
            : "Low confidence match, please verify manually"
        });
        
        toast({
          title: matchScore >= 85 ? "Verification Successful" : "Manual Verification Required",
          description: matchScore >= 85 
            ? `Verified as ${randomHelper.name}` 
            : "Confidence level too low for automatic verification",
          variant: matchScore >= 85 ? "default" : "warning"
        });
      } else {
        setResult({
          visitor: null,
          matchScore: Math.floor(Math.random() * 30) + 50, // Random score between 50-79
          verified: false,
          message: "No match found in the registry"
        });
        
        toast({
          title: "Verification Failed",
          description: "No matching identity found in the registry",
          variant: "destructive"
        });
      }
      
      setLoading(false);
    }, 2000);
  };

  const resetCapture = () => {
    setCapturedImage(null);
    setResult(null);
    setLoading(false);
  };

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ScanFace className="text-primary" size={22} />
          Domestic Help Verification
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {!capturedImage ? (
            <div className="relative border border-border rounded-lg overflow-hidden bg-black">
              {isCapturing ? (
                <>
                  <video 
                    ref={videoRef} 
                    autoPlay 
                    playsInline 
                    className="w-full h-[300px] object-cover"
                  ></video>
                  <div className="absolute bottom-0 left-0 right-0 p-4 flex justify-center">
                    <Button 
                      onClick={captureImage}
                      className="shadow-xl"
                    >
                      <Camera size={16} className="mr-2" />
                      Capture Image
                    </Button>
                  </div>
                </>
              ) : (
                <div className="h-[300px] flex flex-col items-center justify-center bg-muted/20">
                  <ScanFace size={64} className="text-muted-foreground mb-4" />
                  <p className="text-muted-foreground mb-4">Start camera to verify domestic help's identity</p>
                  <Button 
                    onClick={startCamera}
                    className="mt-2"
                  >
                    <Camera size={16} className="mr-2" />
                    Start Camera
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <p className="text-sm font-medium">Captured Image</p>
                  <div className="border border-border rounded-lg overflow-hidden">
                    <img 
                      src={capturedImage} 
                      alt="Captured face" 
                      className="w-full h-[220px] object-cover" 
                    />
                  </div>
                </div>
                
                {result && (
                  <div className="space-y-2">
                    {result.visitor ? (
                      <>
                        <p className="text-sm font-medium">Matched Registry Entry</p>
                        <div className="border border-border rounded-lg p-4">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-medium">{result.visitor.name}</h3>
                            <Badge variant={result.verified ? "default" : "outline"}>
                              {result.verified ? "Verified" : "Check ID"}
                            </Badge>
                          </div>
                          <div className="space-y-1 text-sm text-muted-foreground">
                            <p>Works at Unit {result.visitor.hostUnit}</p>
                            <p>Host: {result.visitor.hostName}</p>
                            <p>{result.visitor.purpose}</p>
                          </div>
                          <div className="mt-3 flex items-center">
                            <p className="text-sm">Match confidence: </p>
                            <Badge 
                              variant={result.verified ? "default" : "outline"}
                              className="ml-2"
                            >
                              {result.matchScore}%
                            </Badge>
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="border border-border rounded-lg p-4 flex flex-col items-center justify-center h-[220px]">
                        <AlertTriangle size={40} className="text-destructive mb-2" />
                        <h3 className="font-medium text-center">No Match Found</h3>
                        <p className="text-sm text-muted-foreground text-center mt-1">
                          This person is not registered in the system
                        </p>
                        <Badge variant="outline" className="mt-3">
                          Match Score: {result.matchScore}%
                        </Badge>
                      </div>
                    )}
                  </div>
                )}
              </div>
              
              <div className="flex justify-between">
                <Button 
                  variant="outline" 
                  onClick={resetCapture}
                >
                  Try Again
                </Button>
                
                {result && result.visitor && (
                  <div className="space-x-2">
                    <Button 
                      variant="outline" 
                      className="border-red-200 bg-red-50 text-red-700 hover:bg-red-100 hover:text-red-800"
                    >
                      <X size={16} className="mr-1" />
                      Deny Entry
                    </Button>
                    <Button 
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <Check size={16} className="mr-1" />
                      Permit Entry
                    </Button>
                  </div>
                )}
              </div>
            </div>
          )}
          
          {loading && (
            <div className="absolute inset-0 bg-background/80 flex items-center justify-center rounded-lg">
              <div className="flex flex-col items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-3"></div>
                <p className="text-muted-foreground">Analyzing image...</p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
