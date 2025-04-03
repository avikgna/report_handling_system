"use client";
import { Report, ApiReport } from "@/types/report";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

  export default function AdminPage() {

    const router = useRouter();
    
    const [reports, setReports] = useState<Report[]>([]);
    const [selectedStatus, setSelectedStatus] = useState<string | "">( "");
    const [selectedType, setSelectedType] = useState<string| "">( "");
    const [showPopup, setShowPopup] = useState<boolean>(true);

    useEffect(() => {
        fetchReports();
      }, []);

    async function fetchReports() {
        try {
            const response = await fetch('/api/reports');
            const apiReports: ApiReport[] = await response.json();
            const formattedReports: Report[] = [];

            for (const apiReport of apiReports) {
                formattedReports.push({
                id: parseInt(apiReport.id),
                type: apiReport.type,
                targetId: Number(apiReport.target_id),
                reason: apiReport.reason,
                status: apiReport.status,
                submittedBy: apiReport.submitted_by,
                resolvedBy: apiReport.resolved_by || undefined,
                createdAt: new Date(apiReport.createdAt)

                });
            }
            setReports(formattedReports);

        } catch(error) {
            console.error("Error fetching reports:", error);
            toast.error("Error fetching reports from Database");
        } 
    }




    function capitalise(word:string): string {
        if (!word) return ''; 
        return word[0].toUpperCase() + word.slice(1);
    }


    function setTitle(): string {
        if (selectedStatus === "" && selectedType === ""){
            return "All Reports"
        }

        else if (selectedStatus !== "" && selectedType === ""){
            return capitalise(selectedStatus) + " Reports"
        }

        else if (selectedStatus === "" && selectedType !== "") {
            return "Reports for " + capitalise(selectedType)
        }

        else  {
            return capitalise(selectedStatus) + " Reports for " + capitalise(selectedType)
        }
    }


    async function resolveReport(id:number){
        const response = await fetch(`/api/reports/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id }),
        });

        if(!response.ok) {
            throw new Error("Unable to resolve report");
        }

        const result = await response.json();
        console.log(result.report);

        await fetchReports();
        toast.success("Report resolved sucessfully");
    }

    

    function filterReports(reports: Report[]): Report[] {

    return reports.filter(report =>         
                (selectedStatus === "" || report.status == selectedStatus) && 
            (selectedType === "" || report.type === selectedType)
    ); 
    }

    const filteredReports = filterReports(reports);


    return (
        <div className = "p-4">
            <nav className="w-full p-4 bg-white shadow-md flex justify-between items-center fixed top-0 left-0 z-10">
                            <div className="font-bold text-lg">ServiHub</div>
                            <div className="flex gap-4">
                                <Button variant="outline" onClick={() => router.push("/")}>Home Page</Button>
                                <Button variant="destructive" onClick={() => signOut({ callbackUrl: '/' })}>Sign Out</Button>
                            </div>
                        </nav>

            <Dialog open={showPopup} onOpenChange={setShowPopup}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="underline">Instructions on using the Admin Interface</DialogTitle>
                        <br />
                        </DialogHeader>
                        <p className="mb-3"> - Use the <b>dropdown selectors to filter reports</b> by both <b>type and status.</b> <br /><br />
                                            - Click the <b>"Resolve"</b> button in the last column to <b>mark a report as resolved.</b>
                        </p>
                        <DialogFooter>
                            <Button className = "bg-green-500 text-black" onClick={() => setShowPopup(false)}>Makes Sense!</Button>
                        </DialogFooter>
                    
                </DialogContent>
            </Dialog>

        <div className="mx-auto max-w-4xl mt-10"></div>
        <h1 className = "text-2xl font-bold mb-4 text-center pt-10">Admin Interface</h1> 
        <h2 className="text-lg font-bold underline mb-4">{setTitle()}</h2>

        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>
                        <select onChange={(e) => setSelectedType(e.target.value)} value={selectedType}>
                        <option value="">Type</option>
                        <option value="user">Type - User</option>
                        <option value="review">Type - Review</option>
                        <option value="business">Type - Business</option>
                        <option value="service">Type - Service</option>
                        <option value="other">Type - Other</option>
                     </select>
                    </TableHead>
                    <TableHead>Target ID</TableHead>
                    <TableHead>Reason</TableHead>
                    <TableHead>
                        <select onChange={(e) => setSelectedStatus(e.target.value)} value={selectedStatus}>
                            <option value="">Status</option>
                            <option value="pending">Status - Pending</option>
                            <option value="resolved">Status - Resolved</option>                        
                        </select>
                        </TableHead>

                    <TableHead>Submitted By</TableHead>

                    {selectedStatus != "pending" && <TableHead>Resolved By</TableHead>}

                    {selectedStatus != "resolved" && <TableHead>Resolve Report</TableHead>}

                    
                </TableRow>
            </TableHeader>
            <TableBody>
                {filteredReports.map((report) => (
                    <TableRow key={report.id}>
                        <TableCell>{capitalise(report.type)}</TableCell>
                        <TableCell>{report.targetId}</TableCell>
                        <TableCell>{capitalise(report.reason)}</TableCell>
                        <TableCell>{capitalise(report.status)}</TableCell>
                        <TableCell>{report.submittedBy}</TableCell>

                        {selectedStatus !== "pending" && <TableCell>{report.resolvedBy || "N/A"}</TableCell>}

                        {selectedStatus !== "resolved" && <TableCell>
                            {report.status === "pending" && (
                                <Button className="bg-green-500 text-black" onClick={() => resolveReport(report.id)}>
                                    Resolve
                                </Button>
                            )}
                        </TableCell>}
                        
                    </TableRow>
                ))}
            </TableBody>
        </Table>
                
        </div>

        
    )
  }





