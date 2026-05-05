import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface MetricsCardProps {
  title: string;
  value: string | number;
  change?: number;
  changeType?: 'increase' | 'decrease';
  icon?: React.ReactNode;
  variant?: 'default' | 'primary' | 'success' | 'warning';
  description?: string;
}

export const MetricsCard = ({ 
  title, 
  value, 
  change, 
  changeType, 
  icon, 
  variant = 'default',
  description 
}: MetricsCardProps) => {
  const getCardVariant = () => {
    switch (variant) {
      case 'primary':
        return 'border-primary/20 bg-primary/5';
      case 'success':
        return 'border-success/20 bg-success/5';
      case 'warning':
        return 'border-warning/20 bg-warning/5';
      default:
        return '';
    }
  };

  return (
    <Card className={cn("shadow-enterprise-sm hover:shadow-enterprise-md transition-all duration-200", getCardVariant())}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-0.5 pt-1.5">
        <CardTitle className="text-xs font-medium text-muted-foreground">
          {title}
        </CardTitle>
        {icon && <div className="text-muted-foreground">{icon}</div>}
      </CardHeader>
      <CardContent className="pt-0.5 pb-1.5">
        <div className="text-sm font-bold text-foreground">{value}</div>
        <div className="flex items-center gap-2 mt-1">
          {change !== undefined && (
            <div className="flex items-center gap-1">
              {changeType === 'increase' ? (
                <TrendingUp className="h-3 w-3 text-success" />
              ) : (
                <TrendingDown className="h-3 w-3 text-destructive" />
              )}
              <Badge variant={changeType === 'increase' ? 'default' : 'destructive'} className="text-xs">
                {Math.abs(change)}%
              </Badge>
            </div>
          )}
          {description && (
            <p className="text-xs text-muted-foreground">{description}</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};