
import Layout from "@/components/Layout";
import { DashboardStats, RecentActivity, QuickActions, UpcomingVisits } from "@/components/Dashboard";
import { Button } from "@/components/ui/button";
import { Plus, FileText } from "lucide-react";

const Index = () => {
  return (
    <Layout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-medium">Welcome to Sukriti Hub</h1>
        <Button>
          <Plus size={16} className="mr-2" />
          New Request
        </Button>
      </div>
      
      <DashboardStats />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <RecentActivity />
        <div className="space-y-6">
          <QuickActions />
          <UpcomingVisits />
        </div>
      </div>
      
      <div className="mt-8 border-t border-border pt-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium">Recent Reports</h2>
          <Button variant="outline" size="sm">
            <FileText size={14} className="mr-2" />
            View All Reports
          </Button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {['Monthly Expenses', 'Visitor Analytics', 'Maintenance Requests', 'Vendor Payments'].map((report, index) => (
            <div 
              key={index} 
              className="p-4 border border-border rounded-lg hover:border-primary/20 transition-colors cursor-pointer"
            >
              <FileText size={32} className="mb-2 text-primary/60" />
              <h3 className="font-medium">{report}</h3>
              <p className="text-sm text-muted-foreground">Last updated: May 15, 2023</p>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Index;
