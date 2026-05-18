"use client";

import { createContext, useCallback, useContext, useState } from "react";
import { CallbackModal } from "./CallbackModal";

export type CallbackContext = {
  trade?: string;
  citySlug?: string;
  cityName?: string;
  postalCode?: string;
  artisanName?: string;
};

type CallbackProviderValue = {
  open: (ctx?: CallbackContext) => void;
};

const Ctx = createContext<CallbackProviderValue | null>(null);

export function useCallback_(): CallbackProviderValue {
  const v = useContext(Ctx);
  if (!v) throw new Error("useCallback_ must be used within <CallbackProvider>");
  return v;
}

export function CallbackProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [context, setContext] = useState<CallbackContext>({});

  const open = useCallback((ctx?: CallbackContext) => {
    setContext(ctx ?? {});
    setIsOpen(true);
  }, []);

  return (
    <Ctx.Provider value={{ open }}>
      {children}
      <CallbackModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        context={context}
      />
    </Ctx.Provider>
  );
}
