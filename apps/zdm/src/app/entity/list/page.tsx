import { CardEntity } from '@/components/molecules/CardEntity/CardEntity';

export default function EntityList() {
  return (
    <div>
      <div className="flex justify-between mb-2">
        <div>
          <h1 className="text-3xl">Entity List</h1>
        </div>
        <div className="flex items-center">
          <button className="btn btn-secondary">Ordenar</button>
          <button className="btn btn-secondary">Listar </button>
          <button className="btn btn-primary">Agregar</button>
        </div>
      </div>
      <div className="flex gap-1 mb-2">
        <input placeholder="search..." className="form-control w-auto" type="text" />
        <button className="btn btn-secondary">Filtros</button>
      </div>
      <div className="flex gap-4">
        <CardEntity />
        <CardEntity />
      </div>
    </div>
  );
}
