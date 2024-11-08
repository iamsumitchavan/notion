"use client";

import { PlusCircle } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { query } from "@/convex/_generated/server";

const DocumentPage = () => {
  const create = useMutation(api.documents.create);

  const onCreate = () => {
    const promise = create({ title: "untitled" });

    toast.promise(promise, {
      loading: "create a new note..",
      success: "New Note Created!",
      error: "Failed to create a new note..",
    });
  };
  return (
    <>
      <div className="flex h-full flex-col justify-center items-center space-y-3">
        <Image src={"/empty.png"} width={300} height={300} alt="emapty" />
        <h2 className="text-lg font-medium ">Welcome to Sumit Jotion</h2>
        <Button onClick={onCreate}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Create a Note
        </Button>
      </div>
    </>
  );
};

export default DocumentPage;
