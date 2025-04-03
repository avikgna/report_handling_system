"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";


export default function HomePage() {
  
    const { data: session } = useSession();
    const router = useRouter();
    
    return (
      
        <div className="min-h-screen bg-gray-100">
            {/* Navigation Bar */}
            <nav className="w-full p-4 bg-white shadow-md flex justify-end gap-4">

                {session  ? (
                    <>
                        <Button variant="outline" onClick={() => router.push("/user/report")}>Submit Report</Button>
                        {session.user.role == "admin" && (
                          <Button variant="outline" onClick={() => router.push("/admin/table")}>Reports Table</Button>
                        )}
                        
                        <Button variant="destructive" onClick={() => signOut()}>Sign Out</Button>
                    </>
                ) : (
                    <Button onClick={() => signIn()}>Sign In</Button>
                )}              
            </nav>

            <div className="flex items-center justify-center h-[90vh]">
                <Card className="w-[500px] text-center">
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold">ServiHub Report Submission Page</CardTitle>
                    </CardHeader>
                    
                </Card>
            </div>
        </div>

    );
}
