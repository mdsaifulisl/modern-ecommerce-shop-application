import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Mon", current: 20, prev: 15 },
  { name: "Tue", current: 28, prev: 18 },
  { name: "Wed", current: 25, prev: 22 },
  { name: "Thu", current: 50, prev: 28 },
  { name: "Fri", current: 15, prev: 35 },
  { name: "Sat", current: 38, prev: 20 },
  { name: "Sun", current: 45, prev: 38 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 shadow-lg border rounded-3" style={{ minWidth: '120px' }}>
        <p className="text-muted small mb-1 fw-bold">{label}</p>
        <div className="d-flex flex-column gap-1">
          <span className="text-primary small">
            Current: <strong>${payload[1].value}</strong>
          </span>
          <span className="text-secondary small" style={{ opacity: 0.7 }}>
            Previous: <strong>${payload[0].value}</strong>
          </span>
        </div>
      </div>
    );
  }
  return null;
};

const DashboardChart = () => {
  return (
    <div className="card border-0 shadow-sm p-4 h-100">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h6 className="text-muted small fw-bold text-uppercase mb-1">Revenue Performance</h6>
          <h4 className="fw-bold mb-0">$12,480.00 <span className="text-success small fw-normal" style={{ fontSize: '0.9rem' }}>+12.5%</span></h4>
        </div>
        <select className="form-select form-select-sm w-auto border-0 bg-light">
          <option>Last 7 Days</option>
          <option>Last 30 Days</option>
        </select>
      </div>

      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorBlue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#f0f0f0" />
            
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#94a3b8', fontSize: 12 }} 
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#94a3b8', fontSize: 12 }} 
            />

            <Tooltip content={<CustomTooltip />} />

            {/* Background "Previous Period" Line */}
            <Area
              type="monotone"
              dataKey="prev"
              stroke="#cbd5e1"
              strokeWidth={2}
              strokeDasharray="5 5"
              fill="transparent"
              activeDot={false}
            />

            {/* Main "Current Period" Line */}
            <Area
              type="monotone"
              dataKey="current"
              stroke="#3b82f6"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorBlue)"
              activeDot={{ 
                r: 6, 
                fill: "#fff", 
                stroke: "#3b82f6", 
                strokeWidth: 2 
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DashboardChart;