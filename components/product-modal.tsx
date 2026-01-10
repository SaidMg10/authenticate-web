"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";

interface ProductModalProps {
  onClose: () => void;
  onCreated: () => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  onClose,
  onCreated,
}) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!name || !price) return;

    setLoading(true);
    try {
      const res = await fetch("/api/v1/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, price }),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      onCreated(); // recarga lista
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <Card className="w-96">
        <CardHeader>
          <CardTitle>Create Product</CardTitle>
          <CardDescription>Fill in product details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <input
            className="w-full p-2 rounded bg-zinc-800 text-white"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="w-full p-2 rounded bg-zinc-800 text-white"
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
          />
          <div className="flex justify-end gap-2">
            <Button onClick={onClose} className="bg-zinc-700 hover:bg-zinc-600">
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              className="bg-blue-600 hover:bg-blue-700"
              disabled={loading}
            >
              {loading ? "Creating..." : "Create"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
