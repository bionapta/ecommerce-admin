import NavBar from "@/components/navbar";
import db from "@/lib/db";
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation";
import React from "react";

export default async function DashboardLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: { storeId: string };
})  {
    const { userId } = await auth();
    if (!userId) {
        redirect("sign-in")
    }
    const store = await db.store.findFirst({
        where: {
            id: params.storeId,
            userId
        }
    })

if (!store) {
    redirect('/')
}

return (
    <>
    <NavBar />
    {children}

    </>
    )
}