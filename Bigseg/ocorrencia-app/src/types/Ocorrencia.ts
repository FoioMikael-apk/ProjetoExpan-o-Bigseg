export interface Ocorrencia {
    id: number;
    descricao: string;
    local: string;
    status: "pendente" | "concluída";
    imagem: string;
    created_at: string;
  
    // Campos complementares
    idade?: number;
    sexo?: string;
    produto?: string;
    preco?: number;
    setor?: string;
    observacao?: string;
    ativo?: boolean;
  }
  