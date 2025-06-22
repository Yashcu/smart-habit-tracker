import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Bar } from 'recharts';
import moment from 'moment';
import { Flame } from 'lucide-react';

export default function HabitChart({ habit }) {
  // Build last 7 days, filling in streaks and check-ins
  // 1. today is always included; 2. checkinDates is a Set of YYYY-MM-DD strings for O(1) lookup
  // 3. streakMap maps date string to streak value at that date
  const today = moment().startOf('day');
  const checkinDates = new Set(habit.history.map(entry => moment(entry.date).format('YYYY-MM-DD')));
  const streakMap = {};
  habit.history.forEach(entry => {
    streakMap[moment(entry.date).format('YYYY-MM-DD')] = entry.streakAtTime || 0;
  });

  // last7Days: array of last 7 days, each with {day, checked, streak, isToday}
  const last7Days = [...Array(7)].map((_, i) => {
    const date = today.clone().subtract(6 - i, 'days');
    const dateStr = date.format('YYYY-MM-DD');
    return {
      day: date.format('ddd'), // Only day name
      checked: checkinDates.has(dateStr) ? 1 : 0,
      streak: streakMap[dateStr] || 0,
      isToday: date.isSame(today, 'day'),
    };
  });

  const hasData = last7Days.some(d => d.checked);

  return (
    <div className="relative bg-white/30 backdrop-blur-md rounded-2xl shadow-xl border border-emerald-200/40 p-6 mt-8 overflow-hidden">
      <div className="flex items-center gap-2 mb-4">
        <Flame className="w-6 h-6 text-yellow-400 animate-pulse" />
        <h2 className="text-xl font-bold text-emerald-800 tracking-wide">{habit.title}</h2>
        <span className="ml-auto bg-gradient-to-r from-emerald-400 to-blue-400 text-white text-xs px-3 py-1 rounded-full shadow-md font-semibold">
          Streak: {habit.currentStreak}
        </span>
      </div>
      {hasData ? (
        <ResponsiveContainer width="100%" height={180}>
          <LineChart data={last7Days}>
            <CartesianGrid stroke="#e0e7ef" strokeDasharray="5 5" />
            <XAxis dataKey="day" tick={{ fontSize: 12, fill: '#64748b' }} />
            <YAxis allowDecimals={false} tick={{ fontSize: 12, fill: '#64748b' }} />
            <Tooltip />
            <Bar dataKey="checked" fill="#3b82f6" barSize={18} radius={[6, 6, 6, 6]} />
            <Line
              type="monotone"
              dataKey="streak"
              stroke="#10b981"
              strokeWidth={3}
              dot={({ cx, cy, payload }) =>
                payload.isToday ? (
                  <circle cx={cx} cy={cy} r={8} fill="#f59e42" stroke="#fff" strokeWidth={2} />
                ) : (
                  <circle cx={cx} cy={cy} r={6} fill="#3b82f6" stroke="#fff" strokeWidth={2} />
                )
              }
              activeDot={{ r: 10, fill: '#10b981', stroke: '#fff', strokeWidth: 2 }}
              isAnimationActive={true}
            />
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <div className="text-center text-gray-500 py-8">
          No check-in data yet. Start building your streak!
        </div>
      )}
    </div>
  );
}
