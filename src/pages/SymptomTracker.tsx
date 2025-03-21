
import { useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Plus, ChevronLeft, ChevronRight, Thermometer, Droplets, Brain, Moon } from "lucide-react";

const symptoms = [
  { id: "hot-flashes", name: "Hot Flashes", icon: Thermometer, color: "bg-red-100 text-red-700" },
  { id: "night-sweats", name: "Night Sweats", icon: Droplets, color: "bg-blue-100 text-blue-700" },
  { id: "mood-changes", name: "Mood Changes", icon: Brain, color: "bg-purple-100 text-purple-700" },
  { id: "sleep-issues", name: "Sleep Issues", icon: Moon, color: "bg-indigo-100 text-indigo-700" }
];

const SymptomTracker = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [month, setMonth] = useState(new Date());

  const nextMonth = () => {
    setMonth(new Date(month.setMonth(month.getMonth() + 1)));
  };

  const prevMonth = () => {
    setMonth(new Date(month.setMonth(month.getMonth() - 1)));
  };

  return (
    <Layout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-medium">Symptom Tracker</h1>
        <Button>
          <Plus size={16} className="mr-2" />
          Log Symptoms
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Symptom History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-4">
                <button onClick={prevMonth} className="p-1 rounded-full hover:bg-muted">
                  <ChevronLeft size={20} />
                </button>
                <h3 className="text-lg font-medium">
                  {month.toLocaleDateString('default', { month: 'long', year: 'numeric' })}
                </h3>
                <button onClick={nextMonth} className="p-1 rounded-full hover:bg-muted">
                  <ChevronRight size={20} />
                </button>
              </div>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                month={month}
                className="rounded-md border"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Recent Entries</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[...Array(3)].map((_, index) => {
                  const entryDate = new Date();
                  entryDate.setDate(entryDate.getDate() - index);
                  
                  return (
                    <div key={index} className="border border-border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <span className="font-medium">
                          {entryDate.toLocaleDateString('default', { weekday: 'long', month: 'short', day: 'numeric' })}
                        </span>
                        <Button variant="ghost" size="sm" className="h-6 px-2">Edit</Button>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {symptoms.filter(() => Math.random() > 0.5).map(symptom => (
                          <span 
                            key={symptom.id} 
                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs ${symptom.color}`}
                          >
                            <symptom.icon size={12} className="mr-1" />
                            {symptom.name}
                          </span>
                        ))}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Had several hot flashes today, especially in the afternoon. Sleep was disrupted last night.
                      </p>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="sticky top-4">
            <CardHeader className="pb-3">
              <CardTitle>Symptom Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {symptoms.map(symptom => (
                  <div key={symptom.id} className="space-y-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <symptom.icon size={16} className="mr-2 text-muted-foreground" />
                        <span className="text-sm font-medium">{symptom.name}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {Math.floor(Math.random() * 30)} days this month
                      </span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary rounded-full" 
                        style={{ width: `${Math.random() * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6">
                <h4 className="text-sm font-medium mb-2">Most Common Symptoms</h4>
                <ol className="list-decimal list-inside text-sm space-y-1 text-muted-foreground">
                  <li>Hot Flashes (18 days)</li>
                  <li>Sleep Issues (15 days)</li>
                  <li>Mood Changes (10 days)</li>
                </ol>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default SymptomTracker;
