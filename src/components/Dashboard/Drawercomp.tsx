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

type DrawerDialogProps = {
  title: string;
  color: string;
  description: string;
};

function ProfileForm({ className }: React.ComponentProps<"form">) {
  const { register, handleSubmit } = useForm();

  const handlePaymentClick = async (data: FieldValues) => {
    // TODO: Implement payment logic here

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
        <Label htmlFor="vendor">Payment Details</Label>
        <Input
          {...register("details")}
          id="deatils"
          defaultValue="Your MoMo Number"
        />
      </div>
      <Button type="submit" color="blue">
        Pay Store
      </Button>
    </form>
  );
}

export function DrawerDialogTopUp(props: DrawerDialogProps) {
  const { title, description } = props;
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            type="button"
            variant="default"
            className="w-full bg-lime-500 p-auto m-auto"
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
        <Button type="button" variant="default" className="w-full bg-lime-500">
          {title}
        </Button>
      </DrawerTrigger>
      <DrawerContent className="bg-white">
        <DrawerHeader className="text-left">
          <DrawerTitle>{title}</DrawerTitle>
          <DrawerDescription>{description}.</DrawerDescription>
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
