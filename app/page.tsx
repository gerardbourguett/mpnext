"use client";
import Licitacion from "@/components/Licitacion";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import React, { useEffect, useState } from "react";

type MercadoPublico = {
  CodigoExterno: string;
  Nombre: string;
  Estado: number;
  FechaCierre: string;
};

const DemoPage = () => {
  const [data, setData] = useState<MercadoPublico[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<MercadoPublico | null>(null);
  const url = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (!url) {
          throw new Error("API_URL is not definida");
        }
        const response = await fetch(url);
        const result = await response.json();
        setData(result.Listado || []);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error desconocido");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  if (loading) {
    return (
      <div className="flex h-screen dark:bg-black bg-gray-100 justify-center items-center">
        <Skeleton className="w-1/2 h-12">
          <h1 className="text-center ">Cargando licitaciones</h1>
        </Skeleton>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!data.length) {
    return <div>No data</div>;
  }

  return (
    <div className="flex flex-col md:flex-row h-screen dark:bg-gray-900 bg-gray-100">
      {/* Sidebar */}
      <div className="w-full md:w-1/3 xl:w-1/2 max-w-sm bg-white dark:bg-black border-r h-full flex flex-col">
        <div className="p-4">
          <Input placeholder="Búsqueda" className="w-full mb-4" />
        </div>
        <div className="flex-1 p-4 space-y-2 overflow-y-auto">
          {data.map((item) => (
            <div className="" key={item.CodigoExterno}>
              <div
                onClick={() => setSelected(item)}
                className={`p-2 cursor-pointer rounded-md ${
                  selected?.CodigoExterno === item.CodigoExterno
                    ? "bg-gray-200 dark:bg-gray-700"
                    : "hover:bg-gray-100 dark:hover:bg-gray-900"
                }`}
              >
                {item.Nombre}
              </div>
              <Separator />
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 dark:bg-black text-white">
        <Licitacion selected={selected} />
      </div>
    </div>
  );
};

export default DemoPage;
