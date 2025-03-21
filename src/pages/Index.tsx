
import Layout from "@/components/Layout";
import { DashboardStats, RecentActivity, QuickActions } from "@/components/Dashboard";
import { Button } from "@/components/ui/button";
import { Plus, Heart, Calendar, MessageCircle, Info } from "lucide-react";

const Index = () => {
  return (
    <Layout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-medium">Welcome to MeNova</h1>
        <Button>
          <Plus size={16} className="mr-2" />
          New Journal Entry
        </Button>
      </div>
      
      <div className="mb-6">
        <h2 className="text-lg font-medium mb-3">Your AI Companion for Menopause</h2>
        <p className="text-muted-foreground">
          Breaking the silent struggle with knowledge, tracking, and support.
        </p>
      </div>
      
      <DashboardStats />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="col-span-2">
          <RecentActivity />
        </div>
        <div>
          <QuickActions />
        </div>
      </div>
      
      <div className="border-t border-border pt-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium">MeNova Features</h2>
          <Button variant="outline" size="sm">
            <Info size={14} className="mr-2" />
            Learn More
          </Button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            {
              title: 'Resource Access',
              description: 'Reliable information about menopause from educational material to personal development tools.',
              icon: Info
            },
            {
              title: 'Symptom Tracking',
              description: 'Monitor symptoms, identify patterns, and log health records with our easy journaling tools.',
              icon: Calendar
            },
            {
              title: 'Personal Assistant',
              description: 'Empathetic conversations and guidance in a safe, supportive environment.',
              icon: MessageCircle
            }
          ].map((feature, index) => (
            <div 
              key={index} 
              className="p-6 border border-border rounded-lg hover:border-primary/20 transition-colors bg-card"
            >
              <div className="rounded-full bg-primary/10 p-3 w-fit mb-4">
                <feature.icon size={24} className="text-primary" />
              </div>
              <h3 className="font-medium text-lg mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Index;
