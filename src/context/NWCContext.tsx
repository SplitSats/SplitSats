import React, {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

export interface NWCContextType {
  nwcUrl: string;
  setNwcUrl: Dispatch<SetStateAction<string>>;
}

export const defaultValues = {
  nwcUrl: "",
  setNwcUrl: () => null,
};

const NWCContext = createContext<NWCContextType>(defaultValues);

export function NWCProvider({ children }: { children: ReactNode }) {
  const [nwcUrl, setNwcUrl] = useState("");

  return (
    <NWCContext.Provider value={{ nwcUrl, setNwcUrl }}>
      {children}
    </NWCContext.Provider>
  );
}

export function useNWCContext() {
  return useContext(NWCContext);
}

export function useNwcUrl() {
  const { nwcUrl, setNwcUrl } = useNWCContext();

  return [nwcUrl, setNwcUrl];
}
