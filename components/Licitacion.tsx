"use client";
import { useEffect, useState } from "react";
import { ScrollArea } from "./ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "./ui/table";
import { Copy } from "lucide-react";
import { Button } from "./ui/button";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "./ui/toast";
import { Grid } from "react-loader-spinner";

interface Comprador {
  CodigoOrganismo: string;
  NombreOrganismo: string;
  RutUnidad: string;
  NombreUnidad: string;
  DireccionUnidad: string;
  ComunaUnidad: string;
  RegionUnidad: string;
  RutUsuario: string;
  CodigoUsuario: string;
  NombreUsuario: string;
  CargoUsuario: string;
  NombreResponsableContrato: string;
  EmailResponsableContrato: string;
  NombreResponsablePago: string;
  EmailResponsablePago: string;
  FonoResponsableContrato: string;
  ProhibicionContratacion: string;
}

interface Fechas {
  FechaCreacion: string;
  FechaCierre: string | null;
  FechaInicio: string | null;
  FechaFinal: string | null;
  FechaPubRespuestas: string | null;
  FechaActoAperturaTecnica: string | null;
  FechaActoAperturaEconomica: string | null;
  FechaPublicacion: string | null;
  FechaAdjudicacion: string | null;
  FechaEstimadaAdjudicacion: string | null;
  FechaSoporteFisico: string | null;
  FechaTiempoEvaluacion: string | null;
  FechaEstimadaFirma: string | null;
  FechasUsuario: string | null;
  FechaVisitaTerreno: string | null;
  FechaEntregaAntecedentes: string | null;
}

interface Item {
  Correlativo: number;
  CodigoProducto: number;
  CodigoCategoria: string;
  Categoria: string;
  NombreProducto: string;
  Descripcion: string;
  UnidadMedida: string;
  Cantidad: number;
  Adjudicacion: string | null;
}

interface Items {
  Cantidad: number;
  Listado: Item[];
}

interface Licitacion {
  CodigoExterno: string;
  Nombre: string;
  CodigoEstado: number;
  Descripcion: string;
  FechaCierre: string | null;
  Estado: string;
  Comprador: Comprador;
  DiasCierreLicitacion: string;
  Informada: number;
  CodigoTipo: number;
  Tipo: string;
  TipoConvocatoria: string;
  Moneda: string;
  Etapas: number;
  EstadoEtapas: string;
  TomaRazon: string;
  EstadoPublicidadOfertas: number;
  JustificacionPublicidad: string;
  Contrato: string;
  Obras: string;
  CantidadReclamos: number;
  Fechas: Fechas;
  UnidadTiempoEvaluacion: number;
  DireccionVisita: string;
  DireccionEntrega: string;
  Estimacion: number;
  FuenteFinanciamiento: string;
  VisibilidadMonto: number;
  MontoEstimado: number | null;
  Tiempo: string;
  UnidadTiempo: string;
  Modalidad: number;
  TipoPago: string;
  ExtensionPlazo: number;
  EsBaseTipo: number;
  UnidadTiempoContratoLicitacion: string;
  ValorTiempoRenovacion: string;
  PeriodoTiempoRenovacion: string;
  EsRenovable: number;
  Items: Items;
}

interface Props {
  selected: Licitacion | null;
}

