import { Badge } from "@/components/ui/badge";

type Tone = "strict" | "neutral" | "friendly" | "empathetic";
export const getToneBadge = (tone: Tone) => {
  switch (tone) {
    case "strict":
      return (
        <Badge
          variant={"outline"}
          className="bg-red-950 text-red-500 hover:bg-red-500/20 border-red-500/20 shadow-none"
        >
          Strict
        </Badge>
      );
    case "neutral":
      return (
        <Badge
          variant={"outline"}
          className="bg-blue-950 text-blue-500 hover:bg-blue-500/20 border-blue-500/20 shadow-none"
        >
          Neutral
        </Badge>
      );
    case "friendly":
      return (
        <Badge
          variant={"outline"}
          className="bg-indigo-950 text-indigo-500 hover:bg-indigo-500/20 border-indigo-500/20 shadow-none"
        >
          Friendly
        </Badge>
      );
    case "empathetic":
      return (
        <Badge
          variant={"outline"}
          className="bg-purple-500/30 text-purple-500 hover:bg-purple-500/20 border-purple-500/20 shadow-none"
        >
          Empathetic
        </Badge>
      );
  }
};