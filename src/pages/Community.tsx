
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, MessageCircle, Heart, Share2, User } from "lucide-react";

const Community = () => {
  return (
    <Layout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-medium">Community</h1>
        <Button>
          <Plus size={16} className="mr-2" />
          Create Post
        </Button>
      </div>

      <div className="mb-6">
        <p className="text-muted-foreground">
          Connect with other women going through menopause, share experiences, and support each other.
        </p>
      </div>

      <Tabs defaultValue="discussions" className="mb-8">
        <TabsList className="mb-4">
          <TabsTrigger value="discussions">Discussions</TabsTrigger>
          <TabsTrigger value="success-stories">Success Stories</TabsTrigger>
          <TabsTrigger value="resources">Shared Resources</TabsTrigger>
        </TabsList>
        
        <TabsContent value="discussions" className="space-y-4">
          {[
            {
              title: "How do you manage hot flashes at work?",
              author: "Emily",
              time: "2 hours ago",
              content: "I've been experiencing increasingly frequent hot flashes during work meetings. It's becoming embarrassing and affecting my confidence. What strategies have worked for others in professional settings?",
              comments: 8,
              likes: 12,
            },
            {
              title: "Night sweats keeping you awake?",
              author: "Sarah",
              time: "Yesterday",
              content: "I've been waking up drenched in sweat almost every night for the past month. It's affecting my sleep quality terribly. Has anyone found effective solutions for night sweats?",
              comments: 15,
              likes: 23,
            },
            {
              title: "Mood swings affecting relationships",
              author: "Jessica",
              time: "3 days ago",
              content: "The mood swings I've been experiencing are putting a strain on my relationships, especially with my partner. One moment I'm fine, the next I'm irritable or tearful. How are you managing the emotional aspects of menopause?",
              comments: 21,
              likes: 34,
            }
          ].map((post, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{post.title}</CardTitle>
                    <div className="flex items-center mt-1 text-sm text-muted-foreground">
                      <User size={14} className="mr-1" />
                      <span>{post.author}</span>
                      <span className="mx-2">•</span>
                      <span>{post.time}</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm">{post.content}</p>
              </CardContent>
              <CardFooter className="flex justify-between border-t pt-4">
                <div className="flex items-center space-x-4">
                  <Button variant="ghost" size="sm" className="text-sm h-8">
                    <MessageCircle size={16} className="mr-1.5" />
                    {post.comments}
                  </Button>
                  <Button variant="ghost" size="sm" className="text-sm h-8">
                    <Heart size={16} className="mr-1.5" />
                    {post.likes}
                  </Button>
                </div>
                <Button variant="ghost" size="sm" className="text-sm h-8">
                  <Share2 size={16} className="mr-1.5" />
                  Share
                </Button>
              </CardFooter>
            </Card>
          ))}
        </TabsContent>
        
        <TabsContent value="success-stories">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                title: "Found relief through mindfulness meditation",
                author: "Michelle",
                content: "After struggling with anxiety and insomnia during perimenopause, I started practicing mindfulness meditation for 15 minutes each day. Within a month, I noticed significant improvements in my sleep quality and overall stress levels."
              },
              {
                title: "How changing my diet transformed my experience",
                author: "Patricia",
                content: "Cutting back on caffeine, alcohol, and spicy foods made a tremendous difference in reducing my hot flashes. I also increased my intake of whole grains, fruits, and vegetables. The change wasn't immediate, but after a few weeks, my symptoms became much more manageable."
              },
              {
                title: "Exercise became my refuge",
                author: "Linda",
                content: "When I started experiencing mood swings and fatigue, I committed to walking for 30 minutes every morning. This simple routine has improved my energy levels, mood, and even helped with weight management. I've since joined a yoga class specifically for women in menopause."
              },
              {
                title: "Finding the right healthcare provider made all the difference",
                author: "Janet",
                content: "After feeling dismissed by my regular doctor, I sought out a healthcare provider specializing in women's midlife health. Having a knowledgeable and supportive doctor who truly listens has transformed my menopause journey."
              }
            ].map((story, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-base">{story.title}</CardTitle>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <User size={14} className="mr-1" />
                    <span>{story.author}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">{story.content}</p>
                </CardContent>
                <CardFooter className="border-t pt-3">
                  <Button variant="ghost" size="sm" className="text-xs">
                    <Heart size={14} className="mr-1" />
                    Inspiring
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="resources">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[
              {
                title: "Menopause Diet Guide",
                type: "PDF",
                author: "Dr. Emily Chen",
                description: "A comprehensive guide to nutrition during menopause, including food recommendations and meal plans."
              },
              {
                title: "Gentle Yoga for Menopause",
                type: "Video",
                author: "Sarah Johnson, RYT",
                description: "A 20-minute gentle yoga sequence specifically designed to help with common menopause symptoms."
              },
              {
                title: "Hormone Therapy Fact Sheet",
                type: "Article",
                author: "Women's Health Initiative",
                description: "Evidence-based information about hormone therapy options, benefits, and risks."
              },
              {
                title: "Sleep Hygiene Checklist",
                type: "Worksheet",
                author: "National Sleep Foundation",
                description: "A printable checklist to help improve sleep quality during menopause."
              },
              {
                title: "Talking to Your Partner About Menopause",
                type: "Guide",
                author: "Relationship Counselor Maria Lopez",
                description: "Tips for communicating with your partner about menopause changes and needs."
              },
              {
                title: "Herbal Remedies: Evidence Review",
                type: "Research Summary",
                author: "Dr. James Wilson",
                description: "A summary of scientific evidence for various herbal remedies commonly used for menopause symptoms."
              }
            ].map((resource, index) => (
              <Card key={index} className="overflow-hidden">
                <div className="bg-muted p-4 border-b border-border">
                  <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                    {resource.type}
                  </span>
                </div>
                <CardContent className="pt-4">
                  <h3 className="font-medium mb-1">{resource.title}</h3>
                  <p className="text-xs text-muted-foreground mb-3">Shared by: {resource.author}</p>
                  <p className="text-sm">{resource.description}</p>
                </CardContent>
                <CardFooter className="border-t bg-muted/50">
                  <Button size="sm" variant="outline" className="w-full">
                    View Resource
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </Layout>
  );
};

export default Community;
