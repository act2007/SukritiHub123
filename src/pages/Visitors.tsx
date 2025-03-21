
import Layout from "@/components/Layout";
import { VisitorList, AddVisitorButton } from "@/components/VisitorManagement";
import { QrGenerator, QrCodeScanner } from "@/components/QrScanner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Visitors = () => {
  return (
    <Layout>
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-medium mb-1">Visitor Management</h1>
          <p className="text-muted-foreground">Control and monitor access to the society</p>
        </div>
        
        <AddVisitorButton />
      </div>
      
      <Tabs defaultValue="visitors" className="space-y-6">
        <TabsList>
          <TabsTrigger value="visitors">Visitors</TabsTrigger>
          <TabsTrigger value="scanner">QR Scanner</TabsTrigger>
        </TabsList>
        
        <TabsContent value="visitors" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-3">
              <VisitorList />
            </div>
            <div>
              <QrGenerator />
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="scanner" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <QrCodeScanner />
            
            <div className="space-y-4">
              <h2 className="text-lg font-medium">Recent Scans</h2>
              <div className="border border-border rounded-lg divide-y">
                {[
                  {name: 'John Smith', time: '10:30 AM', status: 'Checked In'},
                  {name: 'Amazon Delivery', time: '11:45 AM', status: 'Checked In'},
                  {name: 'Sarah Williams', time: '01:15 PM', status: 'Checked Out'},
                ].map((scan, index) => (
                  <div key={index} className="p-3 flex justify-between items-center">
                    <div>
                      <p className="font-medium">{scan.name}</p>
                      <p className="text-sm text-muted-foreground">{scan.time}</p>
                    </div>
                    <span className="text-sm">{scan.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </Layout>
  );
};

export default Visitors;
