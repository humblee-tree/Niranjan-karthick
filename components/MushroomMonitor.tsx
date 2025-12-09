import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { CultivationBatch } from '../types';
import { AlertTriangle, CheckCircle, Thermometer, Droplets, Wind, Activity, RefreshCw } from 'lucide-react';

interface Props {
  batch: CultivationBatch;
}

export const MushroomMonitor: React.FC<Props> = ({ batch }) => {
  const [data, setData] = useState(batch.readings.map(r => ({
    ...r,
    time: new Date(r.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  })));

  // Simulation State for "IoT" inputs
  const [simTemp, setSimTemp] = useState(data[data.length - 1].temperature);
  const [simHum, setSimHum] = useState(data[data.length - 1].humidity);
  const [simCo2, setSimCo2] = useState(data[data.length - 1].co2);
  const [isSimulating, setIsSimulating] = useState(false);

  // Auto-simulation effect
  useEffect(() => {
    let interval: any;
    if (isSimulating) {
      interval = setInterval(() => {
        // Random fluctuation
        const newTemp = simTemp + (Math.random() - 0.5) * 0.5;
        const newHum = Math.min(100, Math.max(0, simHum + (Math.random() - 0.5) * 2));
        const newCo2 = Math.max(400, simCo2 + (Math.random() - 0.5) * 20);

        setSimTemp(newTemp);
        setSimHum(newHum);
        setSimCo2(newCo2);

        const newPoint = {
          timestamp: new Date().toISOString(),
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          temperature: newTemp,
          humidity: newHum,
          co2: newCo2
        };

        setData(prev => [...prev.slice(1), newPoint]);
      }, 2000);
    }
    return () => clearInterval(interval);
  }, [isSimulating, simTemp, simHum, simCo2]);

  const latest = data[data.length - 1];

  // Thresholds (Example for Oyster Mushrooms)
  const isTempCritical = latest.temperature > 28 || latest.temperature < 15;
  const isHumCritical = latest.humidity < 70;

  return (
    <div className="bg-white rounded-xl shadow-lg border border-stone-200 overflow-hidden">
      {/* Header */}
      <div className="bg-stone-50 px-6 py-4 border-b border-stone-200 flex justify-between items-center">
        <div>
          <div className="flex items-center gap-3">
            <h3 className="text-xl font-bold text-stone-800">{batch.name}</h3>
            <span className={`text-xs px-2 py-0.5 rounded-full border font-bold uppercase tracking-wider ${
              isTempCritical || isHumCritical ? 'bg-red-100 text-red-700 border-red-200' : 
              batch.status === 'Warning' ? 'bg-yellow-100 text-yellow-700 border-yellow-200' :
              'bg-emerald-100 text-emerald-700 border-emerald-200'
            }`}>
              {isTempCritical || isHumCritical ? 'CRITICAL' : batch.status}
            </span>
          </div>
          <p className="text-xs text-stone-500 mt-1">Species: <span className="font-medium text-stone-700">{batch.species}</span> • Stage: {batch.stage}</p>
        </div>
        <button 
          onClick={() => setIsSimulating(!isSimulating)}
          className={`flex items-center gap-2 px-3 py-1.5 rounded text-xs font-bold transition-all ${
            isSimulating ? 'bg-emerald-600 text-white shadow-emerald-200 shadow-md' : 'bg-white border border-stone-300 text-stone-600 hover:bg-stone-50'
          }`}
        >
          {isSimulating ? <Activity size={14} className="animate-pulse" /> : <RefreshCw size={14} />}
          {isSimulating ? 'SENSORS ACTIVE' : 'START SENSORS'}
        </button>
      </div>

      <div className="p-6">
        {/* Real-time KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className={`p-4 rounded-xl border-2 transition-all duration-500 ${isTempCritical ? 'bg-red-50 border-red-200' : 'bg-blue-50 border-blue-100'}`}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase text-stone-500">Temperature</span>
              <Thermometer size={20} className={isTempCritical ? 'text-red-500' : 'text-blue-500'} />
            </div>
            <div className="flex items-baseline gap-1">
              <span className={`text-3xl font-bold ${isTempCritical ? 'text-red-700' : 'text-blue-700'}`}>
                {latest.temperature.toFixed(1)}
              </span>
              <span className="text-sm text-stone-500">°C</span>
            </div>
            <div className="w-full bg-stone-200 h-1.5 rounded-full mt-3 overflow-hidden">
               <div 
                 className={`h-full ${isTempCritical ? 'bg-red-500' : 'bg-blue-500'}`} 
                 style={{width: `${(latest.temperature / 40) * 100}%`}}
               ></div>
            </div>
          </div>

          <div className={`p-4 rounded-xl border-2 transition-all duration-500 ${isHumCritical ? 'bg-red-50 border-red-200' : 'bg-cyan-50 border-cyan-100'}`}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase text-stone-500">Humidity</span>
              <Droplets size={20} className={isHumCritical ? 'text-red-500' : 'text-cyan-500'} />
            </div>
            <div className="flex items-baseline gap-1">
              <span className={`text-3xl font-bold ${isHumCritical ? 'text-red-700' : 'text-cyan-700'}`}>
                {latest.humidity.toFixed(1)}
              </span>
              <span className="text-sm text-stone-500">%</span>
            </div>
            <div className="w-full bg-stone-200 h-1.5 rounded-full mt-3 overflow-hidden">
               <div 
                 className={`h-full ${isHumCritical ? 'bg-red-500' : 'bg-cyan-500'}`} 
                 style={{width: `${latest.humidity}%`}}
               ></div>
            </div>
          </div>

          <div className="p-4 rounded-xl border-2 bg-stone-50 border-stone-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase text-stone-500">CO2 Level</span>
              <Wind size={20} className="text-stone-500" />
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-bold text-stone-700">
                {Math.round(latest.co2)}
              </span>
              <span className="text-sm text-stone-500">ppm</span>
            </div>
            <div className="w-full bg-stone-200 h-1.5 rounded-full mt-3 overflow-hidden">
               <div className="h-full bg-stone-500" style={{width: `${(latest.co2 / 2000) * 100}%`}}></div>
            </div>
          </div>
        </div>

        {/* Live Chart */}
        <div className="h-[300px] w-full bg-white rounded-lg p-2 border border-stone-100">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis dataKey="time" tick={{fontSize: 10}} tickMargin={10} stroke="#a8a29e" minTickGap={30} />
              <YAxis yAxisId="left" tick={{fontSize: 10}} stroke="#3b82f6" domain={[10, 35]} label={{ value: 'Temp (°C)', angle: -90, position: 'insideLeft', fontSize: 10 }} />
              <YAxis yAxisId="right" orientation="right" tick={{fontSize: 10}} stroke="#06b6d4" domain={[50, 100]} label={{ value: 'Humidity (%)', angle: 90, position: 'insideRight', fontSize: 10 }} />
              <Tooltip 
                contentStyle={{backgroundColor: '#fff', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                itemStyle={{fontSize: '12px', fontWeight: 600}}
              />
              <Line yAxisId="left" type="monotone" dataKey="temperature" stroke="#3b82f6" strokeWidth={3} dot={false} isAnimationActive={false} />
              <Line yAxisId="right" type="monotone" dataKey="humidity" stroke="#06b6d4" strokeWidth={3} dot={false} isAnimationActive={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Manual Input Override (IoT Simulation) */}
        <div className="mt-6 pt-4 border-t border-stone-100">
          <p className="text-xs font-bold text-stone-400 uppercase mb-3">Simulate Sensor Inputs (IoT Gateway)</p>
          <div className="flex gap-4 items-center">
            <div className="flex-1">
               <label className="text-xs text-stone-500 block mb-1">Set Temp</label>
               <input 
                 type="range" min="10" max="40