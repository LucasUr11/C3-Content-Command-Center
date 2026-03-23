import { FileText } from "lucide-react";

export default function Editor() {
  return (
    <div className="max-w-6xl mx-auto opacity-0 animate-fade-in">
      <h1 className="text-2xl font-semibold tracking-tight text-foreground">Editor de Guiones</h1>
      <p className="text-sm text-muted-foreground mt-1 mb-8">Vista partida: editor + preview técnico</p>
      <div className="flex items-center justify-center h-64 rounded-lg border border-dashed border-border">
        <div className="text-center text-muted-foreground">
          <FileText className="h-8 w-8 mx-auto mb-2 opacity-40" />
          <p className="text-sm">Próximamente</p>
        </div>
      </div>
    </div>
  );
}
