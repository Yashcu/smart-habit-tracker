import moment from 'moment';
import { CheckCircle, Trash2, Flame, BarChart2 } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

export default function HabitList({ habits, onDelete, onCheckIn, onTrackHabit }) {
  const [deleteId, setDeleteId] = useState(null);
  const [confirmName, setConfirmName] = useState('');
  const [error, setError] = useState('');
  const habitToDelete = habits.find((h) => h._id === deleteId);

  // Delete confirmation: user must type the habit name to confirm
  const handleDelete = () => {
    if (confirmName.trim().toLowerCase() !== habitToDelete.title.trim().toLowerCase()) {
      setError('Habit name does not match.');
      return;
    }
    onDelete(deleteId);
    setDeleteId(null);
    setConfirmName('');
    setError('');
  };

  return (
    <>
      <ul className="space-y-4">
        <AnimatePresence>
          {habits.map((habit) => {
            const today = moment().startOf('day');
            const last = habit.lastCompleted ? moment(habit.lastCompleted).startOf('day') : null;
            const isCheckedToday = last && today.isSame(last);

            return (
              <motion.li
                key={habit._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.25, type: 'tween' }}
                className="relative p-4 bg-white/80 rounded-xl border border-emerald-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <CheckCircle className="w-5 h-5 text-emerald-500" />
                    <span className="text-lg font-semibold text-emerald-900 truncate">{habit.title}</span>
                  </div>
                  <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-700 text-xs px-2 py-0.5 rounded-full font-medium">
                    <Flame className="w-4 h-4 text-yellow-400" />
                    Streak: {habit.currentStreak}
                  </span>
                </div>
                <div className="flex gap-2 mt-2 sm:mt-0">
                  <button
                    disabled={isCheckedToday}
                    onClick={() => onCheckIn(habit._id)}
                    className={`flex items-center gap-1 px-3 py-2 rounded-lg font-semibold transition focus:ring-2 focus:ring-emerald-400 outline-none duration-200 text-sm ${
                      isCheckedToday
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        : 'bg-emerald-500 text-white hover:bg-emerald-600'
                    }`}
                    title={isCheckedToday ? 'Already checked in today' : 'Check in'}
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span className="hidden sm:inline">{isCheckedToday ? 'Done' : 'Check In'}</span>
                  </button>
                  {onTrackHabit && (
                    <button
                      onClick={() => onTrackHabit(habit)}
                      className="flex items-center gap-1 px-3 py-2 rounded-lg font-semibold transition focus:ring-2 focus:ring-blue-400 outline-none duration-200 text-sm bg-blue-100 text-blue-700 hover:bg-blue-200"
                      title="Track Habit"
                    >
                      <BarChart2 className="w-4 h-4" />
                      <span className="hidden sm:inline">Track</span>
                    </button>
                  )}
                  <button
                    onClick={() => { setDeleteId(habit._id); setConfirmName(''); setError(''); }}
                    className="flex items-center gap-1 px-3 py-2 rounded-lg font-semibold transition focus:ring-2 focus:ring-red-400 outline-none duration-200 text-sm bg-red-100 text-red-600 hover:bg-red-200"
                    title="Delete Habit"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span className="hidden sm:inline">Delete</span>
                  </button>
                </div>
              </motion.li>
            );
          })}
        </AnimatePresence>
      </ul>
      {/* Delete Confirmation Modal */}
      {deleteId && habitToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl shadow-xl p-8 max-w-sm w-full flex flex-col items-center">
            <h2 className="text-xl font-bold mb-2 text-red-600">Confirm Delete</h2>
            <p className="mb-4 text-center">Type <span className="font-bold text-emerald-600">{habitToDelete.title}</span> to confirm deletion.</p>
            <input
              className="w-full p-2 border rounded mb-2 text-center"
              value={confirmName}
              onChange={e => { setConfirmName(e.target.value); setError(''); }}
              placeholder="Habit name"
              autoFocus
            />
            {error && <div className="text-red-600 mb-2 font-semibold">{error}</div>}
            <div className="flex gap-2 mt-2">
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white px-4 py-2 rounded-full font-bold hover:bg-red-600 transition"
              >
                Delete
              </button>
              <button
                onClick={() => { setDeleteId(null); setConfirmName(''); setError(''); }}
                className="bg-gray-300 px-4 py-2 rounded-full font-bold"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
