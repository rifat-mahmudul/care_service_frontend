import { CheckCircle2, Star } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

interface ProfileHeroProps {
  name: string;
  location: string;
  hourlyRate: number;
  rating: number;
  reviewCount: number;
  profileImage?: string;
  isVerified?: boolean;
}

export function ProfileHero({
  name,
  location,
  hourlyRate,
  rating,
  reviewCount,
  profileImage,
  isVerified = false,
}: ProfileHeroProps) {
  // Get initials for avatar fallback
  const getInitials = (fullName: string) => {
    return fullName
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="bg-[#BDE3F9] py-10">
      <div className="container flex items-center justify-between rounded-none w-full">
        <div className="flex items-center gap-8">
          <Avatar className="h-32 w-32 border-4 border-white shadow-lg">
            <AvatarImage
              src={profileImage || "/default-avatar.jpg"}
              className="object-cover"
              alt={name}
            />
            <AvatarFallback>{getInitials(name)}</AvatarFallback>
          </Avatar>

          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-[#001F3F]">{name}</h1>
              {isVerified && (
                <CheckCircle2 className="h-7 w-7 fill-green-600 text-white" />
              )}
            </div>
            <p className="font-medium text-slate-600">{location}</p>
            <p className="text-blue-700 font-bold italic">
              from ${hourlyRate} per hour
            </p>
            <div className="flex items-center gap-1 pt-1">
              <span className="font-bold text-slate-900">{rating}</span>
              <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              <span className="text-slate-500 font-medium">
                ({reviewCount})
              </span>
            </div>
          </div>
        </div>

        <Button className="bg-primary hover:bg-[#002244] text-white rounded-full font-bold shadow-lg transition-transform active:scale-95">
          Join To Connect
        </Button>
      </div>
    </div>
  );
}
