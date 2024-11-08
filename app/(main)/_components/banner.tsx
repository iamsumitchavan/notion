"use client";

import ConfirmModal from "@/components/modals/confirm-modals";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { useRouter } from "next/navigation";

import { toast } from "sonner";

interface bannerProps {
  documentId: Id<"documents">;
}

const Banner = ({ documentId }: bannerProps) => {
  const router = useRouter();

  const remove = useMutation(api.documents.remove);
  const restore = useMutation(api.documents.restore);

  const onRemove = () => {
    const promise = remove({ id: documentId });

    toast.promise(promise, {
      loading: "Deleting Note...",
      success: "Note deleted",
      error: "Failed to delete Note",
    });

    router.push("/document");
  };
  const onRestore = () => {
    const promise = restore({ id: documentId }).then(() =>
      router.push("/document")
    );

    toast.promise(promise, {
      loading: "restoring Note...",
      success: "Note restored",
      error: "Failed to restore Note",
    });
  };
  return (
    <>
      <div className="w-full bg-rose-500 text-center text-sm p-2 text-white flex items-center gap-x-2 justify-center">
        <p>This Page is in the Trash</p>
        <Button
          size="sm"
          onClick={onRestore}
          variant="outline"
          className="border-white bg-transparent hover:bg-primary/5 text-white hover:text-white p-1 px-2 h-auto font-normal"
        >
          Resore Page
        </Button>
        <ConfirmModal onConfirm={onRemove}>
          <Button
            size="sm"
            // onClick={onRemove}
            variant="outline"
            className="border-white bg-transparent hover:bg-primary/5 text-white hover:text-white p-1 px-2 h-auto font-normal"
          >
            Delete Forever
          </Button>
        </ConfirmModal>
      </div>
    </>
  );
};

export default Banner;
