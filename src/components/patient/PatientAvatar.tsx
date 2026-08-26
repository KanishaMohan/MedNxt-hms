import { Avatar } from "@mui/material";
import { UserRound } from "lucide-react";

interface PatientAvatarProps {
  photoUrl?: string | null;
  name?: string;
  size?: number;
}

export function PatientAvatar({
  photoUrl,
  name = "Patient",
  size = 44,
}: PatientAvatarProps) {
  return (
    <Avatar
      src={photoUrl || undefined}
      alt={name}
      sx={{
        width: size,
        height: size,
        bgcolor: "#eef2ff",
        color: "#6366f1",
        border: "1px solid #e2e8f0",
        fontSize: size * 0.4,
      }}
    >
      <UserRound size={size * 0.48} />
    </Avatar>
  );
}