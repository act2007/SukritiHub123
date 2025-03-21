
import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Book, FileText, Video, Search } from "lucide-react";

const resourceCategories = [
  {
    title: "Articles",
    description: "Expert-written articles about menopause",
    icon: FileText,
    count: 45
  },
  {
    title: "Videos",
    description: "Informative videos and tutorials",
    icon: Video,
    count: 23
  },
  {
    title: "Guides",
    description: "Comprehensive guides and ebooks",
    icon: Book,
    count: 12
  }
];

const featuredResources = [
  {
    title: "Understanding Perimenopause",
    type: "Article",
    duration: "10 min read",
    image: "https://images.unsplash.com/photo-1619129641367-6104b1bf0b09?q=80&w=500&auto=format"
  },
  {
    title: "Managing Hot Flashes Naturally",
    type: "Video",
    duration: "15 min",
    image: "https://images.unsplash.com/photo-1559131953-9a5cd9388d36?q=80&w=500&auto=format"
  },
  {
    title: "Sleep Better During Menopause",
    type: "Guide",
    duration: "30 min read",
    image: "https://images.unsplash.com/photo-1519003722824-194d4455a60c?q=80&w=500&auto=format"
  },
  {
    title: "Nutrition for Hormonal Balance",
    type: "Article",
    duration: "12 min read",
    image: "https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?q=80&w=500&auto=format"
  }
];

const Resources = () => {
  return (
    <Layout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-medium">Resources</h1>
        <div className="relative w-64">
          <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search resources" className="pl-9" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {resourceCategories.map((category) => (
          <Card key={category.title} className="hover:shadow-soft transition-shadow">
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <div className="rounded-full bg-primary/10 p-2">
                  <category.icon className="h-5 w-5 text-primary" />
                </div>
                <span className="text-sm font-medium text-muted-foreground">{category.count}</span>
              </div>
            </CardHeader>
            <CardContent>
              <CardTitle className="text-xl mb-1">{category.title}</CardTitle>
              <CardDescription>{category.description}</CardDescription>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="w-full">
                Browse {category.title}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-medium mb-4">Featured Resources</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {featuredResources.map((resource) => (
            <div key={resource.title} className="border border-border rounded-lg overflow-hidden hover:border-primary/20 transition-colors">
              <div className="h-36 bg-muted relative overflow-hidden">
                <img 
                  src={resource.image} 
                  alt={resource.title} 
                  className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                />
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium bg-secondary px-2 py-1 rounded-full">{resource.type}</span>
                  <span className="text-xs text-muted-foreground">{resource.duration}</span>
                </div>
                <h3 className="font-medium">{resource.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Resources;
