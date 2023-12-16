import { webln } from "@getalby/sdk";
import React, {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { l, err } from "@log";
import { getWallet, createWallet, NWC_URL } from '@store/secure';

export interface NWCContextType {
  nwcUrl: string;
  setNwcUrl: Dispatch<SetStateAction<string>>;
  pendingNwcUrl: string;
  setPendingNwcUrl: Dispatch<SetStateAction<string>>;
  nwcAuthUrl: string;
  setNwcAuthUrl: Dispatch<SetStateAction<string>>;
  nostrWebLN: webln.NostrWebLNProvider | undefined;
  setNostrWebLN: Dispatch<SetStateAction<webln.NostrWebLNProvider | undefined>>;
}

export const defaultValues = {
  nwcUrl: "",
  setNwcUrl: () => null,
  pendingNwcUrl: "",
  setPendingNwcUrl: () => null,
  nwcAuthUrl: "",
  setNwcAuthUrl: () => null,
  nostrWebLN: undefined,
  setNostrWebLN: () => null,
};

const NWCContext = createContext<NWCContextType>(defaultValues);

export function NWCProvider({ children }: { children: ReactNode }) {
  const [nwcUrl, setNwcUrl] = useState("");
  const [pendingNwcUrl, setPendingNwcUrl] = useState("");
  const [nwcAuthUrl, setNwcAuthUrl] = useState("");
  const [nostrWebLN, setNostrWebLN] = useState<webln.NostrWebLNProvider | undefined>(undefined);

  useEffect(() => {
    const initializeNWC = async () => {
      const nwcUrl = await getWallet(NWC_URL);
		
      if (!nwcUrl) {
        l('No NWC url found in storage')
        return
      }
      setNwcUrl(nwcUrl);
      const _nostrWebLN = new webln.NostrWebLNProvider({
        nostrWalletConnectUrl: nwcUrl,
      });
      setNostrWebLN(_nostrWebLN);
      await _nostrWebLN.enable();
      l("NostrWebLN enabled!");
      const balace = await _nostrWebLN.getBalance();
      l("Balance:", balace);
      
    };
    initializeNWC();
  }, []);

  return (
    <NWCContext.Provider
      value={{
        nwcUrl,
        setNwcUrl,
        pendingNwcUrl,
        setPendingNwcUrl,
        nwcAuthUrl,
        setNwcAuthUrl,
        nostrWebLN,
        setNostrWebLN,
      }}
    >
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

export function useConnectWithAlby() {
  const {
    nwcUrl,
    setNwcUrl,
    pendingNwcUrl,
    setPendingNwcUrl,
    nwcAuthUrl,
    setNwcAuthUrl,
  } = useContext(NWCContext);

  const connectWithAlby = async () => {
    try {
      const nwc = webln.NostrWebLNProvider.withNewSecret();
      const authUrl = await nwc.getAuthorizationUrl({
        name: "SplitSats App",
      });

      await setPendingNwcUrl(nwc.getNostrWalletConnectUrl(true));
      await setNwcAuthUrl(authUrl.toString());

    } catch (error) {
      console.error('Error connecting with Alby:', error);
    }
  };

  return [
    connectWithAlby,
    nwcUrl,
    pendingNwcUrl,
    nwcAuthUrl,
    setNwcAuthUrl,
    setNwcUrl,
  ];
}

export async function usePayInvoice() {}
