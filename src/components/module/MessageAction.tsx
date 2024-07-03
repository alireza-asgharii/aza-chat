"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useMessage } from "@/lib/store/messages";
import { createClient } from "@/utils/supabase/client";
import { toast } from "sonner";

const DeleteAlert = () => {
  const { actiosMessage, optimisticDeleteMessage } = useMessage();
  const supabase = createClient();

  const deleteMessageHandler = async () => {
    optimisticDeleteMessage(actiosMessage?.id!);
    const { error } = await supabase
      .from("messages")
      .delete()
      .eq("id", actiosMessage?.id!);

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Successfully delete a message");
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger id="trigger-delete"></AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={deleteMessageHandler}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteAlert;
