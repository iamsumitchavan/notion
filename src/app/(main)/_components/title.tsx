"use client";

import { useMutation } from "convex/react";
import { Doc } from "@/convex/_generated/dataModel";
import { api } from "@/convex/_generated/api";
import { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

interface titleProps {
  initialData: Doc<"documents">;
}

const Title = ({ initialData }: titleProps) => {
  const update = useMutation(api.documents.update);
  const inputRef = useRef<HTMLInputElement>(null);

  const [title, setTitlte] = useState(initialData?.title || "Untitled");
  const [isEditing, setIsEditing] = useState(false);

  const enableInput = () => {
    setTitlte(initialData?.title);
    setIsEditing(true);
    inputRef?.current?.focus();
    inputRef.current?.setSelectionRange(0, inputRef.current.value.length);
    setTimeout(() => {}, 0);
  };

  const disableInput = () => {
    setIsEditing(false);
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitlte(event.target.value);
    update({
      id: initialData?._id,
      title: event.target.value || "Untitled",
    });
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      disableInput();
    }
  };
  return (
    <>
      <div className="flex items-center gap-x-1">
        {!!initialData.Icon && <p>{initialData.Icon}</p>}
        {isEditing ? (
          <Input
            ref={inputRef}
            onClick={enableInput}
            onBlur={disableInput}
            onChange={onChange}
            value={title}
            onKeyDown={onKeyDown}
            className="h-7 px-2 focus-visible:ring-transparent"
          />
        ) : (
          <Button
            variant="ghost"
            size="sm"
            onClick={enableInput}
            className="font-normal h-auto p-1 "
          >
            <span className="truncate"> {initialData?.title}</span>
          </Button>
        )}
      </div>
    </>
  );
};

export default Title;

Title.Skeleton = function TitleSkeleton() {
  return <Skeleton className="h-9 w-16 rounded-md" />;
};
