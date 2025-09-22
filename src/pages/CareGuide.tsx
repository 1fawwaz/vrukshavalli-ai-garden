import React, { useState } from 'react';
import { Camera, MessageCircle, Upload, Sparkles, Leaf, ArrowRight, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';

const CareGuide: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [plantQuestion, setPlantQuestion] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [credits, setCredits] = useState(5); // Free credits for disease detection
  const { toast } = useToast();

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      toast({
        title: "Image Uploaded",
        description: "Ready for AI analysis!",
      });
    }
  };

  const analyzeImage = async () => {
    if (!selectedImage) {
      toast({
        title: "No Image Selected",
        description: "Please upload an image first.",
        variant: "destructive"
      });
      return;
    }

    if (credits <= 0) {
      toast({
        title: "No Credits Left",
        description: "Contact us on WhatsApp for more AI credits!",
        variant: "destructive"
      });
      return;
    }

    setIsAnalyzing(true);
    
    // Simulate AI analysis
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Mock AI response for plant disease detection
    const mockAnalysis = `🌿 **Plant Analysis Complete**

**Plant Identified:** Monstera Deliciosa

**Health Status:** 🟡 Mild Concern Detected

**Issues Found:**
• Brown leaf tips - likely overwatering or low humidity
• Some yellowing on older leaves - natural aging process

**Recommendations:**
✅ Reduce watering frequency - water only when top 2 inches of soil are dry
✅ Increase humidity around plant (60-70% ideal)
✅ Remove yellowed/brown leaves to redirect energy
✅ Check drainage - ensure pot has drainage holes

**Care Tips:**
🌱 Bright, indirect light (avoid direct sunlight)
💧 Water weekly in summer, bi-weekly in winter
🌡️ Keep temperature between 18-27°C
🪴 Feed monthly with balanced fertilizer during growing season

**Need Help?** Contact our plant experts on WhatsApp for personalized care advice!`;

    setAiResponse(mockAnalysis);
    setCredits(prev => prev - 1);
    setIsAnalyzing(false);
    
    toast({
      title: "Analysis Complete!",
      description: "AI has analyzed your plant. Check the results below.",
    });
  };

  const askAiQuestion = async () => {
    if (!plantQuestion.trim()) {
      toast({
        title: "No Question Asked",
        description: "Please type your plant care question.",
        variant: "destructive"
      });
      return;
    }

    setIsAnalyzing(true);
    
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock AI response based on question
    const mockResponse = `🤖 **AI Plant Expert Response**

Great question! Based on your query about "${plantQuestion}", here's what I recommend:

**Quick Answer:**
This is a common issue that many plant parents face. The key is understanding your plant's natural habitat and mimicking those conditions.

**Detailed Guidance:**
✅ **Light:** Most houseplants prefer bright, indirect light. Direct sunlight can scorch leaves.
✅ **Watering:** The #1 rule - when in doubt, don't water! Most plants die from overwatering.
✅ **Humidity:** Indoor plants love 40-60% humidity. Use a humidifier or pebble tray.
✅ **Temperature:** Keep steady between 18-24°C. Avoid drafts and sudden temperature changes.

**Pro Tips:**
🌱 Check soil moisture with your finger before watering
🌱 Rotate plants weekly for even growth
🌱 Clean leaves monthly with damp cloth
🌱 Watch for pests - early detection is key

**Still need help?** Our WhatsApp plant experts are available 24/7 for personalized advice!`;

    setAiResponse(mockResponse);
    setIsAnalyzing(false);
    setPlantQuestion('');
    
    toast({
      title: "AI Response Ready!",
      description: "Check your personalized plant care advice below.",
    });
  };

  const whatsappUrl = "https://wa.me/c/917719890777";

  const careCategories = [
    {
      title: "🌱 Watering Guide",
      tips: [
        "Check soil moisture before watering",
        "Water thoroughly until water drains out",
        "Most plants prefer to dry out between waterings",
        "Use room temperature water",
        "Water in morning for best absorption"
      ]
    },
    {
      title: "☀️ Light Requirements", 
      tips: [
        "Bright indirect light is best for most houseplants",
        "Rotate plants weekly for even growth",
        "South-facing windows get the most light",
        "Use sheer curtains to filter intense sunlight",
        "Consider grow lights for dark spaces"
      ]
    },
    {
      title: "🌡️ Temperature & Humidity",
      tips: [
        "Keep temperatures between 18-24°C",
        "Avoid placing plants near heat sources",
        "Most houseplants prefer 40-60% humidity",
        "Use humidifiers or pebble trays to increase humidity",
        "Group plants together to create humid microclimates"
      ]
    },
    {
      title: "🌿 Fertilizing Tips",
      tips: [
        "Feed during growing season (spring/summer)",
        "Use diluted liquid fertilizer monthly",
        "Reduce feeding in fall/winter",
        "Over-fertilizing can burn roots",
        "Flush soil occasionally to prevent salt buildup"
      ]
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">
          Plant Care <span className="text-primary">AI Assistant</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-6">
          Upload photos for disease detection, ask care questions, and get expert advice 
          powered by AI and our plant specialists.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Badge variant="secondary" className="px-4 py-2">
            <Sparkles className="w-4 h-4 mr-2" />
            {credits} Free AI Credits Remaining
          </Badge>
          <Button variant="outline" asChild>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="w-4 h-4 mr-2" />
              WhatsApp Expert Support
              <ExternalLink className="w-3 h-3 ml-2" />
            </a>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="ai-analysis" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="ai-analysis">AI Plant Analysis</TabsTrigger>
          <TabsTrigger value="ask-expert">Ask AI Expert</TabsTrigger>
          <TabsTrigger value="care-tips">Care Tips</TabsTrigger>
        </TabsList>

        {/* AI Plant Analysis */}
        <TabsContent value="ai-analysis" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Camera className="w-5 h-5" />
                Plant Disease Detection & Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert>
                <Sparkles className="h-4 w-4" />
                <AlertDescription>
                  Upload a clear photo of your plant and get instant AI-powered analysis for diseases, 
                  pests, and care recommendations. {credits} free credits available!
                </AlertDescription>
              </Alert>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="plant-image">Upload Plant Image</Label>
                  <div className="mt-2">
                    <Input
                      id="plant-image"
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="cursor-pointer"
                    />
                  </div>
                </div>

                {selectedImage && (
                  <div className="p-4 border-2 border-dashed border-border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Upload className="w-5 h-5 text-primary" />
                      <div>
                        <p className="font-medium">{selectedImage.name}</p>
                        <p className="text-sm text-muted-foreground">
                          Ready for AI analysis
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <Button 
                  onClick={analyzeImage}
                  disabled={!selectedImage || isAnalyzing || credits <= 0}
                  className="w-full"
                  variant="nature"
                  size="lg"
                >
                  {isAnalyzing ? (
                    <>
                      <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                      Analyzing Plant...
                    </>
                  ) : (
                    <>
                      <Camera className="w-4 h-4 mr-2" />
                      Analyze Plant Health (1 Credit)
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* AI Analysis Results */}
          {aiResponse && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  AI Analysis Results
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-muted/50 p-6 rounded-lg">
                  <pre className="whitespace-pre-wrap text-sm font-mono">
                    {aiResponse}
                  </pre>
                </div>
                <div className="mt-4 p-4 bg-primary/10 rounded-lg">
                  <div className="flex items-start gap-3">
                    <MessageCircle className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium text-primary">Need Personal Help?</p>
                      <p className="text-sm text-muted-foreground mb-3">
                        Get detailed care advice from our plant experts via WhatsApp
                      </p>
                      <Button variant="outline" size="sm" asChild>
                        <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                          Chat with Expert
                          <ArrowRight className="w-3 h-3 ml-2" />
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Ask AI Expert */}
        <TabsContent value="ask-expert" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5" />
                Ask Our AI Plant Expert
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert>
                <Leaf className="h-4 w-4" />
                <AlertDescription>
                  Ask any plant care question and get instant AI-powered answers from our 
                  extensive plant knowledge database.
                </AlertDescription>
              </Alert>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="plant-question">Your Plant Care Question</Label>
                  <Textarea
                    id="plant-question"
                    placeholder="e.g., Why are my plant's leaves turning yellow? How often should I water my monstera? What's the best fertilizer for succulents?"
                    value={plantQuestion}
                    onChange={(e) => setPlantQuestion(e.target.value)}
                    rows={3}
                    className="mt-2"
                  />
                </div>

                <Button 
                  onClick={askAiQuestion}
                  disabled={!plantQuestion.trim() || isAnalyzing}
                  className="w-full"
                  variant="nature"
                  size="lg"
                >
                  {isAnalyzing ? (
                    <>
                      <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                      AI is thinking...
                    </>
                  ) : (
                    <>
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Ask AI Expert (Free)
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* AI Response */}
          {aiResponse && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  AI Expert Answer
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-muted/50 p-6 rounded-lg">
                  <pre className="whitespace-pre-wrap text-sm">
                    {aiResponse}
                  </pre>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Care Tips */}
        <TabsContent value="care-tips" className="space-y-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-4">Essential Plant Care Guide</h2>
            <p className="text-muted-foreground">
              Master the fundamentals of plant care with these proven tips from our experts.
            </p>
          </div>

          <div className="grid gap-6">
            {careCategories.map((category, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle>{category.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {category.tips.map((tip, tipIndex) => (
                      <div key={tipIndex} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                        <p className="text-sm">{tip}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* WhatsApp Contact Card */}
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-primary-foreground" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-primary">24/7 Plant Expert Support</h3>
                  <p className="text-muted-foreground text-sm">
                    Get personalized care advice, disease diagnosis, and plant recommendations 
                    directly from our experienced team.
                  </p>
                </div>
                <Button variant="nature" asChild>
                  <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    WhatsApp: 07719890777
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CareGuide;