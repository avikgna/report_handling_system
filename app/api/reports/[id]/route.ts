import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth/next";
import { options } from "@/app/api/auth/[...nextauth]/options"; 

const prisma = new PrismaClient();

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {

    const { id } = await params;
    const reportId = Number(id);

    const session = await getServerSession(options);
    
    const updatedReport = await prisma.report.update({
        where: { id: Number(reportId) },
        data: {
            resolved_at: new Date(),
            resolved_by: Number(session?.user.id),
        },
    });

    return NextResponse.json({
        message: "Report resolved successfully",
        report: {
            ...updatedReport,
                id: updatedReport.id.toString(),
                target_id: updatedReport.target_id.toString(),
                submitted_by: updatedReport.submitted_by?.toString(),
                resolved_by: updatedReport.resolved_by?.toString(),
                resolved_at: updatedReport.resolved_at, 

        },
    }, { status: 200 });

}