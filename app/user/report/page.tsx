"use client";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

const formSchema = z.object({
    type: z.enum(["review", "user", "business", "service", "other"], {
        message: "Please Enter a Valid Report Type"
    }),
    targetId: z.string().min(1, {
        message: "Please enter the ID of what you're reporting"
    }),
    reason: z.string().min(1, {
        message: "Please enter a reason for your report"

    }),
    description: z.string().optional(),

});

export default function ReportForm(){
    const router = useRouter();

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            type: undefined,
            targetId: "",
            reason: "",
            description: "",
        },

    });

    function SubmitButtonText({ isSubmitting }: { isSubmitting: boolean }) {
        if (isSubmitting){
            return "Submitting..."
        }
        return "Submit";
    }

    function SubmitButton({ isSubmitting }: { isSubmitting: boolean }) {
        return (
            <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting}
            >
                <SubmitButtonText isSubmitting={isSubmitting} />
            </Button>

        );
    }

    async function onSubmit(data: any) {
        try {
            const payload = {
                ...data,
                targetId: data.targetId.toString(),
            };
    
            const response = await fetch('/api/reports', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });
    
            const result = await response.json();
    
            if (!response.ok) {
                throw new Error(result.error || "Failed to submit report.");
            }

            toast.success("Report submitted");
            form.reset();
        } catch (error) {
            console.error("Submission error:", error);

            
        }
    }

    
    return (

        <div className="flex justify-center p-4 pt-10">
            <nav className="w-full p-4 shadow-md flex justify-between items-center fixed top-0 left-0 z-10">
                <div className="font-bold text-2xl">ServiHub</div>
                <div className="flex gap-4">
               
                    <Button variant="outline" onClick={() => router.push("/")}>Home Page</Button>
                    <Button variant="destructive" onClick={() => signOut({ callbackUrl: '/' })}>Sign Out</Button>
                </div>
            </nav>

            <Card className="w-full max-w-md mt-20">
                <CardHeader>
                    <CardTitle className="text-2xl text-center pb-2">Submit a Report</CardTitle>
                </CardHeader>
                <CardContent>
                <Form {...form}>

                 <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">

                    <FormField 
                        control={form.control}
                        name="type"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel className="pb-2">Report Type</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a type" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="review">Review</SelectItem>
                                    <SelectItem value="user">User</SelectItem>
                                    <SelectItem value="business">Business</SelectItem>
                                    <SelectItem value="service">Service</SelectItem>
                                    <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                            </FormItem>

                        )}
                        />

                        <FormField
                            control = {form.control}
                            name="targetId"
                            render = {({field}) => (
                                <FormItem>
                                    <FormLabel className="pb-2">Target ID</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Enter the ID of what you're reporting (e.g. 624)"
                                            {...field}
                                            />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                            />

                        <FormField
                            control = {form.control}
                            name="reason"
                            render = {({ field }) => (
                                <FormItem>
                                    <FormLabel className="pb-2">Reason</FormLabel>
                                    <FormControl>
                                        <Textarea
                                        placeholder="Please provide a brief reason for your report..."
                                        className="min-h-[20px]"
                                        {...field}
                                        />

                                    </FormControl>
                                    <FormMessage />
                                </FormItem>

                            )}
                            />

                        <FormField
                            control = {form.control}
                            name="description"
                            render = {({ field }) => (
                                <FormItem>
                                    <FormLabel className="pb-2">Additional Description</FormLabel>
                                    <FormControl>
                                        <Textarea
                                        placeholder="Please provide an (optional) description..."
                                        className="min-h-[100px]"
                                        {...field}
                                        />

                                    </FormControl>
                                    <FormMessage />
                                </FormItem>

                            )}
                            />
                    <SubmitButton isSubmitting={form.formState.isSubmitting} />
                    </form>
                </Form>
                </CardContent>
            </Card> 

            </div>        
    );
}