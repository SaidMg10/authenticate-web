"use client";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { ProductsContainer } from "@/components/product-container";
import { ProductModal } from "@/components/product-modal";

export default function ProductsPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [refreshList, setRefreshList] = useState(false);

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Products</h1>
          <p className="text-zinc-400 text-lg">
            Browse all available products fetched from the Go backend
          </p>
        </div>

        <div className="flex justify-end mb-4">
          <Button
            onClick={() => setModalOpen(true)}
            className="bg-green-600 hover:bg-green-700"
          >
            + Create Product
          </Button>
        </div>

        {/* Listado de productos */}
        <ProductsContainer key={refreshList ? "r" : "k"} />

        {/* Modal de creación */}
        {modalOpen && (
          <ProductModal
            onClose={() => setModalOpen(false)}
            onCreated={() => setRefreshList((prev) => !prev)}
          />
        )}
      </div>
    </div>
  );
}
