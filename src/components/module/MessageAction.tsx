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

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { IMessage, useMessage } from "@/lib/store/messages";
import { createClient } from "@/utils/supabase/client";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useEffect, useState } from "react";

const DeleteAlert = () => {
  const { actionMessage, optimisticDeleteMessage } = useMessage();
  const supabase = createClient();

  const deleteMessageHandler = async () => {
    optimisticDeleteMessage(actionMessage?.id!);
    const { error } = await supabase
      .from("messages")
      .delete()
      .eq("id", actionMessage?.id!);

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

export const EditAlert = () => {
  const { actionMessage, optimisticEditMessage } = useMessage();
  const [inputValue, setInputValue] = useState(actionMessage?.text);

  useEffect(() => {
    setInputValue(actionMessage?.text);
  }, [actionMessage?.text]);

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const submitHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const supabase = createClient();

    if (inputValue) {
      optimisticEditMessage({
        ...actionMessage,
        text: inputValue,
        is_edit: true,
      } as IMessage);

      const { error } = await supabase
        .from("messages")
        .update({ text: inputValue.trim(), is_edit: true })
        .eq("id", actionMessage?.id!);

      if (error) {
        toast.error(error.message);
      } else {
        toast.success("Successfully update message");
      }

      document.getElementById("trigger-edit")?.click();
    } else {
      document.getElementById("trigger-edit")?.click();
      document.getElementById("trigger-delete")?.click();

    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button id="trigger-edit"></button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you are done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4 w-full">
          <div className="w-full">
            <Input
              id="name"
              value={inputValue}
              onChange={changeHandler}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={submitHandler}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
