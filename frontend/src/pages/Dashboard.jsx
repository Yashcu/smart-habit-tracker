import { useEffect, useState } from 'react';
import { getHabits, createHabit, updateHabit, deleteHabit, checkInHabit } from '../services/api';
import HabitForm from '../components/HabitForm';
import HabitList from '../components/HabitList';
import HabitChart from '../components/HabitChart';

export default function Dashboard() {
  const [habits, setHabits] = useState([]);
  const [selectedHabit, setSelectedHabit] = useState(null);

  const loadHabits = async () => {
    const res = await getHabits();
    setHabits(res.data);
  };

  useEffect(() => {
    loadHabits();
  }, []);

  const handleCreate = async (data) => {
    await createHabit(data);
    loadHabits();
  };

  const handleDelete = async (id) => {
    await deleteHabit(id);
    loadHabits();
    setSelectedHabit(null);
  };

  const handleCheckIn = async (id) => {
    await checkInHabit(id);
    loadHabits();
  };

  // Handler for selecting a habit to view its chart
  const handleTrackHabit = (habit) => {
    setSelectedHabit(habit);
  };

  const handleCloseChart = () => {
    setSelectedHabit(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-emerald-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white/90 rounded-xl shadow-lg p-6">
        <h1 className="text-3xl mb-6 text-center font-bold text-emerald-700">Your Habits</h1>
        <HabitForm
          onSubmit={handleCreate}
          existingHabits={habits.map(h => h.title)}
        />
        <div className="mt-6">
          <HabitList
            habits={habits}
            onDelete={handleDelete}
            onCheckIn={handleCheckIn}
            onTrackHabit={handleTrackHabit}
          />
        </div>
        {/* Chart Modal */}
        {selectedHabit && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-lg w-full relative">
              <button
                onClick={handleCloseChart}
                className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-2xl font-bold"
                aria-label="Close chart"
              >
                &times;
              </button>
              <HabitChart habit={selectedHabit} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
