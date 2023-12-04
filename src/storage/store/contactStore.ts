import { SecureStore } from '@store/SecureStore'
import AsyncStorage from "@react-native-async-storage/async-storage"
import { StateStorage } from 'zustand/middleware';
import { create, GetState, SetState } from 'zustand'

import { createJSONStorage, persist } from 'zustand/middleware';
import { ZustandAsyncStorage } from '@store/persist';
import { ContactManager } from '@src/managers/contact'
import { GroupManager } from '@src/managers/group'

interface ContactManagerStore {
    contactManager: ContactManager | null;
    initializeContactManager: () => Promise<void>;
    getContactManager: () => ContactManager | undefined;
    setContactManager: (manager: ContactManager) => void;
    clearContactManager: () => void;
    rehydrated: boolean;
    setRehydrated: () => void;
  }
  
  export const useContactManagerStore = create<ContactManagerStore>()(
    persist(
      (set, get) => ({
        rehydrated: false,
        setRehydrated: () => set((state) => ({ ...state, rehydrated: true })),
        contactManager: null, 
        initializeContactManager: async () => {
            const storage = createJSONStorage(() => AsyncStorage);
    
            try {
              const storedContactManager = await storage.getItem('contactManager');
              if (storedContactManager) {
                set({ contactManager: new ContactManager(storedContactManager), loading: false });
              } else {
                const newManager = new ContactManager();
                set({ contactManager: newManager });
                await storage.setItem('contactManager', newManager);
              }
            } catch (error) {
              console.error('Error loading ContactManager:', error);
              set({ contactManager: null });
            }
          },


        addApp: (app: App): void => set((state) => ({ ...state, apps: [...state.apps, app] })),
        getAppByID: (id: string): App | undefined => {
          const app = get().apps.find((app) => app.id === id);
          return app;
        },
        removeApps: (): void => set({ apps: [] }),
        removeAppByID: (id: string): void => {
          const apps = get().apps.filter((app) => app.id !== id);
          set({ apps });
        },
      }),
      {
        name: 'splitsats-store', // unique name
        storage: createJSONStorage(() => ZustandAsyncStorage),
        onRehydrateStorage: (state) => {
          return (state, error) => {
            if (error || !state) {
              console.log('an error happened during hydration', error);
            } else {
              state.setRehydrated();
            }
          };
        },
      }
    )
  );
  
  
  