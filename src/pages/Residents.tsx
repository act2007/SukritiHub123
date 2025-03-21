
import Layout from "@/components/Layout";
import { ResidentSearch, ResidentList } from "@/components/ResidentDirectory";
import { Button } from "@/components/ui/button";
import { Plus, FileUp, Download } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Residents = () => {
  return (
    <Layout>
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-medium mb-1">Resident Directory</h1>
          <p className="text-muted-foreground">Manage society residents and their information</p>
        </div>
        
        <div className="flex items-center space-x-2 w-full md:w-auto">
          <ResidentSearch />
          <Button>
            <Plus size={16} className="mr-2" />
            Add Resident
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="all" className="mb-6">
        <TabsList>
          <TabsTrigger value="all">All Residents</TabsTrigger>
          <TabsTrigger value="owners">Owners</TabsTrigger>
          <TabsTrigger value="tenants">Tenants</TabsTrigger>
          <TabsTrigger value="inactive">Inactive</TabsTrigger>
        </TabsList>
        
        <div className="flex items-center justify-end gap-2 mt-4">
          <Button variant="outline" size="sm">
            <FileUp size={14} className="mr-2" />
            Import
          </Button>
          <Button variant="outline" size="sm">
            <Download size={14} className="mr-2" />
            Export
          </Button>
        </div>
        
        <TabsContent value="all" className="mt-4">
          <ResidentList />
        </TabsContent>
        
        <TabsContent value="owners" className="mt-4">
          <ResidentList residentType="owner" />
        </TabsContent>
        
        <TabsContent value="tenants" className="mt-4">
          <ResidentList residentType="tenant" />
        </TabsContent>
        
        <TabsContent value="inactive" className="mt-4">
          <Card>
            <CardContent className="p-8 flex flex-col items-center justify-center text-center">
              <p className="text-muted-foreground mb-2">No inactive residents found</p>
              <Button variant="outline" size="sm">View All Residents</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Resident Statistics</CardTitle>
            <CardDescription>Overview of resident data</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Residents</span>
                <span className="font-medium">248</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Owners</span>
                <span className="font-medium">180</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tenants</span>
                <span className="font-medium">60</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Inactive Residents</span>
                <span className="font-medium">8</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">New This Month</span>
                <span className="font-medium">12</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Recent Updates</CardTitle>
            <CardDescription>Latest changes to resident data</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {action: 'New resident added', details: 'Aditya Mehta (Owner), Unit B-304', date: 'May 15, 2023'},
                {action: 'Contact information updated', details: 'Prakash Iyer (Tenant), Unit A-102', date: 'May 14, 2023'},
                {action: 'Status changed to inactive', details: 'Ramesh Nair (Owner), Unit C-201', date: 'May 12, 2023'},
                {action: 'New resident added', details: 'Shwetha Krishnan (Tenant), Unit D-105', date: 'May 10, 2023'},
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-3 pb-3 border-b border-border last:border-0 last:pb-0">
                  <div className="w-2 h-2 rounded-full bg-primary mt-1.5"></div>
                  <div>
                    <p className="font-medium">{item.action}</p>
                    <p className="text-sm text-muted-foreground">{item.details}</p>
                    <p className="text-xs text-muted-foreground">{item.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Residents;
