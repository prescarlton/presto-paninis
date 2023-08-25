import { ClerkProvider } from "@clerk/nextjs";
import { type AppType } from "next/app";
import { api } from "../utils/api";

import "../styles/globals.css";
import { Toaster } from "@/components/ui/toaster";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ClerkProvider {...pageProps}>
      <Component {...pageProps} />
      <Toaster />
    </ClerkProvider>
  );
};

export default api.withTRPC(MyApp);
