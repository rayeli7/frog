"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import useMediaQuery from "@/hooks/use-media-query";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FieldValues, useForm } from "react-hook-form";
import { useDidContext } from "../context/DidContext";

function ProfileForm({ className }: React.ComponentProps<"form">) {
  const { register, handleSubmit } = useForm();
  const { selectedPfioffering, handleSubmitRfq, exchangesUpdated } =
    useDidContext();

  const handlePaymentClick = async (data: FieldValues) => {
    // TODO: Implement payment logic here
    if (selectedPfioffering !== null) {
      await handleSubmitRfq(data.amount, data.details);
      if (exchangesUpdated) {
        alert("Qoute Submitted");
      } else {
        alert("Qoute Not Submitted");
      }
    } else {
      alert("pfi offering not selected, retry in 5 seconds");
      //TODO retry fetchuserdata and handle submit
    }

    // Example: fetch payment details, send to payment gateway, etc.
    // Uncomment the following line to simulate payment click
    // setTimeout(() => {
    //   handlePaymentSuccess();
    // }, 1000);
    console.log("Payment Clicked {data}", data);
  };

  return (
    <form
      onSubmit={handleSubmit(handlePaymentClick)}
      className={cn("grid items-start gap-4", className)}
    >
      <div className="grid gap-2">
        <Label htmlFor="amount">Amount</Label>
        <Input
          {...register("amount")}
          type="number"
          id="amount"
          defaultValue="0.00"
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="Payment details">Payment Details</Label>
        <Input
          {...register("details")}
          id="deatils"
          defaultValue="0x3e4d9c2d7c7b6d3e3cb4cfe4f1b1f2b3ae9d0e6a"
        />
      </div>
      <Button type="submit" color="blue">
        Pay Store
      </Button>
    </form>
  );
}

export function DrawerDialogTopUp() {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const title = "Credit Account";
  const description = "Topup your Account";

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            type="button"
            variant="default"
            className=" bg-lime-500 p-auto m-auto"
          >
            {title}
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] bg-white">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          <ProfileForm />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button
          type="button"
          variant="default"
          className="p-auto m-auto bg-lime-500"
        >
          {title}
        </Button>
      </DrawerTrigger>
      <DrawerContent className="bg-white">
        <DrawerHeader className="text-left">
          <DrawerTitle>{title}</DrawerTitle>
          <DrawerDescription>{description}</DrawerDescription>
        </DrawerHeader>
        <ProfileForm className="px-4" />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="destructive">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
