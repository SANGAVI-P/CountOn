import * as React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { create, all } from 'mathjs';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const math = create(all);

type GraphingViewProps = {
  expression: string;
};

const GraphingView = ({ expression }: GraphingViewProps) => {
  const [data, setData] = React.useState<any[]>([]);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    try {
      const node = math.parse(expression);
      const code = node.compile();
      
      const points = [];
      for (let x = -10; x <= 10; x += 0.5) {
        try {
          const y = code.evaluate({ x: x });
          if (Number.isFinite(y)) {
            points.push({ x, y: parseFloat(y.toFixed(4)) });
          }
        } catch (e) {
          // Ignore points that fail to evaluate (e.g., log(-1))
        }
      }

      if (points.length < 2) {
        setError("Could not generate enough points to plot this function.");
        setData([]);
      } else {
        setData(points);
        setError(null);
      }
    } catch (err: any) {
      setError(`Invalid function: ${err.message}`);
      setData([]);
    }
  }, [expression]);

  if (error) {
    return (
      <div className="text-center text-destructive p-4 mt-4">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <Card className="mt-4 animate-pop-in">
      <CardHeader>
        <CardTitle className="text-center text-lg">Graph of y = {expression}</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={data}
            margin={{ top: 5, right: 20, left: -10, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="x" type="number" domain={['auto', 'auto']} />
            <YAxis />
            <Tooltip
              formatter={(value: number) => value.toFixed(4)}
              labelFormatter={(label: number) => `x = ${label}`}
            />
            <Legend />
            <Line type="monotone" dataKey="y" name={expression} stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default GraphingView;