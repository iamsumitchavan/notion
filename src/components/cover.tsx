// "use client";

// import { cn } from "@/lib/utils";
// import Image from "next/image";
// import { Button } from "./ui/button";
// import { ImageIcon, X } from "lucide-react";

// interface coverProps {
//   url?: string;
//   preview?: boolean;
// }
// const Cover = ({ url, preview }: coverProps) => {
//   console.log("url is ", url);
//   return (
//     <>
//       <div
//         className={cn(
//           "relative w-full h-[35vh] group",
//           !url && "h-[12vh]",
//           url && "bg-muted"
//         )}
//       >
//         {!!url && <Image src={url} fill alt="cover" className="object-cover" />}
//         {url && !preview && (
//           <div className="opacity-0 group-hover:opacity-100 absolute bottom-5 right-5 flex items-center gap-x-2">
//             <Button
//               onClick={() => {}}
//               variant="outline"
//               size="sm"
//               className="text-muted-foreground text-xl"
//             >
//               <ImageIcon className="h-4 w-4 mr-2" />
//               Change cover
//             </Button>
//             <Button
//               onClick={() => {}}
//               variant="outline"
//               size="sm"
//               className="text-muted-foreground text-xl"
//             >
//               <X className="h-4 w-4 mr-2" />
//               Remove
//             </Button>
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default Cover;
"use client";

import Image from "next/image";
import { ImageIcon, X } from "lucide-react";
import { useMutation } from "convex/react";
import { useParams } from "next/navigation";

import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useCoverImage } from "@/hook/use-coverImage";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useEdgeStore } from "@/lib/edgestore";

interface CoverImageProps {
  url?: string;
  preview?: boolean;
}

const Cover = ({ url, preview }: CoverImageProps) => {
  const { edgestore } = useEdgeStore();
  const params = useParams();
  const coverImage = useCoverImage();
  const removeCoverImage = useMutation(api.documents.removeCoverImage);
  const another = "nothing is impossible";
  const onRemove = async () => {
    if (url) {
      await edgestore.publicFiles.delete({
        url: url,
      });
    }
    removeCoverImage({
      id: params.documentId as Id<"documents">,
    });
  };

  return (
    <div
      className={cn(
        "relative w-full h-[35vh] group",
        !url && "h-[12vh]",
        url && "bg-muted"
      )}
    >
      {!!url && <Image src={url} fill alt="Cover" className="object-cover" />}
      {url && !preview && (
        <div className="opacity-0 group-hover:opacity-100 absolute bottom-5 right-5 flex items-center gap-x-2">
          <Button
            onClick={() => coverImage.onReplace(url)}
            className="text-muted-foreground text-xs"
            variant="outline"
            size="sm"
          >
            <ImageIcon className="h-4 w-4 mr-2" />
            Change cover
          </Button>
          <Button
            onClick={onRemove}
            className="text-muted-foreground text-xs"
            variant="outline"
            size="sm"
          >
            <X className="h-4 w-4 mr-2" />
            Remove
          </Button>
        </div>
      )}
    </div>
  );
};

export default Cover;

Cover.Skeleton = function CoverSkeleton() {
  return <Skeleton className="w-full h-[12vh]" />;
};
