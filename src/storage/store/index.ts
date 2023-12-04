import { SecureStore } from '@store/SecureStore'
import AsyncStorage from "@react-native-async-storage/async-storage"
import { StateStorage } from 'zustand/middleware';
import { create, GetState, SetState } from 'zustand'

import { createJSONStorage, persist } from 'zustand/middleware';
import { ZustandAsyncStorage } from '@store/persist';
import { ContactManager } from '@src/managers/contact'
import { GroupManager } from '@src/managers/group'
import { plainToInstance, instanceToPlain } from 'class-transformer';
import { l } from '@log';


interface ContactManagerStore {
  contactManager: string | null;
  initializeContactManager: () => Promise<void>;
  getContactManager: () => ContactManager | null;
  setContactManager: (manager: ContactManager) => void;
  clearContactManager: () => void;
  rehydrated: boolean;
  setRehydrated: () => void;
}

export const useContactManagerStore = create<ContactManagerStore>()(
  persist(
    (set, get) => ({
      rehydrated: false,
      setRehydrated: () => set({ rehydrated: true }),
      contactManager: null,
      initializeContactManager: async () => {
        const storage = createJSONStorage(() => AsyncStorage);
        const newManager = new ContactManager();
        set({ contactManager: newManager });
        const data = JSON.stringify(instanceToPlain(newManager));
        l('[STORE] initializeContact - ManagerContactManager created');
        l('[STORE]initializeContactManager - ', newManager);
        l('[STORE] - ', data);
        await storage?.setItem('contactManager', data);
      },
      getContactManager: () => {
        const manager = get().contactManager;
        l('[STORE] getContactManager-Manager: ', manager);

        if (manager) {
          const data = plainToInstance(ContactManager, manager);
          l('[STORE] getContactManager-Return: ', data);
          return data
        }
      },
      setContactManager: (manager) => {
        l('[STORE] setContactManager - Manager: ', manager);
        l('[STORE] setContactManager - Type Manager: ', typeof manager);
        set({ contactManager: manager });
        const storage = createJSONStorage(() => AsyncStorage);
        const data = JSON.stringify(instanceToPlain(manager));
        l('[STORE] setContactManager - Data:', data);
        storage?.setItem('contactManager', data);
      },
      clearContactManager: () => {
        set({ contactManager: null });
      },
    }),
    {
      name: 'contactManager-storage',
      storage: createJSONStorage(() => AsyncStorage),
      onRehydrateStorage: (state) => {
        return (state, error) => {
          if (error || !state) {
            console.log('An error happened during hydration', error);
          } else {
            const parsedManager = plainToInstance(ContactManager, JSON.parse(state.contactManager));
            state.contactManager = parsedManager;
            state.setRehydrated();
          }
        };
      },
    }
  )
);


export const useGroupManagerStore = create(
  persist(
    (set) => ({
      groupManager: new GroupManager(),
      setGroupManager: (manager) => set({ groupManager: manager }),
      clearGroupManager: () => set({ groupManager: null }),
    }),
    {
      name: 'groupManager-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

// Create a store to manage the user profile state
export const useUserProfileStore = create(
  persist(
    (set) => ({
      userProfile: {} as NostrProfileContent,
      setUserProfile: (profile: NostrProfileContent) => set({ userProfile: profile }),
      clearUserProfile: () => set({ userProfile: {} }),
    }),
    {
      name: 'userProfile-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

interface AppState {
  apps: App[];
  addApp: (app: App) => void;
  getAppByID: (id: string) => App | undefined;
  removeAppByID: (id: string) => void;
  removeApps: () => void;
  //internal
  rehydrated: boolean;
  setRehydrated: () => void;
}

interface App {
  id: string;
  relay: string;
  name: string;
  label: string;
  icons: string[];
  url: string;
}

export const useAppsStore = create<AppState>()(
  persist(
    (set, get) => ({
      rehydrated: false,
      setRehydrated: () => set((state) => ({ ...state, rehydrated: true })),
      apps: [],
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


