import { cookies } from "next/headers";
import Script from "next/script";
import { Suspense } from "react";
import { DataStreamProvider } from "@/components/data-stream-provider";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Providers } from "@/app/providers";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Script
        src="https://cdn.jsdelivr.net/pyodide/v0.23.4/full/pyodide.js"
        strategy="beforeInteractive"
      />
       
      <Providers>
      <DataStreamProvider>
        <Suspense fallback={<div className="flex h-dvh" />}>
          <SidebarWrapper>{children}</SidebarWrapper>
           
        </Suspense>
      </DataStreamProvider>
      </Providers>
    </>
  );
}

function SidebarWrapper({ children }: { children: React.ReactNode }) {
  const cookieStore = cookies();
  const isCollapsed = cookieStore.get("sidebar_state")?.value !== "true";

  return (
    <SidebarProvider defaultOpen={!isCollapsed}>
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  );
}
