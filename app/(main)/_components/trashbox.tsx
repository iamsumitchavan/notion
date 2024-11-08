"use client";

import ConfirmModal from "@/components/modals/confirm-modals";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import { Search, Trash, Undo } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { useState } from "react";
import { toast } from "sonner";

const TrashBox = () => {
  const router = useRouter();
  const param = useParams();

  const documents = useQuery(api.documents.getTrash);
  const resoter = useMutation(api.documents.restore);
  const remove = useMutation(api.documents.remove);

  console.log("remove is ", remove);

  const [search, setSearch] = useState("");

  const filterDocuments = documents?.filter((document) => {
    return document.title.toLowerCase().includes(search.toLowerCase());
  });

  const onClick = (documentId: string) => {
    router.push(`/document/${documentId}`);
  };

  const onRestore = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    documentId: Id<"documents">
  ) => {
    event.stopPropagation();
    const promise = resoter({ id: documentId });

    toast.promise(promise, {
      loading: "Restoring Note",
      success: "REstored successfully",
      error: "Failed To restore Note",
    });
  };
  const onRemove = (documentId: Id<"documents">) => {
    const promise = remove({ id: documentId });

    toast.promise(promise, {
      loading: "Deleting Note",
      success: "Note deleted",
      error: "Failed To Delted Note",
    });

    if (param.documentId === documentId) {
      router.push("/document");
    }

    if (documents === undefined) {
      return (
        <div className="h-full flex justify-center p-4 items-center">
          <Spinner size="lg" />
        </div>
      );
    }
  };
  return (
    <>
      <div className="text-sm">
        <div className="flex items-center gap-x-1 p-2">
          <Search className="h-4 w-4" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-7 px-2 focus-visible:ring-transparent bg-secondary"
            placeholder="filter by page title..."
          />
        </div>
        <div className="mt-2 px-1 pb-1">
          <p className="hidden last:block text-xs text-center text-muted-foreground pb-2">
            No Document found
          </p>
          {filterDocuments?.map((d) => {
            return (
              <div
                key={d._id}
                role="button"
                onClick={() => onClick(d._id)}
                className="text-sm rounded-sm w-full bg-primary/5 text-primary items-center flex justify-between"
              >
                <span className="truncate pl-2">{d.title}</span>
                <div className="flex items-center">
                  <div
                    onClick={(e) => onRestore(e, d._id)}
                    className="rounded-sm p-2 hover:bg-neutral-200"
                  >
                    <Undo className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <ConfirmModal onConfirm={() => onRemove(d._id)}>
                    <div
                      className="rounded-sm p-2 hover:bg-neutral-200"
                      role="button"
                    >
                      <Trash className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </ConfirmModal>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default TrashBox;
