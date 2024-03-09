"use client";
import PurchaseHistory from "@/components/PurchaseHistory";
import { SalesHistory } from "@/components/SalesHistory";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function PurchaseSalesHistory({
  itemID,
  itemName,
}: {
  itemID: number;
  itemName: string;
}) {
  return (
    <Dialog>
      <DialogTrigger onClick={(event) => event.stopPropagation()}>
        <span>Purchase & Sales History</span>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{itemName} History</DialogTitle>
          <DialogDescription>
            <Tabs
              defaultValue="purchase"
              className="w-[400px]"
              onClick={(event) => event.stopPropagation()}
            >
              <TabsList className="bg-gray w-full my-2">
                <TabsTrigger
                  className="w-1/2"
                  value="purchase"
                  onClick={(event) => event.stopPropagation()}
                >
                  Purchase
                </TabsTrigger>
                <TabsTrigger
                  className="w-1/2"
                  value="sales"
                  onClick={(event) => event.stopPropagation()}
                >
                  Sales
                </TabsTrigger>
              </TabsList>
              <TabsContent value="purchase">
                <PurchaseHistory itemID={itemID} />
              </TabsContent>
              <TabsContent value="sales">
                <SalesHistory />
              </TabsContent>
            </Tabs>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
