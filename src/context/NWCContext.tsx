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
import { WebView } from "react-native-webview";

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
  const [nostrWebLN, setNostrWebLN] = useState<
    webln.NostrWebLNProvider | undefined
  >(undefined);

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

export function useNWCEnable(_nwcUrl?: string) {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<any>(undefined);
  const { nwcUrl, setNwcUrl, setNostrWebLN } = useNWCContext();

  if (_nwcUrl) setNwcUrl(_nwcUrl);

  useEffect(() => {
    if (!nwcUrl) {
      return;
    }

    async () => {
      try {
        setIsLoading(true);

        const _nostrWebLN = new webln.NostrWebLNProvider({
          nostrWalletConnectUrl: nwcUrl,
        });
        setNostrWebLN(_nostrWebLN);
        await _nostrWebLN.enable();
        l("NostrWebLN enabled!");
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setIsError(true);
        setError(error);
        err(error);
      }
    };
  }, [nwcUrl]);

  return [isLoading, isError, error, webln];
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

export function usePayInvoice() {}
