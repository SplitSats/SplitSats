import React, { ReactNode, createContext, useContext } from "react";

const NWCContext = createContext<null>(null);

export function NWCProvider({ children }: { children: ReactNode }) {
  return <NWCContext.Provider value={null}>{children}</NWCContext.Provider>;
}

export function useNWCContext() {
  return useContext(NWCContext);
}
