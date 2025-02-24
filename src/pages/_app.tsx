// // import NavBar from "@/components/Navbar";
// // import { SessionProvider } from "next-auth/react";
// // import type { AppProps } from "next/app";
// // import "@/app/globals.css"; // Import global styles

// // function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
// //   return (
// //     <SessionProvider session={session}>
// //       <NavBar />
// //       <Component {...pageProps} />
// //     </SessionProvider>
// //   );
// // }

// // export default MyApp;

// import { SessionProvider, useSession } from "next-auth/react";
// import type { AppProps } from "next/app";
// // import NavBar from "@/components/Navbar";
// import "@/app/globals.css";
// import NavBar from "./Navbar";

// function AuthGuard({ children }: { children: React.ReactNode }) {
//   const { data: session, status } = useSession();

//   if (status === "loading") {
//     return <p>Loading...</p>; // Show loading state while checking auth
//   }

//   if (!session) {
//     return <p>Please log in to access this page.</p>; // Redirect to login page or show message
//   }

//   return <>{children}</>;
// }

// function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
//   return (
//     <SessionProvider session={session}>
//       <NavBar />
//       <AuthGuard>
//         <Component {...pageProps} />
//       </AuthGuard>
//     </SessionProvider>
//   );
// }

// export default MyApp;

import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import "@/app/globals.css";
import NavBar from "./Navbar";
import { ThemeProvider } from "@/context/ThemeContext";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <ThemeProvider>
        {" "}
        {/* Wrap everything inside ThemeProvider */}
        <NavBar />
        <Component {...pageProps} />
      </ThemeProvider>
    </SessionProvider>
  );
}

export default MyApp;