const Licitacion = ({ selected }: Props) => {
  const [data, setData] = useState<Licitacion | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { toast } = useToast();

  useEffect(() => {
    if (!selected) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const url = `${process.env.NEXT_PUBLIC_CONTENT_URL}${selected.CodigoExterno}`;
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`Error al cargar los datos: ${response.statusText}`);
        }

        const result = await response.json();
        setData(result.Listado[0]); // Tomamos el primer elemento de la respuesta
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error desconocido");
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selected]);

  if (!selected) {
    return (
      <div className="dark:text-white text-black text-center">
        Selecciona una licitación para ver los detalles.
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Grid
          visible={true}
          height="120"
          width="120"
          color="#3B82F6"
          ariaLabel="grid-loading"
          radius="12.5"
          wrapperStyle={{}}
          wrapperClass="grid-wrapper"
        />
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center">Error: {error}</div>;
  }

  if (!data) {
    return (
      <div className="dark:text-white text-black text-center">
        No se encontraron detalles.
      </div>
    );
  }

  return (
    <ScrollArea className="h-full p-4">
      {/* Card Principal */}
      <Card className="dark:bg-gray-800 dark:text-white">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">{data.Nombre}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <p className="mb-4 dark:text-gray-300 text-gray-700 text-4xl font-bold">
              {data.CodigoExterno}
            </p>
            <Button
              onClick={() => {
                navigator.clipboard.writeText(data.CodigoExterno); // Copiar al portapapeles
                toast({
                  title: "Código copiado",
                  description: `El código ${data.CodigoExterno} se ha copiado al portapapeles.`,
                  action: <ToastAction altText="Deshacer">Undo</ToastAction>,
                });
              }}
              variant="outline"
            >
              <Copy />
            </Button>
          </div>

          <p className="mb-4 dark:text-gray-300 text-gray-700">
            {data.Descripcion}
          </p>
          <div className="grid grid-cols-2 gap-6">
            {/* Detalles Principales */}
            <div className="p-4 dark:bg-gray-700 bg-gray-200 rounded-lg">
              <h2 className="text-lg font-semibold mb-3">
                Detalles Principales
              </h2>
              <ul className="space-y-2 text-sm">
                <li>
                  <strong>Código:</strong> {data.CodigoExterno}
                </li>
                <li>
                  <strong>Estado:</strong> {data.Estado}
                </li>
                <li>
                  <strong>Fecha de Creación:</strong>{" "}
                  {new Date(data.Fechas.FechaCreacion).toLocaleDateString()}
                </li>
                <li>
                  <strong>Fecha de Cierre:</strong>{" "}
                  {data.Fechas.FechaCierre
                    ? new Date(data.Fechas.FechaCierre).toLocaleDateString()
                    : "No definida"}
                </li>
                <li>
                  <strong>Días faltantes:</strong> {data.DiasCierreLicitacion}
                </li>
                <li>
                  <strong>Tipo:</strong> {data.Tipo}
                </li>
                <li>
                  <strong>Reclamos:</strong> {data.CantidadReclamos}
                </li>
              </ul>
            </div>
            {/* Información del Comprador */}
            <div className="p-4 dark:bg-gray-700 bg-gray-200 rounded-lg">
              <h2 className="text-lg font-semibold mb-3">
                Información del Comprador
              </h2>
              <ul className="space-y-2 text-sm">
                <li>
                  <strong>Organismo:</strong> {data.Comprador.NombreOrganismo}
                </li>
                <li>
                  <strong>Dirección:</strong> {data.Comprador.DireccionUnidad}
                </li>
                <li>
                  <strong>Comuna:</strong> {data.Comprador.ComunaUnidad}
                </li>
                <li>
                  <strong>Región:</strong> {data.Comprador.RegionUnidad}
                </li>
                <li>
                  <strong>Responsable:</strong> {data.Comprador.NombreUsuario}
                </li>
                <li>
                  <strong>Cargo:</strong> {data.Comprador.CargoUsuario}
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tiempos */}
      <Card className="mt-8 dark:bg-gray-800  dark:text-white">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Tiempos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-6">
            {/* Fechas */}
            <div className="p-4 dark:bg-gray-700 bg-gray-200 rounded-lg">
              <h2 className="text-lg font-semibold mb-3">Fechas</h2>
              <ul className="space-y-2 text-sm">
                <li>
                  <strong>Inicio:</strong>{" "}
                  {data.Fechas.FechaInicio
                    ? new Date(data.Fechas.FechaInicio).toLocaleDateString()
                    : "No definida"}
                </li>
                <li>
                  <strong>Final:</strong>{" "}
                  {data.Fechas.FechaFinal
                    ? new Date(data.Fechas.FechaFinal).toLocaleDateString()
                    : "No definida"}
                </li>
                <li>
                  <strong>Publicación:</strong>{" "}
                  {data.Fechas.FechaPublicacion
                    ? new Date(
                        data.Fechas.FechaPublicacion
                      ).toLocaleDateString()
                    : "No definida"}
                </li>
                <li>
                  <strong>Adjudicación:</strong>{" "}
                  {data.Fechas.FechaAdjudicacion
                    ? new Date(
                        data.Fechas.FechaAdjudicacion
                      ).toLocaleDateString()
                    : "No definida"}
                </li>
                <li>
                  <strong>Estimada:</strong>{" "}
                  {data.Fechas.FechaEstimadaAdjudicacion
                    ? new Date(
                        data.Fechas.FechaEstimadaAdjudicacion
                      ).toLocaleDateString()
                    : "No definida"}
                </li>
              </ul>
            </div>
            {/* Tiempos */}
            <div className="p-4 dark:bg-gray-700 bg-gray-200 rounded-lg">
              <h2 className="text-lg font-semibold mb-3">Tiempos</h2>
              <ul className="space-y-2 text-sm">
                <li>
                  <strong>Evaluación:</strong>{" "}
                  {data.Fechas.FechaTiempoEvaluacion}
                </li>
                <li>
                  <strong>Firma:</strong> {data.Fechas.FechaEstimadaFirma}
                </li>
                <li>
                  <strong>Soporte Físico:</strong>{" "}
                  {data.Fechas.FechaSoporteFisico
                    ? new Date(
                        data.Fechas.FechaSoporteFisico
                      ).toLocaleDateString()
                    : "No definida"}
                </li>
                <li>
                  <strong>Visita de Terreno:</strong>{" "}
                  {data.Fechas.FechaVisitaTerreno
                    ? new Date(
                        data.Fechas.FechaVisitaTerreno
                      ).toLocaleDateString()
                    : "No definida"}
                </li>
                <li>
                  <strong>Entrega de Antecedentes:</strong>{" "}
                  {data.Fechas.FechaEntregaAntecedentes
                    ? new Date(
                        data.Fechas.FechaEntregaAntecedentes
                      ).toLocaleDateString()
                    : "No definida"}
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contrato */}
      <Card className="mt-8 dark:bg-gray-800 dark:text-white">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Contrato</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-6">
            {/* Detalles del Contrato */}
            <div className="p-4 dark:bg-gray-700 bg-gray-200 rounded-lg">
              <h2 className="text-lg font-semibold mb-3">
                Detalles del Contrato
              </h2>
              <ul className="space-y-2 text-sm">
                <li>
                  <strong>Modalidad:</strong> {data.Modalidad}
                </li>
                <li>
                  <strong>Extensión de Plazo:</strong> {data.ExtensionPlazo}
                </li>
                <li>
                  <strong>Es Renovable:</strong>{" "}
                  {data.EsRenovable ? "Sí" : "No"}
                </li>
                <li>
                  <strong>Unidad de Tiempo:</strong>{" "}
                  {data.UnidadTiempoContratoLicitacion}
                </li>
                <li>
                  <strong>Valor de Tiempo de Renovación:</strong>{" "}
                  {data.ValorTiempoRenovacion}
                </li>
                <li>
                  <strong>Periodo de Tiempo de Renovación:</strong>{" "}
                  {data.PeriodoTiempoRenovacion}
                </li>
              </ul>
            </div>
            {/* Condiciones de Pago */}
            <div className="p-4 dark:bg-gray-700 bg-gray-200 rounded-lg">
              <h2 className="text-lg font-semibold mb-3">
                Condiciones de Pago
              </h2>
              <ul className="space-y-2 text-sm">
                <li>
                  <strong>Tipo de Pago:</strong> {data.TipoPago}
                </li>
                <li>
                  <strong>Unidad de Tiempo:</strong> {data.Tiempo}
                </li>
                <li>
                  <strong>Unidad de Tiempo:</strong> {data.UnidadTiempo}
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Responsables Pago */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Responsable de Pago</h2>
        <div className="overflow-x-auto">
          <Table className="dark:bg-gray-800 dark:text-white">
            <TableHeader>
              <TableRow>
                <TableCell className="text-left">Nombre</TableCell>
                <TableCell className="text-left">Email</TableCell>
                <TableCell className="text-left">Cargo</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="text-left">
                  {data.Comprador.NombreResponsablePago
                    ? data.Comprador.NombreResponsablePago
                    : "-"}
                </TableCell>
                <TableCell className="text-left">
                  {data.Comprador.EmailResponsablePago
                    ? data.Comprador.EmailResponsablePago
                    : "-"}
                </TableCell>
                <TableCell className="text-left">
                  {data.Comprador.CargoUsuario
                    ? data.Comprador.CargoUsuario
                    : "-"}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Responsables Contrato */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Responsable de Contrato</h2>
        <div className="overflow-x-auto">
          <Table className="dark:bg-gray-800 dark:text-white">
            <TableHeader>
              <TableRow>
                <TableCell className="text-left">Nombre</TableCell>
                <TableCell className="text-left">Email</TableCell>
                <TableCell className="text-left">Cargo</TableCell>
                <TableCell className="text-left">
                  Prohibición de Contratación
                </TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="text-left">
                  {data.Comprador.NombreResponsableContrato
                    ? data.Comprador.NombreResponsableContrato
                    : "-"}
                </TableCell>
                <TableCell className="text-left">
                  {data.Comprador.EmailResponsableContrato
                    ? data.Comprador.EmailResponsableContrato
                    : "-"}
                </TableCell>
                <TableCell className="text-left">
                  {data.Comprador.CargoUsuario
                    ? data.Comprador.CargoUsuario
                    : "-"}
                </TableCell>
                <TableCell className="text-left">
                  {data.Comprador.ProhibicionContratacion
                    ? data.Comprador.ProhibicionContratacion
                    : "No"}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Ítems */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Ítems de la Licitación</h2>
        <div className="overflow-x-auto">
          <Table className="dark:bg-gray-800 dark:text-white">
            <TableHeader>
              <TableRow>
                <TableCell className="text-left">Correlativo</TableCell>
                <TableCell className="text-left">Producto</TableCell>
                <TableCell className="text-left">Descripción</TableCell>
                <TableCell className="text-center">Cantidad</TableCell>
                <TableCell className="text-center">Unidad</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.Items.Listado.map((item, index) => (
                <TableRow
                  key={item.Correlativo}
                  className={
                    index % 2 === 0 ? "dark:bg-gray-700 bg-gray-200" : ""
                  }
                >
                  <TableCell className="text-left">
                    {item.Correlativo}
                  </TableCell>
                  <TableCell className="text-left">
                    {item.NombreProducto}
                  </TableCell>
                  <TableCell className="text-left">
                    {item.Descripcion}
                  </TableCell>
                  <TableCell className="text-center">{item.Cantidad}</TableCell>
                  <TableCell className="text-center">
                    {item.UnidadMedida}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </ScrollArea>
  );
};

export default Licitacion;
