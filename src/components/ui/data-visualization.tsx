import { useState, useMemo } from "react";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ScatterChart,
  Scatter,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Minus,
  MoreHorizontal,
  Download,
  Maximize2,
} from "lucide-react";

// Color schemes for different chart types
const peaceColors = {
  primary: "#10b981",
  secondary: "#3b82f6",
  accent: "#8b5cf6",
  warning: "#f59e0b",
  danger: "#ef4444",
  success: "#22c55e",
  gradient: ["#10b981", "#3b82f6", "#8b5cf6", "#f59e0b", "#ef4444", "#22c55e"],
};

interface ChartData {
  [key: string]: string | number;
}

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: number;
  trend?: "up" | "down" | "neutral";
  subtitle?: string;
  icon?: React.ReactNode;
  color?: "primary" | "secondary" | "accent" | "warning" | "danger" | "success";
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  change,
  trend,
  subtitle,
  icon,
  color = "primary",
}) => {
  const getTrendIcon = () => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-green-500" />;
      case "down":
        return <TrendingDown className="h-4 w-4 text-red-500" />;
      default:
        return <Minus className="h-4 w-4 text-gray-500" />;
    }
  };

  const getChangeColor = () => {
    if (!change) return "text-muted-foreground";
    return change > 0
      ? "text-green-600"
      : change < 0
        ? "text-red-600"
        : "text-gray-600";
  };

  return (
    <Card className="transition-smooth hover:shadow-lg">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              {icon && (
                <div className={`p-2 rounded-lg bg-${color}/10 text-${color}`}>
                  {icon}
                </div>
              )}
              <h3 className="font-medium text-muted-foreground">{title}</h3>
            </div>
            <div className="flex items-baseline space-x-2">
              <span className="text-2xl font-bold">{value}</span>
              {change !== undefined && (
                <div className="flex items-center space-x-1">
                  {getTrendIcon()}
                  <span className={`text-sm font-medium ${getChangeColor()}`}>
                    {change > 0 ? "+" : ""}
                    {change}%
                  </span>
                </div>
              )}
            </div>
            {subtitle && (
              <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

interface TrendChartProps {
  data: ChartData[];
  title: string;
  dataKey: string;
  timeKey?: string;
  height?: number;
  color?: string;
  type?: "line" | "area" | "bar";
  showGrid?: boolean;
}

export const TrendChart: React.FC<TrendChartProps> = ({
  data,
  title,
  dataKey,
  timeKey = "date",
  height = 300,
  color = peaceColors.primary,
  type = "line",
  showGrid = true,
}) => {
  const [timeRange, setTimeRange] = useState("7d");

  const filteredData = useMemo(() => {
    // In a real app, this would filter based on timeRange
    return data;
  }, [data, timeRange]);

  const renderChart = () => {
    const commonProps = {
      data: filteredData,
      margin: { top: 5, right: 30, left: 20, bottom: 5 },
    };

    switch (type) {
      case "area":
        return (
          <AreaChart {...commonProps}>
            {showGrid && <CartesianGrid strokeDasharray="3 3" />}
            <XAxis dataKey={timeKey} />
            <YAxis />
            <Tooltip />
            <Area
              type="monotone"
              dataKey={dataKey}
              stroke={color}
              fill={color}
              fillOpacity={0.3}
            />
          </AreaChart>
        );
      case "bar":
        return (
          <BarChart {...commonProps}>
            {showGrid && <CartesianGrid strokeDasharray="3 3" />}
            <XAxis dataKey={timeKey} />
            <YAxis />
            <Tooltip />
            <Bar dataKey={dataKey} fill={color} />
          </BarChart>
        );
      default:
        return (
          <LineChart {...commonProps}>
            {showGrid && <CartesianGrid strokeDasharray="3 3" />}
            <XAxis dataKey={timeKey} />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey={dataKey}
              stroke={color}
              strokeWidth={2}
              dot={{ fill: color, strokeWidth: 0, r: 4 }}
            />
          </LineChart>
        );
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg">{title}</CardTitle>
        <div className="flex items-center space-x-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-24">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24h">24h</SelectItem>
              <SelectItem value="7d">7d</SelectItem>
              <SelectItem value="30d">30d</SelectItem>
              <SelectItem value="90d">90d</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="ghost" size="sm">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={height}>
          {renderChart()}
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

interface DistributionChartProps {
  data: Array<{ name: string; value: number; color?: string }>;
  title: string;
  height?: number;
  type?: "pie" | "donut";
  showLegend?: boolean;
}

export const DistributionChart: React.FC<DistributionChartProps> = ({
  data,
  title,
  height = 300,
  type = "pie",
  showLegend = true,
}) => {
  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={height}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={type === "donut" ? 60 : 0}
              outerRadius={100}
              paddingAngle={2}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={
                    entry.color ||
                    peaceColors.gradient[index % peaceColors.gradient.length]
                  }
                />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: number) => [
                `${value} (${((value / total) * 100).toFixed(1)}%)`,
                "",
              ]}
            />
            {showLegend && <Legend />}
          </PieChart>
        </ResponsiveContainer>

        {/* Custom Legend */}
        <div className="mt-4 space-y-2">
          {data.map((item, index) => (
            <div
              key={item.name}
              className="flex items-center justify-between text-sm"
            >
              <div className="flex items-center space-x-2">
                <div
                  className="w-3 h-3 rounded-sm"
                  style={{
                    backgroundColor:
                      item.color ||
                      peaceColors.gradient[index % peaceColors.gradient.length],
                  }}
                />
                <span>{item.name}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="font-medium">{item.value}</span>
                <span className="text-muted-foreground">
                  ({((item.value / total) * 100).toFixed(1)}%)
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

interface ComparisonChartProps {
  data: ChartData[];
  title: string;
  categories: Array<{ key: string; name: string; color?: string }>;
  height?: number;
  stacked?: boolean;
}

export const ComparisonChart: React.FC<ComparisonChartProps> = ({
  data,
  title,
  categories,
  height = 300,
  stacked = false,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={height}>
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            {categories.map((category, index) => (
              <Bar
                key={category.key}
                dataKey={category.key}
                name={category.name}
                fill={
                  category.color ||
                  peaceColors.gradient[index % peaceColors.gradient.length]
                }
                stackId={stacked ? "stack" : undefined}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

interface RadarChartProps {
  data: Array<{ [key: string]: string | number }>;
  title: string;
  categories: string[];
  height?: number;
  color?: string;
}

export const PeaceRadarChart: React.FC<RadarChartProps> = ({
  data,
  title,
  categories,
  height = 300,
  color = peaceColors.primary,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={height}>
          <RadarChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          >
            <PolarGrid />
            <PolarAngleAxis dataKey="category" />
            <PolarRadiusAxis angle={90} domain={[0, 100]} />
            <Radar
              name="Score"
              dataKey="value"
              stroke={color}
              fill={color}
              fillOpacity={0.3}
              strokeWidth={2}
            />
            <Tooltip />
          </RadarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

interface ConflictHeatmapProps {
  data: Array<{
    region: string;
    riskLevel: "Low" | "Medium" | "High" | "Critical";
    incidents: number;
    resolved: number;
    coordinates?: [number, number];
  }>;
  title: string;
}

export const ConflictHeatmap: React.FC<ConflictHeatmapProps> = ({
  data,
  title,
}) => {
  const getRiskColor = (level: string) => {
    switch (level) {
      case "Low":
        return "#22c55e";
      case "Medium":
        return "#f59e0b";
      case "High":
        return "#ef4444";
      case "Critical":
        return "#dc2626";
      default:
        return "#6b7280";
    }
  };

  const getRiskIcon = (level: string) => {
    switch (level) {
      case "Low":
        return <CheckCircle className="h-4 w-4" />;
      case "Medium":
        return <AlertTriangle className="h-4 w-4" />;
      case "High":
        return <AlertTriangle className="h-4 w-4" />;
      case "Critical":
        return <AlertTriangle className="h-4 w-4" />;
      default:
        return <Minus className="h-4 w-4" />;
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg">{title}</CardTitle>
        <Button variant="ghost" size="sm">
          <Maximize2 className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {data.map((region, index) => (
            <div
              key={region.region}
              className="flex items-center justify-between p-4 rounded-lg border border-border/50 hover:border-primary/30 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <div
                  className="p-2 rounded-lg"
                  style={{
                    backgroundColor: `${getRiskColor(region.riskLevel)}20`,
                    color: getRiskColor(region.riskLevel),
                  }}
                >
                  {getRiskIcon(region.riskLevel)}
                </div>
                <div>
                  <h4 className="font-medium">{region.region}</h4>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <span>{region.incidents} incidents</span>
                    <span>{region.resolved} resolved</span>
                    <span>
                      {region.incidents > 0
                        ? Math.round((region.resolved / region.incidents) * 100)
                        : 0}
                      % resolution rate
                    </span>
                  </div>
                </div>
              </div>
              <Badge
                variant="outline"
                style={{
                  borderColor: getRiskColor(region.riskLevel),
                  color: getRiskColor(region.riskLevel),
                }}
              >
                {region.riskLevel} Risk
              </Badge>
            </div>
          ))}
        </div>

        {/* Risk Level Legend */}
        <div className="mt-6 p-4 bg-secondary/20 rounded-lg">
          <h5 className="font-medium mb-3">Risk Level Indicators</h5>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {["Low", "Medium", "High", "Critical"].map((level) => (
              <div key={level} className="flex items-center space-x-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: getRiskColor(level) }}
                />
                <span className="text-sm">{level}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

interface ProgressTrackerProps {
  title: string;
  items: Array<{
    name: string;
    current: number;
    target: number;
    unit?: string;
    color?: string;
  }>;
}

export const ProgressTracker: React.FC<ProgressTrackerProps> = ({
  title,
  items,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {items.map((item, index) => {
          const progress = (item.current / item.target) * 100;
          const color =
            item.color ||
            peaceColors.gradient[index % peaceColors.gradient.length];

          return (
            <div key={item.name} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">{item.name}</span>
                <span className="text-muted-foreground">
                  {item.current}
                  {item.unit || ""} / {item.target}
                  {item.unit || ""}
                </span>
              </div>
              <div className="w-full bg-secondary/20 rounded-full h-2">
                <div
                  className="h-2 rounded-full transition-all duration-300"
                  style={{
                    width: `${Math.min(progress, 100)}%`,
                    backgroundColor: color,
                  }}
                />
              </div>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{progress.toFixed(1)}% complete</span>
                {progress >= 100 && (
                  <Badge variant="secondary" className="text-xs">
                    <CheckCircle className="mr-1 h-3 w-3" />
                    Achieved
                  </Badge>
                )}
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};

export default {
  MetricCard,
  TrendChart,
  DistributionChart,
  ComparisonChart,
  PeaceRadarChart,
  ConflictHeatmap,
  ProgressTracker,
};
