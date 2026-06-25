import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

const emptyUser = {
  name: '',
  username: '',
  email: '',
  mobile: '',
};

const useStore = create(
  persist(
    (set) => ({
      user: emptyUser,
      selectedCategories: [],
      notes: '',
      hasVisitedDashboard: false,

      setUser: (user) => set({ user }),
      setSelectedCategories: (categories) => set({ selectedCategories: categories }),
      setNotes: (notes) => {
        localStorage.setItem('dashboardNote', notes);
        set({ notes });
      },
      setHasVisitedDashboard: (hasVisitedDashboard) => set({ hasVisitedDashboard }),
      resetStore: () => {
        localStorage.removeItem('dashboardNote');
        set({
          user: emptyUser,
          selectedCategories: [],
          notes: '',
          hasVisitedDashboard: false,
        });
      },
    }),
    {
      name: 'super-app-store',
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        if (!state) return;

        const legacyNote = localStorage.getItem('dashboardNote');
        if (legacyNote && !state.notes) {
          state.setNotes(legacyNote);
        }
      },
      partialize: (state) => ({
        user: state.user,
        selectedCategories: state.selectedCategories,
        notes: state.notes,
        hasVisitedDashboard: state.hasVisitedDashboard,
      }),
    },
  ),
);

export default useStore;
