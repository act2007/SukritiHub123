
import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Search, Phone, Mail, Home, Plus } from 'lucide-react';
import { Resident } from '@/lib/types';

export function ResidentSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  
  return (
    <div className="w-full max-w-md relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
      <Input
        placeholder="Search residents..."
        className="pl-10 h-10 focus-visible:ring-primary/25 bg-white"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
}

interface ResidentListProps {
  className?: string;
  residentType?: string;
}

export function ResidentList({ className, residentType }: ResidentListProps) {
  const [residents, setResidents] = useState<Resident[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulating data fetching
    setTimeout(() => {
      const mockResidents: Resident[] = [
        {
          id: '1',
          name: 'Rajesh Sharma',
          email: 'rajesh.sharma@example.com',
          phone: '+91 9876543210',
          unit: 'A-101',
          moveInDate: '2022-06-15',
          status: 'active',
          type: 'owner'
        },
        {
          id: '2',
          name: 'Priya Patel',
          email: 'priya.patel@example.com',
          phone: '+91 8765432109',
          unit: 'B-205',
          moveInDate: '2021-09-22',
          status: 'active',
          type: 'tenant'
        },
        {
          id: '3',
          name: 'Anand Krishnan',
          email: 'anand.k@example.com',
          phone: '+91 7654321098',
          unit: 'C-304',
          moveInDate: '2023-01-10',
          status: 'active',
          type: 'owner'
        },
        {
          id: '4',
          name: 'Sunita Nagarajan',
          email: 'sunita.n@example.com',
          phone: '+91 6543210987',
          unit: 'A-202',
          moveInDate: '2022-11-05',
          status: 'active',
          type: 'owner'
        },
        {
          id: '5',
          name: 'Venkat Subramaniam',
          email: 'venkat.s@example.com',
          phone: '+91 5432109876',
          unit: 'B-103',
          moveInDate: '2022-08-17',
          status: 'inactive',
          type: 'tenant'
        },
      ];
      
      setResidents(mockResidents);
      setLoading(false);
    }, 1000);
  }, []);

  // Filter residents based on type if provided
  const filteredResidents = residentType 
    ? residents.filter(resident => resident.type === residentType)
    : residents;

  if (loading) {
    return (
      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ${className}`}>
        {[...Array(6)].map((_, index) => (
          <Card key={index} className="animate-pulse overflow-hidden">
            <CardContent className="p-4">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-full bg-muted"></div>
                <div className="space-y-2 flex-1">
                  <div className="h-4 bg-muted rounded w-2/3"></div>
                  <div className="h-3 bg-muted rounded w-full"></div>
                  <div className="h-3 bg-muted rounded w-1/2"></div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ${className}`}>
      {filteredResidents.map((resident) => (
        <Card key={resident.id} className="overflow-hidden animate-slide-in-bottom hover:shadow-medium transition-all duration-300">
          <CardContent className="p-4">
            <div className="flex items-start gap-4">
              <Avatar className="h-12 w-12 border-2 border-primary/10">
                <AvatarImage src={resident.image} alt={resident.name} />
                <AvatarFallback className="bg-primary/10 text-primary">{getInitials(resident.name)}</AvatarFallback>
              </Avatar>
              <div className="space-y-1 flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-medium">{resident.name}</h3>
                  <Badge variant={resident.type === 'owner' ? 'default' : 'secondary'} className="text-xs">
                    {resident.type === 'owner' ? 'Owner' : 'Tenant'}
                  </Badge>
                </div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Home size={14} />
                  <span>{resident.unit}</span>
                </div>
                <div className="flex flex-col space-y-1 text-sm mt-1">
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Phone size={14} />
                    <span>{resident.phone}</span>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Mail size={14} />
                    <span className="truncate max-w-[200px]">{resident.email}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
      <Card className="overflow-hidden border-dashed border-2 flex items-center justify-center h-[144px] animate-slide-in-bottom">
        <CardContent className="p-4 flex flex-col items-center justify-center text-muted-foreground hover:text-primary transition-colors cursor-pointer">
          <Plus size={24} className="mb-2" />
          <span className="text-sm font-medium">Add Resident</span>
        </CardContent>
      </Card>
    </div>
  );
}
