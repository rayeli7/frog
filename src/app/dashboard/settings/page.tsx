import SecuritySettings from "@/components/SecuritySettings/SecuritySettings";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProfileEditor from "@/components/ProfileEditor/ProfileEditor";

const Transactions = () => {
  return (
    <div className="mt-12 my-auto w-full">
      <h1>Settings Page</h1>
      {/* Your page content */}
      <div>
        <Tabs defaultValue="account" className="mt-4 w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            <ProfileEditor
              name={""}
              username={""}
              email={""}
              dateOfBirth={""}
              permanentAddress={""}
              presentAddress={""}
              city={""}
              postalCode={""}
              country={""}
            />
          </TabsContent>
          <TabsContent value="security">
            <SecuritySettings />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Transactions;
