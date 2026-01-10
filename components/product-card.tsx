"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

export interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  owner_id: string;
  created_at: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  name,
  price,
  owner_id,
  created_at,
}) => {
  const date = new Date(created_at).toLocaleDateString();

  return (
    <Card className="bg-zinc-900 border-zinc-800 hover:shadow-lg transition">
      <CardHeader>
        <CardTitle className="text-white">{name}</CardTitle>
        <CardDescription className="text-zinc-400">
          Owner: {owner_id} | Created: {date}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-white font-semibold">${price.toFixed(2)}</p>
      </CardContent>
    </Card>
  );
};
