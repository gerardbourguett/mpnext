"use client";

import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type MercadoPublico = {
  CodigoExterno: string;
  Nombre: string;
  Estado: number;
  FechaCierre: string;
};

export const columns: ColumnDef<MercadoPublico>[] = [
  {
    accessorKey: "CodigoExterno",
    header: "Codigo Externo",
  },
  {
    accessorKey: "Nombre",
    header: "Nombre",
  },
  {
    accessorKey: "Estado",
    header: "Estado",
  },
  {
    accessorKey: "FechaCierre",
    header: "Fecha Cierre",
  },
];
