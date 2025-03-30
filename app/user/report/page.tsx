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

    async function onSubmit<T>(data: T){
        console.log(data);

        await new Promise(resolve => setTimeout(resolve, 2000)); 
    }

    return (
        <div className="flex justify-center p-5">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle className="text-2xl">Submit a Report</CardTitle>
                </CardHeader>
                <CardContent>
                <Form {...form}>

                 <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">

                    <FormField 
                        control={form.control}
                        name="type"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Report Type</FormLabel>
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
                                    <FormLabel>Target ID</FormLabel>
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
                                    <FormLabel>Reason</FormLabel>
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
                                    <FormLabel>Additional Description</FormLabel>
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