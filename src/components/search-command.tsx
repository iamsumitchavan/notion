"use client";

import { useEffect, useState } from "react";
import { File } from "lucide-react";
import { useQuery } from "convex/react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/clerk-react";

import {
  CommandDialog,
  CommandEmpty,
  CommandInput,
  CommandGroup,
  CommandList,
  CommandItem,
} from "@/components/ui/command";

import { useSearch } from "@/hook/use-search-tsx";
import { api } from "@/convex/_generated/api";

export const SearchCommand = () => {
  const { user } = useUser();
  const router = useRouter();
  const documents = useQuery(api.documents.getSearch);
  const [isMounted, setIsMounted] = useState(false);

  const toggle = useSearch((store) => store.toggle);
  const isOpen = useSearch((store) => store.isOpen);
  const onClose = useSearch((store) => store.onClose);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key == "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        toggle();
      }
    };

    document.addEventListener("keydown", down);

    return () => document.removeEventListener("keydown", down);
  }, [toggle]);

  const onSelect = (id: string) => {
    router.push(`/document/${id}`);
    onClose();
  };

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <CommandDialog open={isOpen} onOpenChange={onClose}>
        <CommandInput placeholder={`Search ${user?.fullName}'s Jotion`} />
        <CommandList>
          <CommandEmpty>No Result Found</CommandEmpty>
          <CommandGroup heading="Documents">
            {documents?.map((document) => {
              return (
                <>
                  <CommandItem
                    key={document._id}
                    value={`${document._id} = ${document.title}`}
                    title={document.title}
                    onSelect={onSelect}
                  >
                    {document?.Icon ? (
                      <p className="mr-2 text-[18px]">{document?.Icon}</p>
                    ) : (
                      <File className="mr-2 h-4 w-4" />
                    )}
                    <span>{document?.title}</span>
                  </CommandItem>
                </>
              );
            })}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
};
