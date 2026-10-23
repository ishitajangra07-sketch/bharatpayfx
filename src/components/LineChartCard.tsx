import React, { useState } from 'react';
import { ChartPoint } from '../types';
import { getSvgPathFromPoints, getAreaPathFromPoints, Point } from '../utils/chartUtils';

interface LineChartCardProps {
  data: ChartPoint[];
}

export const LineChartCard: React.FC<LineChartCardProps> = ({ data }) => {
  const [activePoint, setActivePoint] = useState<ChartPoint | null>(null);

  // Compute X and Y coords in 0..100 space
  // 5 grid lines: 50k (16), 40k (34), 30k (52), 20k (70), 10k (88)
  const xValues = [6, 19, 32, 45, 58, 71, 84, 97];

  const profitPoints: Point[] = data.map((d, i) => {
    const y = 88 - ((d.profit - 10) / 40) * 72;
    return { x: xValues[i], y };
  });

  const lossPoints: Point[] = data.map((d, i) => {
    const y = 88 - ((d.loss - 10) / 40) * 72;
    return { x: xValues[i], y };
  });

  const profitPath = getSvgPathFromPoints(profitPoints);
  const profitAreaPath = getAreaPathFromPoints(profitPoints, 88);
  const lossPath = getSvgPathFromPoints(lossPoints);

  const yLabels = [
    { label: '50k', y: 16 },
    { label: '40k', y: 34 },
    { label: '30k', y: 52 },
    { label: '20k', y: 70 },
    { label: '10k', y: 88 },
  ];

  return (
    <div className="lg:col-span-5 bg-white rounded-[32px] p-7 card-shadow border border-gray-100/60 flex flex-col justify-between transition-all duration-300 hover:shadow-card-hover">
      {/* Header & Legend */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <h3 className="text-[18px] font-semibold text-zinc-900 leading-snug">
            Total Income
          </h3>
          <p className="text-xs text-gray-400 font-medium mt-0.5">
            Cross-Border Inflows vs Outward Settlements (Jan – Aug 2026)
          </p>
        </div>

        {/* Legend: Color dots for 'Profit' (Blue) and 'Loss' (Black) */}
        <div className="flex items-center gap-4 text-xs font-medium">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#3B82F6] ring-2 ring-blue-100" />
            <span className="text-zinc-800 font-semibold">Profit (Inflows)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#18181B] ring-2 ring-gray-100" />
            <span className="text-zinc-800 font-semibold">Loss (Outflows)</span>
          </div>
        </div>
      </div>

      {/* Chart Canvas Area */}
      <div className="relative w-full h-[220px] select-none">
        {/* Y-Axis Labels (10px size in gray-400) */}
        <div className="absolute left-0 top-0 bottom-6 w-8 flex flex-col justify-between text-right pr-2 pointer-events-none">
          {yLabels.map((item) => (
            <span
              key={item.label}
              className="text-[10px] text-gray-400 font-medium leading-none"
            >
              {item.label}
            </span>
          ))}
        </div>

        {/* Chart Viewport (Left offset 36px for Y-axis) */}
        <div className="absolute left-9 right-2 top-0 bottom-6">
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="w-full h-full overflow-visible"
          >
            <defs>
              <linearGradient id="profitGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.18" />
                <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Exactly 5 horizontal grid lines */}
            {yLabels.map((grid) => (
              <line
                key={grid.label}
                x1="0"
                y1={grid.y}
                x2="100"
                y2={grid.y}
                stroke="#F1F3F5"
                strokeWidth="1"
              />
            ))}

            {/* Profit Area Gradient Fill */}
            <path d={profitAreaPath} fill="url(#profitGradient)" />

            {/* Loss Path: Dashed zinc-900 path (stroke-dasharray='4 2') */}
            <path
              d={lossPath}
              fill="none"
              stroke="#18181B"
              strokeWidth="2"
              strokeDasharray="4 2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Profit Path: Solid blue #3b82f6 smooth path (stroke-width 2.5) */}
            <path
              d={profitPath}
              fill="none"
              stroke="#3B82F6"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          {/* Circular Nodes at monthly intervals (Jan-Aug) */}
          {/* Profit Nodes: #3B82F6 with 2px white border and shadow */}
          {profitPoints.map((pt, i) => (
            <div
              key={`profit-node-${i}`}
              style={{ left: `${pt.x}%`, top: `${pt.y}%` }}
              onMouseEnter={() => setActivePoint(data[i])}
              onMouseLeave={() => setActivePoint(null)}
              className="absolute w-[10px] h-[10px] -ml-[5px] -mt-[5px] rounded-full bg-[#3B82F6] border-2 border-white shadow-md hover:scale-150 transition-transform cursor-pointer z-20"
              title={`${data[i].month}: Profit $${data[i].rawProfit.toLocaleString()}`}
            />
          ))}

          {/* Loss Nodes: #18181B with 2px white border and shadow */}
          {lossPoints.map((pt, i) => (
            <div
              key={`loss-node-${i}`}
              style={{ left: `${pt.x}%`, top: `${pt.y}%` }}
              onMouseEnter={() => setActivePoint(data[i])}
              onMouseLeave={() => setActivePoint(null)}
              className="absolute w-[10px] h-[10px] -ml-[5px] -mt-[5px] rounded-full bg-[#18181B] border-2 border-white shadow-md hover:scale-150 transition-transform cursor-pointer z-10"
              title={`${data[i].month}: Outflow $${data[i].rawLoss.toLocaleString()}`}
            />
          ))}

          {/* Active Hover Tooltip */}
          {activePoint && (
            <div className="absolute top-2 right-4 bg-zinc-900 text-white px-3 py-1.5 rounded-xl text-xs shadow-xl border border-zinc-700 pointer-events-none z-30 animate-in fade-in duration-150">
              <span className="font-bold text-[#3B82F6]">{activePoint.month}: </span>
              <span>Inflow +${activePoint.rawProfit.toLocaleString()}</span>
              <span className="text-gray-400 mx-1.5">|</span>
              <span className="text-gray-300">Outflow -${activePoint.rawLoss.toLocaleString()}</span>
            </div>
          )}
        </div>

        {/* X-Axis Labels (Jan-Aug in gray-400, 10px size) */}
        <div className="absolute left-9 right-2 bottom-0 h-5 flex justify-between pointer-events-none">
          {data.map((item, idx) => (
            <div
              key={item.month}
              style={{ left: `${xValues[idx]}%` }}
              className="absolute -translate-x-1/2 text-[10px] text-gray-400 font-medium"
            >
              {item.month}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
