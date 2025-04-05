import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth/next";
import { options } from "@/app/api/auth/[...nextauth]/options"; 

const prisma = new PrismaClient();


export async function GET() {
    try {

        const reports = await prisma.report.findMany();

        /*Serialise to strings for api*/
        const processedReports = reports.map(report => ({
            ...report,
            id: report.id.toString(),
            target_id: report.target_id.toString(),
            created_at: report.created_at.toString(),
            submitted_by: report.submitted_by?.toString(),
            resolved_by: report.resolved_by?.toString() || null,
            status: report.resolved_by ? "resolved" : "pending",
        }));

        return NextResponse.json(processedReports)
    } catch (error) {
        console.error("Error with report fetch for table:", error);
        return NextResponse.json(
            {message: "Internal Server Error" },
            { status: 500 }
        );
    }


}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { type, targetId, reason, description } = body;

        const session = await getServerSession(options);

        if (!session) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const report = await prisma.report.create({
            data: {
                type,
                target_id: BigInt(targetId),
                reason,
                description,
                submitted_by: BigInt(session.user.id),
            },
        });

        /*Api response in string format for proper serialisation*/
        return NextResponse.json({
            message: "Report submitted successfully",
            report: {
                ...report,
                id: report.id.toString(),          
                target_id: report.target_id.toString(),  
                submitted_by: report.submitted_by?.toString()  
            }
        }, { status: 200 });

    } catch (error) {
        console.error("Error submitting report:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
