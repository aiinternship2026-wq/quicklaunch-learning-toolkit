import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { TrainerProvider } from "@/modules/academic/context/TrainerContext";
import { Profile } from "@/modules/academic/pages/Profile";

export function ProfileDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle>Profile</DialogTitle>
        </DialogHeader>
        {open ? (
          <TrainerProvider>
            <Profile />
          </TrainerProvider>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
