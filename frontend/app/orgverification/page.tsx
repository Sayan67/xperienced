"use client";
import React from "react";
import z from "zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import { type } from "os";
import "./page.css";
import SiteNav from "@/components/SiteNav";

const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_FILE_SIZE = 5 * 1024 * 1024;

const verificationSchema = z.object({
  jobTitle: z.string().min(5, "Minimum length must be 5 characters."),
  jobDescription: z.string().min(5, "Minimum length must be 5 characters."),
  dispatchLetter: z
    .any()
    .refine((files) => files?.length == 1, "Image is required.")
    .refine(
      (files) => files?.[0]?.size <= MAX_FILE_SIZE,
      `Max file size is 5MB.`
    )
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      ".jpg, .jpeg, .png and .webp files are accepted."
    ),
  companyRegistrationCertificate: z
    .any()
    .refine((files) => files?.length == 1, "Image is required.")
    .refine(
      (files) => files?.[0]?.size <= MAX_FILE_SIZE,
      `Max file size is 5MB.`
    )
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      ".jpg, .jpeg, .png and .webp files are accepted."
    ),
});

type TSverificationSchema = z.infer<typeof verificationSchema>;



/////////// Main //////////
function page() {

    const router =  useRouter();
  function onSubmit(data: TSverificationSchema) {
    console.log(data);
  }

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TSverificationSchema>({
    resolver: zodResolver(verificationSchema),
  });

  return (
    <>
      <SiteNav active="null" />
      <main className="flex flex-col items-center justify-center py-14 gap-6 font-primary text-xl">
        <form
          className="w-[60%] rounded-lg border-[1px] py-14 px-4 space-y-6 flex flex-col items-center justify-center bg-white"
          action=""
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="space-y-4 w-[70%]">
            <div className="carditems">
              <Label className="w-full">Enter the job title</Label>
              <Input
                {...register("jobTitle", { required: true })}
                type="text"
                className="w-[60%] cursor-pointer"
                placeholder="Job title"
              />
            </div>
            <div className="carditems">
              <Label className="w-full">Enter the job description</Label>
              <Input
                {...register("jobDescription", { required: true })}
                type="text"
                className="w-[60%] cursor-pointer"
                placeholder="Upload the Govt. ID proof"
              />
            </div>
            <div className=" carditems">
              <Label className="w-full">Upload the dispatch letter</Label>
              <Input
                {...register("dispatchLetter", { required: "Required" })}
                type="file"
                className="w-[60%] cursor-pointer"
                placeholder="Upload the Govt. ID proof"
              />
            </div>
            <div className="carditems">
              <Label className="w-full">
                Upload the Organisation Registration
              </Label>
              <Input
                {...register("companyRegistrationCertificate", {
                  required: true,
                })}
                type="file"
                className="w-[60%] cursor-pointer"
                placeholder="Upload the Govt. ID proof"
              />
            </div>
            <div className="flex justify-start w-full mt-8">
              <Button
                className="mt-8 bg-blue-500 h-[3rem] text-white hover:bg-blue-500"
                type="submit"
                disabled={isSubmitting}
                variant="default"
              >
                Submit for verification
              </Button>
            </div>
          </div>
        </form>
      </main>
    </>
  );
}

export default page;
