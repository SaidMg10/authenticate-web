"use client";

import { useState, useEffect } from "react";

import { ProductCard } from "./product-card";

export interface Product {
  id: number;
  name: string;
  price: number;
  owner_id: string;
  created_at: string;
}

export function ProductsContainer() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch("/api/v1/products"); // tu proxy Go
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data: Product[] = await res.json();
        setProducts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : String(err));
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading)
    return <p className="text-zinc-400 text-center">Loading products...</p>;
  if (error) return <p className="text-red-500 text-center">Error: {error}</p>;
  if (!products.length)
    return <p className="text-zinc-400 text-center">No products found.</p>;

  return (
    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
      {products.map((p) => (
        <ProductCard key={p.id} {...p} />
      ))}
    </div>
  );
}
