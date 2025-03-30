"use client";
import { Report } from "@/types/report";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table";
import { useState } from "react";
import { Button } from "@/components/ui/button";


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

    const resolveReport = (id:number) => {
        setReports((prevReports) => prevReports.map((report) => {
        if (report.id === id){
            return {
                ...report,
                status: "resolved",
                resolvedBy: "admin_1"
            };
        }
        return report;
        })
    );
    };

    const filteredReports = reports.filter(report => {
        return (
            (selectedStatus === "" || report.status == selectedStatus) && 
            (selectedType === "" || report.type === selectedType)

        );
    })
    return (
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
                    <TableHead>Resolved By</TableHead>
                    <TableHead>Resolve Report</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {filteredReports.map((report) => (
                    <TableRow key={report.id}>
                        <TableCell>{report.type}</TableCell>
                        <TableCell>{report.targetId}</TableCell>
                        <TableCell>{report.reason}</TableCell>
                        <TableCell>{report.status}</TableCell>
                        <TableCell>{report.submittedBy}</TableCell>
                        <TableCell>{report.resolvedBy || "N/A"}</TableCell>
                        <TableCell>
                            {report.status === "pending" && (
                                <Button onClick={() => resolveReport(report.id)}>
                                    Resolve
                                </Button>
                            )}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
  }





