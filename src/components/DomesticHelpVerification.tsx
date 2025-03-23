
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Camera, Check, X, RefreshCw, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export function DomesticHelpVerification() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState<'success' | 'failed' | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Cleanup function to stop camera when component unmounts
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, []);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user', width: { ideal: 720 }, height: { ideal: 480 } },
        audio: false,
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsCameraActive(true);
        setErrorMessage(null);
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      setErrorMessage('Unable to access camera. Please check permissions.');
      toast({
        variant: "destructive",
        title: "Camera Error",
        description: "Could not access your camera. Please check permissions.",
      });
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
      setIsCameraActive(false);
    }
  };

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      
      if (context) {
        // Set canvas dimensions to match video
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        
        // Draw video frame to canvas
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        // Convert canvas to image data URL
        const imageDataUrl = canvas.toDataURL('image/png');
        setCapturedImage(imageDataUrl);
        
        // Stop camera after capturing
        stopCamera();
      }
    }
  };

  const resetCamera = () => {
    setCapturedImage(null);
    setVerificationResult(null);
    startCamera();
  };

  const verifyImage = () => {
    if (!capturedImage) return;
    
    setIsVerifying(true);
    
    // Mock verification process with timeout
    setTimeout(() => {
      // Simulating a 70% success rate
      const isMatch = Math.random() < 0.7;
      
      if (isMatch) {
        setVerificationResult('success');
        toast({
          title: "Verification Successful",
          description: "Identity matched with registered domestic help.",
        });
      } else {
        setVerificationResult('failed');
        toast({
          variant: "destructive",
          title: "Verification Failed",
          description: "No match found in the system.",
        });
      }
      
      setIsVerifying(false);
    }, 2000);
  };

  return (
    <div className="space-y-8 max-w-md mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Domestic Help Verification</CardTitle>
          <CardDescription>Verify the identity of domestic help against their registered photo</CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {errorMessage && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{errorMessage}</AlertDescription>
            </Alert>
          )}
          
          <div className="relative overflow-hidden rounded-lg border bg-background aspect-video">
            {isCameraActive && (
              <video 
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover"
              />
            )}
            
            {capturedImage && (
              <img 
                src={capturedImage} 
                alt="Captured" 
                className="w-full h-full object-cover"
              />
            )}
            
            {!isCameraActive && !capturedImage && (
              <div className="absolute inset-0 flex items-center justify-center bg-muted">
                <Camera className="h-16 w-16 text-muted-foreground" />
              </div>
            )}
            
            {verificationResult === 'success' && (
              <div className="absolute inset-0 bg-green-500/20 flex items-center justify-center">
                <div className="bg-white p-2 rounded-full">
                  <Check className="h-8 w-8 text-green-500" />
                </div>
              </div>
            )}
            
            {verificationResult === 'failed' && (
              <div className="absolute inset-0 bg-red-500/20 flex items-center justify-center">
                <div className="bg-white p-2 rounded-full">
                  <X className="h-8 w-8 text-red-500" />
                </div>
              </div>
            )}
          </div>
          
          <canvas ref={canvasRef} className="hidden" />
        </CardContent>
        
        <CardFooter className="flex flex-col space-y-2">
          {!isCameraActive && !capturedImage && (
            <Button className="w-full" onClick={startCamera}>
              <Camera className="mr-2 h-4 w-4" />
              Start Camera
            </Button>
          )}
          
          {isCameraActive && (
            <Button className="w-full" onClick={captureImage}>
              <Camera className="mr-2 h-4 w-4" />
              Capture
            </Button>
          )}
          
          {capturedImage && verificationResult === null && (
            <div className="flex gap-2 w-full">
              <Button variant="outline" className="flex-1" onClick={resetCamera}>
                <RefreshCw className="mr-2 h-4 w-4" />
                Retake
              </Button>
              <Button 
                className="flex-1" 
                onClick={verifyImage} 
                disabled={isVerifying}
              >
                {isVerifying ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  <>
                    <Check className="mr-2 h-4 w-4" />
                    Verify
                  </>
                )}
              </Button>
            </div>
          )}
          
          {verificationResult && (
            <Button variant="outline" className="w-full" onClick={resetCamera}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Start Over
            </Button>
          )}
        </CardFooter>
      </Card>
      
      {verificationResult === 'success' && (
        <Alert>
          <Check className="h-4 w-4" />
          <AlertTitle>Verification Successful</AlertTitle>
          <AlertDescription>
            Identity matched with Lakshmi, registered domestic help for Apartment 205.
          </AlertDescription>
        </Alert>
      )}
      
      {verificationResult === 'failed' && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Verification Failed</AlertTitle>
          <AlertDescription>
            No match found in the registered domestic help database. Please verify again or contact society office.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
