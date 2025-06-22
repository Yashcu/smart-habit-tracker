import { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';

export default function HabitForm({ onSubmit, editingHabit, onCancel, existingHabits = [] }) {
  const [form, setForm] = useState({ title: '', frequency: 'daily' });
  const [error, setError] = useState('');

  useEffect(() => {
    if (editingHabit) {
      setForm({
        title: editingHabit.title,
        frequency: editingHabit.frequency,
      });
    }
  }, [editingHabit]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleFrequency = (freq) => {
    setForm((f) => ({ ...f, frequency: freq }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Prevent duplicate habits (case-insensitive)
    const isDuplicate = existingHabits.some(
      (t) => t.trim().toLowerCase() === form.title.trim().toLowerCase()
    );
    if (isDuplicate) {
      setError('A habit with this name already exists.');
      return;
    }
    onSubmit(form);
    setForm({ title: '', frequency: 'daily' });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 rounded-xl shadow-lg border border-emerald-100">
      <input
        name="title"
        placeholder="Habit title"
        value={form.title}
        onChange={handleChange}
        className="w-full p-3 border rounded-lg text-lg focus:ring-2 focus:ring-emerald-400 outline-none"
        required
      />
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => handleFrequency('daily')}
          className={`flex-1 py-2 rounded-full font-semibold transition-all duration-150 border-2 ${form.frequency === 'daily' ? 'bg-emerald-500 text-white border-emerald-500 shadow-md' : 'bg-gray-100 text-gray-700 border-gray-200'}`}
        >
          Daily
        </button>
        <button
          type="button"
          onClick={() => handleFrequency('weekly')}
          className={`flex-1 py-2 rounded-full font-semibold transition-all duration-150 border-2 ${form.frequency === 'weekly' ? 'bg-blue-500 text-white border-blue-500 shadow-md' : 'bg-gray-100 text-gray-700 border-gray-200'}`}
        >
          Weekly
        </button>
      </div>
      {error && <div className="text-red-600 text-center font-semibold bg-red-100 rounded p-2">{error}</div>}
      <div className="flex justify-center gap-2">
        <button
          className="flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-blue-500 text-white px-6 py-3 rounded-full font-bold shadow-lg hover:from-emerald-600 hover:to-blue-600 transition-all text-lg focus:ring-2 focus:ring-emerald-400 outline-none"
          type="submit"
        >
          <Plus className="w-5 h-5" />
          {editingHabit ? 'Update' : 'Add Habit'}
        </button>
        {editingHabit && (
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-300 px-6 py-3 rounded-full font-bold text-lg"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
