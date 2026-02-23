import React, { useEffect, useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useOrders } from '../../context/OrderContext';

const TrendChart = () => {
  const { orders, fetchAllOrders } = useOrders();

  const data = useMemo(() => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const result = days.map((day) => ({ name: day, sales: 0 }));

    orders.forEach((order) => {
      if (order.status !== "Shipped" && order.status !== "Delivered") return;
      const dayIndex = new Date(order.createdAt).getDay();
      result[dayIndex].sales += Number(order.total);
    });

    return result;
  }, [orders]);

  useEffect(() => {
    fetchAllOrders();
  }, [fetchAllOrders]);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="name" axisLine={false} tickLine={false} />
        <YAxis axisLine={false} tickLine={false} />
        <Tooltip />
        <Area type="monotone" dataKey="sales" stroke="#8884d8" fillOpacity={1} fill="url(#colorSales)" />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default TrendChart;
