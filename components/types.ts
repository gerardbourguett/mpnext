interface Comprador {
  CodigoOrganismo: string;
  NombreOrganismo: string;
  RutUnidad: string;
  CodigoUnidad: string;
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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface ResponseData {
  Cantidad: number;
  FechaCreacion: string;
  Version: string;
  Listado: Licitacion[];
}
