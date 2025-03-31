"use client";
import { Report } from "@/types/report";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

const mockReports: Report[] = [
    {
      id: 1,
      type: "user",
      targetId: 324,
      reason: "spam",
      status: "pending",
      submittedBy: "user_456",
      createdAt: new Date(),
    },
    {
      id: 2,
      type: "review",
      targetId: 789,
      reason: "harassment",
      status: "resolved",
      submittedBy: "user_456",
      resolvedBy: "admin_1",
      createdAt: new Date(),
    },
  ];

  export default function AdminPage() {
    const [reports, setReports] = useState<Report[]>(mockReports);
    const [selectedStatus, setSelectedStatus] = useState<string | "">( "");
    const [selectedType, setSelectedType] = useState<string| "">( "");
    const [showPopup, setShowPopup] = useState<boolean>(true);

    function capitalise(word:string): string {
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


    

    function resolveReport(id:number){
        setReports(reports.map(report => {
            if(report.id === id) {
                return { ...report, status: "resolved", resolvedBy: "admin_1" };
            }

            return report;
        }));
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



        <h1 className = "text-2xl font-bold mb-4 text-center">Admin Interface</h1> 
        <h2 className="text-lg font-bold underline mb-4">{setTitle()}</h2>

        <div className="mx-auto max-w-4xl"></div>

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





