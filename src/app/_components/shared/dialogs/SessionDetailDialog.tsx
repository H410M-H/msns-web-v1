import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";

export const SessionDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>View Details</Button>
      </DialogTrigger>
      <DialogContent className="max-w-md rounded-md bg-white p-6 shadow-lg">
        <DialogHeader>
          <DialogTitle className="mb-4 text-2xl font-semibold text-gray-800">
            Session Details
          </DialogTitle>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
