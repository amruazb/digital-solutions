
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bell, Calendar, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { mockRenewalDocuments } from '@/data/mockRenewalData';

const RenewalReminderCard = () => {
  const navigate = useNavigate();
  
  // Calculate stats from mock data
  const expiringDocuments = mockRenewalDocuments.filter(doc => doc.status === 'expiring-soon');
  const expiredDocuments = mockRenewalDocuments.filter(doc => doc.status === 'expired');
  const activeDocuments = mockRenewalDocuments.filter(doc => doc.status === 'active');
  
  const stats = [
    {
      label: 'Expiring Soon',
      count: expiringDocuments.length,
      icon: AlertTriangle,
      color: 'bg-yellow-100 text-yellow-800',
      iconColor: 'text-yellow-600'
    },
    {
      label: 'Expired',
      count: expiredDocuments.length,
      icon: Clock,
      color: 'bg-red-100 text-red-800',
      iconColor: 'text-red-600'
    },
    {
      label: 'Active',
      count: activeDocuments.length,
      icon: CheckCircle,
      color: 'bg-green-100 text-green-800',
      iconColor: 'text-green-600'
    }
  ];

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          <Bell className="h-4 w-4 text-blue-600" />
          Renewal Reminders
        </CardTitle>
        <Calendar className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Stats */}
          <div className="grid grid-cols-3 gap-2">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className={`inline-flex items-center justify-center w-8 h-8 rounded-full ${stat.color} mb-1`}>
                  <stat.icon className={`h-4 w-4 ${stat.iconColor}`} />
                </div>
                <div className="text-lg font-bold">{stat.count}</div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Recent expiring documents */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-muted-foreground">Expiring Soon</h4>
            {expiringDocuments.slice(0, 3).map((doc) => (
              <div key={doc.id} className="flex items-center justify-between p-2 bg-yellow-50 rounded-lg">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{doc.clientName}</p>
                  <p className="text-xs text-muted-foreground capitalize">
                    {doc.documentType.replace('-', ' ')}
                  </p>
                </div>
                <Badge variant="outline" className="text-xs bg-yellow-100 text-yellow-800">
                  {doc.daysToExpiry}d
                </Badge>
              </div>
            ))}
          </div>

          <Button 
            onClick={() => navigate('/admin/renewal-reminders')}
            className="w-full"
            size="sm"
          >
            View All Reminders
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default RenewalReminderCard;
