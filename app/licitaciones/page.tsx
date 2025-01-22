"use client";
import Licitacion from "@/components/Licitacion";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import React, { useEffect, useState } from "react";

type MercadoPublico = {
  CodigoExterno: string;
  Nombre: string;
  Estado: number;
  FechaCierre: string;
};

const DemoPage = () => {
  const [data, setData] = useState<MercadoPublico[]>([]); // Inicializamos como arreglo vacío
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);
  const [selected, setSelected] = useState<MercadoPublico | null>(null);
  const [filter, setFilter] = useState<string>(""); // Aseguramos que sea siempre una cadena
  const url = process.env.NEXT_PUBLIC_API_URL;

  // Filtro de elementos
  const filteredItems = data.filter((item: MercadoPublico) =>
    item.Nombre.toLowerCase().includes(filter.toLowerCase())
  );

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (!url) {
          throw new Error("API_URL is not defined");
        }
        const response = await fetch(url);
        const result = await response.json();
        setData(result.Listado || []); // Aseguramos que siempre sea un arreglo
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [url]);

  if (error) {
    return <div>Error: {JSON.stringify(error)}</div>;
  }

  return (
    <div className="flex h-screen dark:bg-gray-900 bg-gray-100">
      {/* Sidebar */}
      <div className="w-1/3 max-w-sm bg-white dark:bg-black border-r h-full flex flex-col">
        {/* Input fijo */}
        <div className="p-4">
          <Input
            placeholder="Búsqueda"
            className="w-full mb-4"
            value={filter} // Vinculamos el estado del filtro
            onChange={(e) => setFilter(e.target.value)} // Actualizamos el filtro
          />
        </div>
        {/* Scrollable content */}
        {loading ? (
          <Skeleton className="flex-1 p-4 space-y-2 overflow-y-auto">
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
          </Skeleton>
        ) : (
          <div className="flex-1 p-4 space-y-2 overflow-y-auto">
            {filteredItems.length > 0 ? (
              filteredItems.map((item: MercadoPublico) => (
                <div
                  key={item.CodigoExterno}
                  onClick={() => setSelected(item)}
                  className={`p-2 cursor-pointer rounded-md ${
                    selected?.CodigoExterno === item.CodigoExterno
                      ? "bg-gray-200 dark:bg-gray-700"
                      : "hover:bg-gray-100 dark:hover:bg-gray-900"
                  }`}
                >
                  {item.Nombre}
                </div>
              ))
            ) : (
              <div className="text-center text-gray-500">
                No se encontraron resultados.
              </div>
            )}
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <Licitacion selected={selected} />
      </div>
    </div>
  );
};

export default DemoPage;
