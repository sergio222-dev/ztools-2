import type { QRL} from "@builder.io/qwik";
import { $, createContextId, useContext, useContextProvider, useStore } from "@builder.io/qwik";

export interface AppStore {
  isDrawerOpen: boolean
}

interface AppContext {
  store: AppStore;
  toggleDrawer: QRL<() => void>;
}

export const AppContext = createContextId<AppContext>('ZDM.app');

export const useAppProvider = () => {
  const store = useStore<AppStore>({
    isDrawerOpen: true,
  });

  const toggleDrawer = $(() => {
    store.isDrawerOpen = !store.isDrawerOpen;
  });

  const service = { store, toggleDrawer };
  useContextProvider(AppContext, service);
}

export const useApp = () => useContext(AppContext);
