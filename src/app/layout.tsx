"use client";
import React, { ReactNode, useEffect, useState } from "react";
import localFont from "next/font/local";
import "./globals.css";
import accountContext from "./context/accountContext";
import Login from "./components/Login";
import CreateAccount from "./components/CreateAccount";
import { IAccount } from "./database/schema/AccSchema";
import { QueryClient, QueryClientProvider } from "react-query";

const myFont = localFont({ src: "../Work_Sans/static/WorkSans-Medium.ttf" });
interface RootLayoutProps {
    children: ReactNode; // Using ReactNode to type the children prop, which can accept any valid React element
}
interface Acc extends IAccount {
    setLoggedIn: React.Dispatch<React.SetStateAction<boolean | null>>;
}
export default function RootLayout({ children }: RootLayoutProps) {
    const [account, setAccount] = useState<Acc | false>(false);
    const [loggedIn, setLoggedIn] = useState<boolean | null>(null);
    const [accountCreation, setAccountCreation] = useState<boolean>(false);
    useEffect(() => {
        const f = async () => {
            await fetch("api/connectToDB", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            console.log("fetched");
        };
        f();
    }, []);

    useEffect(() => {
        const storedAccount = localStorage.getItem("acc");
        if (storedAccount !== null) {
            let acc: IAccount = JSON.parse(storedAccount);
            setAccount({ ...acc, setLoggedIn });

            setLoggedIn(true);
        }
    }, []);

    const authenticate = async (acc: IAccount) => {
        console.log("authenticated", acc);
        localStorage.setItem("acc", JSON.stringify(acc));
        console.log(localStorage.getItem("acc"));
        setAccount({ ...acc, setLoggedIn });

        setLoggedIn(true);
    };

    const startAccountCreation = () => {
        setAccountCreation(true);
    };
    const queryClient = new QueryClient();
    return (
        <QueryClientProvider client={queryClient}>
            <accountContext.Provider value={account ? { account } : null}>
                <html data-theme="todoTheme" lang="en">
                    <body>
                        {loggedIn ? (
                            children
                        ) : accountCreation ? (
                            <CreateAccount authenticate={authenticate} />
                        ) : (
                            <Login startAccountCreation={startAccountCreation} authenticate={authenticate} />
                        )}
                    </body>
                </html>
            </accountContext.Provider>
        </QueryClientProvider>
    );
}
